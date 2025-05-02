"use client";

import React from "react";
import Banner from "../custom/banner";
import BlogCard from "./BlogCard";
import BlogItem from "./BlogItem";
import { useFetch } from "@/hooks/useFetch";

interface Blog {
  id: number;
  title: string;
  title_en: string;
  slug: string;
  description: string;
  description_en: string;
  thumbnail: string | null;
  thumbnail_en: string | null;
  created_on: string;
  category: number;
  tags: string;
  tags_en: string | null;
  seo_meta: {
    title: string;
    description: string;
  };
  seo_meta_en: {
    title: string;
    description: string;
  };
}

interface ApiResponse {
  data: Blog[];
  public: boolean;
}

interface BlogsProps {
  locale: string;
}

function Blogs({ locale }: BlogsProps) {
  const {
    data: response,
    loading,
    error,
  } = useFetch<ApiResponse>("/items/posts");

  if (loading) {
    return (
      <section className="my-[220px] mx-[10px] md:mx-[40px] sm:mx-[20px] lg:mx-[80px]">
        <Banner title="Blogs" subtitle="Home / Blogs" />
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="my-[220px] mx-[10px] md:mx-[40px] sm:mx-[20px] lg:mx-[80px]">
        <Banner title="Blogs" subtitle="Home / Blogs" />
        <div className="flex justify-center items-center h-[400px]">
          <p className="text-white text-xl">
            Error loading blogs. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="my-[220px] mx-[10px] md:mx-[40px] sm:mx-[20px] lg:mx-[80px]">
      <Banner title="Blogs" subtitle="Home / Blogs" />
      <div className="flex justify-between gap-[20px] lg:flex-row flex-col">
        <BlogCard blogs={response?.data || []} locale={locale} />
        <BlogItem />
      </div>
    </section>
  );
}

export default Blogs;
