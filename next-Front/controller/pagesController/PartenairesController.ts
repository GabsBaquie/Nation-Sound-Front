import { Partenaire } from "@/models/PartenairePageModel"; // On importe le type Partenaire
import axios from "axios";
import { GetServerSideProps } from "next";
import { BaseController } from "../BaseController";

export class PartenaireController extends BaseController<Partenaire> {
  private apiUrl: string;

  constructor() {
    super(null as unknown as Partenaire);
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  }

  async getPartenaireData() {
    const fullUrl = `${this.apiUrl}/api/partenaires?populate=*`;

    try {
      const response = await axios.get(fullUrl);
      const partenaires = response.data.data;

      if (!partenaires) {
        throw new Error("No partenaires found");
      }

      // Construction correcte des URLs des logos
      return partenaires.map((partenaire: any) => ({
        ...partenaire,
        logo: partenaire.logo
          ? PartenaireController.constructImageURL(partenaire.logo)
          : null,
      }));
    } catch (error) {
      console.error("Failed to fetch partenaires data:", error);
      return null;
    }
  }

  // Récupération des données côté serveur
  static getServerSideProps: GetServerSideProps = async () => {
    const controller = new PartenaireController();
    const partenaires = await controller.getPartenaireData();

    console.log("Partenaires:", partenaires);

    if (!partenaires) {
      return {
        props: {
          error: "Failed to fetch partenaires data",
        },
      };
    }

    return {
      props: {
        partenaires,
      },
    };
  };
}
