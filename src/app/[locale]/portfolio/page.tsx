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
      <main className="my-[220px] py-20 mx-2 xl:mx-[80px]">
        <div className=" px-2">
          <Banner pageSettings={pageSettings.data} locale={locale} />
          <Portfolio />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error loading portfolio page:", error);
    return (
      <main className="flex items-center justify-center py-20 mx-2 xl:mx-[80px]">
        <div className="container px-4 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Error</h2>
          <p className="text-white">
            Failed to load portfolio page. Please try again later.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Error: {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </main>
    );
  }
}

export default Portfoliopage;
