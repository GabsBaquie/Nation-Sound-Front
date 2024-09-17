import LandingPage from "@/components/landingPage";
import { getLandingPageData } from "@/controller/LandingPageController/LandingPageController";
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
        <LandingPage blocks={blocks} />
      </div>
    </div>
  );
};

// Récupération des données côté serveur
export const getServerSideProps: GetServerSideProps = getLandingPageData;

export default Home;
