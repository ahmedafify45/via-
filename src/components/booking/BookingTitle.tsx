"use client";
import { useParams } from "next/navigation";
import { Languages } from "@/constants/enums";

interface BookingTitleProps {
  title: string;
  title_en: string;
}

function BookingTitle({ title, title_en }: BookingTitleProps) {
  const params = useParams();
  const locale = params?.locale as string;
  const isEnglish = locale === Languages.ENGLISH;

  return (
    <div className="px-4 md:px-6 lg:px-8">
      <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-center text-primary">
        {isEnglish ? title_en : title}
      </h1>
    </div>
  );
}

export default BookingTitle;
