import Accordion from "../../ui/Accordion";
import { faq } from "./FAQ.json";

export default function FAQList() {
  return (
    <div className="w-full flex flex-col gap-6">
      {faq.map((item, index) => (
        <div key={index} className="w-full">
          <div className="pr-2 text-primary-3 font-bold text-sm font-alibaba pb-4">
            {item.section}
          </div>
          <div className="flex flex-col gap-3">
            {item.items.map((question, index) => (
              <Accordion
                key={index}
                title={question.question}
                content={question.answer}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
