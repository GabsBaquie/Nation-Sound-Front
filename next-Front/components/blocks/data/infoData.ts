import { Info } from "@/models/infoModel/infoModel";

export const infoData: Info = {
  id: 1,
  __component: "blocks.infos",
  title: "Actualités",
  text: "Suivez les dernières nouvelles du festival",
  carrousel: [
    {
      id: 1,
      title: "Accès & Transport",
      description: "Toutes les infos pour venir au festival.",
      text: "Accès facile en train, bus et voiture.",
      image: {
        url: "/images/transport.webp",
        alternativeText: "Accès & Transport",
      },
      importance: "Très important",
    },
    {
      id: 2,
      title: "Restauration",
      description: "Découvrez nos stands et foodtrucks.",
      text: "Une offre variée pour tous les goûts.",
      image: {
        url: "/images/restauration.webp",
        alternativeText: "Restauration",
      },
      importance: "Important",
    },
    {
      id: 3,
      title: "Objets trouvés",
      description: "Un espace dédié pour retrouver vos objets.",
      text: "Rendez-vous à l'accueil du festival.",
      image: {
        url: "/images/objets-trouves.webp",
        alternativeText: "Objets trouvés",
      },
      importance: "Modéré",
    },
  ],
};
