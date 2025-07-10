import { billetteriePageData } from "@/components/blocks/data/billetteriePageData";
import Button from "@/components/ui/button";
import GenericCard from "@/components/ui/GenericCard";
import Link from "next/link";
import "../app/globals.css";

const BilletteriePage: React.FC = () => {
  const billetterie = billetteriePageData;
  // Récupérer le bloc Princing
  const princingBlock = billetterie.landing_page.blocks.find(
    (block: any) => block.__component === "blocks.princing"
  );

  return (
    <div>
      <div className="px-12 mx-auto mb-10 text-center md:pr-8 md:ml-20 lg:px-24">
        <div className="pt-20 mb-4 md:pt-0 md:my-6">
          <h1 className="mb-2 text-2xl md:text-4xl">{billetterie.title}</h1>
          <p className="text-lg md:text-xl">{billetterie.description}</p>
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
                          size={"sm"}
                        >
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

export default BilletteriePage;
