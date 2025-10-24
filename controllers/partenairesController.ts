import { API_URL } from "@/controllers/apiConfig";
import { Partenaire } from "@/models/partenaireModel/partenaireModel";
import { useEffect, useState } from "react";

export class PartenairesController {
  static async fetchPartenaires(): Promise<Partenaire[]> {
    const res = await fetch(`${API_URL}/partenaires`);
    if (!res.ok) throw new Error("Erreur API partenaires");
    return res.json();
  }
}

export const usePartenaires = () => {
  const [partenaires, setPartenaires] = useState<Partenaire[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getPartenaires = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const data = await PartenairesController.fetchPartenaires();
        setPartenaires(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getPartenaires();
  }, []);

  return { partenaires, isLoading, hasError };
};
