import {
  apiService,
  Concert,
  dataTransformers,
  POI,
  SecurityInfo,
} from "@/lib/api";
import { useEffect, useState } from "react";

// Hook pour récupérer les concerts
export function useConcerts() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getConcerts();
        setConcerts(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement des concerts"
        );
        console.error("Erreur useConcerts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  return { concerts, loading, error };
}

// Hook pour récupérer les POIs
export function usePOIs() {
  const [pois, setPOIs] = useState<POI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPOIs = async () => {
      try {
        setLoading(true);
        const data = await apiService.getPOIs();
        setPOIs(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement des POIs"
        );
        console.error("Erreur usePOIs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPOIs();
  }, []);

  return { pois, loading, error };
}

// Hook pour récupérer les infos de sécurité
export function useSecurityInfos() {
  const [securityInfos, setSecurityInfos] = useState<SecurityInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSecurityInfos = async () => {
      try {
        setLoading(true);
        const data = await apiService.getSecurityInfos();
        setSecurityInfos(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement des infos de sécurité"
        );
        console.error("Erreur useSecurityInfos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSecurityInfos();
  }, []);

  return { securityInfos, loading, error };
}

// Hook pour récupérer les données transformées pour la carte
export function useMapData() {
  const { pois, loading, error } = usePOIs();

  const mapData = {
    id: 1,
    __component: "blocks.map",
    title: "Plan du festival",
    text: "Retrouvez les principaux points d'intérêt du site pour vous repérer facilement.",
    POI: dataTransformers.transformPOIsForMap(pois),
  };

  return { mapData, loading, error };
}

// Hook pour récupérer les données transformées pour les alertes
export function useAlertsData() {
  const { securityInfos, loading, error } = useSecurityInfos();

  const alertsData =
    dataTransformers.transformSecurityInfosForAlerts(securityInfos);

  return { alertsData, loading, error };
}

// Hook pour récupérer les données de programmation
export function useProgramData() {
  const { concerts, loading, error } = useConcerts();

  const programData = dataTransformers.transformConcertsForProgram(concerts);

  return { programData, loading, error };
}
