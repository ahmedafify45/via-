"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import AccordInformation from "./AccordInformation";

export function Accordions({ CategoryStatus = true }: { CategoryStatus?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const accordions = [
    {
      id: 1,
      title:
        "Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis",
      category: "Social Designs",
    },
    {
      id: 2,
      title:
        "Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis",
      category: "Branding",
    },
    {
      id: 3,
      title:
        "Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis",
      category: "Photo shoot",
    },
    {
      id: 4,
      title:
        "Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis",
      category: "Photo shoot",
    },
    {
      id: 5,
      title:
        "Lorem ipsum dolor sit amet consectetur. Cursus mollis Photo shoot",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis",
      category: "Photo shoot",
    },
    {
      id: 6,
      title:
        "Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis Lorem ipsum dolor sit amet consectetur. Cursus mollis lacus turpis",
      category: "Social Designs",
    },
  ];
  const categories = [
    "All",
    ...new Set(accordions.map((accordion) => accordion.category)),
  ];

  const filteredAccordions =
    selectedCategory === "All"
      ? accordions
      : accordions.filter(
          (accordion) => accordion.category === selectedCategory
        );



  return (
    <div>
      {CategoryStatus && (
        <div className="text-white bg-[#FFFFFF1A] p-[8px] mb-[21px] rounded-tl-[16px] rounded-br-[16px] flex flex-wrap gap-[8px]">
        {categories.map((category: string) => (
          <Button
            key={category}
            className={`bg-[#FFFFFF1A] hover:text-[#0C0D0F] text-sm md:text-base ${
              selectedCategory === category ? "bg-primary text-black" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      )}
      <AccordInformation filteredAccordions={filteredAccordions} />
    </div>
  );
}
