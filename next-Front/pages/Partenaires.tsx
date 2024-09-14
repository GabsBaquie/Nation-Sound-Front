import { Card } from "@/components/ui/card";
import { PartenaireController } from "@/controller/pagesController/PartenairesController";
import { Partenaire as PartenairePage } from "@/models/PartenairePageModel";
import { GetServerSideProps } from "next";
import Image from "next/image";

// Définir le type des props pour la page des partenaires
type PartenaireProps = {
  partenaires: PartenairePage[];
};

// Composant qui affiche les partenaires triés par type
const Partenaire = ({ partenaires }: PartenaireProps) => {
  // Si partenaires est indéfini ou vide, renvoyer une section vide ou un message
  if (!partenaires || partenaires.length === 0) {
    return <div>Aucun partenaire trouvé</div>;
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
          <Card className="max-w-full py-6 bg-primary">
            <ul className="flex items-center justify-around">
              {groupedPartenaires[type].map((partenaire: PartenairePage) => (
                <li key={partenaire.id}>
                  <Image
                    width={100}
                    height={100}
                    src={partenaire.logo?.url || ""}
                    alt={partenaire.logo?.alternativeText || ""}
                    className="w-20 h-auto md:w-28 "
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

// Utilisation de la méthode getServerSideProps pour récupérer les données côté serveur
export const getServerSideProps: GetServerSideProps =
  PartenaireController.getServerSideProps;

export default Partenaire;
