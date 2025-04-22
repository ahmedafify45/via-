import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faStar,
  faHandshake,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import AboutDetails from "./AboutDetails";

function AboutUs() {
  const aboutUsIcon = [
    { title: "Creativity And Innovation media", icon: faLightbulb },
    { title: "Excellence And Adaptability", icon: faStar },
    { title: "Integrity And Collaboration", icon: faHandshake },
  ];
  const imageData = [
    {
      group: "/images/sidebar/LogoSCE.png",
      alt: "LogoSCE",
      width: 51,
      height: 51,
    },
    {
      group: "/images/sidebar/Group.png",
      alt: "Group",
      width: 100,
      height: 41,
    },
    {
      group: "/images/sidebar/LogoFEG.png",
      alt: "LogoFEG",
      width: 157,
      height: 76,
    },
    {
      group: "/images/sidebar/Logodt_logo.png",
      alt: "LogoBdC.png",
      width: 140,
      height: 59,
    },
    {
      group: "/images/sidebar/LogoBdC.png",
      alt: "LogoBdC.png",
      width: 87,
      height: 63,
    },
  ];

  return (
    <section>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/aboutus.png"
            alt="About Us"
            width={422}
            height={535}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="w-full md:w-1/2">
          <div
            className="bg-cover w-full h-[612px] overflow-hidden "
            style={{ backgroundImage: "url('/images/aboutus_text.png')" }}
          >
            <div className="ml-[155px]">
              <h2 className="font-bold text-4xl md:text-[48px] text-black pt-[92px]">
                About Us
              </h2>
              <p className="mb-[16px] mt-[24px]">
                Once upon a time in the vibrant city of Cairo, four visionaries
                came together with a shared passion for transforming ideas into
                impactful stories.
              </p>
              <div className="flex flex-col gap-2">
                {aboutUsIcon.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-[44px] h-[44px] bg-[#0C0D0F] rounded-tl-[16px] rounded-br-[16px] text-primary text-[18px] flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="w-[18px] h-[26px]"
                      />
                    </div>
                    <p className="text-[24px] font-bold">{item.title}</p>
                  </div>
                ))}
              </div>
              <Button className="text-black w-[220px] h-[50px] p-[16px] mt-[24px]">
                More Info <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white rounded-tl-[16px] rounded-br-[16px] w-[1284px] h-[96px] mr-[76px] ml-[80px]">
        {imageData.map((item, index) => (
          <div key={index}>
            <Image
              src={item.group}
              alt={item.alt}
              width={item.width}
              height={item.height}
            />
          </div>
        ))}
      </div>
      <AboutDetails />
    </section>
  );
}

export default AboutUs;
