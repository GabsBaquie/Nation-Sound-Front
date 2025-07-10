export const billetteriePageData = {
  title: "Billetterie Nation Sound",
  description:
    "Réservez vos billets pour le festival et profitez de nos offres.",
  landing_page: {
    blocks: [
      {
        __component: "blocks.princing",
        plan: [
          {
            id: 1,
            planType: "Standard",
            planPrice: "19€/jour",
            services: [
              { id: 1, description: "Accès à tous les concerts du jour." },
              { id: 2, description: "Accès à la zone food court." },
            ],
            button: {
              title: "Acheter Standard",
              link: "/Billetterie",
              isExternal: false,
              type: "primary",
            },
          },
          {
            id: 2,
            planType: "Premium",
            planPrice: "39€/jour",
            services: [
              { id: 3, description: "Accès VIP et loges artistes." },
              { id: 4, description: "Boissons offertes." },
            ],
            button: {
              title: "Acheter Premium",
              link: "/Billetterie",
              isExternal: false,
              type: "secondary",
            },
          },
        ],
      },
    ],
  },
};
