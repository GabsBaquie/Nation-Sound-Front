import { useMapData } from "@/hooks/useApiData";

// Hook pour récupérer les données de la carte depuis l'API
export function useMapDataDynamic() {
  const { mapData, loading, error } = useMapData();

  return {
    mapData,
    loading,
    error,
    // Données de fallback en cas d'erreur
    fallbackMapData: {
      id: 1,
      __component: "blocks.map",
      title: "Plan du festival",
      text: "Retrouvez les principaux points d'intérêt du site pour vous repérer facilement.",
      POI: [
        {
          id: 1,
          Name: "Grande Scène",
          Type: "stage",
          Description: "La scène principale du festival.",
          POI: {
            address: "Parc de la Villette, Paris",
            coordinates: { lat: 48.8708, lng: 2.3785 },
          },
        },
        {
          id: 2,
          Name: "Scène Jazz Club",
          Type: "stage",
          Description: "Ambiance club pour les groupes de jazz.",
          POI: {
            address: "Allée du Jazz, Paris",
            coordinates: { lat: 48.8712, lng: 2.3791 },
          },
        },
        {
          id: 3,
          Name: "Bar Central",
          Type: "bar",
          Description: "Bar principal avec boissons et snacks.",
          POI: {
            address: "Place du Village, Paris",
            coordinates: { lat: 48.8705, lng: 2.3779 },
          },
        },
      ],
    },
  };
}
