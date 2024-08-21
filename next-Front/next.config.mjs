import dotenv from "dotenv";

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "strapi-sound.up.railway.app"],
  },
};

export default nextConfig;
