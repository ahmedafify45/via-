import Image from "next/image";
import Banner from "../custom/banner";
import ContactForm from "./ContactForm";
import InformationContact from "./InformationContact";
import OurClients from "@/app/[locale]/_components/OurClients";

function Contact() {
  return (
    <section className="my-[220px] mx-[0px] md:my-[220px] md:mx-[80px] sm:my-[60px] sm:mx-[16px]">
      <Banner title="Contact Us" subtitle="Home / Contac Us" />
      <div className="flex flex-col lg:flex-row justify-between  gap-[20px]">
        <div className="w-full md:w-auto">
          <ContactForm />
        </div>
        <div className="w-full md:w-[629px] h-auto">
          <Image
            src="/images/map.png"
            alt=""
            width={629}
            height={629}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <InformationContact />
      <div className="flex justify-center">
        <OurClients />
      </div>
    </section>
  );
}

export default Contact;
