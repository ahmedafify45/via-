"use client";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocation,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
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
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import en from "@/dictionaries/en.json";
import ar from "@/dictionaries/ar.json";
import Loading from "../Loading";

const dictionaries = { en, ar };

interface GeneralSettings {
  data: {
    email_address?: string;
    phone_number?: string;
    whatsapp_number?: string;
    address?: string;
    address_en?: string;
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

function InformationContact() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = dictionaries[locale as keyof typeof dictionaries].contact;

  const { data, loading, error } = useFetch<GeneralSettings>(
    "/items/general_settings/1",
    {
      fields: "*.*",
    }
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  if (error) return <div>Error loading contact information</div>;
  if (!data) return null;

  const information = [
    {
      id: 1,
      icon: <FontAwesomeIcon icon={faPhone} />,
      title: t.liveSupport,
      description: data.data.phone_number,
      link: `tel:${data.data.phone_number}`,
      isAvailable: !!data.data.phone_number,
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={faWhatsapp} />,
      title: t.whatsapp,
      description: data.data.whatsapp_number,
      link: `https://wa.me/${data.data.whatsapp_number}`,
      isAvailable: !!data.data.whatsapp_number,
    },
    {
      id: 3,
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      title: t.emailSupport,
      description: data.data.email_address,
      link: `mailto:${data.data.email_address}`,
      isAvailable: !!data.data.email_address,
    },
    {
      id: 4,
      icon: <FontAwesomeIcon icon={faLocation} />,
      title: t.ourAddress,
      description: locale === "ar" ? data.data.address : data.data.address_en,
      link: "#",
      isAvailable: !!data.data.address,
    },
    {
      id: 5,
      icon: <FontAwesomeIcon icon={faInstagram} />,
      title: "Instagram",
      description: data.data.instagram ? `@${data.data.instagram}` : "",
      link: data.data.instagram
        ? `https://instagram.com/${data.data.instagram}`
        : "#",
      isAvailable: !!data.data.instagram,
    },
    {
      id: 6,
      icon: <FontAwesomeIcon icon={faTwitter} />,
      title: "Twitter",
      description: data.data.twitter ? `@${data.data.twitter}` : "",
      link: data.data.twitter
        ? `https://twitter.com/${data.data.twitter}`
        : "#",
      isAvailable: !!data.data.twitter,
    },
    {
      id: 7,
      icon: <FontAwesomeIcon icon={faYoutube} />,
      title: "YouTube",
      description: data.data.youtube ? `@${data.data.youtube}` : "",
      link: data.data.youtube
        ? `https://youtube.com/${data.data.youtube}`
        : "#",
      isAvailable: !!data.data.youtube,
    },
    {
      id: 8,
      icon: <FontAwesomeIcon icon={faFacebook} />,
      title: "Facebook",
      description: data.data.facebook ? `@${data.data.facebook}` : "",
      link: data.data.facebook
        ? `https://facebook.com/${data.data.facebook}`
        : "#",
      isAvailable: !!data.data.facebook,
    },
    {
      id: 9,
      icon: <FontAwesomeIcon icon={faLinkedin} />,
      title: "LinkedIn",
      description: data.data.linkedin ? `@${data.data.linkedin}` : "",
      link: data.data.linkedin
        ? `https://linkedin.com/in/${data.data.linkedin}`
        : "#",
      isAvailable: !!data.data.linkedin,
    },
    {
      id: 10,
      icon: <FontAwesomeIcon icon={faTiktok} />,
      title: "TikTok",
      description: data.data.tiktok ? `@${data.data.tiktok}` : "",
      link: data.data.tiktok ? `https://tiktok.com/@${data.data.tiktok}` : "#",
      isAvailable: !!data.data.tiktok,
    },
    {
      id: 11,
      icon: <FontAwesomeIcon icon={faTelegram} />,
      title: "Telegram",
      description: data.data.telegram ? `@${data.data.telegram}` : "",
      link: data.data.telegram ? `https://t.me/${data.data.telegram}` : "#",
      isAvailable: !!data.data.telegram,
    },
    {
      id: 12,
      icon: <FontAwesomeIcon icon={faPinterest} />,
      title: "Pinterest",
      description: data.data.pinterest ? `@${data.data.pinterest}` : "",
      link: data.data.pinterest
        ? `https://pinterest.com/${data.data.pinterest}`
        : "#",
      isAvailable: !!data.data.pinterest,
    },
  ].filter((item) => item.isAvailable);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-[135px] md:mt-[80px] sm:mt-[60px]">
      {information.map((item) => (
        <Link
          key={item.id}
          href={item.link}
          className="bg-[#17181C] w-full text-primary flex flex-col justify-center items-center gap-[16px] md:gap-[12px] sm:gap-[8px] border border-[#25231B] p-4"
          target={item.id === 2 ? "_blank" : undefined}
          rel={item.id === 2 ? "noopener noreferrer" : undefined}
        >
          <div className="text-primary text-[44px] md:text-[36px] sm:text-[32px]">
            {item.icon}
          </div>
          <div className="flex flex-col gap-[8px] md:gap-[6px] sm:gap-[4px] items-center">
            <h3 className="font-medium text-[14px] md:text-[13px] sm:text-[12px]">
              {item.title}
            </h3>
            <p className="text-[14px] md:text-[13px] sm:text-[12px] font-bold">
              {item.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default InformationContact;
