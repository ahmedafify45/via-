import { Locale } from "@/i18n.config";

export const getCurrentLocale = (locale: string): Locale => {
  return locale as Locale;
};
