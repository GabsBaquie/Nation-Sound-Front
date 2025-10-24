import { API_URL } from "@/controllers/apiConfig";
import { Actualite } from "@/models/types";
import { useEffect, useState } from "react";

export class ActualitesController {
  static async fetchActualites(): Promise<Actualite[]> {
    const res = await fetch(`${API_URL}/actualites`);
    if (!res.ok) throw new Error("Erreur API actualités");
    return res.json();
  }

  static async fetchActualiteById(id: string): Promise<Actualite> {
    const res = await fetch(`${API_URL}/actualites/${id}`);
    if (!res.ok) throw new Error("Erreur API actualité");
    return res.json();
  }
}

export const useActualites = () => {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getActualites = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const data = await ActualitesController.fetchActualites();
        setActualites(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getActualites();
  }, []);

  return { actualites, isLoading, hasError };
};
