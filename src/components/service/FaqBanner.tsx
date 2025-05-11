import { serverFetcher } from "@/lib/serverFetcher";
import Banner from "../custom/banner";

interface PageSettings {
  title: string;
  title_en: string;
  banner: {
    data: {
      full_url: string;
    };
  };
}

interface PageSettingsResponse {
  data: PageSettings[];
  public: boolean;
}

async function getPageSettings() {
  return await serverFetcher<PageSettingsResponse>("/items/other_pages", {
    fields: "*.*",
    "filter[slug]": "faqs",
  });
}

async function FaqBanner({ locale }: { locale: string }) {
  const pageSettings = await getPageSettings();

  return (
    <div>
      <Banner pageSettings={pageSettings?.data || []} locale={locale} />
    </div>
  );
}

export default FaqBanner;
