// next-Front/lib/slug.ts
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, ""); // Supprime les caractères non alphanumériques
}
