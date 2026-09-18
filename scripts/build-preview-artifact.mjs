/*
 * Turns the static export into a single page suitable for publishing as an
 * Artifact, for design review in chat.
 *
 * Artifacts supply their own <!doctype>/<html>/<head>/<body> wrapper, so a
 * full Next.js document cannot be published as-is. Two consequences:
 *
 *  1. next/font puts the --font-* custom properties on a class on <html>.
 *     That element belongs to the wrapper here, so the classes move onto a
 *     div wrapping the page. The variables still cascade to everything
 *     inside it.
 *  2. Next's hydration scripts expect to own the document root. Wrapped in
 *     a div they would mismatch and could blank the page, so they are
 *     stripped. That makes this a STATIC visual proof: layout, type, colour
 *     and imagery are exact, but the carousels, accordion and drag slider
 *     do not run. Interactive review belongs on the real deploy.
 */
import { readFile, writeFile, cp, rm } from 'node:fs/promises'
import { join } from 'node:path'

const html = await readFile('out/index.html', 'utf8')

const htmlClass = html.match(/<html[^>]*class="([^"]*)"/)?.[1] ?? ''

/*
 * next/font declares --font-open-sauce / --font-jakarta on a class that
 * normally sits on <html>, i.e. :root. tokens.css then builds --font-head
 * and --font-body from them, also on :root.
 *
 * Moving the font class onto a wrapper div breaks that: a custom property
 * whose value contains an unresolvable var() is invalid at computed-value
 * time, so --font-head computes to nothing ON :root and inherits down
 * empty — headings silently fall back to the browser's default serif.
 *
 * So lift the font variable declarations out of the generated CSS and
 * redeclare them on :root, where the token layer can see them.
 */
const cssFiles = [...html.matchAll(/href="(\/_next\/static\/chunks\/[^"]+\.css)"/g)].map((m) => m[1])
let fontVars = ''
for (const href of cssFiles) {
  const css = await readFile(join('out', href), 'utf8')
  for (const m of css.matchAll(/\{(--font-[a-z-]+:[^}]+)\}/g)) fontVars += m[1] + ';'
}
const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? ''
let body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1] ?? ''

// Keep stylesheets and inline styles; drop every script.
const assets = [...head.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)].map((m) => m[0])
const inlineStyles = [...head.matchAll(/<style[^>]*>[\s\S]*?<\/style>/g)].map((m) => m[0])
const preloads = [...head.matchAll(/<link[^>]+rel="preload"[^>]+as="font"[^>]*>/g)].map((m) => m[0])

body = body
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<template[\s\S]*?<\/template>/g, '')

const out = `<title>Sentry Roofing Homepage</title>
${preloads.join('\n')}
${assets.join('\n')}
${inlineStyles.join('\n')}
<style>
  /* See the note above: without these the token layer's --font-head and
     --font-body are invalid at :root and every heading loses its face. */
  :root { ${fontVars} }
  /* The artifact skeleton sets its own body font and ground; this page
     supplies the client's. */
  body { margin: 0; background: #ffffff; }
</style>
<div class="${htmlClass}">
${body}
</div>
`

/*
 * The artifact service reserves published paths beginning with "_", so the
 * _next tree cannot keep its name. Serve it from nextassets/ instead. The
 * CSS's own url(../media/...) references are relative and survive the move.
 */
const rehomed = out
  .replaceAll('/_next/', '/nextassets/')
  // The WebM is omitted from the preview upload; the MP4 alone plays here.
  .replace(/<source[^>]+webm[^>]*>/g, '')

await writeFile('out/preview.html', rehomed)
/* Mirror the _next tree under its permitted name so the rewritten
   references resolve once published. */
await rm('out/nextassets', { recursive: true, force: true })
await cp('out/_next', 'out/nextassets', { recursive: true })

console.log(`preview.html written — ${(rehomed.length / 1024).toFixed(1)}KB`)
console.log('  _next mirrored to out/nextassets/')
console.log(`  html classes carried: ${htmlClass || '(none)'}`)
console.log(`  stylesheets: ${assets.length}, inline styles: ${inlineStyles.length}, font preloads: ${preloads.length}`)
console.log(`  scripts stripped: ${(html.match(/<script/g) || []).length}`)
