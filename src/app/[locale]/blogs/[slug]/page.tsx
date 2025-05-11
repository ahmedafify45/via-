import BlogDetails from "@/components/blogs/BlogDetails";
import { Metadata } from "next";
import { serverFetcher } from "@/lib/serverFetcher";
import { i18n } from "@/i18n.config";
import { Languages } from "@/constants/enums";
import { Blog } from "@/types/Blogs";

export async function generateStaticParams() {
  try {
    const response = await serverFetcher<{ data: Blog[] }>("/items/posts", {
      fields: "id,slug",
    });

    const blogs = response.data || [];

    return i18n.locales.flatMap((locale) =>
      blogs.map((blog) => ({
        locale,
        slug: blog.slug,
      }))
    );
  } catch (error) {
    console.error("Error generating blog params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const blog = await serverFetcher<{ data: Blog[] }>("/items/posts", {
    fields: "*.*",
    "filter[slug]": slug,
  });

  const blogItem = blog.data[0];
  if (!blogItem) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const seoData =
    locale === Languages.ARABIC ? blogItem.seo_meta : blogItem.seo_meta_en;

  const title =
    seoData?.title ||
    (locale === Languages.ARABIC ? blogItem.title : blogItem.title_en);

  const description =
    seoData?.description || "Explore our latest blog posts and insights";

  const thumbnailUrl =
    locale === Languages.ARABIC
      ? blogItem.thumbnail?.data?.full_url
      : blogItem.thumbnail_en?.data?.full_url;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/blogs/${slug}`,
      siteName: title,
      images: thumbnailUrl
        ? [
            {
              url: thumbnailUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: thumbnailUrl ? [thumbnailUrl] : [],
    },
    alternates: {
      canonical: `/blogs/${slug}`,
      languages: {
        ar: `/ar/blogs/${slug}`,
        en: `/en/blogs/${slug}`,
      },
    },
  };

  return metadata;
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  return <BlogDetails slug={slug} locale={locale} />;
}
