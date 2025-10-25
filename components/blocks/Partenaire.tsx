import ScrollInfinityX from "@/components/animation/scrollInfinityX";
import { LoadingError } from "@/components/common/LoadingError";
import { usePartenaires } from "@/controllers/partenairesController";
import { Partenaire } from "@/models/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Partenaires: React.FC = () => {
  const { partenaires, isLoading, hasError } = usePartenaires();
  const renderPartenaires = (partenaires: Partenaire[]) => (
    <div className="overflow-hidden mx-auto my-6 text-center md:max-w-4xl xl:max-w-6xl">
      <h1 className="mb-4 text-2xl">Nos Partenaires</h1>
      <div className="relative">
        {partenaires.length > 0 ? (
          <ScrollInfinityX>
            <Link href="/Partenaires">
              <div className="flex justify-around items-center">
                {partenaires.map((partenaire, index) => (
                  <div key={partenaire.id || index}>
                    <Image
                      src={
                        partenaire.image || "/images/partner-placeholder.png"
                      }
                      alt={
                        partenaire.logo_alt || partenaire.name || "Partenaire"
                      }
                      width={95}
                      height={95}
                      className="max-w-[60px] mx-2 md:max-w-md md:mx-7"
                      onError={(e) => {
                        console.warn(
                          `Failed to load image for partner ${partenaire.id}`
                        );
                        if (
                          e.currentTarget.src !==
                          "/images/partner-placeholder.png"
                        ) {
                          e.currentTarget.src =
                            "/images/partner-placeholder.png";
                        } else {
                          e.currentTarget.style.display = "none";
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </Link>
          </ScrollInfinityX>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">Aucun partenaire disponible</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <LoadingError
      loading={isLoading}
      error={hasError ? "Erreur lors du chargement des partenaires" : null}
      fallbackData={renderPartenaires(partenaires)}
    >
      {renderPartenaires(partenaires)}
    </LoadingError>
  );
};

export default Partenaires;
