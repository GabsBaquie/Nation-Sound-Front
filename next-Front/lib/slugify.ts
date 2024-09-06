export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Remplace les espaces par des tirets
    .replace(/[^\w\-]+/g, "") // Supprime les caractères non-alphanumériques
    .replace(/\-\-+/g, "-") // Remplace plusieurs tirets par un seul
    .replace(/^-+/, "") // Supprime les tirets au début
    .replace(/-+$/, ""); // Supprime les tirets à la fin
};
