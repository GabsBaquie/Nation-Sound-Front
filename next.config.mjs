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
        headers: [
          {
            key: "Referrer-Policy",
            value: "origin", // ou "no-referrer", "strict-origin", etc.
          },
        ],
      },
    ];
  },
};

export default nextConfig;
