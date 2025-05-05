"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useFetch } from "@/hooks/useFetch";
import { Languages } from "@/constants/enums";
import { Blog } from "@/types/Blogs";

interface Category {
  id?: number;
  title?: string;
  title_en?: string;
  slug?: string;
  seo_meta?: {
    title?: string;
    description?: string;
  };
  seo_meta_en: {
    title: string;
    description: string;
  };
}

interface ApiResponse {
  data: Category[];
  public: boolean;
}

interface PostsResponse {
  data: Blog[];
  public: boolean;
}

interface BlogItemProps {
  locale: string;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

function BlogItem({
  locale,
  searchQuery: externalSearchQuery,
  setSearchQuery: externalSetSearchQuery,
}: BlogItemProps) {
  const [internalSearchQuery, setInternalSearchQuery] = useState(
    externalSearchQuery || ""
  );

  const {
    data: response,
    loading,
    error,
  } = useFetch<ApiResponse>("/items/post_categories", {
    fields: "*.*",
  });

  const {
    data: postsResponse,
    loading: postsLoading,
    error: postsError,
  } = useFetch<PostsResponse>("/items/posts", {
    fields:
      "id,created_on,title,title_en,thumbnail.data.full_url,thumbnail_en.data.full_url,slug,tags,tags_en",
    sort: "-created_on",
    limit: 5,
  });

  const isEnglish = locale === Languages.ENGLISH;

  const followUs = [
    {
      id: 1,
      icon: <FontAwesomeIcon icon={faFacebook} />,
      link: "https://www.facebook.com",
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={faInstagram} />,
      link: "https://www.instagram.com",
    },
    {
      id: 3,
      icon: <FontAwesomeIcon icon={faTwitter} />,
      link: "https://www.twitter.com",
    },
    {
      id: 4,
      icon: <FontAwesomeIcon icon={faYoutube} />,
      link: "https://www.youtube.com",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = externalSearchQuery || internalSearchQuery;
    if (query.trim()) {
      if (externalSetSearchQuery) {
        externalSetSearchQuery(query);
      } else {
        window.location.href = `/${locale}/blogs?q=${encodeURIComponent(
          query
        )}`;
      }
    } else {
      if (externalSetSearchQuery) {
        externalSetSearchQuery("");
      } else {
        window.location.href = `/${locale}/blogs`;
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (externalSetSearchQuery) {
      externalSetSearchQuery(newValue);
    } else {
      setInternalSearchQuery(newValue);
    }
  };

  return (
    <div className="lg:w-[413px] w-full">
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-[#17181C] rounded-lg p-[16px] w-full h-[104px] border border-[#25231B]"
      >
        <Input
          placeholder="Search Here"
          className="rounded-none border border-secondary text-white bg-[#161718] placeholder:text-[#808080] h-[56px]"
          value={externalSearchQuery || internalSearchQuery}
          onChange={handleSearchChange}
        />
        <Button
          type="submit"
          className="text-white bg-primary rounded-none w-[59px] h-[56px]"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </form>
      <div className="my-[20px] bg-[#17181C] p-[20px] rounded-[16px] border border-[#25231B] ">
        <h3 className="text-[20px] font-medium text-white border-t border-b border-r border-primary rounded-br-[16px] inline-block px-4 py-2 mb-[24px]">
          Recent Posts
        </h3>
        <div className="flex flex-col gap-[16px] ">
          {postsLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
          ) : postsError ? (
            <p className="text-white">Error loading recent posts</p>
          ) : (
            postsResponse?.data.map((post) => (
              <div key={post.id} className="flex items-center gap-[16px]">
                <Image
                  src={
                    Languages.ENGLISH
                      ? post.thumbnail_en?.data?.full_url ||
                        "/placeholder-image.jpg"
                      : post.thumbnail?.data?.full_url ||
                        "/placeholder-image.jpg"
                  }
                  alt={Languages.ENGLISH ? post.title_en : post.title}
                  width={100}
                  height={100}
                />
                <div className="flex-1">
                  <h4 className="text-[16px] font-medium text-white">
                    {isEnglish ? post.title_en : post.title}
                  </h4>
                  <p className="text-[14px] font-normal text-secondary text-right">
                    {new Date(post.created_on).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="my-[20px] bg-[#17181C] p-[20px] rounded-[16px] border border-[#25231B] ">
        <h3 className="text-[20px] font-medium text-white border-t border-b border-r border-primary rounded-br-[16px] inline-block px-4 py-2 mb-[24px]">
          Our Categories
        </h3>
        <div className="flex flex-col gap-[16px] ">
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
          ) : error ? (
            <p className="text-white">Error loading categories</p>
          ) : (
            response?.data.map((category) => (
              <div key={category.id} className="flex items-center gap-[16px]">
                <Link
                  // href={`/categories/${category.slug}`}
                  href={`/${locale}/blogs?category=${category.id}`}
                  className="text-[18px] font-medium text-white hover:text-primary transition-all duration-300"
                >
                  {isEnglish ? category.title_en : category.title}
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="my-[20px] bg-[#17181C] p-[20px] rounded-[16px] border border-[#25231B] ">
        <h3 className="text-[20px] font-medium text-white border-t border-b border-r border-primary rounded-br-[16px] inline-block px-4 py-2 mb-[24px]">
          Follow Us
        </h3>
        <div className="flex gap-[16px]">
          {followUs.map((follow) => (
            <div
              key={follow.id}
              className="w-[40px] h-[40px] text-[#FCFCFC] bg-[#787878] rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300"
            >
              <Link href={follow.link} className="text-[20px] w-[20px]">
                {follow.icon}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="my-[20px] bg-[#17181C] p-[20px] rounded-[16px] border border-[#25231B] ">
        <h3 className="text-[20px] font-medium text-white border-t border-b border-r border-primary rounded-br-[16px] inline-block px-4 py-2 mb-[24px]">
          Tags
        </h3>
        <div className="grid grid-cols-2 gap-[16px]">
          {postsResponse?.data.map((post) => {
            const tags = isEnglish
              ? post.tags_en?.split(",")
              : post.tags?.split(",");
            return tags?.map((tag, index) => (
              <div
                key={`${post.id}-${index}`}
                className="text-[16px] font-medium text-white bg-[#FFFFFF1A] p-[16px] rounded-[4px]"
              >
                <p>{tag.trim()}</p>
              </div>
            ));
          })}
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
