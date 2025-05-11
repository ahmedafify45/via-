import Image from "next/image";
import { Accordions } from "./According";
import { Languages } from "@/constants/enums";
function AskQushions({ locale }: { locale: string }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-4 lg:px-0">
      <div className="w-full lg:w-auto flex flex-col items-center lg:items-start">
        <h1 className="text-3xl md:text-4xl lg:text-[64px] font-medium text-white text-center lg:text-left">
          {locale === Languages.ENGLISH ? "Ask Qushions" : "الاسئله الشائعه"}
        </h1>
        <Image
          src="/images/faq/faq.png"
          alt="ask-qushions"
          width={630}
          height={615}
          className="w-full max-w-[630px] h-auto"
        />
      </div>
      <div className="w-full lg:w-auto">
        <Accordions />
      </div>
    </div>
  );
}

export default AskQushions;
