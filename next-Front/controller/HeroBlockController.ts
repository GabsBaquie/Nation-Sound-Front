import { HeroBlock } from "../models/blocks";
import { BaseController } from "./BaseController";

export class HeroBlockController extends BaseController<HeroBlock> {
  constructor(props: HeroBlock) {
    super({
      ...props,
      image: props.image
        ? {
            url: BaseController.constructImageURL(props.image)?.url || "",
            alternativeText: props.image.alternativeText || "",
          }
        : null, // Remplacer undefined par null
      section: props.section
        ? {
            ...props.section,
            image: props.section.image
              ? {
                  url:
                    BaseController.constructImageURL(props.section.image)
                      ?.url || "",
                  alternativeText: props.section.image.alternativeText || "",
                }
              : null, // Remplacer undefined par null
          }
        : null, // Remplacer undefined par null
    });
  }
}
