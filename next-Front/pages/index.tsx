import LandingBlocks from "@/components/landingBlocks";
import { getLandingPageData } from "@/controller/pagesController/LandingPageController";
import { LandingPageModel } from "@/models/LandingPageModel";
import { GetStaticProps } from "next";
import "../app/globals.css";

const Home = ({
  blocks = [],
  error,
}: LandingPageModel & { error?: string }) => {
  console.log(blocks);
  return (
    <div>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <LandingBlocks blocks={blocks} />
      </div>
    </div>
  );
};

// Récupération des données côté serveur
export const getStaticProps: GetStaticProps = getLandingPageData;

export default Home;
