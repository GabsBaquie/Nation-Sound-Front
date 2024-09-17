import { DataNotFoundError, DataValidationError } from "@/lib/DataError";
import {
  getCarrouselUrl,
  getFAQUrl,
  getFooterUrl,
  getHeroBlockUrl,
  getMapUrl,
  getPartenaireUrl,
  getPrincingUrl,
} from "@/lib/urlUtils";
import axios from "axios";
import { GetServerSideProps } from "next";
import {
  FAQController,
  FooterController,
  HeroBlockController,
  InfosController,
  MapController,
  PartenaireController,
  PrincingController,
  ProgramController,
} from "../BlocksController";

// Fonction getLandingPageData
export const getLandingPageData = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const urlParts = [
    getHeroBlockUrl(),
    getPrincingUrl(),
    getMapUrl(),
    getFAQUrl(),
    getCarrouselUrl(),
    getFooterUrl(),
    getPartenaireUrl(),
  ];

  const fullUrl = `${apiUrl}/api/landing-pages?populate[blocks][populate]=${urlParts.join(",")}`;

  try {
    const res = await axios.get(fullUrl);
    const landingPage = res.data.data[0];

    if (!landingPage) {
      throw new DataNotFoundError("Landing page data not found");
    }

    if (!landingPage.blocks) {
      throw new DataValidationError("Landing page data is invalid");
    }

    const blocks = landingPage.blocks
      .map((block: any) => {
        try {
          switch (block.__component) {
            case "blocks.hero":
              return new HeroBlockController(block).getModel();
            case "blocks.programmation":
              return new ProgramController(block).getModel();
            case "blocks.princing":
              return new PrincingController(block).getModel();
            case "blocks.map":
              return new MapController(block).getModel();
            case "blocks.faq":
              return new FAQController(block).getModel();
            case "blocks.infos":
              return new InfosController(block).getModel();
            case "blocks.partenaire":
              return new PartenaireController(block).getModel();
            case "blocks.footer":
              return new FooterController(block).getModel();
            default:
              console.warn(`Composant non reconnu: ${block.__component}`);
              return null;
          }
        } catch (error) {
          console.error(
            `Erreur lors du traitement du bloc ${block.__component}:`,
            error
          );
          return null; // On ignore ce bloc si une erreur survient
        }
      })
      .filter(Boolean); // Filtrer les valeurs nulles

    // Retourne un objet compatible avec GetServerSideProps
    return {
      props: { blocks },
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de la landing page:",
      error
    );
    return {
      props: {
        blocks: [],
        error:
          error instanceof DataNotFoundError ||
          error instanceof DataValidationError
            ? error.message
            : "Une erreur inattendue s'est produite",
      },
    };
  }
};

// Utilisation dans getServerSideProps
export const getServerSideProps: GetServerSideProps = async () => {
  const landingPageData = await getLandingPageData();

  if (landingPageData.props.error) {
    return {
      notFound: true, // Redirige vers la page 404
    };
  }

  return landingPageData; // Retourne le résultat de la fonction
};
