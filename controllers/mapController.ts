import { useEffect, useState } from "react";
import { API_URL } from "./apiConfig";

// Type API POI (brut)
export type APIPOI = {
  id: number;
  title: string;
  type: string;
  latitude: number;
  longitude: number;
  description: string;
  category: string;
  address: string;
};

// Type POI attendu par la carte
export type MapPOI = {
  id: number;
  Name: string;
  Type: string;
  Description: string;
  POI: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
};

export class MapController {
  static async fetchPOIs(): Promise<MapPOI[]> {
    const res = await fetch(`${API_URL}/api/pois`);
    if (!res.ok) throw new Error("Erreur API POIs");
    const data: APIPOI[] = await res.json();
    // Mapping vers le format attendu par la carte
    return data.map((poi) => ({
      id: poi.id,
      Name: poi.title,
      Type: poi.type,
      Description: poi.description,
      POI: {
        address: poi.address,
        coordinates: { lat: poi.latitude, lng: poi.longitude },
      },
    }));
  }
}

export const usePOIs = () => {
  const [pois, setPOIs] = useState<MapPOI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getPOIs = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const data = await MapController.fetchPOIs();
        setPOIs(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getPOIs();
  }, []);

  return { pois, isLoading, hasError };
};
