"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black z-50 shadow-sm">
      <div className="flex items-center justify-between my-[41px] mx-[38px]">
        <Link href="">
          <Image src="/images/logo.png" alt="logo" width={100} height={100} />
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
        <Button className="hidden xl:flex w-[133px] h-[48px] rounded-tl-[16px] rounded-br-[16px] bg-transparent border border-primary">
          Book Now
        </Button>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black xl:hidden">
            <Navbar isMobile={true} />
            <div className="p-4">
              <Button className="w-full h-[48px] rounded-tl-[16px] rounded-br-[16px] bg-transparent border border-primary">
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
