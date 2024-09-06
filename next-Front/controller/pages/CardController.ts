import { slugify } from "@/lib/slugify";
import { Image } from "@/models/blocks"; // Assure-toi que le type Image est bien importé
import axios from "axios";
import { BaseController } from "../BaseController";

interface CarrouselItem {
  title: string;
  image?: Image;
}

export class CardController extends BaseController<{
  carrousel: CarrouselItem[];
}> {
  private apiUrl: string =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  constructor() {
    super({ carrousel: [] });
  }

  // Méthode pour récupérer les blocs avec une logique partagée
  private async fetchBlocks(
    blockType: string,
    populateFields: string
  ): Promise<CarrouselItem[]> {
    const fullUrl = `${this.apiUrl}/api/landing-pages?populate[blocks][populate]=${populateFields}`;
    try {
      const { data } = await axios.get(fullUrl);
      const blockData = data.data[0]?.blocks.find(
        (block: any) => block.__component === blockType
      )?.carrousel;
      return (
        blockData?.map((item: CarrouselItem) => ({
          ...item,
          image: item.image
            ? BaseController.constructImageURL(item.image)
            : null,
        })) || []
      );
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Récupère les chemins des éléments du carrousel
  async getPaths() {
    try {
      const carrousel = await this.fetchBlocks(
        "blocks.infos",
        "carrousel,carrousel.image"
      );
      return carrousel.map((info) => ({
        params: { slug: slugify(info.title) },
      }));
    } catch (error) {
      console.error("Error fetching paths:", error);
      return [];
    }
  }

  // Récupère les données d'une carte spécifique en fonction du slug
  async getCardData(slug: string) {
    try {
      const carrousel = await this.fetchBlocks(
        "blocks.infos",
        "carrousel,carrousel.image"
      );
      const card = carrousel.find((item) => slugify(item.title) === slug);
      return card
        ? { card, error: null }
        : { card: null, error: "Card not found" };
    } catch (error) {
      return { card: null, error: "Failed to fetch card data" };
    }
  }
}
