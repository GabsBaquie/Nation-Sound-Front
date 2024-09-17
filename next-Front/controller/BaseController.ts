import { Image } from "@/models/imageModel/imageModel";

export class BaseController<T> {
  protected model: T | null = null;
  protected error: string | null = null;

  constructor(props: T) {
    try {
      this.model = this.initializeModel(props);
    } catch (err) {
      this.handleError(err);
    }
  }

  // Initialise le modèle avec des propriétés de type T
  protected initializeModel(props: T): T {
    return props;
  }

  // Construction sécurisée de l'URL de l'image
  protected static constructImageURL(image?: Image) {
    if (!image || !image.url) return null; // Gestion du cas où l'image est inexistante

    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

    // Vérifie si l'URL est déjà complète (commence par "http")
    if (image.url.startsWith("http")) {
      return { url: image.url, alternativeText: image.alternativeText || "" };
    }

    // Retourne l'URL complète en utilisant le baseURL et l'URL relative
    return {
      url: `${baseURL}${image.url}`,
      alternativeText: image.alternativeText || "", // Gérer le cas où alternativeText est undefined
    };
  }

  // Gestion des erreurs : met à jour l'état d'erreur et l'affiche dans la console
  protected handleError(err: unknown) {
    this.error = `Failed to initialize model: ${err instanceof Error ? err.message : String(err)}`;
    console.error(this.error);
    throw new Error(this.error); // Lève l'exception pour que le contrôleur supérieur la capture
  }

  // Retourne le modèle ou lève une erreur s'il y a un problème d'initialisation
  getModel(): T | null {
    if (this.error) {
      throw new Error(this.error); // Si une erreur a été capturée, elle est levée ici
    }
    return this.model; // Retourne le modèle s'il est valide
  }
}
