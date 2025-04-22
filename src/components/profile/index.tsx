import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

function Portfolio({ portfolio }: any) {
  const portfolio_Product = [
    { title: "Portfolio 1", image: "/images/website1.png" },
    { title: "Portfolio 2", image: "/images/website2.png" },
    { title: "Portfolio 3", image: "/images/website3.png" },
    { title: "Portfolio 3", image: "/images/website3.png" },
    { title: "Portfolio 3", image: "/images/website3.png" },
    { title: "Portfolio 3", image: "/images/website3.png" },
  ];
  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-[24px]">
      <div className="flex items-center justify-center gap-4 mt-[40px]">
        {portfolio.map((item: any, index: any) => (
          <Button
            key={index}
            className="bg-secondary hover:bg-primary hover:text-black transition-all duration-300"
          >
            {item.title}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[24px]">
        {portfolio_Product.map((item: any, index: any) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-[20px] bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
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
