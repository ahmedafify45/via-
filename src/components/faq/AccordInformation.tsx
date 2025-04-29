import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

function AccordInformation({ filteredAccordions }: any) {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg text-white w-full lg:w-[638px] min-h-[104px] bg-[#FFFFFF21] p-[16px] rounded-[8px]"
    >
      {filteredAccordions.map((accordion: any) => (
        <AccordionItem value={`item-${accordion.id}`} key={accordion.id}>
          <AccordionTrigger className="text-sm md:text-base">
            {accordion.title}
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-base">
            {accordion.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default AccordInformation;
