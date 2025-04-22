import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";
import { Button } from "../ui/button";

function Header() {
  return (
    <header>
      <div className=" flex items-center justify-between mt-[41px] mx-[38px] ">
        <Link href="">
          <Image src="/images/logo.png" alt="logo" width={100} height={100} />
        </Link>
        <Navbar />
        <Button className="w-[133px] h-[48px] rounded-tl-[16px] rounded-br-[16px] bg-transparent border border-primary">
          Book Now
        </Button>
      </div>
    </header>
  );
}

export default Header;
