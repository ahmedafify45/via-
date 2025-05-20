import Contact from "@/components/contact/Contact";
import { Languages } from "@/constants/enums";
import { generateStaticParams } from "@/lib/generateStaticParams";
import { Metadata } from "next";
import { serverFetcher } from "@/lib/serverFetcher";

export { generateStaticParams };

interface ApiResponse {
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
  const pageSettings = await serverFetcher<ApiResponse>("/items/other_pages", {
    fields: "*.*",
    "filter[slug]": "contact-us",
  });

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
      url: `/contact`,
      siteName: title,
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

function ContactPage() {
  return (
    <main className="px-[80px]">
      <Contact />
    </main>
  );
}

export default ContactPage;
