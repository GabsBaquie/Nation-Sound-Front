// Configuration de l'API pour le frontend
export const API_CONFIG = {
  // URL de base de l'API
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api",

  // Endpoints disponibles
  ENDPOINTS: {
    CONCERTS: "/concerts",
    DAYS: "/days",
    POIS: "/pois",
    SECURITY_INFOS: "/securityInfos",
    UPLOAD_LIST: "/upload/list",
  },

  // Configuration des timeouts
  TIMEOUT: 10000, // 10 secondes

  // Configuration des tentatives
  RETRY_ATTEMPTS: 3,

  // Configuration du cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

// Configuration pour les données de fallback
export const FALLBACK_CONFIG = {
  ENABLED: true, // Activer les données de fallback en cas d'erreur
  SHOW_ERRORS: process.env.NODE_ENV === "development", // Afficher les erreurs en développement
};

// Configuration pour l'environnement
export const ENV_CONFIG = {
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  API_URL: API_CONFIG.BASE_URL,
};

// Validation de la configuration
export function validateApiConfig() {
  if (!API_CONFIG.BASE_URL) {
    console.warn(
      "⚠️ NEXT_PUBLIC_API_URL n'est pas définie, utilisation de la valeur par défaut"
    );
  }

  if (ENV_CONFIG.IS_DEVELOPMENT) {
    console.log("🔧 Mode développement activé");
    console.log("📡 API URL:", API_CONFIG.BASE_URL);
  }
}

// Initialisation
if (typeof window !== "undefined") {
  validateApiConfig();
}
