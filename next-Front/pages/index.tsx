import LandingBlocks from "@/components/landingBlocks";
import { getLandingPageData } from "@/controller/pagesController/LandingPageController";
import { LandingPageModel } from "@/models/LandingPageModel";
import { GetServerSideProps } from "next"; // Changement ici pour utiliser GetServerSideProps
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
export const getServerSideProps: GetServerSideProps = getLandingPageData;

export default Home;
