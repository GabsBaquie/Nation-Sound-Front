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
            return null;
        }
      })
      .filter(Boolean);

    // Retourne un objet compatible avec GetServerSideProps
    return {
      props: { blocks },
    };
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    return {
      props: {
        blocks: [],
        error:
          error instanceof DataNotFoundError ||
          error instanceof DataValidationError
            ? error.message
            : "An unexpected error occurred",
      },
    };
  }
};

// Utilisation dans getServerSideProps
export const getServerSideProps: GetServerSideProps = async () => {
  const landingPageData = await getLandingPageData();
  return landingPageData; // Retourne le résultat de la fonction
};
