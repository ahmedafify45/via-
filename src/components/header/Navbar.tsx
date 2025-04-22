import Link from "next/link";
import React from "react";

function Navbar() {
  const navbar = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Contact", href: "/contact" },
  ];
  return (
    <nav>
      <ul className="text-white flex items-center gap-2">
        {navbar.map((item) => (
          <li
            key={item.title}
            className="bg-white text-black hover:bg-primary rounded-tl-[16px] rounded-br-[16px] w-[144px] h-[48px] flex items-center justify-center"
          >
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
