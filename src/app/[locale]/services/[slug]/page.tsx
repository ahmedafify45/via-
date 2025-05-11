import ServiceDetails from "@/components/service/ServiceDetails";
import { serverFetcher } from "@/lib/serverFetcher";
import { i18n } from "@/i18n.config";
import { Metadata } from "next";
import { Languages } from "@/constants/enums";
import { Service } from "@/types/services";

export async function generateStaticParams() {
  try {
    const response = await serverFetcher<{ data: Service[] }>(
      "/items/services",
      {
        fields: "id,slug",
      }
    );

    const services = response.data || [];

    return i18n.locales.flatMap((locale) =>
      services.map((service) => ({
        locale,
        slug: service.slug,
      }))
    );
  } catch (error) {
    console.error("Error generating service params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const service = await serverFetcher<{ data: Service[] }>("/items/services", {
    fields: "*.*",
    "filter[slug]": slug,
  });

  const serviceItem = service.data[0];
  if (!serviceItem) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  const seoData =
    locale === Languages.ARABIC
      ? serviceItem.seo_meta
      : serviceItem.seo_meta_en;

  const title =
    seoData?.title ||
    (locale === Languages.ARABIC ? serviceItem.name : serviceItem.name_en);

  const description =
    seoData?.description ||
    (locale === Languages.ARABIC
      ? serviceItem.summary
      : serviceItem.summary_en);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/services/${slug}`,
      siteName: "My Website",
      images: [
        {
          url: serviceItem.photo?.data?.full_url || "",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [serviceItem.photo?.data?.full_url || ""],
    },
  };
}

export default function ServicePage() {
  return <ServiceDetails />;
}
