import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'alphabet.thevetted.vc',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
