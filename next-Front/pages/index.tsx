import LandingBlocks from "@/components/landingBlocks";
import NavBar from "@/components/NavBar/navBar";
import { getLandingPageData } from "@/controller/LandingPageController";
import { MetaDataController } from "@/controller/MetaDataController";
import { LandingPageModel } from "@/models/LandingPageModel";
import { GetStaticProps } from "next";
import Head from "next/head";
import "../app/globals.css";

const Home = ({
  blocks = [],
  error,
  metaData,
}: LandingPageModel & { error?: string }) => {
  const metaDataController = new MetaDataController(metaData);
  const MetaData = metaDataController.getModel();
  const metaImage = MetaData?.metaImage?.url || "";

  return (
    <div>
      <Head>
        <title>{MetaData?.metaTitle || "Default Title"}</title>
        <meta
          name="description"
          content={MetaData?.metaDescription || "Default Description"}
        />
      </Head>
      <NavBar metaImage={metaImage || ""} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <LandingBlocks blocks={blocks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = getLandingPageData;

export default Home;
