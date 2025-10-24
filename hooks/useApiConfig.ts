import { useEffect, useState } from "react";

export function useApiConfig() {
  const [config, setConfig] = useState({
    apiUrl: "",
    isLocal: false,
    isProduction: false,
    error: null as string | null,
  });

  useEffect(() => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api";
    const isLocal =
      apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1");
    const isProduction = apiUrl.includes("nation-sounds.fr");

    setConfig({
      apiUrl,
      isLocal,
      isProduction,
      error: null,
    });

    // Vérifier la configuration
    if (!apiUrl) {
      setConfig((prev) => ({
        ...prev,
        error: "NEXT_PUBLIC_API_URL n'est pas définie",
      }));
    }

    // Afficher la configuration en développement
    if (process.env.NODE_ENV === "development") {
      console.log("🔧 Configuration API:", {
        apiUrl,
        isLocal,
        isProduction,
        nodeEnv: process.env.NODE_ENV,
      });
    }
  }, []);

  return config;
}
