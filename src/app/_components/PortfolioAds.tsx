import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function PortfolioAds() {
  const portfolioAds = [
    {
      id: 1,
      title: "Innovation",
      image: "/images/iconPortflio.png",
    },
    {
      id: 2,
      title: "Vision",
      image: "/images/iconPortflio.png",
    },
    {
      id: 3,
      title: "Integrity",
      image: "/images/iconPortflio.png",
    },
    {
      id: 4,
      title: "Action",
      image: "/images/iconPortflio.png",
    },
    {
      id: 5,
      title: "Excellence",
      image: "/images/iconPortflio.png",
    },
    {
      id: 6,
      title: "Action",
      image: "/images/iconPortflio.png",
    },
    {
      id: 7,
      title: "Action",
      image: "/images/iconPortflio.png",
    },
  ];
  return (
    <section className="bg-[#181818] text-white mt-[84.5px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:ml-[110px] gap-[13px]">
        <div className="max-w-[535px] max-h-[158px] flex flex-col justify-center items-center">
          <p className="text-[36px] font-medium text-center">
            Your voice will be heard... and
            <br className="text-center" /> your sales will increase
          </p>
          <Button className="text-[20px] p-[16px] max-w-[302px] h-[50px] mt-[16px] text-black">
            Request a free consultation
          </Button>
        </div>
        <Image
          src="/images/portfolioAds.png"
          alt="portfolioAds"
          width={768}
          height={590}
        />
      </div>
      <div className="bg-primary text-black max-w-[1534.33px] h-[110px] flex justify-between items-center -pl-[28px] -rotate-[3deg] relative ">
        {portfolioAds.map((item) => (
          <div key={item.id} className="flex items-center">
            <Image src={item.image} alt={item.title} width={26} height={31} />
            <p className="text-[20px] font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PortfolioAds;
