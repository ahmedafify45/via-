import Image from "next/image";
import Banner from "../custom/banner";
import ContactForm from "./ContactForm";
import InformationContact from "./InformationContact";
import OurClients from "@/app/[locale]/_components/OurClients";

function Contact() {
  return (
    <section className="my-[220px] mx-2 md:mx-[80px] sm:mx-[16px]">
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
      <div className="lg:flex justify-center items-center mt-[50px] md:mt-[100px]">
        <OurClients />
      </div>
    </section>
  );
}

export default Contact;
