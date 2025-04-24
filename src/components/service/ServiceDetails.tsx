"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Banner from "../custom/banner";
import Link from "next/link";

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
      </div>
    </main>
  );
}

export default ServiceDetails;
// {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
// {/* Image Section */}
// <div className="relative aspect-[4/3] w-full">
//   <Image
//     src={service.image}
//     alt={service.title}
//     fill
//     className="object-cover rounded-[20px]"
//   />
// </div>

// {/* Content Section */}
// <div className="space-y-8">
//   <h1 className="text-4xl font-bold text-primary">{service.title}</h1>
//   <p className="text-lg text-gray-600">{service.longDescription}</p>

//   {/* Features Section */}
//   <div>
//     <h2 className="text-2xl font-semibold mb-4">
//       Our Services Include
//     </h2>
//     <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {service.features.map((feature, index) => (
//         <li key={index} className="flex items-center space-x-2">
//           <span className="w-2 h-2 bg-primary rounded-full"></span>
//           <span>{feature}</span>
//         </li>
//       ))}
//     </ul>
//   </div>

//   {/* Benefits Section */}
//   <div>
//     <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
//     <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {service.benefits.map((benefit, index) => (
//         <li key={index} className="flex items-center space-x-2">
//           <span className="w-2 h-2 bg-primary rounded-full"></span>
//           <span>{benefit}</span>
//         </li>
//       ))}
//     </ul>
//   </div>
// </div>
// </div> */}
