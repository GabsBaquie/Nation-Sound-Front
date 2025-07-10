import { Programmation } from "@/models/programmationModel/programmationModel";

export const programmationData: Programmation = {
  id: 1,
  __component: "blocks.programmation",
  title: "Programmation de cette année",
  text: "Découvrez la programmation incroyable des artistes qui se produiront au Festival Music cette année.",
  card: [
    {
      id: 1,
      title: "Scène principale",
      description: "Les plus grands artistes sur la grande scène.",
      image: {
        url: "/images/scene-principale.webp",
        alternativeText: "Scène principale",
      },
      days: [
        {
          title: "Vendredi",
          date: "2024-07-12",
          concert: [
            {
              title: "Artiste A",
              description: "Pop énergique pour ouvrir le festival.",
              heure: "20:00",
              lieu: "Grande scène",
              image: {
                url: "/images/artiste-a.webp",
                alternativeText: "Artiste A",
              },
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Scène découverte",
      description: "Nouveaux talents à découvrir.",
      image: {
        url: "/images/scene-decouverte.webp",
        alternativeText: "Scène découverte",
      },
      days: [
        {
          title: "Samedi",
          date: "2024-07-13",
          concert: [
            {
              title: "Artiste B",
              description: "Rock alternatif.",
              heure: "18:00",
              lieu: "Scène découverte",
              image: {
                url: "/images/artiste-b.webp",
                alternativeText: "Artiste B",
              },
            },
          ],
        },
      ],
    },
  ],
};
