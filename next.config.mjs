import dotenv from "dotenv";

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["nation-sounds.fr"],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Appliquer à toutes les routes
      },
    ];
  },
};

export default nextConfig;
