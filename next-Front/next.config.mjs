import dotenv from "dotenv";

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "votre-domaine-en-production.com"],
  },
};

export default nextConfig;
