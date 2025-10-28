import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [new URL('https://noeawrojjd.ufs.sh/f/hhi7TjKirdIgsw461qU2PMmcntxhTqy9rGa2BdoOKCXDLUHl')],
  },


    eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

};

export default nextConfig;
