import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // مهم جداً عشان يعمل static export

  images: {
    unoptimized: true, // GitHub Pages لا يدعم Image Optimization
  },

  // لو الريبو مش باسم username.github.io
  // غير "repo-name" باسم الريبو بتاعك
  basePath: "/rr",
  assetPrefix: "/rr/",
};

export default nextConfig;
