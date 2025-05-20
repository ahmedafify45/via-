"use client";

import Banner from "../custom/banner";
import ContactForm from "./ContactForm";
import InformationContact from "./InformationContact";
import OurClients from "@/app/[locale]/_components/OurClients";
import { useFetch } from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import Loading from "../Loading";

interface BannerImage {
  data: {
    full_url: string;
  };
}

interface PageSetting {
  id: number;
  sort: number;
  title: string;
  sub_title: string;
  is_active: boolean;
  title_en: string;
  sub_title_en: string;
  slug: string;
  banner: BannerImage;
}

interface PageSettings {
  data: PageSetting[];
}

interface GeneralSettings {
  data: {
    location_map: string;
  }[];
  public: boolean;
}

function Contact() {
  const locale = useParams();

  const {
    data: pageSettings,
    loading: pageSettingsLoading,
    error: pageSettingsError,
  } = useFetch<PageSettings>("/items/other_pages", {
    fields: "*.*",
    "filter[slug]": "contact-us",
  });

  const {
    data: generalSettings,
    loading: generalSettingsLoading,
    error: generalSettingsError,
  } = useFetch<GeneralSettings>("/items/general_settings", {
    fields: "location_map",
  });

  console.log("General Settings Response:", generalSettings);

  if (pageSettingsLoading || generalSettingsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (pageSettingsError || generalSettingsError) {
    console.error("API Errors:", { pageSettingsError, generalSettingsError });
    return <div>Error loading contact information.</div>;
  }

  if (!generalSettings?.data?.[0]?.location_map) {
    console.error("Missing location map data:", generalSettings);
    return <div>Location map data not found.</div>;
  }

  const locationMapUrl = generalSettings.data[0].location_map;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationMapUrl
  )}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    locationMapUrl
  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className=" py-20 my-[220px]">
      <div className=" px-4">
        <Banner
          pageSettings={pageSettings?.data || []}
          locale={locale.locale as string}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-12">
          <div className="w-full">
            <ContactForm />
          </div>
          <div className="w-full h-[400px] lg:h-[500px] relative">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300"
            >
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </a>
          </div>
        </div>

        <div className="mt-16">
          <InformationContact />
        </div>

        <div className="mt-16">
          <OurClients />
        </div>
      </div>
    </section>
  );
}

export default Contact;
