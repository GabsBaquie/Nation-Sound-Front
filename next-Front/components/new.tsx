import Image from "next/image";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface NewProps {
  card: {
    id: number;
    title: string;
    text: string;
    description: string;
    image?: {
      url: string;
      alternativeText: string;
    };
  } | null;
  error?: string;
}

const NewCard: React.FC<NewProps> = ({ card, error }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <Card className="mx-auto my-40 text-center max-w-7xl">
      <CardHeader>
        {card.image && (
          <Image
            className="mx-auto"
            src={card.image?.url}
            alt={card.image?.alternativeText}
            width={250}
            height={250}
          />
        )}
      </CardHeader>
      <CardTitle className="my-8">{card.title}</CardTitle>
      <CardDescription className="mb-4 text-lg">
        {card.description}
      </CardDescription>
      <CardContent className="markdown-content">
        <ReactMarkdown>{card.text}</ReactMarkdown>
      </CardContent>
    </Card>
  );
};

export default NewCard;
