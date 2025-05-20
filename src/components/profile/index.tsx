"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";
import { PortfolioItem } from "@/types/portfolio";
import { Languages } from "@/constants/enums";

interface PortfolioProps {
  portfolio?: { title: string; slug: string }[];
  limit?: number;
}

function Portfolio({ limit }: PortfolioProps = {}) {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as string;
  const all_Name = locale === Languages.ARABIC ? "الكل" : "All";

  const [selectedCategory, setSelectedCategory] = React.useState(all_Name);
  const isEnglish = locale === Languages.ENGLISH;
  const {
    data: portfolioData,
    loading,
    error,
  } = useFetch<{ data: PortfolioItem[] }>("/items/portfolios", {
    fields: "*.*",
  });

  const handlePortfolioClick = (slug: string) => {
    router.push(`/${locale}/portfolio/${slug}`);
  };

  if (loading) {
    return (
      <div className="w-full text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center text-red-500 py-8">
        {locale === Languages.ARABIC
          ? "خطأ في تحميل المحفظة"
          : "Error loading portfolio"}
      </div>
    );
  }

  if (!portfolioData?.data || portfolioData.data.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-8">
        {locale === Languages.ARABIC
          ? "لم يتم العثور على عناصر المحفظة"
          : "No portfolio items found"}
      </div>
    );
  }

  // Get unique categories from portfolio items and ensure they are strings
  const filterdCategories = portfolioData?.data
    ? [
        all_Name,
        ...portfolioData?.data.map((item) =>
          isEnglish ? item.category?.title_en : item.category?.title
        ),
      ]
    : [
        all_Name,
        ...new Set(
          portfolioData.data
            .map((item) =>
              String(isEnglish ? item.category?.title_en : item.category?.title)
            )
            .filter(Boolean)
        ),
      ];

  const categories = [...new Set(filterdCategories)];
  // : [
  //     "All",
  //     ...new Set(
  //       portfolioData.data
  //         .map((item) => String(item.category?.title))
  //         .filter(Boolean)
  //     ),
  //   ];

  const filteredPortfolio =
    selectedCategory === all_Name
      ? portfolioData.data
      : portfolioData.data.filter(
          (item) =>
            String(
              isEnglish ? item.category?.title_en : item.category?.title
            ) === selectedCategory
        );

  const limitedPortfolio = limit
    ? filteredPortfolio.slice(0, limit)
    : filteredPortfolio;

  console.log(categories, portfolioData);
  return (
    <div className="w-full">
      {categories.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12 mb-8">
          <div className="flex items-center gap-4 bg-[#FFFFFF1A] px-6 py-3 rounded-tl-[24px] rounded-br-[24px] backdrop-blur-sm overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-primary text-black shadow-lg"
                    : "bg-secondary hover:bg-primary hover:text-black"
                } transition-all duration-300 snap-center h-[40px] px-6 rounded-full text-sm font-medium whitespace-nowrap`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {limitedPortfolio.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handlePortfolioClick(item.slug)}
              className="group relative overflow-hidden rounded-[20px] bg-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer aspect-[4/3]"
            >
              <div className="relative w-full h-full">
                <Image
                  src={
                    item.thumbnail?.data?.full_url || "/images/placeholder.png"
                  }
                  alt={locale === Languages.ARABIC ? item.name : item.name_en}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center p-6">
                <h3 className="text-xl font-semibold text-white text-center">
                  {locale === Languages.ARABIC ? item.name : item.name_en}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Portfolio;
