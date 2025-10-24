import { useProgramData } from "@/hooks/useApiData";

// Hook pour récupérer les données de programmation depuis l'API
export function useProgramDataDynamic() {
  const { programData, loading, error } = useProgramData();

  return {
    programData,
    loading,
    error,
    // Données de fallback en cas d'erreur
    fallbackProgramData: [
      {
        id: 1,
        title: "Concert d'ouverture",
        performer: "Artiste Principal",
        time: "20:00",
        location: "Grande Scène",
        description: "Concert d'ouverture du festival",
        image: "/images/concert-ouverture.jpg",
        day: "2024-07-15",
        dayTitle: "Vendredi",
      },
      {
        id: 2,
        title: "Session Jazz",
        performer: "Jazz Quartet",
        time: "22:00",
        location: "Scène Jazz Club",
        description: "Session jazz intime",
        image: "/images/jazz-session.jpg",
        day: "2024-07-15",
        dayTitle: "Vendredi",
      },
    ],
  };
}
