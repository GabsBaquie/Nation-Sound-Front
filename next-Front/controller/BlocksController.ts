import { FAQ } from "@/models/faqModel/faqModel";
import { Footer } from "@/models/footerModel/footerModel";
import { HeroBlock } from "@/models/heroModel/heroModel";
import { Info } from "@/models/infoModel/infoModel";
import { Map, POI } from "@/models/mapModel/mapModel";
import { PartenaireBlock } from "@/models/partenaireModel/partenaireModel";
import { Princing } from "@/models/princingModel/princingModel";
import { Programmation } from "@/models/programmationModel/programmationModel";
import { BaseController } from "./BaseController";

export class HeroBlockController extends BaseController<HeroBlock> {
  constructor(props: HeroBlock) {
    super({
      ...props,
      image: BaseController.constructImageURL(props.image) || null,
      section: props.section
        ? {
            ...props.section,
            image:
              BaseController.constructImageURL(props.section.image) || null,
          }
        : null,
    });
  }
}

export class InfosController extends BaseController<Info> {
  constructor(props: Info) {
    super({
      ...props,
      carrousel: props.carrousel.map((card) => ({
        ...card,
        image: BaseController.constructImageURL(card.image) || null,
      })),
    });
  }
}

export class ProgramController extends BaseController<Programmation> {
  constructor(props: Programmation) {
    super({
      ...props,
      card: props.card.map((card) => ({
        ...card,
        image: card.image
          ? BaseController.constructImageURL(card.image) || null
          : null,
      })),
    });
  }
}

export class PrincingController extends BaseController<Princing> {
  constructor(props: Princing) {
    super({
      ...props,
      plan: props.plan.map((plan) => ({
        ...plan,
        services: plan.services || [],
        button: plan.button || null,
      })),
    });
  }
}

export class MapController extends BaseController<Map> {
  constructor(props: Map) {
    super({
      ...props,
      POI:
        props.POI?.map((poi: POI) => ({
          ...poi,
          Type: Array.isArray(poi.Type) ? poi.Type.join(", ") : poi.Type,
          Latitude: poi.POI?.coordinates?.lat ?? 48.8566,
          Longitude: poi.POI?.coordinates?.lng ?? 2.3522,
          Description: poi.Description ?? "",
        })) ?? [],
    });
  }
}

export class FAQController extends BaseController<FAQ> {
  constructor(props: FAQ) {
    super({
      ...props,
      questions: props.questions.map((question) => ({ ...question })),
    });
  }
}

export class PartenaireController extends BaseController<PartenaireBlock> {
  constructor(props: PartenaireBlock) {
    super({
      ...props,
      partenaires: props.partenaires
        ? props.partenaires.map((partenaire) => ({
            ...partenaire,
            logo: partenaire.logo
              ? BaseController.constructImageURL(partenaire.logo)
              : null,
          }))
        : [],
    });
  }
}

export class FooterController extends BaseController<Footer> {
  constructor(props: Footer) {
    super({
      ...props,
      Reseaux: props.Reseaux.map((reseau) => ({
        ...reseau,
        // Si l'icône existe, construire l'URL, sinon la laisser comme null
        icon: reseau.icon
          ? BaseController.constructImageURL(reseau.icon)
          : null,
      })),
    });
  }
}
