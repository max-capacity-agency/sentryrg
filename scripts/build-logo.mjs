/*
 * Reconstructs a transparent Sentry Roofing logo from logo-light.png.
 *
 * Why this exists: the Drive handoff contains no usable transparent logo.
 *   logo.png          generic "YOUR ROOFING COMPANY" stock placeholder
 *   logo-reversed.svg a different brand entirely ("Halstead & Roe")
 *   logo-light.png    the real logo, but flattened onto a near-black plate
 *
 * The nav sits on navy (#0d1b2e) and the plate is #00030b, so shipping
 * logo-light.png as-is puts a visible black box in the navbar.
 *
 * Luminance keying does not work here: the shield's interior is the same
 * near-black as the plate. So we flood fill inward from the border, which
 * clears only background connected to the edge and leaves the shield intact,
 * then clear the small enclosed letter counters (the holes in R and O) which
 * the border fill cannot reach. Counters are distinguished from shield
 * interior by size and by sitting below the shield.
 *
 * This is a salvage job. Ask the client for a real transparent PNG or SVG
 * and delete this script when it arrives.
 */
import sharp from 'sharp'

const SRC = 'reference/assets-src/logo-light.png'
const OUT = 'public/assets/logo-light.webp'
const TOL = 34
const MAX_COUNTER_PX = 2500

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const W = info.width, H = info.height, N = W * H

const rgb = (p) => [data[p * 3], data[p * 3 + 1], data[p * 3 + 2]]
const PLATE = rgb(0)
const dist2 = (c) => (c[0] - PLATE[0]) ** 2 + (c[1] - PLATE[1]) ** 2 + (c[2] - PLATE[2]) ** 2
const TOL2 = TOL * TOL
const isPlate = (p) => dist2(rgb(p)) <= TOL2

const clear = new Uint8Array(N)

// Pass 1: flood fill inward from every border pixel.
const queue = []
for (let x = 0; x < W; x++) queue.push(x, (H - 1) * W + x)
for (let y = 0; y < H; y++) queue.push(y * W, y * W + W - 1)
for (let head = 0; head < queue.length; head++) {
  const p = queue[head]
  if (clear[p] || !isPlate(p)) continue
  clear[p] = 1
  const x = p % W, y = (p - x) / W
  if (x > 0) queue.push(p - 1)
  if (x < W - 1) queue.push(p + 1)
  if (y > 0) queue.push(p - W)
  if (y < H - 1) queue.push(p + W)
}

// Pass 2: collect plate-coloured regions the border fill could not reach.
const visited = new Uint8Array(N)
const regions = []
for (let seed = 0; seed < N; seed++) {
  if (visited[seed] || clear[seed] || !isPlate(seed)) continue
  const stack = [seed]; visited[seed] = 1
  const pixels = []; let minY = H, maxY = 0
  while (stack.length) {
    const p = stack.pop(); pixels.push(p)
    const x = p % W, y = (p - x) / W
    if (y < minY) minY = y
    if (y > maxY) maxY = y
    for (const n of [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, y > 0 ? p - W : -1, y < H - 1 ? p + W : -1]) {
      if (n >= 0 && !visited[n] && isPlate(n)) { visited[n] = 1; stack.push(n) }
    }
  }
  regions.push({ pixels, minY, maxY })
}

// The largest enclosed region is the shield body. Anything small that sits
// entirely below it is a letter counter and should be transparent too.
regions.sort((a, b) => b.pixels.length - a.pixels.length)
const shieldBottom = regions.length ? regions[0].maxY : 0
let counters = 0
for (const r of regions) {
  if (r.pixels.length <= MAX_COUNTER_PX && r.minY > shieldBottom) {
    for (const p of r.pixels) clear[p] = 1
    counters++
  }
}

// Compose, feathering the rim so antialiased edges do not show a dark halo.
const out = Buffer.alloc(N * 4)
let cleared = 0
for (let p = 0; p < N; p++) {
  const o = p * 4
  if (clear[p]) { out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0; cleared++; continue }
  const c = rgb(p)
  out[o] = c[0]; out[o + 1] = c[1]; out[o + 2] = c[2]
  const x = p % W, y = (p - x) / W
  const rim =
    (x > 0 && clear[p - 1]) || (x < W - 1 && clear[p + 1]) ||
    (y > 0 && clear[p - W]) || (y < H - 1 && clear[p + W])
  out[o + 3] = rim ? Math.min(255, Math.round(Math.sqrt(dist2(c)) * 2.2)) : 255
}

await sharp(out, { raw: { width: W, height: H, channels: 4 } })
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile(OUT)

console.log(`shield bottom at y=${shieldBottom}; cleared ${counters} letter counters`)
console.log(`${OUT}: ${(100 * cleared / N).toFixed(1)}% transparent`)
