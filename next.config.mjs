import dotenv from "dotenv";

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "nation-sounds.fr",
      "localhost",
      "127.0.0.1",
      "localhost:8080",
      "localhost:3000",
      "localhost:3003",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "nation-sounds.fr",
        pathname: "/uploads/**",
      },
    ],
  },
  // Configuration pour le développement
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  },
};
export default nextConfig;
