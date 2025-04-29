"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Banner from "../custom/banner";
import Link from "next/link";
import InformationContact from "../contact/InformationContact";
import { Accordions } from "../faq/According";
import AccordInformation from "../faq/AccordInformation";

// This would typically come from an API or database
const serviceDetails = {
  "digital-marketing": {
    title: "Digital Marketing",
    description:
      "Lorem ipsum dolor sit amet consectetur. Etiam urna consequat aenean commodo. Mattis nulla rhoncus lectus ipsum metus eros ligula ac purus. Adipiscing sem ut dictumst ac in fames et tempor. Vestibulum lectus dui gravida semper dignissim nunc blandit urna enim.",
    longDescription:
      "Lorem ipsum dolor sit amet consectetur. Etiam urna consequat aenean commodo. Mattis nulla rhoncus lectus ipsum metus eros ligula ac purus. Adipiscing sem ut dictumst ac in fames et tempor. Vestibulum lectus dui gravida semper dignissim nunc blandit urna enim.",
    features: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click Advertising",
      "Email Marketing",
      "Analytics and Reporting",
      "Content Strategy",
    ],
    image: "/images/service/service1.png",
    benefits: [
      "Increased online visibility",
      "Higher conversion rates",
      "Better ROI tracking",
      "Enhanced brand awareness",
      "Targeted audience reach",
    ],
  },
  "social-media-management": {
    title: "Social Media Management",
    description: "Strategic social media management to engage your audience",
    longDescription:
      "We help businesses build and maintain a strong social media presence through consistent, engaging content and community management. Our team handles everything from content creation to engagement and analytics.",
    features: [
      "Content Creation and Curation",
      "Community Management",
      "Social Media Strategy",
      "Performance Analytics",
      "Crisis Management",
    ],
    image: "/images/service/service2.png",
    benefits: [
      "Increased engagement",
      "Brand loyalty",
      "Customer insights",
      "Community building",
      "Real-time feedback",
    ],
  },
  "content-creation": {
    title: "Content Creation",
    description: "Creative content that tells your brand's story",
    longDescription:
      "Our content creation services help businesses tell their story through compelling visuals and copy. We create content that resonates with your target audience and drives engagement across all platforms.",
    features: [
      "Copywriting",
      "Graphic Design",
      "Video Production",
      "Photography",
      "Content Strategy",
    ],
    image: "/images/service/service3.png",
    benefits: [
      "Stronger brand identity",
      "Higher engagement",
      "Better storytelling",
      "Consistent messaging",
      "Increased conversions",
    ],
  },
  "content-marketing": {
    title: "Content Creation",
    description: "Creative content that tells your brand's story",
    longDescription:
      "Our content creation services help businesses tell their story through compelling visuals and copy. We create content that resonates with your target audience and drives engagement across all platforms.",
    features: [
      "Copywriting",
      "Graphic Design",
      "Video Production",
      "Photography",
      "Content Strategy",
    ],
    image: "/images/service/service3.png",
    benefits: [
      "Stronger brand identity",
      "Higher engagement",
      "Better storytelling",
      "Consistent messaging",
      "Increased conversions",
    ],
  },
};

function ServiceDetails() {
  const params = useParams();
  const slug = params?.slug as string;
  const service = serviceDetails[slug as keyof typeof serviceDetails];

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <main className="py-[150px]">
      <div className="mx-[80px]">
        <Banner
          title="Our Services"
          subtitle="home/services/details"
          image="/images/banner.png"
        />
        <div className="relative w-full max-w-[1280px] aspect-[1280/472] mx-auto">
          <Image
            src="/images/banner.png"
            alt={service.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="max-w-[853px]">
            <h1 className="lg:text-[48px] text-[20px] font-bold text-primary">
              {service.title}
            </h1>
            <p className="text-[18px] text-white font-medium">
              {service.longDescription}
            </p>
          </div>
          <div className="text-white bg-[#FFFFFF0D] p-6 rounded-lg w-[413px] mt-[32px]">
            <p className="lg:text-[24px] text-[18px] mb-4">Our Services</p>
            <div className="space-y-3">
              {Object.entries(serviceDetails).map(([key, value]) => (
                <Link
                  href={`/services/${key}`}
                  key={key}
                  className={`block text-[20px] hover:text-primary transition-colors ${
                    key === slug ? "text-primary font-medium" : "text-white"
                  }`}
                >
                  {value.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <InformationContact />
        </div>
        <div className="w-full mt-[80px]">
          <h3 className="text-[48px] text-primary font-medium">FAQ</h3>
        <Accordions CategoryStatus={false}/>
        </div>
      </div>
    </main>
  );
}

export default ServiceDetails;

