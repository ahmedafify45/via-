import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { useFetch } from "@/hooks/useFetch";

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

interface NavbarProps {
  isMobile?: boolean;
}

function Navbar({ isMobile = false }: NavbarProps) {
  const params = useParams();
  const locale = params?.locale as string;
  const pathname = usePathname();
  const { data, loading, error } = useFetch<{ data: MenuItem[] }>(
    "/items/menus"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading menus</div>;

  const menus = data?.data.sort((a, b) => a.sort - b.sort) || [];

  return (
    <nav>
      <ul
        className={`text-white ${
          isMobile ? "flex flex-col gap-4 p-4" : "flex items-center gap-2"
        }`}
      >
        {menus.map((item) => {
          const isActive =
            pathname === `/${locale}${item.url}` ||
            (item.url === "" && pathname === `/${locale}`);
          return (
            <li
              key={item.id}
              className={`${
                isMobile ? "w-full" : "w-[144px]"
              } h-[48px] flex items-center justify-center ${
                isActive
                  ? "bg-primary text-black"
                  : "bg-white text-black hover:bg-primary"
              } rounded-tl-[16px] rounded-br-[16px]`}
            >
              <Link
                href={`/${locale}${item.url}`}
                className="w-full h-full flex items-center justify-center"
              >
                {locale === "ar" ? item.name : item.name_en}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
