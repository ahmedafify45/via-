import Banner from "@/components/custom/banner";
import React from "react";
import Portfolio from "@/components/profile";

function Portfoliopage() {
  return (
    <main className="my-[220px] mx-[80px]">
      <Banner title="Our Portfolio" />
      <Portfolio />
    </main>
  );
}

export default Portfoliopage;
