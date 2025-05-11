"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useFetch } from "@/hooks/useFetch";

interface GeneralSettings {
  data: {
    whatsapp_number: string;
  };
}

const WhatsAppButton = () => {
  const { data } = useFetch<GeneralSettings>("/items/general_settings/1", {
    fields: "whatsapp_number",
  });

  const handleWhatsAppClick = () => {
    if (!data?.data.whatsapp_number) return;

    const message = "مرحباً! أود التواصل معكم";
    const whatsappUrl = `https://wa.me/${
      data.data.whatsapp_number
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!data?.data.whatsapp_number) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <button
        onClick={handleWhatsAppClick}
        className="bg-black text-primary p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center w-14 h-14"
        aria-label="تواصل عبر واتساب"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="size-6" />
      </button>
    </motion.div>
  );
};

export default WhatsAppButton;
