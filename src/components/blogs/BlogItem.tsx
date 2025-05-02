"use client";

import React from "react";
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

interface Category {
  id: number;
  title: string;
  title_en: string;
  slug: string;
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
  data: Category[];
  public: boolean;
}

function BlogItem({ locale }: { locale: string }) {
  const {
    data: response,
    loading,
    error,
  } = useFetch<ApiResponse>("/items/post_categories");
  const isEnglish = locale === "en";

  const recentPosts = [
    {
      id: 1,
      title: "How to make a website",
      image: "/images/blog.png",
      date: "20 Feb 2025",
    },
    {
      id: 2,
      title: "How to make a website",
      image: "/images/blog.png",
      date: "20 Feb 2025",
    },
    {
      id: 3,
      title: "How to make a website",
      image: "/images/blog.png",
      date: "20 Feb 2025",
    },
    {
      id: 4,
      title: "How to make a website",
      image: "/images/blog.png",
      date: "20 Feb 2025",
    },
    {
      id: 5,
      title: "How to make a website",
      image: "/images/blog.png",
      date: "20 Feb 2025",
    },
  ];

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

  const tags = [
    {
      id: 1,
      title: "Social Designs",
    },
    {
      id: 2,
      title: "Photo shoot",
    },
    {
      id: 3,
      title: "Social Designs",
    },
    {
      id: 4,
      title: "Photo shoot",
    },
  ];

  return (
    <div className="lg:w-[413px] w-full">
      <div className="flex items-center bg-[#17181C] rounded-lg p-[16px] w-full h-[104px] border border-[#25231B]">
        <Input
          placeholder="Search Here"
          className="rounded-none border border-secondary text-white bg-[#161718] placeholder:text-[#808080] h-[56px]"
        />
        <Button className="text-white bg-primary rounded-none w-[59px] h-[56px]">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </div>
      <div className="my-[20px] bg-[#17181C] p-[20px] rounded-[16px] border border-[#25231B] ">
        <h3 className="text-[20px] font-medium text-white border-t border-b border-r border-primary rounded-br-[16px] inline-block px-4 py-2 mb-[24px]">
          Recent Posts
        </h3>
        <div className="flex flex-col gap-[16px] ">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex items-center gap-[16px]">
              <Image
                src={post.image}
                alt={post.title}
                width={100}
                height={100}
              />
              <div className="flex-1">
                <h4 className="text-[16px] font-medium text-white">
                  {post.title}
                </h4>
                <p className="text-[14px] font-normal text-secondary text-right">
                  {post.date}
                </p>
              </div>
            </div>
          ))}
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
                  href={`/categories/${category.slug}`}
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
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="text-[16px] font-medium text-white bg-[#FFFFFF1A] p-[16px] rounded-[4px]"
            >
              <p>{tag.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
