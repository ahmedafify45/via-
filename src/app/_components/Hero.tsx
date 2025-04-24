import { Button } from "@/components/ui/button";
import Image from "next/image";

function Hero() {
  return (
    <section className="px-4 md:ml-[80px] md:mr-[34px] mt-[80px] md:mt-[132px]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-[24px]">
        <div className="text-white w-full md:w-[744px] text-center md:text-left">
          <h1 className="font-bold text-[40px] md:text-[64px]">
            Transform Your Brand&rsquo;s
            <span className="text-primary block">Digital Presence</span>
          </h1>
          <p className="font-medium text-[18px] md:text-[24px] mt-4">
            We craft strategic marketing campaigns that elevate your brand,
            engage your audience, and drive measurable results.
          </p>
          <Button className="mt-[24px] rounded-tl-[16px] rounded-br-[16px] rounded-bl-none rounded-tr-none">
            Start Your Project
          </Button>
        </div>

        <div className="w-full md:w-[530px] h-[300px] md:h-[530px] relative mt-8 md:mt-0">
          <Image
            src="/images/hero.png"
            alt="Hero illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
