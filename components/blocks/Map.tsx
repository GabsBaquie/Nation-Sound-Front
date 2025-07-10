import { MapPOI, usePOIs } from "@/controllers/mapController";
import { useEffect, useMemo, useState } from "react";
import { Card } from "../ui/card";
import GoogleMapContainer from "./Map/GoogleMapContainer";
import MapFilters from "./Map/MapFilters";

const getCenterOfPOIs = (pois: MapPOI[]): { lat: number; lng: number } => {
  if (!pois.length) return { lat: 48.8566, lng: 2.3522 };
  const sum = pois.reduce<{
    lat: number;
    lng: number;
  }>(
    (acc, poi) => {
      acc.lat += poi.POI.coordinates.lat;
      acc.lng += poi.POI.coordinates.lng;
      return acc;
    },
    { lat: 0, lng: 0 }
  );
  return {
    lat: sum.lat / pois.length,
    lng: sum.lng / pois.length,
  };
};

const Map = () => {
  const { pois, isLoading, hasError } = usePOIs();

  // Extraire les types de POI uniques du tableau POI de manière dynamique
  const uniquePOITypes = useMemo(
    () =>
      [
        ...new Set((pois as MapPOI[]).map((poi: MapPOI) => poi.Type)),
      ] as string[],
    [pois]
  );

  // État initial pour les filtres : tous les types de POI sont cochés par défaut
  const [filters, setFilters] = useState<string[]>(uniquePOITypes);

  // POIs filtrés selon les filtres actifs
  const filteredPOIs = useMemo(
    () =>
      (pois as MapPOI[]).filter((poi: MapPOI) => filters.includes(poi.Type)),
    [pois, filters]
  );

  // Centre dynamique basé sur les POIs filtrés
  const center = useMemo(() => getCenterOfPOIs(filteredPOIs), [filteredPOIs]);
  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(20);

  // Met à jour les filtres si les types changent (quand les POIs arrivent)
  useEffect(() => {
    setFilters(uniquePOITypes);
  }, [uniquePOITypes.length]);

  // Recentrer la carte quand les POIs filtrés changent
  useEffect(() => {
    setMapCenter(center);
  }, [center.lat, center.lng]);

  // Détecter si l'écran est mobile ou non et ajuster le zoom en conséquence
  useEffect(() => {
    const updateZoom = () => {
      setMapZoom(window.innerWidth < 768 ? 18.3 : 18);
    };
    window.addEventListener("resize", updateZoom);
    updateZoom();
    return () => window.removeEventListener("resize", updateZoom);
  }, []);

  const handleMarkerClick = (lat: number, lng: number) => {
    setMapCenter({ lat, lng });
    setMapZoom(21);
  };

  const handleFilterChange = (type: string) => {
    setFilters((prevFilters) =>
      prevFilters.includes(type)
        ? prevFilters.filter((filter) => filter !== type)
        : [...prevFilters, type]
    );
  };

  if (isLoading)
    return <div className="text-center">Chargement de la carte...</div>;
  if (hasError)
    return (
      <div className="text-center text-red-500">
        Erreur lors du chargement des POIs
      </div>
    );

  return (
    <div className="mx-auto my-16 max-w-4xl">
      <div className="mb-4">
        <h2 className="mb-4 text-xl md:text-2xl">Plan du festival</h2>
      </div>
      <Card className="mx-auto max-w-4xl size-full">
        <MapFilters
          uniquePOITypes={uniquePOITypes}
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
        <GoogleMapContainer
          POI={pois}
          filters={filters}
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          handleMarkerClick={handleMarkerClick}
        />
      </Card>
    </div>
  );
};

export default Map;
