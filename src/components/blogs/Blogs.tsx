"use client";

import Banner from "../custom/banner";
import BlogCard from "./BlogCard";
import BlogItem from "./BlogItem";
import { useFetch } from "@/hooks/useFetch";
import { Blog } from "@/types/Blogs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface ApiResponse {
  data: Blog[];
  public: boolean;
}

interface PageSettings {
  title: string;
  title_en: string;
  banner: {
    data: {
      full_url: string;
    };
  };
}

interface PageSettingsResponse {
  data: PageSettings[];
  public: boolean;
}

interface BlogsProps {
  locale: string;
}

function BlogsContent({ locale }: BlogsProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const categoryQuery = searchParams.get("category") || "";
  const _fields =
    "id, title, title_en, slug, thumbnail.data.full_url, thumbnail_en.data.full_url, created_on, category.title, category.title_en, category.slug";

  const fetchParams = {
    fields: _fields,
    ...(searchQuery && { "filter[title][contains]": searchQuery }),
    ...(categoryQuery && { "filter[category.id]": categoryQuery }),
  };

  const {
    data: response,
    loading,
    error,
  } = useFetch<ApiResponse>("/items/posts", fetchParams);

  // get page Settings
  const {
    data: pageSettings,
    loading: pageSettingsLoading,
    error: pageSettingsError,
  } = useFetch<PageSettingsResponse>("/items/other_pages", {
    fields: "*.*",
    "filter[slug]": "blog",
  });

  console.log(pageSettings, pageSettingsLoading, pageSettingsError);

  if (loading) {
    return (
      <section className="my-[220px] mx-[10px] md:mx-[40px] sm:mx-[20px] lg:mx-[80px]">
        <Banner pageSettings={pageSettings?.data || []} locale={locale} />
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="my-[220px] mx-[10px] md:mx-[40px] sm:mx-[20px] lg:mx-[80px]">
        <Banner pageSettings={pageSettings?.data || []} locale={locale} />
        <div className="flex justify-center items-center h-[400px]">
          <p className="text-white text-xl">
            Error loading blogs. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="my-[220px] mx-[10px] md:mx-[40px] sm:mx-[20px] xl:mx-[80px]">
      <Banner pageSettings={pageSettings?.data || []} locale={locale} />
      <div className="flex justify-between gap-[20px] xl:flex-row flex-col">
        <BlogCard blogs={response?.data || []} locale={locale} />
        <BlogItem locale={locale} />
      </div>
    </section>
  );
}

function Blogs(props: BlogsProps) {
  return (
    <Suspense
      fallback={
        <section className="my-[220px] mx-[10px] md:mx-[40px] sm:mx-[20px] lg:mx-[80px]">
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </section>
      }
    >
      <BlogsContent {...props} />
    </Suspense>
  );
}

export default Blogs;
