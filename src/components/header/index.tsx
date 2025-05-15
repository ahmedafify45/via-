"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import LanguageSwitcher from "./Language-switcher";
import { useParams } from "next/navigation";
import { serverFetcher } from "@/lib/serverFetcher";

interface HeaderSection {
  id: number;
  button_text: string;
  button_text_en: string;
  button_url: string;
  button_url_en: string;
  topbar_active: boolean;
  sidemenu_active: boolean;
}

interface GeneralSettings {
  site_description: string;
  site_description_en: string;
  light_logo: {
    data: {
      full_url: string;
    };
  };
}

function Header() {
  const { locale } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState<HeaderSection | null>(null);
  const [generalSettings, setGeneralSettings] =
    useState<GeneralSettings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [headerResponse, generalSettingsResponse] = await Promise.all([
          serverFetcher<{ data: HeaderSection[] }>("/items/header_section"),
          serverFetcher<{ data: GeneralSettings[] }>(
            "/items/general_settings",
            {
              fields: "*.*",
            }
          ),
        ]);

        if (headerResponse.data && headerResponse.data.length > 0) {
          setHeaderData(headerResponse.data[0]);
        }
        if (
          generalSettingsResponse.data &&
          generalSettingsResponse.data.length > 0
        ) {
          setGeneralSettings(generalSettingsResponse.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const buttonText =
    locale === "ar" ? headerData?.button_text : headerData?.button_text_en;
  const buttonUrl =
    locale === "ar" ? headerData?.button_url : headerData?.button_url_en;

  return (
    <header className="fixed top-0 left-0 right-0 bg-black z-50 shadow-sm">
      <div className="flex items-center justify-between xl:my-[41px] my-[30px] xl:mx-[38px] mx-[20px]">
        <Link href={`/${locale}`}>
          {generalSettings?.light_logo ? (
            <Image
              src={generalSettings.light_logo.data.full_url}
              alt="logo"
              width={100}
              height={100}
              className="xl:w-[100px] w-[60px]"
            />
          ) : (
            <Image
              src="/images/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="xl:w-[100px] w-[60px]"
            />
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:block">
          <Navbar />
        </div>

        {/* Mobile and Desktop Actions */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          {/* Mobile Menu Button */}
          <button
            className="xl:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
          {/* Desktop Book Now Button */}
          <Button className="hidden xl:flex w-[160px] h-[48px] rounded-tl-[16px] rounded-br-[16px] bg-transparent border border-primary">
            <Link href={`/${locale}${buttonUrl}`}>{buttonText}</Link>
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black xl:hidden">
            <Navbar
              isMobile={true}
              onLinkClick={() => setIsMobileMenuOpen(false)}
            />
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
