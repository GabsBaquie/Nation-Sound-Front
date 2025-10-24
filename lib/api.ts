// Configuration de l'API
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api";

// Types pour les réponses de l'API
export interface Concert {
  id: number;
  title: string;
  description: string;
  performer: string;
  time: string;
  location: string;
  image?: string;
  days: Day[];
}

export interface Day {
  id: number;
  title: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface POI {
  id: number;
  name: string;
  type: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  created_at: string;
  updated_at: string;
}

export interface SecurityInfo {
  id: number;
  title: string;
  description: string;
  urgence: boolean;
  actif: boolean;
  created_at: string;
  updated_at: string;
}

// Fonction utilitaire pour faire des appels API
async function apiCall<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors de l'appel API ${endpoint}:`, error);
    throw error;
  }
}

// Services pour récupérer les données
export const apiService = {
  // Récupérer tous les concerts
  async getConcerts(): Promise<Concert[]> {
    return apiCall<Concert[]>("/concerts");
  },

  // Récupérer tous les jours
  async getDays(): Promise<Day[]> {
    return apiCall<Day[]>("/days");
  },

  // Récupérer tous les POIs
  async getPOIs(): Promise<POI[]> {
    return apiCall<POI[]>("/pois");
  },

  // Récupérer toutes les infos de sécurité
  async getSecurityInfos(): Promise<SecurityInfo[]> {
    return apiCall<SecurityInfo[]>("/securityInfos");
  },

  // Récupérer les images du serveur
  async getServerImages(): Promise<string[]> {
    return apiCall<string[]>("/upload/list");
  },
};

// Fonction pour transformer les données de l'API en format frontend
export const dataTransformers = {
  // Transformer les concerts en format pour la programmation
  transformConcertsForProgram(concerts: Concert[]) {
    return concerts.map((concert) => ({
      id: concert.id,
      title: concert.title,
      performer: concert.performer,
      time: concert.time,
      location: concert.location,
      description: concert.description,
      image: concert.image,
      day: concert.days?.[0]?.date || "",
      dayTitle: concert.days?.[0]?.title || "",
    }));
  },

  // Transformer les POIs en format pour la carte
  transformPOIsForMap(pois: POI[]) {
    return pois.map((poi) => ({
      id: poi.id,
      Name: poi.name,
      Type: poi.type,
      Description: poi.description,
      POI: {
        address: poi.address,
        coordinates: poi.coordinates,
      },
    }));
  },

  // Transformer les infos de sécurité en format pour les alertes
  transformSecurityInfosForAlerts(securityInfos: SecurityInfo[]) {
    return securityInfos
      .filter((info) => info.actif) // Seulement les alertes actives
      .map((info) => ({
        id: info.id.toString(),
        title: info.title,
        description: info.description,
        urgence: info.urgence,
        actif: info.actif,
      }));
  },
};
