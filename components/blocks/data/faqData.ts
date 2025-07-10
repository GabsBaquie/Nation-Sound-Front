import { FAQ as FAQType } from "@/models/faqModel/faqModel";

export const faqData: FAQType = {
  id: 1,
  __component: "blocks.faq",
  title: "Foire aux questions",
  questions: [
    {
      id: 1,
      title: "Comment acheter un billet ?",
      text: "Vous pouvez acheter un billet directement sur notre site dans la section Billetterie.",
    },
    {
      id: 2,
      title: "Où trouver la programmation ?",
      text: "La programmation complète est disponible sur la page Programmation.",
    },
    {
      id: 3,
      title: "Comment contacter l'équipe ?",
      text: "Utilisez le formulaire de contact ou écrivez-nous à contact@nationsound.fr.",
    },
  ],
};
