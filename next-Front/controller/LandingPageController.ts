import axios from "axios";
import { GetStaticProps } from "next";
import { DataNotFoundError, DataValidationError } from "../lib/DataError";

export const getLandingPageData: GetStaticProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await axios.get(
      `${apiUrl}/api/landing-pages?populate%5Bblocks%5D%5Bpopulate%5D=image,BtnLink,section.image`
    );
    const landingPage = res.data.data[0];

    if (!landingPage) {
      throw new DataNotFoundError("Landing page data not found");
    }

    // validation supplémentaire des données
    if (!landingPage.blocks) {
      throw new DataValidationError("Landing page data is invalid");
    }

    return {
      props: {
        blocks: landingPage.blocks,
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

    // Gérer d'autres types d'erreurs
    return {
      props: {
        blocks: [],
        error: "An unexpected error occurred",
      },
    };
  }
};
