import "@/app/globals.css";
import GenericCard from "@/components/ui/GenericCard";
import { ActualitesController } from "@/controllers/actualitesController";
import { Actualite } from "@/models/actualitesModel/actualiteModel";
import { GetServerSideProps } from "next";

interface CardPageProps {
  actualite: Actualite | null;
  error?: string;
}

const CardPage: React.FC<CardPageProps> = ({ actualite, error }) => {
  if (error) {
    return (
      <div className="pt-20 md:ml-20 md:pt-0">
        <div className="text-center text-red-500">
          <p>Erreur: {error}</p>
        </div>
      </div>
    );
  }

  if (!actualite) {
    return (
      <div className="pt-20 md:ml-20 md:pt-0">
        <div className="text-center">
          <p>Actualité non trouvée</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pt-20 md:ml-20 md:pt-0">
        <GenericCard
          title={actualite.title}
          text={actualite.description}
          image={
            actualite.image
              ? {
                  url: actualite.image.url,
                  alternativeText:
                    actualite.image.alternativeText || actualite.title,
                }
              : undefined
          }
        />
        {actualite.content && (
          <div className="mt-6">
            <div className="max-w-none prose">
              <p className="whitespace-pre-wrap">{actualite.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  try {
    const slug = params?.slug as string;

    if (!slug) {
      return {
        props: {
          actualite: null,
          error: "ID d'actualité manquant",
        },
      };
    }

    const actualite = await ActualitesController.fetchActualiteById(slug);

    return {
      props: {
        actualite,
      },
    };
  } catch (error) {
    console.error("Erreur lors du chargement de l'actualité:", error);
    return {
      props: {
        actualite: null,
        error: "Erreur lors du chargement de l'actualité",
      },
    };
  }
};

export default CardPage;
