import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";

interface Service {
  id: number;
  name_en: string;
  slug: string;
  summary_en: string;
  description_en: string;
  photo: number;
  banner: number;
  icon: string;
}

function ServicesCard({ service }: { service: Service }) {
  const params = useParams();
  const locale = params?.locale as string;
  const imageUrl = service.photo
    ? `/api/assets/${service.photo}`
    : "/images/placeholder.jpg";

  return (
    <Link href={`/${locale}/services/${service.slug}`}>
      <div className="group relative overflow-hidden rounded-[20px] bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={imageUrl}
            alt={service.name_en}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              {service.name_en}
            </h3>
            <p className="text-white/90 text-sm">{service.summary_en}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ServicesCard;
