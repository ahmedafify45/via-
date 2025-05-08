import "server-only";

import { Locale } from "@/i18n.config";

const getTrans = async (locale: Locale) => {
  try {
    const dictionary = await import(`@/dictionaries/${locale}.json`);
    return dictionary.default;
  } catch {
    console.error(`❌ Translation file not found for locale: ${locale}`);
    return {};
  }
};

export default getTrans;
