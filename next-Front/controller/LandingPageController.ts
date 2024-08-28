import { HeroBlockController } from "@/controller/HeroBlockController";
import { PrincingController } from "@/controller/PrincingController";
import { ProgramController } from "@/controller/ProgramCrontroller";
import axios from "axios";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { DataNotFoundError, DataValidationError } from "../lib/DataError";

export const getLandingPageData = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<{ [key: string]: any }>> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await axios.get(
      `${apiUrl}/api/landing-pages?populate[blocks][populate]=image,BtnLink,section.image,section.button,card,card.image,plan,plan.services,plan.link`
    );

    const landingPage = res.data.data[0];

    if (!landingPage) {
      throw new DataNotFoundError("Landing page data not found");
    }

    if (!landingPage.blocks) {
      throw new DataValidationError("Landing page data is invalid");
    }

    const blocks = landingPage.blocks
      .map((block: any) => {
        if (block.__component === "blocks.hero") {
          const controller = new HeroBlockController(block);
          return controller.getModel();
        }
        if (block.__component === "blocks.programmation") {
          const controller = new ProgramController(block);
          return controller.getModel();
        }
        if (block.__component === "blocks.princing") {
          const controller = new PrincingController(block);
          return controller.getModel();
        }

        return null;
      })
      .filter(Boolean);

    return {
      props: {
        blocks,
      },
    };
  } catch (error) {
    console.error("Error fetching landing page data:", error);

    if (
      error instanceof DataNotFoundError ||
      error instanceof DataValidationError
    ) {
      return {
        props: {
          blocks: [],
          error: error.message,
        },
      };
    }

    return {
      props: {
        blocks: [],
        error: "An unexpected error occurred",
      },
    };
  }
};
