import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/kiwoom-creative-guide-dashboard',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/kiwoom-creative-guide-dashboard',
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
