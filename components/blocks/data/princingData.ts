import { Princing } from "@/models/princingModel/princingModel";

export const princingData: Princing = {
  id: 1,
  __component: "blocks.princing",
  title: "Nos offres",
  text: "Choisissez le plan qui correspond à vos besoins et profitez de tous les avantages de Nation Sound.",
  plan: [
    {
      planType: "Standard",
      planPrice: "19€/mois",
      isFeatured: false,
      services: [
        {
          id: 1,
          title: "Accès basique",
          description: "Accès à toutes les fonctionnalités de base.",
        },
        { id: 2, title: "Support", description: "Support par email 5j/7." },
      ],
      button: {
        title: "Choisir Standard",
        link: "/Billetterie",
        isExternal: false,
        type: "primary",
      },
    },
    {
      planType: "Premium",
      planPrice: "39€/mois",
      isFeatured: true,
      services: [
        {
          id: 3,
          title: "Accès complet",
          description: "Toutes les fonctionnalités incluses.",
        },
        {
          id: 4,
          title: "Support prioritaire",
          description: "Support prioritaire 7j/7.",
        },
        {
          id: 5,
          title: "Offres exclusives",
          description: "Accès à des offres et événements exclusifs.",
        },
      ],
      button: {
        title: "Choisir Premium",
        link: "/Billetterie",
        isExternal: false,
        type: "secondary",
      },
    },
  ],
};
