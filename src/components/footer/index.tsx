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
import { useFetch } from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import { Languages } from "@/constants/enums";
import { Loader } from "lucide-react";

interface MenuItem {
  id: number;
  sort: number;
  name: string;
  name_en: string;
  url: string;
  icon: string | null;
  is_parent: boolean;
  parent: number | null;
}

function Footer() {
  const params = useParams();
  const locale = params?.locale as string;
  const isEnglish = locale === Languages.ENGLISH;
  const { data, loading, error } = useFetch<{ data: MenuItem[] }>(
    "/items/menus"
  );

  const services = [
    {
      id: 1,
      name: "Social Media Marketing",
    },
    {
      id: 2,
      name: "E-commerce Platform Management",
    },
    {
      id: 3,
      name: "Influencer Marketing",
    },
    {
      id: 4,
      name: "SEO & SEM",
    },
    {
      id: 5,
      name: "Media Production",
    },
  ];

  const ContactUs = [
    {
      id: 1,
      name: "About Us",
    },
    {
      id: 2,
      name: "Portfolio",
    },
    {
      id: 3,
      name: "Blog",
    },
    {
      id: 4,
      name: "Contact Us",
    },
    {
      id: 5,
      name: "Privacy Policy",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading menus</div>;
  }

  const menus = data?.data.sort((a, b) => a.sort - b.sort) || [];

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
          {services.map((service) => (
            <p key={service.id} className="text-[14px]">
              {service.name}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[24px] font-bold">Quick Links</p>
          {menus.map((menu) => (
            <Link
              href={`/${locale}${menu.url}`}
              key={menu.id}
              className="text-[14px]"
            >
              {isEnglish ? menu.name_en : menu.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[24px] font-bold">Contact Us</p>
          {ContactUs.map((contact) => (
            <p key={contact.id} className="text-[14px]">
              {contact.name}
            </p>
          ))}
          <div className="flex items-center justify-center">
            <input
              className=" h-[44px] p-3 outline-none border border-accent w-[150px] lg:w-[200px]"
              type="email"
              placeholder="Enter your email"
            />
            <Button className="rounded-none h-[44px]">Subscribe</Button>
          </div>
        </div>
      </div>
      <hr className="mb-[16px]" />
      <div className="flex justify-between items-center mx-[60px] text-[#B3B3B3] pb-[36px] text-[14px]">
        <p>© 2025 via Marketing Agency. All rights reserved.</p>
        <div className="flex gap-4 ">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
