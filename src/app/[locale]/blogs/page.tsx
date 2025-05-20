import Blogs from "@/components/blogs/Blogs";
import { Languages } from "@/constants/enums";
import { generateStaticParams } from "@/lib/generateStaticParams";
import { serverFetcher } from "@/lib/serverFetcher";
import { Metadata } from "next";

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
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const pageSettings = await serverFetcher<ApiResponse>("/items/other_pages", {
    fields: "*.*",
    "filter[slug]": "blog",
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
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `/blogs`,
      siteName: "My Website",
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

async function BlogsPage(props: PageProps) {
  const { locale } = await props.params;

  return (
    <main>
      <Blogs locale={locale} />
    </main>
  );
}
export default BlogsPage;
