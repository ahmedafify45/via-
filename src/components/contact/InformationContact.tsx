import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocation,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";

interface GeneralSettings {
  data: {
    email_address: string;
    phone_number: string;
    whatsapp_number: string;
    address: string;
  };
}

function InformationContact() {
  const { data, loading, error } = useFetch<GeneralSettings>(
    "/items/general_settings/1"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading contact information</div>;
  if (!data) return null;

  const information = [
    {
      id: 1,
      icon: <FontAwesomeIcon icon={faPhone} />,
      title: "Live support",
      description: data.data.phone_number,
      link: `tel:${data.data.phone_number}`,
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={faWhatsapp} />,
      title: "Whatsapp",
      description: data.data.whatsapp_number,
      link: `https://wa.me/${data.data.whatsapp_number}`,
    },
    {
      id: 3,
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      title: "Email Support",
      description: data.data.email_address,
      link: `mailto:${data.data.email_address}`,
    },
    {
      id: 4,
      icon: <FontAwesomeIcon icon={faLocation} />,
      title: "Our Address",
      description: data.data.address || "Address not available",
      link: "#",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-[135px] md:mt-[80px] sm:mt-[60px]">
      {information.map((item) => (
        <Link
          key={item.id}
          href={item.link}
          className="bg-[#17181C] w-full md:w-[277px] h-[168px] text-primary flex flex-col justify-center items-center gap-[16px] md:gap-[12px] sm:gap-[8px] border border-[#25231B]"
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
