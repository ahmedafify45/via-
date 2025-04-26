import React from "react";
import Banner from "../custom/banner";
import AskQushions from "./AskQushions";

function FaqSection() {
  return (
    <section className="my-[150px] mx-[80px]">
      <Banner title="FAQ" subtitle="home/faq" />
      <AskQushions />
    </section>
  );
}

export default FaqSection;
