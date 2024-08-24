import HeroBlock from "@/components/HeroBlock";
import NavBar from "@/components/navBar";
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

  return (
    <div>
      <Head>
        <title>{MetaData?.metaTitle || "Default Title"}</title>
        <meta
          name="description"
          content={MetaData?.metaDescription || "Default Description"}
        />
      </Head>
      <NavBar />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {blocks.map((block, index) => (
        <div key={index}>
          {block.__component === "blocks.hero" && <HeroBlock {...block} />}
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = getLandingPageData;

export default Home;
