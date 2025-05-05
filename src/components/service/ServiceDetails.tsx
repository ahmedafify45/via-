"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Banner from "../custom/banner";
import Link from "next/link";
import InformationContact from "../contact/InformationContact";
import { Accordions } from "../faq/According";
import { Languages } from "@/constants/enums";
import { useFetch } from "@/hooks/useFetch";
import { Service } from "@/types/services";
import Loading from "../Loading";

interface ServicesResponse {
  data: Service[];
  public: boolean;
}

function ServiceDetails() {
  const params = useParams();
  const locale = params?.locale as string;
  const { data: servicesData, loading } = useFetch<ServicesResponse>(
    "/items/services",
    {
      fields: "*.*",
    }
  );
  const services = servicesData?.data || [];
  const service =
    services.find((s: Service) => s.slug === params?.slug) || null;

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  const displayName =
    locale === Languages.ARABIC ? service.name : service.name_en;
  const displayDescription =
    locale === Languages.ARABIC ? service.description : service.description_en;
  const displaySummary =
    locale === Languages.ARABIC ? service.summary : service.summary_en;

  return (
    <main className="py-[220px]">
      <div className="mx-4 md:mx-[80px]">
        <Banner
          title="Our Services"
          subtitle="home/services/details"
          image={service.banner?.data?.full_url}
        />
        <div className="relative w-full max-w-[1280px] aspect-[1280/472] mx-auto">
          <Image
            src={service.photo?.data?.full_url}
            alt={displayName}
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mt-8">
          <div className="w-full lg:max-w-[853px]">
            <h1 className="text-[32px] md:text-[48px] font-bold text-primary">
              {displayName}
            </h1>
            <div className="text-[16px] md:text-[18px] text-white font-medium mb-4">
              {displaySummary}
            </div>
            <div
              className="text-[16px] md:text-[18px] text-white font-medium"
              dangerouslySetInnerHTML={{ __html: displayDescription }}
            />
          </div>
          <div className="text-white bg-[#FFFFFF0D] p-4 md:p-6 rounded-lg w-full lg:w-[413px] mt-4 lg:mt-[32px]">
            <p className="text-[20px] md:text-[24px] mb-4">Our Services</p>
            <div className="space-y-3">
              {services.map((s) => (
                <Link
                  href={`/${locale}/services/${s.slug}`}
                  key={s.id}
                  className={`block text-[16px] md:text-[20px] hover:text-primary transition-colors ${
                    s.slug === params?.slug
                      ? "text-primary font-medium"
                      : "text-white"
                  }`}
                >
                  {locale === Languages.ARABIC ? s.name : s.name_en}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <InformationContact />
        </div>
        <div className="w-full mt-[40px] md:mt-[80px]">
          <h3 className="text-[32px] md:text-[48px] text-primary font-medium">
            {params?.locale === Languages.ARABIC ? "الأسئلة الشائعة" : "FAQ"}
          </h3>
          <Accordions CategoryStatus={false} />
        </div>
      </div>
    </main>
  );
}

export default ServiceDetails;
