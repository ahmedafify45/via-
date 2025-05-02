"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Banner from "../custom/banner";
import Link from "next/link";
import InformationContact from "../contact/InformationContact";
import { Accordions } from "../faq/According";
import { Languages } from "@/constants/enums";
import { fetcher } from "@/lib/fetcher";
import { Loader } from "lucide-react";

interface Service {
  id: number;
  name: string;
  name_en: string;
  slug: string;
  summary: string;
  summary_en: string;
  description: string;
  description_en: string;
  photo: number;
  banner: number;
  icon: string;
}

interface ServicesResponse {
  data: Service[];
  public: boolean;
}

function ServiceDetails() {
  const params = useParams();
  const locale = params?.locale as string;
  const [service, setService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetcher<ServicesResponse>("/items/services");
        setServices(data.data);

        const currentService = data.data.find(
          (s: Service) => s.slug === params?.slug
        );
        setService(currentService || null);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [params?.slug]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  const bannerUrl = service.banner
    ? `/api/assets/${service.banner}`
    : "/images/banner.png";

  const displayName =
    locale === Languages.ARABIC ? service.name : service.name_en;
  const displayDescription =
    locale === Languages.ARABIC ? service.description : service.description_en;
  const displaySummary =
    locale === Languages.ARABIC ? service.summary : service.summary_en;

  return (
    <main className="py-[150px]">
      <div className="mx-[80px]">
        <Banner
          title="Our Services"
          subtitle="home/services/details"
          image={bannerUrl}
        />
        <div className="relative w-full max-w-[1280px] aspect-[1280/472] mx-auto">
          <Image
            src={bannerUrl}
            alt={displayName}
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="max-w-[853px]">
            <h1 className="lg:text-[48px] text-[20px] font-bold text-primary">
              {displayName}
            </h1>
            <div className="text-[18px] text-white font-medium mb-4">
              {displaySummary}
            </div>
            <div
              className="text-[18px] text-white font-medium"
              dangerouslySetInnerHTML={{ __html: displayDescription }}
            />
          </div>
          <div className="text-white bg-[#FFFFFF0D] p-6 rounded-lg w-[413px] mt-[32px]">
            <p className="lg:text-[24px] text-[18px] mb-4">Our Services</p>
            <div className="space-y-3">
              {services.map((s) => (
                <Link
                  href={`/${locale}/services/${s.slug}`}
                  key={s.id}
                  className={`block text-[20px] hover:text-primary transition-colors ${
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
        <div className="w-full mt-[80px]">
          <h3 className="text-[48px] text-primary font-medium">
            {params?.locale === Languages.ARABIC ? "الأسئلة الشائعة" : "FAQ"}
          </h3>
          <Accordions CategoryStatus={false} />
        </div>
      </div>
    </main>
  );
}

export default ServiceDetails;
