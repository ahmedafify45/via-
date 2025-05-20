import React from "react";
import { i18n } from "@/i18n.config";
import { serverFetcher } from "@/lib/serverFetcher";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import type { PageProps } from "@/types/page";

interface CustomPage {
  id: number;
  name: string;
  name_en: string;
  slug: string;
  content: string;
  content_en: string;
  seo_meta?: {
    title: string;
    description: string;
  };
  seo_meta_en?: {
    title: string;
    description: string;
  };
  banner: {
    data: {
      full_url: string;
    } | null;
  } | null;
}

interface CustomPageResponse {
  data: CustomPage[];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const response = await serverFetcher<CustomPageResponse>(
      "/items/custom_pages",
      {
        fields: "name,name_en,seo_meta,seo_meta_en",
        "filter[slug]": resolvedParams.slug,
      }
    );

    const page = response.data[0];

    if (!page) {
      return {
        title: "Page Not Found",
      };
    }

    // Use page name as fallback if SEO title is not available
    const title =
      resolvedParams.locale === "en"
        ? page.seo_meta_en?.title || page.name_en
        : page.seo_meta?.title || page.name;

    const description =
      resolvedParams.locale === "en"
        ? page.seo_meta_en?.description || ""
        : page.seo_meta?.description || "";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
    };
  } catch {
    return {
      title: "Error",
    };
  }
}

export async function generateStaticParams() {
  try {
    const response = await serverFetcher<CustomPageResponse>(
      "/items/custom_pages",
      {
        fields: "slug",
      }
    );

    const pages = response.data;
    const params = [];

    for (const locale of i18n.locales) {
      for (const page of pages) {
        params.push({
          locale,
          slug: page.slug,
        });
      }
    }

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  try {
    const response = await serverFetcher<CustomPageResponse>(
      "/items/custom_pages",
      {
        fields:
          "id,name,name_en,slug,content,content_en,seo_meta,seo_meta_en,banner",
      }
    );

    const page = response.data.find(
      (page) => page.slug === resolvedParams.slug
    );

    if (!page) {
      notFound();
    }

    // Clean up the English content by removing unnecessary wrapper divs
    const cleanEnglishContent = page.content_en.replace(
      /<div[^>]*>|<\/div>/g,
      ""
    );

    return (
      <main className="pt-[220px] py-[50px]">
        <div className="px-2 xl:px-4">
          <div className="max-w-full px-2 xl:px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
              {resolvedParams.locale === "en" ? page.name_en : page.name}
            </h1>
            <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
              <div className="p-8">
                <div
                  className="prose prose-invert max-w-none
                    prose-headings:text-white
                    prose-p:text-muted-foreground
                    prose-strong:text-white
                    prose-a:text-primary hover:prose-a:text-primary/80
                    prose-ul:text-muted-foreground
                    prose-li:text-muted-foreground
                    prose-h4:text-xl prose-h4:font-semibold prose-h4:text-white
                    prose-h1:text-3xl prose-h1:font-bold prose-h1:text-primary
                    [&>div]:text-muted-foreground
                    prose-headings:mb-6
                    prose-p:mb-6
                    prose-ul:mb-6
                    prose-li:mb-3
                    [&_h4]:mb-6
                    [&_p]:mb-6
                    [&_ul]:mb-6
                    [&_li]:mb-3
                    [&_li]:ml-4
                    space-y-8"
                  dangerouslySetInnerHTML={{
                    __html:
                      resolvedParams.locale === "en"
                        ? cleanEnglishContent
                        : page.content,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error in Page component:", error);
    throw error;
  }
}
