/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    const routePattern = "/api/:path*"
    return [
      {
        source: routePattern,
        destination: `${process.env.BACKEND_URI || "http://localhost:3001"}${routePattern}`,
      },
    ]
  },
}

export default nextConfig
