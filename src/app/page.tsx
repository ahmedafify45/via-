"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { i18n, LanguageType } from "@/i18n.config";

export default function RootPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const browserLang = navigator.language
      ?.split("-")[0]
      ?.toLowerCase() as LanguageType;
    const supportedLocale = i18n.locales.includes(browserLang)
      ? browserLang
      : i18n.defaultLocale;

    if (pathname !== `/${supportedLocale}`) {
      router.replace(`/${supportedLocale}`);
    }
  }, [router, pathname]);

  return null;
}
