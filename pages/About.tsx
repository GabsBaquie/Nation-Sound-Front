import { aboutPageData } from "@/components/blocks/data/aboutPageData";
import GenericCard from "@/components/ui/GenericCard";
import React from "react";

const AboutPage: React.FC = () => {
  const about = aboutPageData;
  return (
    <div>
      <div className="md:ml-20 lg:ml-auto">
        <GenericCard
          className="p-4 pt-16 max-w-full bg-transparent border-none md:border-solid md:bg-primary md:pt-0 md:mx-auto"
          title={about.title}
          description={about.description}
          text={about.text}
        />
      </div>
    </div>
  );
};

export default AboutPage;
