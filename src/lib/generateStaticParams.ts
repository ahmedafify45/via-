import { i18n } from "@/i18n.config";

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
