import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "@mdxeditor/editor",
      "@radix-ui/react-icons",
      "cm6-theme-basic-dark"
    ],
  },
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"static.vecteezy.com",
        port:""
  },{
        protocol:"https",
        hostname:"avatars.githubusercontent.com",
        port:""
  },{
        protocol:"https",
        hostname:"lh3.googleusercontent.com",
        port:""
  }]}
  /* config options here */
};

export default nextConfig;
