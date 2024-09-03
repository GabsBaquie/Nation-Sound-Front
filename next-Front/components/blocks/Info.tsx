import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../lib/slugify";
import { Info as InfoType } from "../../models/blocks";
import Button from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";

interface InfoProps {
  block: InfoType;
}

const InfoBlock: React.FC<InfoProps> = ({ block }) => {
  return (
    <div>
      <h1>{block.title}</h1>
      <p>{block.text}</p>
      <div className="flex justify-center w-full gap-4">
        {block.carrousel.map((card) => (
          <Card key={card.id}>
            <CardHeader>
              <Image
                width={150}
                height={150}
                src={card.image?.url || ""}
                alt={card.image?.alternativeText || ""}
              />
              <h2>{card.title}</h2>
            </CardHeader>

            <CardDescription>{card.description}</CardDescription>

            <CardFooter>
              <Link href={`/news/${slugify(card.title)}`} passHref>
                <Button>Voir plus</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InfoBlock;
