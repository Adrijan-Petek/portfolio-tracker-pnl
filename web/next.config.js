const repo = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isProd = process.env.NODE_ENV === "production" && repo;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? repo : "",
  assetPrefix: isProd ? `${repo}/` : "",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
