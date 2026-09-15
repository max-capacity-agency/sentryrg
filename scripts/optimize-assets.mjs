/*
 * Turns reference/assets-src (134MB of oversized PNG/JPEG straight out of
 * the design tool) into web-ready sources in public/assets.
 *
 * We emit one optimized WebP per image rather than a full srcset: next/image
 * and Netlify Image CDN derive responsive variants on demand at request time,
 * so the job here is only to stop shipping 24-megapixel camera frames as the
 * origin file.
 *
 * Sources stay in Drive and are gitignored. Run this when assets change.
 */
import sharp from 'sharp'
import { readdir, mkdir, copyFile, stat, readFile, rm } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

const SRC = 'reference/assets-src'
const OUT = 'public/assets'
const USED = 'reference/assets-used.txt'

// No image on this site is displayed above ~1400 CSS px, so 1920 leaves
// comfortable headroom for 2x on the widest full-bleed sections.
const MAX_EDGE = 1920
const WEBP_QUALITY = 82

// Passed through untouched: vector needs no raster pass, video is not sharp's job.
const PASSTHROUGH = new Set(['.svg', '.mp4'])

const fmt = (b) => `${(b / 1024 / 1024).toFixed(2)}MB`

await mkdir(OUT, { recursive: true })

// Ship only what the prototype references. Drive carries 69 assets but the
// pages use 47; the rest are cut services, unused photo treatments, a
// placeholder logo and a logo from a different brand. Regenerate the list
// with `node scripts/scan-asset-usage.mjs`.
const used = new Set((await readFile(USED, 'utf8')).split('\n').filter(Boolean))

// Start from a clean output dir so a dropped asset does not linger.
await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const all = (await readdir(SRC)).sort()
const files = all.filter((f) => used.has(f))
const skipped = all.filter((f) => !used.has(f))
let srcTotal = 0
let outTotal = 0
const rows = []

for (const file of files) {
  const ext = extname(file).toLowerCase()
  const srcPath = join(SRC, file)
  const srcSize = (await stat(srcPath)).size
  srcTotal += srcSize

  if (PASSTHROUGH.has(ext)) {
    await copyFile(srcPath, join(OUT, file))
    outTotal += srcSize
    rows.push([file, srcSize, srcSize, 'copied'])
    continue
  }

  const outName = `${basename(file, ext)}.webp`
  const outPath = join(OUT, outName)

  const image = sharp(srcPath)
  const meta = await image.metadata()
  const needsResize = Math.max(meta.width, meta.height) > MAX_EDGE

  await image
    .rotate() // honour EXIF orientation before we strip it
    .resize({
      width: needsResize ? MAX_EDGE : undefined,
      height: needsResize ? MAX_EDGE : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outPath)

  const outSize = (await stat(outPath)).size
  outTotal += outSize
  rows.push([outName, srcSize, outSize, `${meta.width}x${meta.height}`])
}

for (const [name, s, o, note] of rows) {
  const pct = s > 0 ? Math.round((1 - o / s) * 100) : 0
  console.log(`${name.padEnd(32)} ${fmt(s).padStart(8)} -> ${fmt(o).padStart(8)}  ${String(pct).padStart(3)}%  ${note}`)
}
console.log('-'.repeat(78))
console.log(`skipped ${skipped.length} unreferenced assets`)
console.log(`${String(rows.length).padEnd(32)} ${fmt(srcTotal).padStart(8)} -> ${fmt(outTotal).padStart(8)}  ${Math.round((1 - outTotal / srcTotal) * 100)}% smaller`)
