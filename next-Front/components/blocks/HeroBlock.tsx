import Button from "@/components/ui/button";
import { HeroBlock as HeroBlockType } from "@/models/blocks";
import Image from "next/image";
import Link from "next/link";

interface HeroBlockProps {
  block: HeroBlockType;
}

const HeroBlock: React.FC<HeroBlockProps> = ({ block }) => {
  // Accédez directement aux propriétés du modèle
  const { title, text, image, BtnLink, section } = block;
  return (
    <section className="flex flex-col w-full h-full ml-2">
      <div className="flex flex-wrap lg:flex-nowrap ">
        {/* Contenu principal */}
        <div className="flex flex-col w-screen max-w-md gap-4 mx-auto mt-5 text-center md:mt-12 align-center">
          <div>
            <h1 className="p-2 text-lg font-bold lg:mb-4 md:text-4xl">
              {title}
            </h1>
            <p className="text-sm md:mb-4 md:text-lg">{text}</p>
          </div>

          {/* Boutons */}
          <div className="flex flex-row justify-center space-x-4 ">
            {BtnLink?.map((btn, index) => (
              <Button key={index} size="sm" btnType={btn.type}>
                <Link
                  className="text-xs text-wrap md:text-nowrap md:text-base"
                  href={btn.link || "#"}
                  target={btn.isExternal ? "_blank" : "_self"}
                  rel={btn.isExternal ? "noopener noreferrer" : ""}>
                  {btn.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Image hero */}
        {image && (
          <div className="relative items-center max-w-xl mx-auto my-10 lg:m-0 md:w-full min-w-sm">
            <Image
              className="lg:absolute top-8 lg:top-[-50px] z-10 "
              src={image.url}
              alt={image.alternativeText}
              width={550}
              height={650}
              priority
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
        )}
      </div>

      {/* Section */}
      <div className="relative md:flex md:mt-24">
        {/* Titre de la section en mobile */}
        <h2 className="mb-6 text-xl font-bold md:hidden">{section?.title}</h2>
        {/* Image de la section Hero */}
        {section?.image && (
          <div
            className="float-left w-1/3 mr-12 md:float-none md:w-[20%] md:mx-12"
            style={{
              shapeOutside: "circle()",
            }}>
            <Image
              src={section?.image.url}
              alt={section.image.alternativeText}
              width={200}
              height={200}
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}
        {/* Texte qui entoure l'image */}
        <div className="text-justify md:w-2/3">
          <h2 className="hidden mb-4 md:block lg:mb-4 md:text-2xl">
            {section?.title}
          </h2>
          <p className="text-sm md:text-lg md:mb-4">{section?.text}</p>
          {/* Bouton de la section */}
          <Button size="sm" btnType={section?.button?.type}>
            <Link
              className="text-xs md:text-base"
              href={section?.button?.link || "#"}
              target={section?.button?.isExternal ? "_blank" : "_self"}
              rel={section?.button?.isExternal ? "noopener noreferrer" : ""}>
              {section?.button?.title}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroBlock;
