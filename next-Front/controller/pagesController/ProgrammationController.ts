import axios from "axios";
import { GetServerSideProps } from "next";
import { BaseController } from "../BaseController";

export class ProgrammationController extends BaseController<any> {
  private apiUrl: string;

  constructor() {
    super(null); // Pas de modèle spécifié
    this.apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://strapi-sound.up.railway.app";
  }

  // Méthode pour récupérer les données de la programmation
  async getProgrammationData() {
    const fullUrl = `${this.apiUrl}/api/programmation?populate=days,days.concert,days.concert.image`;

    console.log("Fetching Programmation data from:", fullUrl);

    try {
      const response = await axios.get(fullUrl);
      let programmation = response.data.data;

      if (!programmation) {
        console.log("No programmation data found.");
        throw new Error("No programmation found");
      }

      // Fonction pour compléter les URLs des images
      programmation = this.completeImageUrls(programmation);

      return programmation;
    } catch (error) {
      console.error("Failed to fetch programmation data:", error);
      return null;
    }
  }

  // Méthode pour compléter les URLs des images
  private completeImageUrls(programmation: any) {
    const baseUrl = this.apiUrl;

    programmation.days.forEach((day: any) => {
      day.concert.forEach((concert: any) => {
        if (concert.image && concert.image.url.startsWith("/")) {
          // Si l'URL de l'image est relative, on la complète
          concert.image.url = `${baseUrl}${concert.image.url}`;
        }
      });
    });

    return programmation;
  }

  // Récupération des données côté serveur
  static getServerSideProps: GetServerSideProps = async () => {
    const controller = new ProgrammationController();
    const programmation = await controller.getProgrammationData();

    if (!programmation) {
      return {
        props: {
          error: "Failed to fetch programmation data",
        },
      };
    }

    return {
      props: {
        programmation,
      },
    };
  };
}
