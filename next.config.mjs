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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sportmonks.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
}

export default nextConfig
