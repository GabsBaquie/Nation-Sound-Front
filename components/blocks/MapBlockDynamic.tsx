import { useMapDataDynamic } from "@/components/blocks/data/mapDataDynamic";
import { LoadingError } from "@/components/common/LoadingError";
import React from "react";

interface MapBlockDynamicProps {
  // Props spécifiques au composant MapBlock
}

export const MapBlockDynamic: React.FC<MapBlockDynamicProps> = () => {
  const { mapData, loading, error, fallbackMapData } = useMapDataDynamic();

  return (
    <LoadingError
      loading={loading}
      error={error}
      fallbackData={
        <div className="map-container">
          <h2>{fallbackMapData.title}</h2>
          <p>{fallbackMapData.text}</p>
          {/* Rendu de la carte avec les données de fallback */}
          <div className="poi-list">
            {fallbackMapData.POI.map((poi) => (
              <div key={poi.id} className="poi-item">
                <h3>{poi.Name}</h3>
                <p>{poi.Description}</p>
                <span className="poi-type">{poi.Type}</span>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="map-container">
        <h2>{mapData.title}</h2>
        <p>{mapData.text}</p>
        {/* Rendu de la carte avec les données de l'API */}
        <div className="poi-list">
          {mapData.POI.map((poi) => (
            <div key={poi.id} className="poi-item">
              <h3>{poi.Name}</h3>
              <p>{poi.Description}</p>
              <span className="poi-type">{poi.Type}</span>
              <div className="coordinates">
                Lat: {poi.POI.coordinates.lat}, Lng: {poi.POI.coordinates.lng}
              </div>
            </div>
          ))}
        </div>
      </div>
    </LoadingError>
  );
};
