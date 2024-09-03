// next-Front/controller/CardController.ts
import axios from "axios";
import { slugify } from "../lib/slugify";
import { BaseController } from "./BaseController";

export class CardController extends BaseController<{ carrousel: any[] }> {
  private apiUrl: string;

  constructor() {
    super({ carrousel: [] });
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  }

  async getPaths() {
    try {
      const res = await axios.get(
        `${this.apiUrl}/api/landing-pages?populate%5Bblocks%5D%5Bpopulate%5D=carrousel,carrousel.image`
      );
      const infos = res.data.data[0]?.blocks.find(
        (block: any) => block.__component === "blocks.infos"
      )?.carrousel;

      if (!infos) {
        throw new Error("Carrousel data is undefined");
      }

      return infos.map((info: any) => ({
        params: { slug: slugify(info.title) },
      }));
    } catch (error) {
      console.error("Error fetching paths from API:", error);
      return [];
    }
  }

  async getCardData(slug: string) {
    try {
      const res = await axios.get(
        `${this.apiUrl}/api/landing-pages?populate%5Bblocks%5D%5Bpopulate%5D=carrousel,carrousel.image`
      );
      const carrousel = res.data.data[0]?.blocks.find(
        (block: any) => block.__component === "blocks.infos"
      )?.carrousel;

      if (!carrousel) {
        throw new Error("Carrousel data is undefined");
      }

      const card = carrousel.find((item: any) => slugify(item.title) === slug);

      if (!card) {
        return {
          card: null,
          error: "Card not found",
        };
      }

      return {
        card: {
          ...card,
          image: card.image
            ? {
                url: BaseController.constructImageURL(card.image)?.url || "",
                alternativeText: card.image.alternativeText || "",
              }
            : null,
        },
      };
    } catch (error) {
      console.error("Error fetching card data from API:", error);
      return {
        card: null,
        error: "Failed to fetch card data",
      };
    }
  }
}
