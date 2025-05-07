"use client";

import {
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Languages } from "@/constants/enums";
import { Loader } from "lucide-react";
import { serverFetcher } from "@/lib/serverFetcher";
import { Service } from "@/types/services";

interface FooterMenuItem {
  name: string;
  url: string;
}

interface FooterMenuSection {
  title: string;
  items: FooterMenuItem[];
}

interface FooterSection {
  id: number;
  copyright: string;
  copyright_en: string;
  footer_menu: FooterMenuSection[];
  footer_menu_en: FooterMenuSection[];
  newsletter_active: boolean;
}

function Footer() {
  const params = useParams();
  const locale = params?.locale as string;
  const isEnglish = locale === Languages.ENGLISH;
  const [data, setData] = React.useState<FooterSection | null>(null);
  const [services, setServices] = React.useState<Service[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [footerResponse, servicesResponse] = await Promise.all([
          serverFetcher<{ data: FooterSection[] }>("/items/footer_section"),
          serverFetcher<{ data: Service[] }>("/items/services", {
            fields: "*.*",
          }),
        ]);
        setData(footerResponse.data[0]);
        setServices(servicesResponse.data);
        setLoading(false);
      } catch {
        setError("Error loading footer data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return <div>Error loading footer data</div>;
  }

  const footerMenu = isEnglish ? data.footer_menu_en : data.footer_menu;

  return (
    <footer className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[63px] px-[60px] py-[56px]">
        <div className="flex flex-col gap-4">
          <Image src="/images/logo.png" alt="logo" width={100} height={100} />
          <p className="text-[14px] xl:text-[16px]">
            Innovative marketing solutions that drive growth and create
            meaningful connections between brands and their audiences.
          </p>
          <div className="flex gap-4 ">
            <FontAwesomeIcon icon={faYoutube} className="w-[32px] h-[24px]" />
            <FontAwesomeIcon icon={faTwitter} className="w-[32px] h-[24px]" />
            <FontAwesomeIcon icon={faInstagram} className="w-[32px] h-[24px]" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[24px] font-bold">Services</p>
          <div className="space-y-3">
            {services.map((service) => (
              <Link
                href={`/${locale}/services/${service.slug}`}
                key={service.id}
                className="block text-[14px] hover:text-primary transition-colors"
              >
                {locale === Languages.ARABIC ? service.name : service.name_en}
              </Link>
            ))}
          </div>
        </div>
        {footerMenu.map((section, index) => (
          <div key={index} className="flex flex-col gap-4">
            <p className="text-[24px] font-bold">{section.title}</p>
            {section.items.map((item, itemIndex) => (
              <Link
                href={`/${locale}${item.url}`}
                key={itemIndex}
                className="text-[14px]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        ))}
        {data.newsletter_active && (
          <div className="flex flex-col gap-4">
            <p className="text-[24px] font-bold">Newsletter</p>
            <div className="flex items-center justify-center">
              <input
                className="h-[44px] p-3 outline-none border border-accent w-[150px] lg:w-[200px]"
                type="email"
                placeholder="Enter your email"
              />
              <Button className="rounded-none h-[44px]">Subscribe</Button>
            </div>
          </div>
        )}
      </div>
      <hr className="mb-[16px]" />
      <div className="flex justify-between items-center mx-[60px] text-[#B3B3B3] pb-[36px] text-[14px]">
        <p>{isEnglish ? data.copyright_en : data.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;
