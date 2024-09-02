import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";
import { Card } from "../ui/card";

interface MapProps {
  block: {
    title: string;
    text: string;
    POI?: Array<{
      id: number;
      Name: string;
      Type: string;
      Latitude: number;
      Longitude: number;
      Description: string;
    }>;
  };
}

const Map: React.FC<MapProps> = ({ block }) => {
  const { title, text, POI } = block;

  // Vérifiez si `POI` est défini et non vide, sinon utilisez une valeur par défaut
  const defaultCenter = {
    lat: POI && POI.length > 0 ? POI[0].Latitude : 48.8566, // Exemple: latitude de Paris
    lng: POI && POI.length > 0 ? POI[0].Longitude : 2.3522, // Exemple: longitude de Paris
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Google Maps API key is not defined in the environment variables"
    );
  }

  return (
    <div className="my-16">
      <div className="mb-4">
        <h1 className="mb-4 text-xl md:text-2xl">{title}</h1>
        <h2>{text}</h2>
      </div>

      <Card className="max-w-4xl mx-auto size-full">
        <LoadScript
          googleMapsApiKey={apiKey}
          loadingElement={<p>Loading...</p>}>
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={defaultCenter}
            zoom={12}>
            {POI &&
              POI.map((point) => (
                <Marker
                  key={point.id}
                  position={{
                    lat: point.Latitude,
                    lng: point.Longitude,
                  }}
                  label={point.Name}
                  title={point.Description}
                />
              ))}
          </GoogleMap>
        </LoadScript>
      </Card>
    </div>
  );
};

export default Map;
