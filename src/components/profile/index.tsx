"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";
import { PortfolioItem } from "@/types/portfolio";

interface PortfolioProps {
  portfolio?: { title: string; slug: string }[];
  limit?: number;
}

function Portfolio({
  portfolio: initialPortfolio,
  limit,
}: PortfolioProps = {}) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const {
    data: portfolioData,
    loading,
    error,
  } = useFetch<{ data: PortfolioItem[] }>("/items/portfolios", {
    fields: "*.*",
  });

  const handlePortfolioClick = (slug: string) => {
    router.push(`/portfolio/${slug}`);
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
        Error loading portfolio
      </div>
    );
  }

  if (!portfolioData?.data || portfolioData.data.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-8">
        No portfolio items found
      </div>
    );
  }

  // Get unique categories from portfolio items and ensure they are strings
  const categories = initialPortfolio
    ? ["All", ...initialPortfolio.map((item) => item.title)]
    : [
        "All",
        ...new Set(
          portfolioData.data
            .map((item) => String(item.category))
            .filter(Boolean)
        ),
      ];

  const filteredPortfolio =
    selectedCategory === "All"
      ? portfolioData.data
      : portfolioData.data.filter(
          (item) => String(item.category) === selectedCategory
        );

  const limitedPortfolio = limit
    ? filteredPortfolio.slice(0, limit)
    : filteredPortfolio;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-[24px]">
      {categories.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-[40px] overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center gap-4 bg-[#FFFFFF1A] px-6 py-3 rounded-tl-[24px] rounded-br-[24px] backdrop-blur-sm">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-primary text-black shadow-lg"
                    : "bg-secondary hover:bg-primary hover:text-black"
                } transition-all duration-300 snap-center h-[40px] px-6 rounded-full text-sm font-medium`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[24px]">
        <AnimatePresence mode="wait">
          {limitedPortfolio.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handlePortfolioClick(item.slug)}
              className="group relative overflow-hidden rounded-[20px] bg-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={
                    item.thumbnail?.data?.full_url || "/images/placeholder.png"
                  }
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-full items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">
                    {item.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Portfolio;
