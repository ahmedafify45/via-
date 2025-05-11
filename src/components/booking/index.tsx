import BookingTitle from "./BookingTitle";
import BookingForm from "./BookingForm";
import { serverFetcher } from "@/lib/serverFetcher";
import { Metadata } from "next";
import { Languages } from "@/constants/enums";

interface PageSettingsResponse {
  data: Array<{
    id: number;
    title: string;
    title_en: string;
    seo_meta?: {
      title: string;
      description: string;
    };
    seo_meta_en?: {
      title: string;
      description: string;
    };
    banner?: {
      data?: {
        full_url: string;
      };
    };
  }>;
}

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const pageSettings = await serverFetcher<PageSettingsResponse>(
    "/items/other_pages",
    {
      fields: "*.*",
      "filter[slug]": "appointments",
    }
  );

  const seoData =
    locale === Languages.ARABIC
      ? pageSettings.data[0]?.seo_meta
      : pageSettings.data[0]?.seo_meta_en;

  const title =
    seoData?.title ||
    (locale === Languages.ARABIC
      ? pageSettings.data[0]?.title
      : pageSettings.data[0]?.title_en);

  const description = seoData?.description;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `/appointments`,
      siteName: "Via",
      images: [
        {
          url: pageSettings.data[0]?.banner?.data?.full_url || "",
        },
      ],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
  };
}

async function Booking() {
  const { data: pageSettings } = await serverFetcher<PageSettingsResponse>(
    "/items/other_pages",
    {
      fields: "*.*",
      "filter[slug]": "appointments",
    }
  );

  const title = pageSettings[0]?.title;
  const title_en = pageSettings[0]?.title_en;

  return (
    <section className="flex flex-col gap-[20px]">
      <BookingTitle title={title} title_en={title_en} />
      <BookingForm />
    </section>
  );
}

export default Booking;
