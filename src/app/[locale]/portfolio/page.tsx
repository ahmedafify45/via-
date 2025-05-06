"use client";

import Banner from "@/components/custom/banner";
import React from "react";
import Portfolio from "@/components/profile";
import { useFetch } from "@/hooks/useFetch";
import { useParams } from "next/navigation";

function Portfoliopage() {
  const locale = useParams();

  const {
    data: pageSettings,
    loading: pageSettingsLoading,
    error: pageSettingsError,
  } = useFetch("/items/other_pages", {
    fields: "*.*",
    "filter[slug]": "portfolio",
  });

  console.log(pageSettings, pageSettingsLoading, pageSettingsError);

  return (
    <main className="my-[220px] mx-2 lg:mx-[80px]">
      <Banner
        pageSettings={pageSettings?.data || []}
        locale={locale.locale as string}
      />
      <Portfolio />
    </main>
  );
}

export default Portfoliopage;
