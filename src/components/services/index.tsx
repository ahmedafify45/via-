"use client";

import React, { useEffect, useState } from "react";
import Banner from "../custom/banner";
import ServicesCard from "../service/ServicesCard";
import { fetcher } from "@/lib/fetcher";

interface Service {
  id: number;
  name_en: string;
  slug: string;
  summary_en: string;
  description_en: string;
  photo: number;
  banner: number;
  icon: string;
}

interface ServicesResponse {
  data: Service[];
  public: boolean;
}

function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetcher<ServicesResponse>("/items/services");
        setServices(data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mt-[220px] mx-[3px] lg:mx-[80px] mb-[156px]">
      <Banner subtitle="home/services" title="Our Services" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[80px]">
        {services.map((service) => (
          <div key={service.id}>
            <ServicesCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
