/*
 * Netlify Image CDN loader.
 *
 * The site is a static export, so Next's own optimizer (which needs a
 * server) is not available. Netlify serves /.netlify/images on every
 * project, which resizes and re-encodes on demand at the edge and caches
 * the result, so next/image keeps working and we still get per-breakpoint
 * WebP/AVIF without shipping a srcset of pre-rendered files.
 *
 * Outside a Netlify deploy that route does not exist, so fall through to
 * the raw file and let the browser scale it.
 */
type LoaderArgs = { src: string; width: number; quality?: number }

export default function netlifyImageLoader({ src, width, quality }: LoaderArgs): string {
  if (process.env.NODE_ENV !== 'production') return src

  /*
   * Preview builds (NEXT_PUBLIC_PREVIEW=1) are published outside Netlify,
   * where /.netlify/images does not exist, so serve the raw file instead.
   * Used for the Artifact preview we share for review.
   */
  if (process.env.NEXT_PUBLIC_PREVIEW === '1') return src

  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality ?? 75),
  })
  return `/.netlify/images?${params.toString()}`
}
