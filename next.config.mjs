/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /*
   * Static export. Every page on this site is prerendered marketing content
   * with no request-time data, so there is nothing for a server to do. This
   * also keeps deploys independent of Netlify's Next.js runtime, which does
   * not get applied on zip-upload deploys.
   */
  output: 'export',

  images: {
    // Next's built-in optimizer needs a server; on a static export we hand
    // resizing to Netlify Image CDN instead. See src/lib/image-loader.ts.
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
  },

  // Emit /about as /about/index.html so static hosts resolve it cleanly.
  trailingSlash: true,
}

export default nextConfig
