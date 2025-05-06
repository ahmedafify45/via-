import { Languages } from "@/constants/enums";
import React from "react";

interface BannerProps {
  title?: string;
  subtitle?: string;
  image?: string;
  pageSettings: PageSettings[];
  locale?: string;
  isMain?: boolean;
}

interface PageSettings {
  title: string;
  title_en: string;
  banner: BannerImage;
}

interface BannerImage {
  data: {
    full_url: string;
  };
}

function Banner({
  title,
  subtitle,
  image = "/images/banner.png",
  pageSettings,
  locale,
  isMain = true,
}: BannerProps) {
  console.log("page", pageSettings, title, subtitle, image);
  const isEnglish = locale === Languages.ENGLISH;

  const titlePage = isEnglish
    ? pageSettings[0]?.title_en
    : pageSettings[0]?.title;

  const bannerImage = pageSettings[0]?.banner?.data?.full_url;

  const breadcrumb = ["Home"];

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  isMain ? breadcrumb.push(titlePage) : breadcrumb.push(titlePage);

  return (
    <section className="relative w-full h-[329px] mb-12 text-black">
      <div
        className="absolute inset-0 rounded-[30px]"
        style={{
          backgroundImage: `url("${bannerImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-[#FFCD05] opacity-50 rounded-[30px]" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        {titlePage && <h1 className="text-4xl font-bold mb-4">{titlePage}</h1>}
        {/* {breadcrumb.map((c, index) => (
          <span key={index} className="">
            {c}
          </span>
        ))} */}
      </div>
    </section>
  );
}

export default Banner;
