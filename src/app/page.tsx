"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { i18n, LanguageType } from "@/i18n.config";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const userLocale = navigator.language.split("-")[0] as LanguageType;
    const supportedLocale = i18n.locales.includes(userLocale)
      ? userLocale
      : i18n.defaultLocale;

    router.replace(`/${supportedLocale}`);
  }, [router]);

  return null; // This page will redirect immediately
}
