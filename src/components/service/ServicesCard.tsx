import Image from "next/image";
import Link from "next/link";
import React from "react";

function ServicesCard({ service }: { service: any }) {
  return (
    <Link href={service.link}>
      <div className="group relative overflow-hidden rounded-[20px] bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              {service.title}
            </h3>
            <p className="text-white/90 text-sm">{service.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ServicesCard;
