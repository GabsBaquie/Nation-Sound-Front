import { About as AboutModel } from "@/models/aboutModel/aboutModel";
import axios from "axios";
import { GetServerSideProps } from "next";
import { BaseController } from "../BaseController";

export class AboutController extends BaseController<AboutModel> {
  private apiUrl: string;

  constructor() {
    super(null as unknown as AboutModel);
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  }

  async getAboutData(): Promise<AboutModel | null> {
    const fullUrl = `${this.apiUrl}/api/about`;

    try {
      const response = await axios.get(fullUrl);
      const about = response.data.data;

      if (!about) {
        throw new Error("No About found");
      }

      return about;
    } catch (error) {
      console.error("Failed to fetch About data:", error);
      return null;
    }
  }

  // Récupération des données côté serveur
  static getServerSideProps: GetServerSideProps = async () => {
    const controller = new AboutController();
    const about = await controller.getAboutData();

    if (!about) {
      return {
        notFound: true, // Redirige vers la page 404
      };
    }

    return {
      props: {
        about,
      },
    };
  };
}
