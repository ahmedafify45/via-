"use client";

import React from "react";
import ServicesCard from "../service/ServicesCard";
import { useFetch } from "@/hooks/useFetch";
import Loading from "../Loading";
import { Service } from "@/types/services";

interface ServicesResponse {
  data: Service[];
  public: boolean;
}

function Services() {
  const {
    data: pageSettings,
    loading: pageSettingsLoading,
    error: pageSettingsError,
  } = useFetch("/items/other_pages", {
    fields: "*.*",
    "filter[slug]": "services",
  });

  console.log(pageSettings, pageSettingsLoading, pageSettingsError);

  const { data, loading } = useFetch<ServicesResponse>("/items/services", {
    fields: "*.*",
  });

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <section className="my-[220px] lg:mx-[80px] ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[80px] mx-4">
        {data?.data.map((service: Service) => (
          <div key={service.id}>
            <ServicesCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
