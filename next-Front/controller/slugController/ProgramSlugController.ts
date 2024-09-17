import { slugify } from "@/lib/slugify";
import { getProgramUrl } from "@/lib/urlUtils";
import axios from "axios";
import { GetServerSideProps } from "next";
import { BaseController } from "../BaseController";

export class ProgramSlugController extends BaseController<{ program: any }> {
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

  // Récupération des chemins
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

  // Récupération des données du programme
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
          // Ajout des jours et concerts associés
          days: card.days.map((day: any) => ({
            title: day.title,
            date: day.date,
            concert: day.concert.map((concert: any) => ({
              title: concert.title,
              description: concert.description,
              heure: concert.heure,
              lieu: concert.lieu,
              image: concert.image
                ? {
                    url:
                      BaseController.constructImageURL(concert.image)?.url ||
                      "",
                    alternativeText: concert.image.alternativeText || "",
                  }
                : null,
            })),
          })),
        },
      };
    } catch (error) {
      console.error("Error fetching program data:", error);
      return { program: null, error: "Failed to fetch program data" };
    }
  }

  // Récupération des données côté serveur
  static getServerSideProps: GetServerSideProps = async ({ params }) => {
    const controller = new ProgramSlugController();
    const data = await controller.getProgramData(params?.slug as string);

    // Si aucune donnée de programme n'est trouvée, renvoyer une 404
    if (!data.program) {
      return {
        notFound: true, // Afficher la page 404 si les données ne sont pas trouvées
      };
    }

    return {
      props: data, // Renvoie les données du programme comme props si elles existent
    };
  };
}
