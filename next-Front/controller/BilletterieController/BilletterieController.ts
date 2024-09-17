import { Billetterie } from "@/models/BilletterieModel/BilletterieModel"; // On importe le type Billetterie
import axios from "axios";
import { GetServerSideProps } from "next";
import { BaseController } from "../BaseController";

export class BilletterieController extends BaseController<Billetterie> {
  private apiUrl: string;

  constructor() {
    super(null as unknown as Billetterie);
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  }

  async getBilletterieData() {
    const fullUrl = `${this.apiUrl}/api/billetterie?populate=landing_page.blocks,landing_page.blocks.plan,landing_page.blocks.plan.services,landing_page.blocks.plan.button`;

    try {
      const response = await axios.get(fullUrl);
      const billetterie = response.data.data;

      if (!billetterie) {
        throw new Error("No billetterie found");
      }

      return billetterie;
    } catch (error) {
      console.error("Failed to fetch billetterie data:", error);
      return null;
    }
  }

  // Récupération des données côté serveur
  static getServerSideProps: GetServerSideProps = async () => {
    const controller = new BilletterieController();
    const billetterie = await controller.getBilletterieData();

    if (!billetterie) {
      return {
        notFound: true, // Redirige vers la page 404
      };
    }

    return {
      props: {
        billetterie,
      },
    };
  };
}
