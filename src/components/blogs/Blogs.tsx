"use client";

import React from "react";
import Banner from "../custom/banner";
import BlogCard from "./BlogCard";
import BlogItem from "./BlogItem";
import { useFetch } from "@/hooks/useFetch";
import { Blog } from "@/types/Blogs";
import { useSearchParams } from "next/navigation";

interface ApiResponse {
  data: Blog[];
  public: boolean;
}

interface BlogsProps {
  locale: string;
}

function Blogs({ locale }: BlogsProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const categoryQuery = searchParams.get("c") || "";
  const _fields =
    "id, title, title_en, slug, thumbnail.data.full_url, thumbnail_en.data.full_url, created_on, category.title, category.title_en, category.slug";
  const {
    data: response,
    loading,
    error,
  } = searchQuery
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useFetch<ApiResponse>("/items/posts", {
        fields: _fields, // "*.*"
        "filter[title][contains]": searchQuery,

        // eslint-disable-next-line react-hooks/rules-of-hooks
      })
    : categoryQuery
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useFetch<ApiResponse>("/items/posts", {
        fields: _fields,
        "filter[category.id]": categoryQuery,
      })
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useFetch<ApiResponse>("/items/posts", {
        fields: _fields,
      });

  const filteredBlogs = React.useMemo(() => {
    if (!response?.data) return [];

    return response.data.filter((blog) => {
      // Handle category filter
      if (categoryQuery && blog.category?.id?.toString() !== categoryQuery) {
        return false;
      }

      // Handle search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          blog.title.toLowerCase().includes(searchLower) ||
          blog.title_en.toLowerCase().includes(searchLower) ||
          blog.description.toLowerCase().includes(searchLower) ||
          blog.description_en.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [response?.data, searchQuery, categoryQuery]);

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
    <section className="my-[220px] mx-[10px] md:mx-[40px] sm:mx-[20px] xl:mx-[80px]">
      <Banner title="Blogs" subtitle="Home / Blogs" />
      <div className="flex justify-between gap-[20px] xl:flex-row flex-col">
        <BlogCard blogs={filteredBlogs} locale={locale} />
        <BlogItem locale={locale} />
      </div>
    </section>
  );
}

export default Blogs;
