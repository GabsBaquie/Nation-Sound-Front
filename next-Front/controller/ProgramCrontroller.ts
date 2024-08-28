import { Programmation } from "../models/blocks";
import { BaseController } from "./BaseController";

export class ProgramController extends BaseController<Programmation> {
  constructor(props: Programmation) {
    console.log("Original image:", props.image);
    console.log("Original image2:", props.image2);

    super({
      ...props,
      image:
        props.image && props.image.url
          ? {
              url: BaseController.constructImageURL(props.image)?.url || "",
              alternativeText: props.image.alternativeText || "",
            }
          : null, // Si pas d'image, retourne null
      image2:
        props.image2 && props.image2.url
          ? {
              url: BaseController.constructImageURL(props.image2)?.url || "",
              alternativeText: props.image2.alternativeText || "",
            }
          : null, // Si pas d'image, retourne null
    });

    // Vérification supplémentaire pour s'assurer que les images sont bien traitées
    console.log("Processed image:", this.model?.image);
    console.log("Processed image2:", this.model?.image2);
  }
}
