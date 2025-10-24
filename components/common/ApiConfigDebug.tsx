import { useApiConfig } from "@/hooks/useApiConfig";
import React from "react";

interface ApiConfigDebugProps {
  showInProduction?: boolean;
}

export const ApiConfigDebug: React.FC<ApiConfigDebugProps> = ({
  showInProduction = false,
}) => {
  const { apiUrl, isLocal, isProduction, error } = useApiConfig();

  // Ne pas afficher en production sauf si explicitement demandé
  if (isProduction && !showInProduction) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg text-xs max-w-sm z-50">
      <h4 className="font-bold mb-2">🔧 Configuration API</h4>
      <div className="space-y-1">
        <div>
          <span className="text-gray-300">URL:</span>{" "}
          <span className="text-blue-300">{apiUrl}</span>
        </div>
        <div>
          <span className="text-gray-300">Local:</span>{" "}
          <span className={isLocal ? "text-green-300" : "text-red-300"}>
            {isLocal ? "✅ Oui" : "❌ Non"}
          </span>
        </div>
        <div>
          <span className="text-gray-300">Production:</span>{" "}
          <span className={isProduction ? "text-green-300" : "text-red-300"}>
            {isProduction ? "✅ Oui" : "❌ Non"}
          </span>
        </div>
        {error && (
          <div className="text-red-300">
            <span className="text-gray-300">Erreur:</span> {error}
          </div>
        )}
      </div>
    </div>
  );
};
