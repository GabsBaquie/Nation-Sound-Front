// FAQ Block Type
export type FAQ = {
  id: number;
  __component: "blocks.faq";
  title: string;
  questions: Question[]; // Tableau de questions
};

// Question pour les FAQs
export type Question = {
  id: number;
  title: string;
  text: string;
};
