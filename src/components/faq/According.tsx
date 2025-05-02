"use client";
import { Button } from "../ui/button";
import { useState } from "react";
import AccordInformation from "./AccordInformation";
import { useFetch } from "@/hooks/useFetch";
import { FAQ } from "@/types/faq";

interface FAQResponse {
  data: FAQ[];
  public: boolean;
}

export function Accordions({
  CategoryStatus = true,
}: {
  CategoryStatus?: boolean;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data, loading, error } = useFetch<FAQResponse>("/items/faqs");

  const categories = ["All"];

  const filteredAccordions = data?.data || [];

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-white">
        <p>Error: {error.message}</p>
        <p className="text-sm mt-2">
          Please check the console for more details.
        </p>
      </div>
    );
  }

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
