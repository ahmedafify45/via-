import {
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function Footer() {
  const services = [
    {
      id: 1,
      name: "Social Media Marketing",
    },
    {
      id: 2,
      name: "E-commerce Platform Management",
    },
    {
      id: 3,
      name: "Influencer Marketing",
    },
    {
      id: 4,
      name: "SEO & SEM",
    },
    {
      id: 5,
      name: "Media Production",
    },
  ];
  const quickLinks = [
    {
      id: 1,
      name: "About Us",
      herf:"about"
    },
    {
      id: 2,
      name: "Portfolio",
      herf:"portfolio"
    },
    {
      id: 3,
      name: "Blog",
      herf:"blogs"
    },
    {
      id: 4,
      name: "Contact Us",
      herf :"contact"
    },
    {
      id: 5,
      name: "Privacy Policy",
      herf:"/"
    },
  ];
  const ContactUs = [
    {
      id: 1,
      name: "About Us",
    },
    {
      id: 2,
      name: "Portfolio",
    },
    {
      id: 3,
      name: "Blog",
    },
    {
      id: 4,
      name: "Contact Us",
    },
    {
      id: 5,
      name: "Privacy Policy",
    },
  ];
  return (
    <footer className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[63px] px-[60px] py-[56px]">
        <div className="flex flex-col gap-4">
          <Image src="/images/logo.png" alt="logo" width={100} height={100} />
          <p className="text-[20px]">
            Innovative marketing solutions that drive growth and create
            meaningful connections between brands and their audiences.
          </p>
          <div className="flex gap-4 ">
            <FontAwesomeIcon icon={faYoutube} className="w-[32px] h-[24px]" />
            <FontAwesomeIcon icon={faTwitter} className="w-[32px] h-[24px]" />
            <FontAwesomeIcon icon={faInstagram} className="w-[32px] h-[24px]" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[24px] font-bold">Services</p>
          {services.map((service) => (
            <p key={service.id} className="text-[14px]">
              {service.name}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[24px] font-bold">Quick Links</p>
          {quickLinks.map((link) => (
            <Link href={link.herf} key={link.id} className="text-[14px]">
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[24px] font-bold">Contact Us</p>
          {ContactUs.map((contact) => (
            <p key={contact.id} className="text-[14px]">
              {contact.name}
            </p>
          ))}
          <div className="flex items-center justify-center">
            <input
              className=" h-[44px] p-3 outline-none border border-accent"
              type="email"
              placeholder="Enter your email"
            />
            <Button className="rounded-none h-[44px]">Subscribe</Button>
          </div>
        </div>
      </div>
      <hr className="mb-[16px]" />
      <div className="flex justify-between items-center mx-[60px] text-[#B3B3B3] pb-[36px] text-[14px]">
        <p>© 2025 via Marketing Agency. All rights reserved.</p>
        <div className="flex gap-4 ">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
