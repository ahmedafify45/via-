import React from "react";

interface BannerProps {
  title?: string;
  subtitle?: string;
  image?: string;
}

function Banner({
  title,
  subtitle,
  image = "/images/banner.png",
}: BannerProps) {
  return (
    <section className="relative w-full h-[329px] mb-12 text-black">
      <div
        className="absolute inset-0 rounded-[30px]"
        style={{
          backgroundImage: `url("${image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-[#FFCD05] opacity-50 rounded-[30px]" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        {title && <h1 className="text-4xl font-bold mb-4">{title}</h1>}
        {subtitle && <p className="text-xl">{subtitle}</p>}
      </div>
    </section>
  );
}

export default Banner;
