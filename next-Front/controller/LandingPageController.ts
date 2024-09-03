import {
  getCarrouselUrl,
  getFAQUrl,
  getHeroBlockUrl,
  getMapUrl,
  getPrincingUrl,
} from "@/lib/urlUtils";
import {
  FAQ,
  HeroBlock,
  Info,
  Map,
  POI,
  Princing,
  Programmation,
} from "@/models/blocks";
import axios from "axios";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { DataNotFoundError, DataValidationError } from "../lib/DataError";
import { BaseController } from "./BaseController";

class HeroBlockController extends BaseController<HeroBlock> {
  constructor(props: HeroBlock) {
    super({
      ...props,
      image: props.image
        ? {
            url: BaseController.constructImageURL(props.image)?.url || "",
            alternativeText: props.image.alternativeText || "",
          }
        : null, // Remplacer undefined par null
      section: props.section
        ? {
            ...props.section,
            image: props.section.image
              ? {
                  url:
                    BaseController.constructImageURL(props.section.image)
                      ?.url || "",
                  alternativeText: props.section.image.alternativeText || "",
                }
              : null, // Remplacer undefined par null
          }
        : null, // Remplacer undefined par null
    });
  }
}

class ProgramController extends BaseController<Programmation> {
  constructor(props: Programmation) {
    super({
      ...props,
      image:
        props.image && props.image.url
          ? {
              url: BaseController.constructImageURL(props.image)?.url || "",
              alternativeText: props.image.alternativeText || "",
            }
          : null, // Si pas d'image, retourne null
      image2:
        props.image2 && props.image2.url
          ? {
              url: BaseController.constructImageURL(props.image2)?.url || "",
              alternativeText: props.image2.alternativeText || "",
            }
          : null, // Si pas d'image, retourne null
    });
  }
}

class PrincingController extends BaseController<Princing> {
  constructor(props: Princing) {
    super({
      ...props,
      plan: props.plan.map((card) => ({
        ...card,
        services: card.services || [], // Assurer que services est un tableau
        button: card.button || null, // Assigner null si le lien est absent
      })),
    });
  }
}

class MapController extends BaseController<Map> {
  constructor(props: Map) {
    super({
      ...props,
      POI:
        props.POI?.map((poi: POI) => ({
          ...poi,
          Type: Array.isArray(poi.Type) ? poi.Type.join(", ") : poi.Type, // Normaliser en string
          Latitude: poi.Latitude ?? 48.8566,
          Longitude: poi.Longitude ?? 2.3522,
          Description: poi.Description ?? "",
        })) ?? [], // S'assurer que POI est toujours un tableau
    });
  }
}

class FAQController extends BaseController<FAQ> {
  constructor(props: FAQ) {
    super({
      ...props,
      questions: props.questions.map((question) => ({
        ...question,
      })),
    });
  }
}

class InfosController extends BaseController<Info> {
  constructor(props: Info) {
    super({
      ...props,
      carrousel: props.carrousel.map((card) => ({
        ...card,
        image: card.image
          ? {
              url: BaseController.constructImageURL(card.image)?.url || "",
              alternativeText: card.image.alternativeText || "",
            }
          : null,
      })),
    });
  }
}

export const getLandingPageData = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<{ [key: string]: any }>> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const urlParts = [
    getHeroBlockUrl(),
    getPrincingUrl(),
    getMapUrl(),
    getFAQUrl(),
    getCarrouselUrl(),
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
        if (block.__component === "blocks.hero") {
          const controller = new HeroBlockController(block);
          return controller.getModel();
        }
        if (block.__component === "blocks.programmation") {
          const controller = new ProgramController(block);
          return controller.getModel();
        }
        if (block.__component === "blocks.princing") {
          const controller = new PrincingController(block);
          return controller.getModel();
        }
        if (block.__component === "blocks.map") {
          const controller = new MapController(block);
          return controller.getModel();
        }
        if (block.__component === "blocks.faq") {
          const controller = new FAQController(block);
          return controller.getModel();
        }
        if (block.__component === "blocks.infos") {
          const controller = new InfosController(block);
          return controller.getModel();
        }

        return null;
      })
      .filter(Boolean);

    return {
      props: {
        blocks,
      },
    };
  } catch (error) {
    console.error("Error fetching landing page data:", error);

    if (
      error instanceof DataNotFoundError ||
      error instanceof DataValidationError
    ) {
      return {
        props: {
          blocks: [],
          error: error.message,
        },
      };
    }

    return {
      props: {
        blocks: [],
        error: "An unexpected error occurred",
      },
    };
  }
};
