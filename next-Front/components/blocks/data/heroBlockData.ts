import { HeroBlock as HeroBlockType } from "@/models/heroModel/heroModel";

export const heroBlockData: HeroBlockType = {
  id: 1,
  __component: "blocks.hero",
  title: "Bienvenue sur Nation Sound",
  text: "La plateforme de référence pour la musique indépendante.",
  image: {
    url: "/images/hero.webp",
    alternativeText: "Image de la plateforme",
  },
  BtnLink: [
    {
      title: "Découvrir",
      link: "/about",
      isExternal: false,
      type: "primary",
    },
    {
      title: "Nous contacter",
      link: "/contact",
      isExternal: false,
      type: "secondary",
    },
  ],
  section: {
    title: "Notre mission",
    text: "Accompagner les artistes dans leur développement.",
    image: {
      url: "/images/mission.webp",
      alternativeText: "Notre mission",
    },
    button: {
      title: "En savoir plus",
      link: "/about",
      isExternal: false,
      type: "primary",
    },
  },
};
