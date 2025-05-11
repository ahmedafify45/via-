import { Languages, Directions } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { Be_Vietnam_Pro, Cairo } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import "../[locale]/fontawesome";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
  return {
    title: "Guessitt",
    description: "Your gaming platform",
    openGraph: {
      title: "Guessitt",
      description: "Your gaming platform",
      locale: params.locale,
      type: "website",
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
    </div>
  );
}
