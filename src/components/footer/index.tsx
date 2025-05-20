"use client";

import {
  faInstagram,
  faTwitter,
  faYoutube,
  faFacebook,
  faLinkedin,
  faTiktok,
  faTelegram,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Languages } from "@/constants/enums";
import { Loader } from "lucide-react";
import { serverFetcher } from "@/lib/serverFetcher";
import { Service } from "@/types/services";
import { toast } from "sonner";

interface FooterMenuItem {
  name: string;
  url: string;
}

interface FooterMenuSection {
  title: string;
  items: FooterMenuItem[];
}

interface FooterSection {
  id: number;
  copyright: string;
  copyright_en: string;
  footer_menu: FooterMenuSection[];
  footer_menu_en: FooterMenuSection[];
  newsletter_active: boolean;
}

interface GeneralSettings {
  site_description: string;
  site_description_en: string;
  light_logo: {
    data: {
      full_url: string;
    };
  };
  social_links: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
    linkedin?: string;
    tiktok?: string;
    telegram?: string;
    pinterest?: string;
  };
}

interface NewsletterData {
  title: string;
  title_en: string;
  button_text: string;
  button_text_en: string;
  button_url: string;
  button_url_en: string;
  is_active: boolean;
}

function Footer() {
  const params = useParams();
  const locale = params?.locale as string;
  const isEnglish = locale === Languages.ENGLISH;
  const [data, setData] = React.useState<FooterSection | null>(null);
  const [services, setServices] = React.useState<Service[]>([]);
  const [generalSettings, setGeneralSettings] =
    React.useState<GeneralSettings | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [newsletterData, setNewsletterData] =
    React.useState<NewsletterData | null>(null);
  const [subscriberEmail, setSubscriberEmail] = React.useState("");
  const [subscribing, setSubscribing] = React.useState(false);

  const handleSubscribe = async () => {
    if (!subscriberEmail) {
      toast.error(
        isEnglish
          ? "Please enter your email."
          : "يرجى إدخال البريد الإلكتروني.",
        {
          style: {
            color: "#DC2626", // red-600
            backgroundColor: "#FEF2F2", // red-50
            border: "1px solid #EF4444", // red-500
          },
        }
      );
      return;
    }

    setSubscribing(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/items/subscribers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: subscriberEmail }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to subscribe");
      }

      toast.success(
        isEnglish ? "Subscribed successfully!" : "تم الاشتراك بنجاح!",
        {
          style: {
            color: "#059669", // emerald-600
            backgroundColor: "#ECFDF5", // emerald-50
            border: "1px solid #10B981", // emerald-500
          },
          className: "success-toast",
        }
      );
      setSubscriberEmail(""); // Clear input
    } catch {
      toast.error(
        isEnglish
          ? "Subscription failed. Try again."
          : "فشل الاشتراك. حاول مرة أخرى.",
        {
          style: {
            background: "#17181C",
            color: "#fff",
            border: "1px solid #2A2B2F",
          },
          className: "error-toast",
        }
      );
    } finally {
      setSubscribing(false);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          footerResponse,
          servicesResponse,
          generalSettingsResponse,
          newsletterResponse,
        ] = await Promise.all([
          serverFetcher<{ data: FooterSection[] }>("/items/footer_section", {
            fields: "*.*",
          }),
          serverFetcher<{ data: Service[] }>("/items/services", {
            fields: "*.*",
          }),
          serverFetcher<{ data: GeneralSettings[] }>(
            "/items/general_settings",
            {
              fields: "*.*,social_links",
            }
          ),
          serverFetcher<{ data: NewsletterData[] }>(
            "/items/home_page_setting?filter[slug]=newsletter-area"
          ),
        ]);

        setNewsletterData(newsletterResponse.data[0]);
        setData(footerResponse.data[0]);
        setServices(servicesResponse.data);
        setGeneralSettings(generalSettingsResponse.data[0]);
        setLoading(false);
      } catch {
        setError("Error loading footer data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return <div>Error loading footer data</div>;
  }

  const footerMenu = isEnglish ? data.footer_menu_en : data.footer_menu;

  return (
    <footer className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[63px] px-[60px] py-[56px]">
        <div className="flex flex-col gap-4">
          {generalSettings?.light_logo && (
            <Image
              src={generalSettings.light_logo.data.full_url}
              alt="logo"
              width={100}
              height={100}
            />
          )}
          <p className="text-[14px] xl:text-[16px]">
            {locale === Languages.ARABIC
              ? generalSettings?.site_description
              : generalSettings?.site_description_en}
          </p>
          <div className="flex gap-4 ">
            {generalSettings?.social_links?.youtube && (
              <Link
                href={generalSettings.social_links.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="w-[40px] h-[40px] hover:text-primary transition-all duration-300 text-[20px]"
                />
              </Link>
            )}
            {generalSettings?.social_links?.twitter && (
              <Link
                href={generalSettings.social_links.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="w-[32px] h-[24px] hover:text-primary transition-all duration-300 text-[20px]"
                />
              </Link>
            )}
            {generalSettings?.social_links?.instagram && (
              <Link
                href={generalSettings.social_links.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="w-[32px] h-[24px] hover:text-primary transition-all duration-300 text-[20px]"
                />
              </Link>
            )}
            {generalSettings?.social_links?.facebook && (
              <Link
                href={generalSettings.social_links.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="w-[32px] h-[24px] hover:text-primary transition-all duration-300 text-[20px]"
                />
              </Link>
            )}
            {generalSettings?.social_links?.linkedin && (
              <Link
                href={generalSettings.social_links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="w-[32px] h-[24px] hover:text-primary transition-all duration-300 text-[20px]"
                />
              </Link>
            )}
            {generalSettings?.social_links?.tiktok && (
              <Link
                href={generalSettings.social_links.tiktok}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTiktok}
                  className="w-[32px] h-[24px] hover:text-primary transition-all duration-300 text-[20px]"
                />
              </Link>
            )}
            {generalSettings?.social_links?.telegram && (
              <Link
                href={generalSettings.social_links.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTelegram}
                  className="w-[32px] h-[24px] hover:text-primary transition-all duration-300 text-[20px]"
                />
              </Link>
            )}
            {generalSettings?.social_links?.pinterest && (
              <Link
                href={generalSettings.social_links.pinterest}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faPinterest}
                  className="w-[32px] h-[24px] hover:text-primary transition-all duration-300 text-[20px]"
                />
              </Link>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[24px] font-bold">
            {isEnglish ? "Services" : "الخدمات"}
          </p>
          <div className="space-y-3">
            {services.map((service) => (
              <Link
                href={`/${locale}/services/${service.slug}`}
                key={service.id}
                className="block text-[14px] hover:text-primary transition-colors"
              >
                {locale === Languages.ARABIC ? service.name : service.name_en}
              </Link>
            ))}
          </div>
        </div>
        {footerMenu.map((section, index) => (
          <div key={index} className="flex flex-col gap-4">
            <p className="text-[24px] font-bold">{section.title}</p>
            {section.items.map((item, itemIndex) => (
              <Link
                href={`/${locale}${item.url}`}
                key={itemIndex}
                className="text-[14px]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        ))}
        {newsletterData?.is_active && (
          <div className="flex flex-col gap-4">
            <p className="text-[24px] font-bold">
              {isEnglish ? newsletterData.title_en : newsletterData.title}
            </p>
            <div className="flex items-center justify-center">
              <input
                type="email"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                placeholder={
                  isEnglish ? "Enter your email" : "أدخل بريدك الإلكتروني"
                }
                className="h-[44px] p-3 outline-none border border-accent w-[150px] lg:w-[200px]"
              />
              <Button
                className="rounded-none h-[44px]"
                onClick={handleSubscribe}
                disabled={subscribing}
              >
                {subscribing
                  ? isEnglish
                    ? "Subscribing..."
                    : "جارٍ الاشتراك..."
                  : isEnglish
                  ? newsletterData.button_text_en
                  : newsletterData.button_text}
              </Button>
            </div>
          </div>
        )}
      </div>
      <hr className="mb-[16px]" />
      <div className="flex justify-between items-center mx-[60px] text-[#B3B3B3] pb-[36px] text-[14px]">
        <p>{isEnglish ? data.copyright_en : data.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;
