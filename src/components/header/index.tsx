"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import LanguageSwitcher from "./Language-switcher";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/serverFetcher";

interface HeaderSection {
  id: number;
  button_text: string;
  button_text_en: string;
  button_url: string;
  button_url_en: string;
  topbar_active: boolean;
  sidemenu_active: boolean;
}

interface HeaderResponse {
  data: HeaderSection[];
  public: boolean;
}

function Header() {
  const { locale } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState<HeaderSection | null>(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/items/header_section`);
        const data: HeaderResponse = await response.json();
        if (data.data && data.data.length > 0) {
          setHeaderData(data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, []);

  const buttonText =
    locale === "ar" ? headerData?.button_text : headerData?.button_text_en;
  const buttonUrl =
    locale === "ar" ? headerData?.button_url : headerData?.button_url_en;

  return (
    <header className="fixed top-0 left-0 right-0 bg-black z-50 shadow-sm">
      <div className="flex items-center justify-between xl:my-[41px] my-[30px] xl:mx-[38px] mx-[20px]">
        <Link href={`/${locale}`}>
          <Image
            src="/images/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="xl:w-[100px] w-[60px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:block">
          <Navbar />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Desktop Book Now Button */}
        <div className="flex items-center">
          <LanguageSwitcher />
          <Button className="hidden xl:flex w-[133px] h-[48px] rounded-tl-[16px] rounded-br-[16px] bg-transparent border border-primary">
            <Link href={`/${locale}${buttonUrl}`}>{buttonText}</Link>
          </Button>
        </div>
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black xl:hidden">
            <Navbar isMobile={true} />
            <div className="p-4">
              <Button className="w-full h-[48px] rounded-tl-[16px] rounded-br-[16px] bg-transparent border border-primary">
                <Link href={`/${locale}${buttonUrl}`}>{buttonText}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
