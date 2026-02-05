/**
 * Next.js configuration.
 *
 * Add configuration options here as needed.
 * Keep this file minimal; prefer convention over configuration.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable strict mode for better debugging
  reactStrictMode: true,

  // API proxy to backend (uncomment when backend is ready)
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:3001/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
