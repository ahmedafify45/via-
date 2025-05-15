import { Languages, Directions } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { Be_Vietnam_Pro, Cairo } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import "../[locale]/fontawesome";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "./_components/WhatApp";
import { serverFetcher } from "@/lib/serverFetcher";

interface SeoMeta {
  title: string;
  description: string;
  keywords: string;
  title_en: string;
  description_en: string;
  keywords_en: string;
  meta_image: string;
}

const Vietnam = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const cairo = Cairo({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["arabic"],
});

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { data } = await serverFetcher<{ data: Array<{ seo_meta: SeoMeta }> }>(
    "/items/general_settings",
    { fields: "seo_meta" }
  );

  const seoMeta = data[0]?.seo_meta;
  const isArabic = params.locale === Languages.ARABIC;

  return {
    title: isArabic ? seoMeta?.title : seoMeta?.title_en,
    description: isArabic ? seoMeta?.description : seoMeta?.description_en,
    keywords: isArabic ? seoMeta?.keywords : seoMeta?.keywords_en,
    openGraph: {
      title: isArabic ? seoMeta?.title : seoMeta?.title_en,
      description: isArabic ? seoMeta?.description : seoMeta?.description_en,
      locale: params.locale,
      type: "website",
      images: seoMeta?.meta_image ? [seoMeta.meta_image] : [],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = await params;
  const fontClass =
    locale === Languages.ARABIC ? cairo.className : Vietnam.className;

  return (
    <div
      lang={locale}
      dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
      className={fontClass}
    >
      <Header />

      {children}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
