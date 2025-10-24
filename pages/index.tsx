import Actualites from "@/components/blocks/Actualites";
import FAQ from "@/components/blocks/FAQ";
import HeroBlock from "@/components/blocks/HeroBlock";
import Map from "@/components/blocks/Map";
import Partenaires from "@/components/blocks/Partenaire";
import PrincingBlock from "@/components/blocks/Princing";
import Programmation from "@/components/blocks/Programmation";
import LandingPage from "@/components/landingPage";
import { LandingPageModel } from "@/models/LandingPageModel";

import { faqData } from "@/components/blocks/data/faqData";
import { heroBlockData } from "@/components/blocks/data/heroBlockData";
import { princingData } from "@/components/blocks/data/princingData";
import "../app/globals.css";

const Home = ({
  blocks = [],
  error,
}: LandingPageModel & { error?: string }) => {
  console.log(blocks);
  return (
    <>
      <HeroBlock block={heroBlockData} />
      <FAQ block={faqData} />
      <Programmation />
      <PrincingBlock block={princingData} />
      <Actualites />
      <Map />
      <Partenaires />
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <LandingPage blocks={blocks} />
      </div>
    </>
  );
};

export default Home;
