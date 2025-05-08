import { Languages } from "./constants/enums";

export type LanguageType = `${Languages}`; // دا بيعني أي قيمة string من enum

export const i18n = {
  defaultLocale: Languages.ARABIC,
  locales: Object.values(Languages) as LanguageType[],
};

export type Locale = (typeof i18n)["locales"][number];
