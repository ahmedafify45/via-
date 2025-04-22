import { Button } from "@/components/ui/button";
import Image from "next/image";

function Hero() {
  return (
    <section className="ml-[80px] mr-[34px] mt-[67px]">
      <div className="flex items-center justify-between gap-[24px]">
        <div className="text-white w-[744px] h-[332px]">
          <h1 className="font-bold text-[64px]">
            Transform Your Brand&rsquo;s
            <span className="text-primary block">Digital Presence</span>
          </h1>
          <p className="font-medium text-[24px]">
            We craft strategic marketing campaigns that elevate your brand,
            engage your audience, and drive measurable results.
          </p>
          <Button className="mt-[24px] rounded-tl-[16px] rounded-br-[16px] rounded-bl-none rounded-tr-none">
            Start Your Project
          </Button>
        </div>

        <div className="w-[530px] h-[530px] relative">
          <Image src="/images/hero.png" alt="" fill />
        </div>
      </div>
    </section>
  );
}

export default Hero;
