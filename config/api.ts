// Configuration de l'API
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api",
  ENDPOINTS: {
    CONCERTS: "/concerts",
    DAYS: "/days",
    POIS: "/pois",
    SECURITY_INFOS: "/securityInfos",
    UPLOAD_LIST: "/upload/list",
  },
  TIMEOUT: 10000, // 10 secondes
  RETRY_ATTEMPTS: 3,
};

// Configuration pour les données de fallback
export const FALLBACK_CONFIG = {
  ENABLED: true, // Activer les données de fallback en cas d'erreur
  SHOW_ERRORS: process.env.NODE_ENV === "development", // Afficher les erreurs en développement
};
