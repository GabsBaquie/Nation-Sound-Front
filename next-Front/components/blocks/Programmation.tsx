import Image from "next/image";
import { Programmation as ProgrammationType } from "../../models/blocks";

interface ProgrammationProps {
  block: ProgrammationType;
}

const ProgrammationBlock: React.FC<ProgrammationProps> = ({ block }) => {
  const { title, text, image, card } = block;

  return (
    <section className="programmation-block">
      <h2>{title}</h2>
      <p>{text}</p>

      <div className="cards">
        {card.map((card, index) => (
          <div key={index} className="card">
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <Image
              src={card.image?.url || ""}
              alt={card.image?.alternativeText || ""}
            />
          </div>
        ))}
      </div>

      <div className="images">
        {image.map((img, index) => (
          <Image
            key={index}
            src={img?.url || ""}
            alt={img?.alternativeText || ""}
          />
        ))}
      </div>
    </section>
  );
};

export default ProgrammationBlock;
