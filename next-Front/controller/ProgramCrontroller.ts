import { Programmation } from "../models/blocks";
import { BaseController } from "./BaseController";

export class ProgramController extends BaseController<Programmation> {
  constructor(props: Programmation) {
    super({
      ...props,
      image: props.image
        ? props.image
            .filter((img) => img?.url && img.alternativeText) // Filtrer les images valides
            .map((img) => ({
              url: img ? BaseController.constructImageURL(img)?.url || "" : "",
              alternativeText: img?.alternativeText || "",
            }))
        : [], // Si pas d'image, retourne un tableau vide
    });

    // Vérification supplémentaire pour s'assurer que les images sont bien traitées
    console.log("Processed images:", this.model?.image);
  }
}
