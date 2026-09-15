/*
 * Regenerates reference/assets-used.txt: the set of assets the design
 * prototype actually references.
 *
 * The Drive handoff carries 69 assets but the 11 prototype pages only use
 * 47. The rest are leftovers (services that were cut, unused photo
 * treatments, a placeholder logo, a logo from a different brand). We ship
 * only what is referenced, and this script is the record of why.
 *
 * Re-run it if a page starts using an asset that was previously dropped.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const DIR = 'reference/prototype'
const OUT = 'reference/assets-used.txt'

const files = (await readdir(DIR)).filter((f) => f.endsWith('.html'))
const used = new Set()

for (const f of files) {
  const html = await readFile(join(DIR, f), 'utf8')
  for (const m of html.matchAll(/assets\/([A-Za-z0-9_.-]+)/g)) used.add(m[1])
}

const sorted = [...used].sort()
await writeFile(OUT, sorted.join('\n') + '\n')
console.log(`${sorted.length} assets referenced across ${files.length} prototype pages -> ${OUT}`)
