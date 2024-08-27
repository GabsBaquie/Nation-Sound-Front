import { Programmation as ProgrammationType } from "../../models/blocks";

interface ProgrammationProps {
  block: ProgrammationType;
}

const ProgrammationBlock: React.FC<ProgrammationProps> = ({ block }) => {
  const { title, description, image } = block;

  return (
    <section className="programmation-block">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="images">
        {image.map((img, index) => (
          <img key={index} src={img.url} alt={img.alternativeText} />
        ))}
      </div>
    </section>
  );
};

export default ProgrammationBlock;
