import { POI as POIType } from "@/models/mapModel/mapModel"; // Assurez-vous d'importer le type POI
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";

interface GoogleMapContainerProps {
  POI: POIType[];
  filters: string[];
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  handleMarkerClick: (lat: number, lng: number) => void;
}

const GoogleMapContainer: React.FC<GoogleMapContainerProps> = ({
  POI,
  filters,
  mapCenter,
  mapZoom,
  handleMarkerClick,
}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

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
    <LoadScript
      googleMapsApiKey={apiKey}
      loadingElement={<p>Chargement de la map...</p>}>
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        center={mapCenter}
        zoom={mapZoom}
        options={{
          mapTypeControl: false,
          styles: mapStyles, // Désactivation des POI intégrés
        }}>
        {/* Filtrer les POI par les filtres sélectionnés et afficher les marqueurs */}
        {POI?.filter((point) => filters.includes(point.Type)).map((point) => {
          const { lat, lng } = point.POI?.coordinates || {};
          return lat && lng ? (
            <Marker
              key={point.id}
              position={{ lat, lng }}
              label={{ text: point.Name, color: "black", fontWeight: "bold" }}
              title={point.Description || point.Name}
              onClick={() => handleMarkerClick(lat, lng)}
            />
          ) : null;
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapContainer;
