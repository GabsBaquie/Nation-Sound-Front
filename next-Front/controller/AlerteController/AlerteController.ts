import { Alerte } from '@/models/alertesModel/alerteModel';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { BaseController } from '../BaseController';

export class AlerteController extends BaseController<Alerte> {
  private apiUrl: string;

  constructor() {
    super(null as unknown as Alerte);
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  }

  async getAlertesData(): Promise<Alerte[] | null> {
    const fullUrl = `${this.apiUrl}/api/alertes/actives`;

    try {
      const response = await axios.get(fullUrl);
      const alertes = response.data;

      if (!alertes) {
        throw new Error('No alertes found');
      }

      return alertes;
    } catch (error) {
      console.error('Failed to fetch alertes data:', error);
      return null;
    }
  }

  // Récupération des données côté serveur
  static getServerSideProps: GetServerSideProps = async () => {
    const controller = new AlerteController();
    const alertes = await controller.getAlertesData();

    if (!alertes) {
      return {
        notFound: true, // Redirige vers la page 404
      };
    }

    return {
      props: {
        alertes,
      },
    };
  };

  // Récupération des données initiales pour toutes les pages
  static async getInitialProps() {
    const controller = new AlerteController();
    const alertes = await controller.getAlertesData();
    return { alertes };
  }
}
