import React from "react";

interface LoadingErrorProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
  fallbackData?: React.ReactNode;
}

export const LoadingError: React.FC<LoadingErrorProps> = ({
  loading,
  error,
  children,
  fallbackData,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="w-8 h-8 rounded-full border-b-2 border-blue-600 animate-spin"></div>
        <span className="ml-2 text-gray-600">Chargement...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Erreur de chargement
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>{error}</p>
              <p className="mt-1">Affichage des données par défaut.</p>
            </div>
          </div>
        </div>
        {fallbackData}
      </div>
    );
  }

  return <>{children}</>;
};
