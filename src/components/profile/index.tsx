"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PortfolioItem {
  title: string;
  image: string;
  slug: string;
  category: string;
}

interface PortfolioProps {
  portfolio: {
    title: string;
    slug: string;
  }[];
}

function Portfolio({ portfolio }: PortfolioProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const portfolio_Product: PortfolioItem[] = [
    {
      title: "Portfolio 1",
      image: "/images/website1.png",
      slug: "portfolio-1",
      category: "Photo shoot",
    },
    {
      title: "Portfolio 2",
      image: "/images/website2.png",
      slug: "portfolio-2",
      category: "Branding",
    },
    {
      title: "Portfolio 3",
      image: "/images/website3.png",
      slug: "portfolio-3",
      category: "Social Designs",
    },
    {
      title: "Portfolio 4",
      image: "/images/website1.png",
      slug: "portfolio-4",
      category: "Social Designs",
    },
    {
      title: "Portfolio 5",
      image: "/images/website2.png",
      slug: "portfolio-5",
      category: "Photo shoot",
    },
    {
      title: "Portfolio 6",
      image: "/images/website3.png",
      slug: "portfolio-6",
      category: "Social Designs",
    },
  ];

  const handlePortfolioClick = (slug: string) => {
    router.push(`/portfolio/${slug}`);
  };

  const filteredPortfolio =
    selectedCategory === "All"
      ? portfolio_Product
      : portfolio_Product.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-[24px]">
      <div className="flex items-center justify-center gap-4 mt-[40px] overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center gap-4 bg-[#FFFFFF1A] px-6 py-3 rounded-tl-[24px] rounded-br-[24px] backdrop-blur-sm">
          <Button
            onClick={() => setSelectedCategory("All")}
            className={`${
              selectedCategory === "All"
                ? "bg-primary text-black shadow-lg"
                : "bg-secondary hover:bg-primary hover:text-black"
            } transition-all duration-300 snap-center h-[40px] px-6 rounded-full text-sm font-medium sm:hidden`}
          >
            All
          </Button>

          {portfolio.map((item) => (
            <Button
              key={item.slug}
              onClick={() => setSelectedCategory(item.title)}
              className={`${
                selectedCategory === item.title
                  ? "bg-primary text-black shadow-lg"
                  : "bg-secondary hover:bg-primary hover:text-black"
              } transition-all duration-300 snap-center h-[40px] px-6 rounded-full text-sm font-medium`}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[24px]">
        {filteredPortfolio.map((item) => (
          <div
            key={item.slug}
            onClick={() => handlePortfolioClick(item.slug)}
            className="group relative overflow-hidden rounded-[20px] bg-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex h-full items-center justify-center">
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
