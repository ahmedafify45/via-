import Banner from "@/components/custom/banner";
import React from "react";
import OurPortfolio, { portfolio } from "../_components/OurPortfolio";
import Portfolio from "@/components/profile";

function Portfoliopage() {
  return (
    <main className="my-[150px] mx-[80px]">
      <Banner title="Our Portfolio" />
      <Portfolio portfolio={portfolio} />
    </main>
  );
}

export default Portfoliopage;
