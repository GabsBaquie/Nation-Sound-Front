import dotenv from "dotenv";

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["nation-sounds.fr"],
  },
};

export default nextConfig;
