import Actualites from "@/components/blocks/Actualites";
import FAQ from "@/components/blocks/FAQ";
import Hero from "@/components/blocks/Hero";
import Map from "@/components/blocks/Map";
import Partenaires from "@/components/blocks/Partenaire";
import Pricing from "@/components/blocks/Pricing";
import Programmation from "@/components/blocks/Programmation";
import LandingPage from "@/components/landingPage";
import { LandingPageModel } from "@/models/types";

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
      <Hero block={heroBlockData} />
      <FAQ block={faqData} />
      <Programmation />
      <Pricing block={princingData} />
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
