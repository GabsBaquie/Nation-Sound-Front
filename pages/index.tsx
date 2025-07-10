import FAQ from "@/components/blocks/FAQ";
import HeroBlock from "@/components/blocks/HeroBlock";
import Info from "@/components/blocks/Info";
import Map from "@/components/blocks/Map";
import Partenaires from "@/components/blocks/Partenaire";
import PrincingBlock from "@/components/blocks/Princing";
import Programmation from "@/components/blocks/Programmation";
import { faqData } from "@/components/blocks/data/faqData";
import { heroBlockData } from "@/components/blocks/data/heroBlockData";
import { infoData } from "@/components/blocks/data/infoData";
import { partenaireData } from "@/components/blocks/data/partenaireData";
import { princingData } from "@/components/blocks/data/princingData";
import LandingPage from "@/components/landingPage";
import { LandingPageModel } from "@/models/LandingPageModel";
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
      <Info block={infoData} />
      <Map />
      <Partenaires block={partenaireData} />
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <LandingPage blocks={blocks} />
      </div>
    </>
  );
};

export default Home;
