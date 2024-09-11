import NavBar from "@/components/NavBar/navBar";
import Button from "@/components/ui/button";
import GenericCard from "@/components/ui/GenericCard";
import { BilletterieController } from "@/controller/pagesController/BilletterieController";
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
      <div className="px-12 mx-auto mb-10 text-center md:pr-8 md:ml-20 lg:px-24">
        <div className="pt-20 mb-4 md:pt-0 md:my-6">
          <h1 className="mb-2 text-xl">{billetterie.title}</h1>
          <p className="md:text-lg">{billetterie.description}</p>
        </div>

        {princingBlock && (
          <section>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                          <p>{service.description}</p>
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
