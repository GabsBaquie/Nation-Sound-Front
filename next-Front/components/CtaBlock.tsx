// components/CtaBlock.tsx
interface CtaBlockProps {
  data: {
    title: string;
    description: string;
    buttonText: string;
  };
}

const CtaBlock = ({ data }: CtaBlockProps) => {
  return (
    <section>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <button>{data.buttonText}</button>
    </section>
  );
};

export default CtaBlock;
