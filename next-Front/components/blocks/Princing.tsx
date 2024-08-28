import React from "react";
import { Princing as PrincingType } from "../../models/blocks";

interface PrincingProps {
  block: PrincingType;
}

const PrincingBlock: React.FC<PrincingProps> = ({ block }) => {
  const { title, text, plan } = block;

  return (
    <section className="princing-block">
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="plans">
        {plan.map((card, index) => (
          <div
            key={index}
            className={`plan ${card.isFeatured ? "featured" : ""}`}>
            <h3>{card.planType}</h3>
            <p className="price">{card.planPrice}</p>
            <ul className="services">
              {card.services.map((service) => (
                <li key={service.id}>{service.title}</li>
              ))}
            </ul>
            {card.link ? (
              <a href={card.link.url} className="btn">
                {card.link.text}
              </a>
            ) : (
              <p>No link available</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrincingBlock;
