import { LoadingError } from "@/components/common/LoadingError";
import { Card } from "@/components/ui/card";
import { usePartenaires } from "@/controllers/partenairesController";
import Image from "next/image";

// Composant qui affiche les partenaires triés par type
const Partenaires = () => {
  const { partenaires, isLoading, hasError } = usePartenaires();
  const renderPartenaires = (partenaires: any[]) => {
    // Si partenaires est indéfini ou vide, renvoyer une section vide ou un message
    if (!partenaires || partenaires.length === 0) {
      return (
        <div className="px-12 pt-20 mx-auto mb-10 text-center md:pt-0 md:pr-8 md:ml-20 lg:px-24">
          <h1 className="mb-6 text-2xl font-bold md:text-3xl">Partenaires</h1>
          <div className="py-8 text-center">
            <p className="text-gray-500">Aucun partenaire trouvé</p>
          </div>
        </div>
      );
    }

    // Grouper les partenaires par type
    const groupedPartenaires = partenaires.reduce((acc: any, partenaire) => {
      if (!acc[partenaire.type]) {
        acc[partenaire.type] = [];
      }
      acc[partenaire.type].push(partenaire);
      return acc;
    }, {});

    return (
      <div className="px-12 pt-20 mx-auto mb-10 text-center md:pt-0 md:pr-8 md:ml-20 lg:px-24">
        <h1 className="mb-6 text-2xl font-bold md:text-3xl">Partenaires</h1>

        {Object.keys(groupedPartenaires).map((type) => (
          <div key={type}>
            <h2 className="mt-8 mb-4 text-lg font-semibold md:text-2xl">
              {type}
            </h2>
            <Card className="py-6 max-w-full bg-primary">
              <ul className="flex justify-around items-center">
                {groupedPartenaires[type].map((partenaire: any) => (
                  <li key={partenaire.id}>
                    <Image
                      width={100}
                      height={100}
                      src={
                        partenaire.logo?.url ||
                        "/images/partner-placeholder.png"
                      }
                      alt={
                        partenaire.logo?.alternativeText ||
                        partenaire.name ||
                        "Partenaire"
                      }
                      className="w-20 h-auto md:w-28"
                    />
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    );
  };

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
