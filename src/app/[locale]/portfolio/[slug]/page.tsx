import { Metadata } from "next";
import { serverFetcher } from "@/lib/serverFetcher";
import { Languages } from "@/constants/enums";
import PortfolioDetails from "@/components/profile/PortfolioDetails";
import { i18n } from "@/i18n.config";

interface Portfolio {
  id: string;
  slug: string;
  name: string;
  name_en: string;
  seo_meta?: {
    title: string;
    description: string;
  };
  seo_meta_en?: {
    title: string;
    description: string;
  };
  banner?: {
    data: {
      full_url: string;
    };
  };
}

export async function generateStaticParams() {
  const locales = i18n.locales;
  const portfolios = await serverFetcher<{ data: Portfolio[] }>(
    "/items/portfolios",
    {
      fields: "id,slug",
    }
  );

  return portfolios.data.flatMap((portfolio) =>
    locales.map((locale) => ({
      locale,
      slug: portfolio.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const portfolio = await serverFetcher<{ data: Portfolio[] }>(
    "/items/portfolios",
    {
      fields: "*.*",
      "filter[slug]": slug,
    }
  );

  const portfolioItem = portfolio.data[0];
  if (!portfolioItem) {
    return {
      title: "Portfolio Not Found",
      description: "The requested portfolio item could not be found.",
    };
  }

  const seoData =
    locale === Languages.ARABIC
      ? portfolioItem.seo_meta
      : portfolioItem.seo_meta_en;

  const title =
    seoData?.title ||
    (locale === Languages.ARABIC ? portfolioItem.name : portfolioItem.name_en);

  const description =
    seoData?.description ||
    "Explore our portfolio of professional projects and solutions";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `/portfolio/${slug}`,
      siteName: "My Website",
      images: [
        {
          url: portfolioItem.banner?.data?.full_url || "",
        },
      ],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
  };
}

export default function Page() {
  return <PortfolioDetails />;
}
