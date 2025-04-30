"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { Languages } from "@/constants/enums";
import { Button } from "../ui/button";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const switchLanguage = (newLocale: string) => {
    const path =
      pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
    router.push(path);
  };

  return (
    <div className="flex mx-4">
      {locale === Languages.ARABIC ? (
        <Button
          className="bg-transparent hover:text-primary hover:bg-transparent w-[50px]"
          onClick={() => switchLanguage(Languages.ENGLISH)}
        >
          English
        </Button>
      ) : (
        <Button
          className="bg-transparent hover:text-primary hover:bg-transparent w-[50px]"
          onClick={() => switchLanguage(Languages.ARABIC)}
        >
          العربية
        </Button>
      )}
    </div>
  );
};

export default LanguageSwitcher;
