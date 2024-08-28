import LandingBlocks from "@/components/landingBlocks";
import NavBar from "@/components/NavBar/navBar";
import { getLandingPageData } from "@/controller/LandingPageController";
import { LandingPageModel } from "@/models/LandingPageModel";
import { GetStaticProps } from "next";
import "../app/globals.css";

const Home = ({
  blocks = [],
  error,
}: LandingPageModel & { error?: string }) => {
  console.log(blocks);
  return (
    <div className="container border-2 border-border">
      <NavBar />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <LandingBlocks blocks={blocks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = getLandingPageData;

export default Home;
