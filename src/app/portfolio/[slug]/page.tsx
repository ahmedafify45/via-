import React from "react";
import PortfolioDetails from "@/components/profile/PortfolioDetails";

// This would typically come from an API or database
const portfolioData = {
  "portfolio-1": {
    title: "Portfolio 1",
    image: "/images/website1.png",
    slug: "portfolio-1",
    description:
      "Lorem ipsum dolor sit amet consectetur. Etiam urna consequat aenean commodo. Mattis nulla rhoncus lectus ipsum metus eros ligula ac purus. Adipiscing sem ut dictumst ac in fames et tempor. Vestibulum lectus dui gravida semper dignissim nunc blandit urna enim.Lorem ipsum dolor sit amet consectetur. Etiam urna consequat aenean commodo. Mattis nulla rhoncus lectus ipsum metus eros ligula ac purus. Adipiscing sem ut dictumst ac in fames et tempor. Vestibulum lectus dui gravida semper dignissim nunc blandit urna enim.Lorem ipsum dolor sit amet consectetur. Etiam urna consequat aenean commodo. Mattis nulla rhoncus lectus ipsum metus eros ligula ac purus. Adipiscing sem ut dictumst ac in fames et tempor. Vestibulum lectus dui gravida semper dignissim nunc blandit urna enim..",
    client: "Newcaring Land & Property Limited",
    location: "New York, USA",
    status: "Completed",
    projectValue: "$50,000",
    side: "Frontend Development",
    size: "411,675 sq.ft. GEA",
    gallery: [
      {
        image: "/images/portfolioGallery.png",
        alt: "Portfolio 1",
      },
      {
        image: "/images/portfolioGallery.png",
        alt: "Portfolio 2",
      },
      {
        image: "/images/portfolioGallery.png",
        alt: "Portfolio 3",
      },
    ],
  },
  "portfolio-2": {
    title: "Portfolio 2",
    image: "/images/website2.png",
    slug: "portfolio-2",
    description:
      "Lorem ipsum dolor sit amet consectetur. Etiam urna consequat aenean commodo. Mattis nulla rhoncus lectus ipsum metus eros ligula ac purus. Adipiscing sem ut dictumst ac in fames et tempor. Vestibulum lectus dui gravida semper dignissim nunc blandit urna enim.Lorem ipsum dolor sit amet consectetur. Etiam urna consequat aenean commodo. Mattis nulla rhoncus lectus ipsum metus eros ligula ac purus. Adipiscing sem ut dictumst ac in fames et tempor. Vestibulum lectus dui gravida semper dignissim nunc blandit urna enim.Lorem ipsum dolor sit amet consectetur. Etiam urna consequat aenean commodo. Mattis nulla rhoncus lectus ipsum metus eros ligula ac purus. Adipiscing sem ut dictumst ac in fames et tempor. Vestibulum lectus dui gravida semper dignissim nunc blandit urna enim..",
    client: "Newcaring Land & Property Limited",
    location: "London, UK",
    status: "In Progress",
    projectValue: "$75,000",
    side: "Full Stack Development",
    size: "411,675 sq.ft. GEA",
    gallery: [
      {
        image: "/images/portfolioGallery.png",
        alt: "Portfolio 1",
      },
      {
        image: "/images/portfolioGallery.png",
        alt: "Portfolio 2",
      },
      {
        image: "/images/portfolioGallery.png",
        alt: "Portfolio 3",
      },
    ],
  },
  "portfolio-3": {
    title: "Portfolio 3",
    image: "/images/website3.png",
    slug: "portfolio-3",
    description:
      "Lorem ipsum dolor sit amet consectetur. Etiam urna consequat aenean commodo. Mattis nulla rhoncus lectus ipsum metus eros ligula ac purus. Adipiscing sem ut dictumst ac in fames et tempor. Vestibulum lectus dui gravida semper dignissim nunc blandit urna enim.Lorem ipsum dolor sit amet consectetur. Etiam urna consequat aenean commodo. Mattis nulla rhoncus lectus ipsum metus eros ligula ac purus. Adipiscing sem ut dictumst ac in fames et tempor. Vestibulum lectus dui gravida semper dignissim nunc blandit urna enim.Lorem ipsum dolor sit amet consectetur. Etiam urna consequat aenean commodo. Mattis nulla rhoncus lectus ipsum metus eros ligula ac purus. Adipiscing sem ut dictumst ac in fames et tempor. Vestibulum lectus dui gravida semper dignissim nunc blandit urna enim..",
    client3: "Newcaring Land & Property Limited",
    location: "Tokyo, Japan",
    status: "Planning",
    projectValue: "$100,000",
    side: "Backend Development",
    size: "411,675 sq.ft. GEA",
    gallery: [
      {
        image: "/images/portfolioGallery.png",
        alt: "Portfolio 1",
      },
      {
        image: "/images/portfolioGallery.png",
        alt: "Portfolio 2",
      },
      {
        image: "/images/portfolioGallery.png",
        alt: "Portfolio 3",
      },
    ],
  },
  // Add more portfolio items as needed
};

export default function PortfolioPage({
  params,
}: {
  params: { slug: string };
}) {
  const portfolio = portfolioData[params.slug as keyof typeof portfolioData];

  if (!portfolio) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Portfolio not found</h1>
      </div>
    );
  }

  return <PortfolioDetails portfolio={portfolio} />;
}
