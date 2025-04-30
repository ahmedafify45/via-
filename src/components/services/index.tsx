import React from "react";
import Banner from "../custom/banner";
import ServicesCard from "../service/ServicesCard";

function Services() {
  const serviceSection = [
    {
      id: 1,
      slug: "digital-marketing",
      image: "/images/service/service1.png",
      title: "Digital Marketing",
      description:
        "Comprehensive digital marketing solutions to boost your online presence",
      link: "/services/digital-marketing",
    },
    {
      id: 2,
      slug: "social-media-management",
      image: "/images/service/service2.png",
      title: "Social Media Management",
      description: "Strategic social media management to engage your audience",
      link: "/services/social-media-management",
    },
    {
      id: 3,
      slug: "content-creation",
      image: "/images/service/service3.png",
      title: "Content Creation",
      description: "Creative content that tells your brand's story",
      link: "/services/content-creation",
    },
    {
      id: 4,
      slug: "content-marketing",
      image: "/images/service/service3.png",
      title: "Content Marketing",
      description: "Creative content that tells your brand's story",
      link: "/services/content-marketing",
    },
  ];
  return (
    <section className="mt-[220px] mx-[3px] lg:mx-[80px] mb-[156px]">
      <Banner subtitle="home/services" title="Our Services" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[80px]">
        {serviceSection.map((service) => (
          <div key={service.id}>
            <ServicesCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
