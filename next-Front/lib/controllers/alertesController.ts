import { API_URL } from "@/lib/controllers/apiConfig";
import { Alerte } from "@/models/alertesModel/alerteModel";
import { useEffect, useState } from "react";

export class AlertesController {
  static async fetchAlertes(): Promise<Alerte[]> {
    const res = await fetch(`${API_URL}/api/securityInfos`);
    if (!res.ok) throw new Error("Erreur API alertes");
    return res.json();
  }
}

export const useAlertes = () => {
  const [alertes, setAlertes] = useState<Alerte[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getAlertes = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const data = await AlertesController.fetchAlertes();
        setAlertes(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getAlertes();
  }, []);

  return { alertes, isLoading, hasError };
};
