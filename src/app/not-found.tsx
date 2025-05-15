"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { serverFetcher } from "@/lib/serverFetcher";
import { ErrorPageResponse } from "@/types/errorPage";
import { Languages } from "@/constants/enums";

export default function NotFound() {
  const [errorPage, setErrorPage] = useState<
    ErrorPageResponse["data"][0] | null
  >(null);
  const [isEnglish, setIsEnglish] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    setIsEnglish(path.startsWith("/en"));

    const fetchData = async () => {
      try {
        const { data } = await serverFetcher<ErrorPageResponse>(
          "/items/other_pages",
          {
            fields: "*.*",
            "filter[slug]": "error-page",
          }
        );
        setErrorPage(data[0]);
      } catch (error) {
        console.error("Error fetching error page data:", error);
      }
    };

    fetchData();
  }, []);

  if (!errorPage) {
    return null;
  }

  return (
    <main className="my-[210px]">
      <div className="flex items-center justify-between ">
        <div>
          <Image
            src={errorPage.banner.data.full_url}
            alt="404"
            width={400}
            height={400}
          />
        </div>
        <div className="flex flex-col gap-[24px] items-center justify-center mr-[182px]">
          <h1 className="text-white text-[113.78px] font-bold">
            {isEnglish ? errorPage.title_en : errorPage.title}
          </h1>
          <h2 className="text-primary text-[48px] font-medium">
            {isEnglish
              ? errorPage.options.sub_title_en
              : errorPage.options.sub_title}
          </h2>
          <p className="text-white text-[24px] font-normal">
            {isEnglish ? errorPage.options.title_en : errorPage.options.title}
          </p>
          <Link href={`/${isEnglish ? Languages.ENGLISH : Languages.ARABIC}`}>
            <Button className="text-black h-[50px] w-[174px]">
              {isEnglish
                ? errorPage.options.button_text_en
                : errorPage.options.button_text}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
