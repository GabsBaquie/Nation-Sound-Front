import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

interface MapFiltersProps {
  uniquePOITypes: string[];
  filters: string[];
  handleFilterChange: (type: string) => void;
}

const MapFilters: React.FC<MapFiltersProps> = ({
  uniquePOITypes,
  filters,
  handleFilterChange,
}) => {
  // État pour ouvrir/fermer le menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour basculer le menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="absolute z-30">
      {/* Bouton pour ouvrir/fermer le menu */}
      <button
        onClick={toggleMenu}
        className="z-40 p-2 text-lg font-extrabold rounded-md lg:hidden" // Visible seulement en mobile
      >
        {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      {/* Le menu de filtres, masqué ou affiché en fonction de l'état */}
      <div
        className={`absolute z-30 p-4 text-xs rounded-md shadow-md bg-secondary sm:max-w-xs md:max-w-sm mx-4 lg:mx-6 my-4 lg:my-16 sm:text-sm md:text-base transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        } lg:block`} // Masquer en mobile quand fermé
      >
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
    </div>
  );
};

export default MapFilters;
