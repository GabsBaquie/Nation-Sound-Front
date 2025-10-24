// Configuration de l'environnement
export const ENV_CONFIG = {
  // URL de l'API
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api",

  // Environnement
  NODE_ENV: process.env.NODE_ENV || "development",

  // Configuration pour le développement
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",

  // Configuration pour les données de fallback
  ENABLE_FALLBACK: true,
  SHOW_ERRORS: process.env.NODE_ENV === "development",

  // Configuration pour les timeouts
  API_TIMEOUT: 10000, // 10 secondes
  RETRY_ATTEMPTS: 3,

  // Configuration pour le cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

// Validation de la configuration
export function validateConfig() {
  if (!ENV_CONFIG.API_URL) {
    console.warn(
      "⚠️ NEXT_PUBLIC_API_URL n'est pas définie, utilisation de la valeur par défaut"
    );
  }

  if (ENV_CONFIG.IS_DEVELOPMENT) {
    console.log("🔧 Mode développement activé");
    console.log("📡 API URL:", ENV_CONFIG.API_URL);
  }
}

// Initialisation
if (typeof window !== "undefined") {
  validateConfig();
}
