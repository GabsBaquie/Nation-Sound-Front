import { HeroBlock as HeroBlockType } from "@/models/heroModel/heroModel";

export const heroBlockData: HeroBlockType = {
  id: 1,
  __component: "blocks.hero",
  title: "Bienvenue au Festival de Musique",
  text: "Découvrez une programmation riche et éclectique dans un cadre idyllique",
  image: {
    url: "/image/Guitar Player.png",
    alternativeText: "Guitar Player sur scène",
  },
  BtnLink: [
    {
      title: "Voir le programme",
      link: "/Programmation",
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
    title: "Le Festival",
    text: "Depuis plus de 10 ans, le Festival Music rassemble les amateurs de musique du monde entier dans un cadre naturel exceptionnel. Venez découvrir une programmation riche et éclectique, des artistes de renommée internationale et une ambiance conviviale et festive.",
    image: {
      url: "/image/TourneDisc Content Manager.png",
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
