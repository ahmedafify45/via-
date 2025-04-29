import Image from "next/image";
import Banner from "../custom/banner";
import ContactForm from "./ContactForm";
import InformationContact from "./InformationContact";
import OurClients from "@/app/[locale]/_components/OurClients";

function Contact() {
  return (
    <section className="my-[220px] mx-[80px]">
      <Banner title="Contact Us" subtitle="Home / Contac Us" />
      <div className="flex justify-between gap-[20px] max-h-[634px]">
        <ContactForm />
        <Image
          src="/images/map.png"
          alt=""
          width={629}
          height={629}
          className=" object-cover"
        />
      </div>
      <InformationContact />
      <OurClients />
    </section>
  );
}

export default Contact;
