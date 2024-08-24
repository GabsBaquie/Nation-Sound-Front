import Image from "next/image";
import Link from "next/link";
import { HeroBlockController } from "../controller/HeroBlockController";
import { HeroBlockProps } from "../models/HeroBlockModel";
import { Button } from "./ui/button";

const HeroBlock = (props: HeroBlockProps) => {
  const controller = new HeroBlockController(props);
  const model = controller.getModel();

  return (
    <section className="flex flex-col w-full h-full px-10 ml-4 text-center md:ml-8 md:px-24">
      <div className="flex flex-wrap lg:flex-nowrap ">
        {/* Contenu principal */}
        <div className="flex flex-col w-screen max-w-md gap-4 mx-auto mt-5 text-center md:mt-12 align-center">
          <div>
            <h1 className="p-2 text-lg font-bold lg:mb-4 md:text-4xl">
              {model?.title}
            </h1>
            <p className="text-sm md:mb-4 md:text-lg">{model?.text}</p>
          </div>

          {/* Boutons */}
          <div className="flex flex-row justify-center space-x-4 ">
            {model?.BtnLink?.map((btn, index) => (
              <Button
                key={index}
                size="sm"
                variant={
                  btn.type === "primary" || btn.type === "secondary"
                    ? (btn.type as "primary" | "secondary")
                    : "primary"
                }>
                <Link
                  className="text-xs text-wrap md:text-nowrap md:text-sm"
                  href={btn.link || "#"}
                  target={btn.isExternal ? "_blank" : "_self"}
                  rel={btn.isExternal ? "noopener noreferrer" : ""}>
                  {btn.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Image héroïque */}
        {model?.image && (
          <div className="relative items-center max-w-xl mx-auto my-10 lg:m-0 md:w-full min-w-sm">
            <Image
              className="lg:absolute top-8 lg:top-[-50px] z-10 "
              src={model.image.url}
              alt={model.image.alternativeText}
              width={550}
              height={450}
              objectFit="contain"
              priority
            />
          </div>
        )}
      </div>

      {/* Section */}
      <div className="relative md:flex md:mt-24">
        {/* Titre de la section en mobile */}
        <div className="mb-6 text-2xl font-bold md:hidden">
          {model?.section?.title}
        </div>
        {/* Image de la section Hero */}
        {model?.section?.image && (
          <div
            className="float-left w-1/3 mr-12 md:float-none md:w-1/4 md:mr-6"
            style={{
              shapeOutside: "circle()",
            }}>
            <Image
              src={model?.section?.image.url}
              alt={model.section.image.alternativeText}
              width={200}
              height={200}
              objectFit="cover"
              priority
              layout="responsive"
            />
          </div>
        )}
        {/* Texte qui entoure l'image */}
        <div className="text-justify md:w-2/3">
          <h1 className="hidden mb-4 md:block lg:mb-4 md:text-4xl">
            {model?.section?.title}
          </h1>
          <p className="text-sm md:mb-4 md:text-xl">
            {model?.section?.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroBlock;
