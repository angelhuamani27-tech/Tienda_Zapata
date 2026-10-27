/** @type {import('next').NextConfig} */
const nextConfig = process.env.GITHUB_PAGES === 'true'
  ? {
      output: 'export',
      basePath: '/Tienda_Zapata',
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {}

module.exports = nextConfig
