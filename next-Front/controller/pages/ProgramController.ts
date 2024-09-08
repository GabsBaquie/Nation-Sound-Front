import { slugify } from "@/lib/slugify";
import { getProgramUrl } from "@/lib/urlUtils";
import axios from "axios";
import { BaseController } from "../BaseController";
import { GetServerSideProps } from "next";

export class ProgramController extends BaseController<{ program: any }> {
  private apiUrl: string = process.env.NEXT_PUBLIC_API_URL || "";

  constructor() {
    super({ program: null });
  }

  private async fetchLandingPageData() {
    const fullUrl = `${this.apiUrl}/api/landing-pages?populate[blocks][populate]=${getProgramUrl()}`;

    try {
      const res = await axios.get(fullUrl);
      const blocks = res.data.data[0]?.blocks;
      if (!blocks) throw new Error("Blocks data is missing");

      const programmation = blocks.find(
        (block: any) => block.__component === "blocks.programmation"
      );
      if (!programmation) throw new Error("Programmation block is missing");

      return programmation;
    } catch (error) {
      console.error("Error fetching landing page data:", error);
      throw error;
    }
  }

  async getPaths() {
    try {
      const programmation = await this.fetchLandingPageData();
      return programmation.card.map((card: any) => ({
        params: { slug: slugify(card.title) },
      }));
    } catch (error) {
      console.error("Error fetching paths:", error);
      return [];
    }
  }

  async getProgramData(slug: string) {
    try {
      const programmation = await this.fetchLandingPageData();
      const card = programmation.card.find(
        (item: any) => slugify(item.title) === slug
      );
      if (!card) return { program: null, error: "Program not found" };

      return {
        program: {
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
      console.error("Error fetching program data:", error);
      return { program: null, error: "Failed to fetch program data" };
    }
  }

  // Récupération des données côté serveur
  static getServerSideProps: GetServerSideProps = async ({ params }) => {
    const controller = new ProgramController();
    const data = await controller.getProgramData(params?.slug as string);

    if (!data.program) {
      return {
        props: {
          error: "Failed to fetch program data",
        },
      };
    }

    return {
      props: data,
    };
  };
}
