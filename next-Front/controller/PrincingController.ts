import { Princing } from "../models/blocks";
import { BaseController } from "./BaseController";

export class PrincingController extends BaseController<Princing> {
  constructor(props: Princing) {
    super({
      ...props,
      plan: props.plan.map((card) => ({
        ...card,
        services: card.services || [], // Assurer que services est un tableau
        button: card.button || null, // Assigner null si le lien est absent
      })),
    });

    console.log("Processed Princing data:", this.model);
  }
}
