import Portfolio from "@/components/profile";
import { Button } from "@/components/ui/button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { serverFetcher } from "@/lib/serverFetcher";
import { Languages } from "@/constants/enums";

interface HomePageSettingResponse {
  data: {
    id: number;
    sort: number;
    title: string;
    sub_title: string;
    how_many: number;
    is_active: boolean;
    title_en: string;
    sub_title_en: string;
    button_text: string;
    button_text_en: string;
    button_url: string;
    button_url_en: string;
    slug: string;
  }[];
  public: boolean;
}

async function OurPortfolio() {
  const locale = await getCurrentLocale();

  const portfolioData = await serverFetcher<HomePageSettingResponse>(
    "/items/home_page_setting",
    {
      "filter[slug]": "portfolios-area",
    }
  );

  if (!portfolioData?.data?.[0] || portfolioData.data[0].is_active === false) {
    return null;
  }

  const portfolio = portfolioData.data[0];

  return (
    <section className="">
      <div>
        <div className="flex flex-col items-center justify-center pt-[40px] md:pt-[60px] lg:pt-[80px]">
          <h2 className="text-primary text-[32px] md:text-[40px] lg:text-[48px] font-bold text-center">
            {locale === Languages.ENGLISH
              ? portfolio.title_en
              : portfolio.title}
          </h2>
          <p className="text-white text-center max-w-[600px] mt-2 md:mt-4 text-sm md:text-base">
            {locale === Languages.ENGLISH
              ? portfolio.sub_title_en
              : portfolio.sub_title}
          </p>
        </div>
        <Portfolio limit={3} />
        <div className="flex justify-center mb-[40px] md:mb-[60px] lg:mb-[80px]">
          <Button className="w-[140px] md:w-[160px] h-[48px] md:h-[56px] text-sm md:text-base text-black">
            <Link
              href={`/${locale}${
                locale === Languages.ENGLISH
                  ? portfolio.button_url_en
                  : portfolio.button_url
              }`}
              className="flex items-center justify-center gap-2"
            >
              {locale === Languages.ENGLISH
                ? portfolio.button_text_en
                : portfolio.button_text}
              <span className="bg-white text-black w-[40px] md:w-[48px] h-[40px] md:h-[48px] flex items-center justify-center rounded-tl-[12px] md:rounded-tl-[16px] rounded-br-[12px] md:rounded-br-[16px]">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={locale === Languages.ARABIC ? "rotate-180" : ""}
                />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default OurPortfolio;
