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
  faLinkedin,
  faTiktok,
  faTelegram,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { useFetch } from "@/hooks/useFetch";
import { Languages } from "@/constants/enums";
import { Blog } from "@/types/Blogs";
import enTranslations from "@/dictionaries/en.json";
import arTranslations from "@/dictionaries/ar.json";

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

interface GeneralSettings {
  social_links: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
    linkedin?: string;
    tiktok?: string;
    telegram?: string;
    pinterest?: string;
  };
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
  const translations =
    locale === Languages.ENGLISH ? enTranslations : arTranslations;
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

  const { data: generalSettings } = useFetch<{ data: GeneralSettings[] }>(
    "/items/general_settings",
    {
      fields: "social_links",
    }
  );

  const isEnglish = locale === Languages.ENGLISH;

  const followUs = [
    {
      id: 1,
      icon: <FontAwesomeIcon icon={faFacebook} />,
      link: generalSettings?.data[0]?.social_links?.facebook,
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={faInstagram} />,
      link: generalSettings?.data[0]?.social_links?.instagram,
    },
    {
      id: 3,
      icon: <FontAwesomeIcon icon={faTwitter} />,
      link: generalSettings?.data[0]?.social_links?.twitter,
    },
    {
      id: 4,
      icon: <FontAwesomeIcon icon={faYoutube} />,
      link: generalSettings?.data[0]?.social_links?.youtube,
    },
    {
      id: 5,
      icon: <FontAwesomeIcon icon={faLinkedin} />,
      link: generalSettings?.data[0]?.social_links?.linkedin,
    },
    {
      id: 6,
      icon: <FontAwesomeIcon icon={faTiktok} />,
      link: generalSettings?.data[0]?.social_links?.tiktok,
    },
    {
      id: 7,
      icon: <FontAwesomeIcon icon={faTelegram} />,
      link: generalSettings?.data[0]?.social_links?.telegram,
    },
    {
      id: 8,
      icon: <FontAwesomeIcon icon={faPinterest} />,
      link: generalSettings?.data[0]?.social_links?.pinterest,
    },
  ].filter((item) => item.link);

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
    <div className="xl:w-[313px] w-full">
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
          {translations.blog.recentPosts}
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
                  <h4 className="xl:text-[16px] text-[14px] font-medium text-white">
                    {isEnglish ? post.title_en : post.title}
                  </h4>
                  <p className="text-[12px] font-normal text-secondary text-right">
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
        <h3 className="xl:text-[20px] text-[16px] font-medium text-white border-t border-b border-r border-primary rounded-br-[16px] inline-block px-4 py-2 mb-[24px]">
          {translations.blog.ourCategories}
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
                  className="text-[14px] font-medium text-white hover:text-primary transition-all duration-300"
                >
                  {isEnglish ? category.title_en : category.title}
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="my-[20px] bg-[#17181C] p-[20px] rounded-[16px] border border-[#25231B] ">
        <h3 className="xl:text-[20px] text-[16px] font-medium text-white border-t border-b border-r border-primary rounded-br-[16px] inline-block px-4 py-2 mb-[24px]">
          {translations.blog.followUs}
        </h3>
        <div className="flex flex-wrap gap-[16px]">
          {followUs.map((follow) => (
            <div
              key={follow.id}
              className="w-[40px] h-[40px] text-[#FCFCFC] bg-[#787878] rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300"
            >
              <a
                target="_blank"
                href={follow.link || "#"}
                rel="noopener noreferrer"
                className="text-[20px] w-[20px]"
              >
                {follow.icon}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="my-[20px] bg-[#17181C] p-[20px] rounded-[16px] border border-[#25231B] ">
        <h3 className="xl:text-[20px] text-[16px] font-medium text-white border-t border-b border-r border-primary rounded-br-[16px] inline-block px-4 py-2 mb-[24px]">
          {translations.blog.tags}
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
                <p className="xl:text-[16px] text-[14px]">{tag.trim()}</p>
              </div>
            ));
          })}
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
