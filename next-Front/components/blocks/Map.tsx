import React, { useEffect, useState } from "react";
import { Map as MapType } from "../../models/blocks";
import { Card } from "../ui/card";
import GoogleMapContainer from "./Map/GoogleMapContainer";
import MapFilters from "./Map/MapFilters";

interface MapProps {
  block: MapType;
}

const Map: React.FC<MapProps> = ({ block }) => {
  const { title, text, POI } = block;

  // Extraire les types de POI uniques du tableau POI de manière dynamique
  const uniquePOITypes = [...new Set(POI?.map((poi) => poi.Type))];

  // État initial pour les filtres : tous les types de POI sont cochés par défaut
  const [filters, setFilters] = useState<string[]>(uniquePOITypes);

  // Centre initial de la carte basé sur le premier POI
  const defaultCenter = POI?.[0]?.POI?.coordinates || {
    lat: 48.8566,
    lng: 2.3522,
  };

  // État pour gérer le centre et le zoom de la carte
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(20); // Zoom par défaut

  // Détecter si l'écran est mobile ou non et ajuster le zoom en conséquence
  useEffect(() => {
    const updateZoom = () => {
      if (window.innerWidth < 768) {
        setMapZoom(19.3); // Zoom plus faible pour mobile
      } else {
        setMapZoom(20); // Zoom plus important pour les écrans plus larges
      }
    };

    // Exécuter au montage et sur changement de taille de l'écran
    window.addEventListener("resize", updateZoom);
    updateZoom(); // Exécuter dès le premier chargement

    // Nettoyage de l'event listener lors du démontage
    return () => window.removeEventListener("resize", updateZoom);
  }, []);

  // Gérer le clic sur un marqueur pour zoomer
  const handleMarkerClick = (lat: number, lng: number) => {
    setMapCenter({ lat, lng });
    setMapZoom(21); // Zoomer sur le marqueur cliqué
  };

  // Gérer les changements de filtre
  const handleFilterChange = (type: string) => {
    setFilters(
      (prevFilters) =>
        prevFilters.includes(type)
          ? prevFilters.filter((filter) => filter !== type) // Décocher : retirer des filtres
          : [...prevFilters, type] // Cocher : ajouter aux filtres
    );
  };

  return (
    <div className="my-16">
      <div className="mb-4">
        <h1 className="mb-4 text-xl md:text-2xl">{title}</h1>
        <h2>{text}</h2>
      </div>

      {/* Affichage de la carte */}
      <Card className="max-w-4xl mx-auto size-full">
        <MapFilters
          uniquePOITypes={uniquePOITypes}
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
        <GoogleMapContainer
          POI={POI ?? []}
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
