import { Directions, Languages } from "@/constants/enums";
import { Locale } from "@/i8n.config";
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

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const fontClass =
    params.locale === Languages.ARABIC ? cairo.className : Vietnam.className;

  return (
    <html
      dir={params.locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
    >
      <body className={fontClass}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
