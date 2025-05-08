import { Languages, Directions } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { Be_Vietnam_Pro, Cairo } from "next/font/google";
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

export async function generateMetadata() {
  return {
    title: "Default Title",
    description: "Default description",
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
    <html
      lang={locale}
      dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
    >
      <body className={fontClass}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
