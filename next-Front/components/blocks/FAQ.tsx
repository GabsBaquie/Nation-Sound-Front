import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { FAQ as FAQType } from "../../models/blocks";

interface FAQProps {
  block: FAQType;
}

const FAQ: React.FC<FAQProps> = ({ block }) => {
  const { title, questions } = block;

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-xl md:text-2xl">{title}</h1>

      <div>
        <Accordion className="w-full" type="single" collapsible>
          {questions.map((question, index) => (
            <AccordionItem
              className="lg:w-[800px] max-w-full mb-4"
              value={`item-${index}`}
              key={question.id}>
              <AccordionTrigger>{question.title}</AccordionTrigger>
              <AccordionContent>{question.text}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
