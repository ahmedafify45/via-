import Link from "next/link";
import React from "react";

interface NavbarProps {
  isMobile?: boolean;
}

function Navbar({ isMobile = false }: NavbarProps) {
  const navbar = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Blogs", href: "/blogs" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <nav>
      <ul
        className={`text-white ${
          isMobile ? "flex flex-col gap-4 p-4" : "flex items-center gap-2"
        }`}
      >
        {navbar.map((item) => (
          <li
            key={item.title}
            className={`${
              isMobile ? "w-full" : "w-[144px]"
            } h-[48px] flex items-center justify-center bg-white text-black hover:bg-primary rounded-tl-[16px] rounded-br-[16px]`}
          >
            <Link
              href={item.href}
              className="w-full h-full flex items-center justify-center"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
