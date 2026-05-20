/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const customDomain = process.env.CUSTOM_DOMAIN === "true";
const repoBasePath = isGithubPages && !customDomain ? "/nawa_production" : "";

const nextConfig = {
  reactStrictMode: true,
  ...(isGithubPages
    ? {
        output: "export",
        ...(repoBasePath
          ? { basePath: repoBasePath, assetPrefix: `${repoBasePath}/` }
          : {}),
        trailingSlash: true,
      }
    : {}),
  images: {
    unoptimized: isGithubPages,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
