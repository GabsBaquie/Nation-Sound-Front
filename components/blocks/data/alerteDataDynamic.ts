import { useAlertsData } from "@/hooks/useApiData";

// Hook pour récupérer les données d'alertes depuis l'API
export function useAlertsDataDynamic() {
  const { alertsData, loading, error } = useAlertsData();

  return {
    alertsData,
    loading,
    error,
    // Données de fallback en cas d'erreur
    fallbackAlertsData: [
      {
        id: "1",
        title: "Alerte Météo : Orage Imminent",
        description:
          "Un orage est prévu dans la zone du festival dans les prochaines heures. Veuillez vous diriger vers les abris prévus pour votre sécurité",
        urgence: true,
        actif: true,
      },
      {
        id: "2",
        title: "Problème de Sécurité : Évacuation en cours",
        description:
          "En raison d'un incident, une évacuation est en cours dans la zone du concert principal. Veuillez suivre les instructions du personnel de sécurité",
        urgence: true,
        actif: true,
      },
    ],
  };
}
