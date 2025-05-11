import React from "react";
import AskQushions from "./AskQushions";
import FaqBanner from "../service/FaqBanner";

function FaqSection({ locale }: { locale: string }) {
  return (
    <section className="my-[220px] mx-4 xl:mx-[80px]">
      <FaqBanner locale={locale} />
      <AskQushions locale={locale} />
    </section>
  );
}

export default FaqSection;
