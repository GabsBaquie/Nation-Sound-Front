import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
import { Map as MapType } from "../../models/blocks";
import { Card } from "../ui/card";

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

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // État pour le centre de la carte et le niveau de zoom
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(20); // Niveau de zoom par défaut

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

  if (!apiKey) {
    throw new Error(
      "La clé API Google Maps n'est pas définie dans les variables d'environnement"
    );
  }

  // Style pour désactiver les POI intégrés de Google Maps
  const mapStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  return (
    <div className="my-16">
      <div className="mb-4">
        <h1 className="mb-4 text-xl md:text-2xl">{title}</h1>
        <h2>{text}</h2>
      </div>

      {/* Affichage de la carte */}
      <Card className="max-w-4xl mx-auto size-full">
        {/* Interface utilisateur des filtres */}
        <div className="absolute z-50 max-w-sm p-4 mx-6 my-16 mb-4 rounded-md shadow-md bg-secondary">
          <div className="flex flex-col space-y-2">
            {uniquePOITypes.map((poiType) => (
              <label key={poiType} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={filters.includes(poiType)}
                  onChange={() => handleFilterChange(poiType)}
                  className="form-checkbox"
                />
                <span className="ml-2">{poiType}</span>
              </label>
            ))}
          </div>
        </div>

        <LoadScript
          googleMapsApiKey={apiKey}
          loadingElement={<p>Chargement de la carte...</p>}>
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={mapCenter}
            zoom={mapZoom}
            options={{
              mapTypeControl: false,
              styles: mapStyles, // Désactivation des POI intégrés
            }}>
            {/* Filtrer les POI par les filtres sélectionnés et afficher les marqueurs */}
            {POI?.filter((point) => filters.includes(point.Type)).map(
              (point) => {
                const { lat, lng } = point.POI?.coordinates || {};
                return lat && lng ? (
                  <Marker
                    key={point.id}
                    position={{ lat, lng }}
                    label={{
                      text: point.Name,
                      color: "black",
                      fontWeight: "bold",
                    }}
                    title={point.Description || point.Name}
                    onClick={() => handleMarkerClick(lat, lng)} // Définir le centre de la carte et zoomer sur clic
                  />
                ) : null;
              }
            )}
          </GoogleMap>
        </LoadScript>
      </Card>
    </div>
  );
};

export default Map;
