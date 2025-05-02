import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useParams } from "next/navigation";
import { Languages } from "@/constants/enums";
import { FAQ } from "@/types/faq";

interface AccordInformationProps {
  filteredAccordions: FAQ[];
}

function AccordInformation({ filteredAccordions }: AccordInformationProps) {
  const params = useParams();
  const locale = params?.locale as string;

  return (
    <Accordion
      type="single"
      collapsible
      className="bg text-white w-full lg:w-[638px] min-h-[104px] bg-[#FFFFFF21] p-[16px] rounded-[8px]"
    >
      {filteredAccordions.map((accordion) => (
        <AccordionItem value={`item-${accordion.id}`} key={accordion.id}>
          <AccordionTrigger
            className={`text-sm md:text-base ${
              locale === Languages.ARABIC ? "text-right" : "text-left"
            }`}
          >
            {locale === Languages.ARABIC
              ? accordion.question
              : accordion.question_en}
          </AccordionTrigger>
          <AccordionContent
            className={`text-sm md:text-base ${
              locale === Languages.ARABIC ? "text-right" : "text-left"
            }`}
          >
            {locale === Languages.ARABIC ? (
              <p>{accordion.answer}</p>
            ) : (
              <p>{accordion.answer_en}</p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default AccordInformation;
