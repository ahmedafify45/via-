import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import { Service } from "@/types/services";
import { Languages } from "@/constants/enums";

function ServicesCard({ service }: { service: Service }) {
  const params = useParams();
  const locale = params?.locale as string;

  return (
    <Link href={`/${locale}/services/${service.slug}`}>
      <div className="group relative overflow-hidden rounded-[20px] bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={service.photo?.data?.full_url}
            alt={service.name_en}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              {locale === Languages.ARABIC ? service.name : service.name_en}
            </h3>
            <p className="text-white/90 text-sm">
              {locale === Languages.ARABIC
                ? service.summary
                : service.summary_en}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ServicesCard;
