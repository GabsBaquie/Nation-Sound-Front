import axios from "axios";
import { GetStaticProps } from "next";
import { DataNotFoundError, DataValidationError } from "../lib/DataError";

export const getLandingPageData: GetStaticProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await axios.get(
      `${apiUrl}/api/landing-pages?populate[metaData][populate]=metaImage&populate[blocks][populate]=image,BtnLink,section.image,section.button`
    );
    const landingPage = res.data.data[0];

    if (!landingPage) {
      throw new DataNotFoundError("Landing page data not found");
    }

    // Validation supplémentaire des données
    if (!landingPage.blocks) {
      throw new DataValidationError("Landing page data is invalid");
    }

    if (!landingPage.metaData) {
      throw new DataValidationError("Landing page data is invalid");
    }

    return {
      props: {
        blocks: landingPage.blocks,
        metaData: landingPage.metaData,
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
          metadata: {},
          error: error.message,
        },
      };
    }

    // Gérer d'autres types d'erreurs
    return {
      props: {
        blocks: [],
        metadata: {},
        error: "An unexpected error occurred",
      },
    };
  }
};
