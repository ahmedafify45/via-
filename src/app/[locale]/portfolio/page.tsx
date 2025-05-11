import Banner from "@/components/custom/banner";
import Portfolio from "@/components/profile";
import { Languages } from "@/constants/enums";
import { serverFetcher } from "@/lib/serverFetcher";
import { Metadata } from "next";
import { generateStaticParams } from "@/lib/generateStaticParams";

export { generateStaticParams };

interface PageSettings {
  title: string;
  title_en: string;
  seo_meta: {
    title: string;
    description: string;
  };
  seo_meta_en: {
    title: string;
    description: string;
  };
  banner: {
    data: {
      full_url: string;
    };
  };
}

interface ApiResponse {
  data: PageSettings[];
  public: boolean;
}

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

/**
 * 

 */
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const pageSettings = await serverFetcher<ApiResponse>("/items/other_pages", {
    fields: "*.*",
    "filter[slug]": "portfolio",
  });

  console.log("pageSettings", pageSettings);

  const seoData =
    locale === Languages.ARABIC
      ? pageSettings.data[0]?.seo_meta
      : pageSettings.data[0]?.seo_meta_en;

  const title =
    seoData?.title ||
    (locale === Languages.ARABIC
      ? pageSettings.data[0]?.title
      : pageSettings.data[0]?.title_en);

  const description =
    seoData?.description ||
    "Explore our portfolio of projects and achievements";

  return {
    title: title || "Portfolio",
    description: description,
    openGraph: {
      title: title || "Portfolio",
      description: description,

      siteName: "Via",
      images: [
        {
          url: pageSettings.data[0]?.banner?.data?.full_url,
        },
      ],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
  };
}

async function Portfoliopage(props: PageProps) {
  const params = await props.params;
  const { locale } = params;

  try {
    const pageSettings = await serverFetcher<ApiResponse>(
      "/items/other_pages",
      {
        fields: "*.*",
        "filter[slug]": "portfolio",
      }
    );

    if (!pageSettings?.data) {
      throw new Error("No page settings data available");
    }

    return (
      <main className="my-[220px] mx-2 lg:mx-[80px]">
        <Banner pageSettings={pageSettings.data} locale={locale} />
        <Portfolio />
      </main>
    );
  } catch (error) {
    console.error("Error loading portfolio page:", error);
    return (
      <main className="my-[220px] mx-2 lg:mx-[80px] text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Error</h2>
        <p className="text-white">
          Failed to load portfolio page. Please try again later.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </main>
    );
  }
}

export default Portfoliopage;
