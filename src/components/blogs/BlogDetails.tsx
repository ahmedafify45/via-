"use client";

import Image from "next/image";
import Banner from "../custom/banner";
import BlogItem from "./BlogItem";
import CommentSection from "./CommentSection";
import { useFetch } from "@/hooks/useFetch";
import { Languages } from "@/constants/enums";
import { Blog } from "@/types/Blogs";
import { useState } from "react";

interface ApiResponse {
  data: Blog[];
  public: boolean;
}

function BlogDetails({ slug, locale }: { slug: string; locale: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: response,
    loading,
    error,
  } = useFetch<ApiResponse>("/items/posts", {
    fields: "*.*",
  });
  const isEnglish = locale === Languages.ENGLISH;

  if (loading) {
    return (
      <main className="mx-[80px] my-[220px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </main>
    );
  }

  if (error) {
    console.error("Blog fetch error details:", {
      error,
      slug,
      apiUrl: "/items/posts",
      response,
    });
    return (
      <main className="mx-[80px] my-[220px] flex items-center justify-center">
        <div className="text-white text-xl">
          Error loading blog. Please try again later.
          <div className="text-sm mt-2">Error: {error.message}</div>
        </div>
      </main>
    );
  }

  if (!response?.data) {
    console.error("No blog data found:", {
      slug,
      response,
      apiUrl: "/items/posts",
    });
    return (
      <main className="mx-[80px] my-[220px] flex items-center justify-center">
        <div className="text-white text-xl">Blog not found.</div>
      </main>
    );
  }

  const blog = response.data.find((post) => post.slug === slug);

  if (!blog) {
    console.error("Blog with slug not found:", {
      slug,
      availableSlugs: response.data.map((post) => post.slug),
    });
    return (
      <main className="mx-[80px] my-[220px] flex items-center justify-center">
        <div className="text-white text-xl">Blog not found.</div>
      </main>
    );
  }

  return (
    <main className="mx-4 md:mx-[40px] lg:mx-[80px] my-[100px] md:my-[150px] lg:my-[220px]">
      <div>
        <Banner title="Our Blogs" subtitle="Home / Blogs" />
        <div className="flex justify-between gap-[20px] xl:flex-row flex-col">
          <div className="flex flex-col gap-[20px]">
            <div className="w-full">
              {blog.thumbnail && (
                <Image
                  width={847}
                  height={531}
                  src={
                    isEnglish
                      ? blog.thumbnail_en?.data?.full_url
                      : blog.thumbnail?.data?.full_url
                  }
                  alt={isEnglish ? blog.title_en : blog.title}
                  className="rounded-[4px] w-full h-auto object-cover"
                />
              )}
            </div>
            <h1 className="text-primary text-[18px] md:text-[20px] lg:text-[24px] font-medium">
              {Languages.ENGLISH ? blog.title_en : blog.title} /{" "}
              {new Date(blog.created_on).toLocaleDateString()}
            </h1>
            <div
              className="text-white max-w-[847px] text-[14px] md:text-[16px] leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: isEnglish ? blog.description_en : blog.description,
              }}
            />
          </div>
          <BlogItem
            locale={locale}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <CommentSection />
      </div>
    </main>
  );
}

export default BlogDetails;
