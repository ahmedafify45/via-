"use client";

import Clients from "@/components/clients/client";
import { serverFetcher } from "@/lib/serverFetcher";
import { Languages } from "@/constants/enums";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface HomePageSetting {
  id: number;
  sort: number | null;
  title: string;
  how_many: number;
  is_active: boolean;
  title_en: string;
  slug: string;
}

function OurClients() {
  const params = useParams();
  const locale = params?.locale as string;
  const [testimonialData, setTestimonialData] = useState<HomePageSetting[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await serverFetcher<{ data: HomePageSetting[] }>(
        "/items/home_page_setting",
        {
          "filter[slug]": "testimonial-area",
        }
      );
      setTestimonialData(data);
    };

    fetchData();
  }, []);

  const title =
    locale === Languages.ARABIC
      ? testimonialData?.[0]?.title
      : testimonialData?.[0]?.title_en;

  const isActive = testimonialData?.[0]?.is_active;

  if (!isActive) {
    return null;
  }

  return (
    <section className="mt-[80px]">
      <div className="xl:flex flex-col items-center">
        <p className="text-primary xl:text-[48px] text-[24px] font-medium text-center">
          {title}
        </p>
        <Clients />
      </div>
    </section>
  );
}

export default OurClients;
