import NavBar from "@/components/NavBar/navBar";
import Button from "@/components/ui/button";
import GenericCard from "@/components/ui/GenericCard";
import { BilletterieController } from "@/controller/pages/BilletterieController";
import { Billetterie } from "@/models/BilletterieModel";
import { GetServerSideProps } from "next";
import Link from "next/link";
import "../app/globals.css";

interface BilletteriePageProps {
  billetterie: Billetterie | null;
  error?: string;
}

const BilletteriePage: React.FC<BilletteriePageProps> = ({
  billetterie,
  error,
}) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!billetterie) {
    return <div>Billetterie not found</div>;
  }

  // Récupérer le bloc Princing
  const princingBlock = billetterie.landing_page.blocks.find(
    (block: any) => block.__component === "blocks.princing"
  );

  return (
    <div className="container">
      <NavBar />
      <div className="px-12 mb-10 ml-4 text-center md:ml-14 md:px-24">
        <div className="my-12">
          <h1 className="text-2xl">{billetterie.title}</h1>
          <p className="text-lg">{billetterie.description}</p>
        </div>

        {princingBlock && (
          <section>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {princingBlock.plan.map((plan: any) => (
                <GenericCard
                  className="bg-primary"
                  key={plan.id}
                  title={plan.planType}
                  description={plan.planPrice}
                  text={
                    <ul>
                      {plan.services.map((service: any) => (
                        <li key={service.id} className="list-none">
                          {service.name} - {service.description}
                        </li>
                      ))}
                    </ul>
                  }
                  renderContent={() =>
                    plan.button && (
                      <Link href={plan.button?.link || "#"} passHref>
                        <Button
                          btnType={plan.button?.type || "primary"}
                          size={"sm"}>
                          {plan.button?.title || "Buy Now"}
                        </Button>
                      </Link>
                    )
                  }
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Récupération des données côté serveur
export const getServerSideProps: GetServerSideProps =
  BilletterieController.getServerSideProps;

export default BilletteriePage;
