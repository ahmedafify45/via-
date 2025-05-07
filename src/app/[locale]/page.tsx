import AboutUs from "./_components/AboutUs";
import Hero from "./_components/Hero";
import OurClients from "./_components/OurClients";
import OurPortfolio from "./_components/OurPortfolio";
import OurService from "./_components/OurService";
import Image from "next/image";

import BookingForm from "@/components/booking/BookingForm";
import CallToAction from "./_components/CallToAction";

export default async function Home() {
  return (
    <main className="my-[220px] overflow-x-hidden">
      <Hero />
      <AboutUs />
      <OurPortfolio />
      <CallToAction />
      <OurService />
      <div className="mt-[50px] xl:flex justify-center items-center">
        <OurClients />
      </div>

      <div className="flex flex-col items-center mx-[20px] sm:mx-[40px] md:mx-[60px] lg:mx-[80px]">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8">
          <div className="w-full sm:w-[90%] md:w-[809px] bg-[#17181C] border border-[#25231B] rounded-[2px] p-[24px] order-2 lg:order-1">
            <p className="text-white">Your Information</p>
            <BookingForm />
          </div>
          <div className="w-full sm:w-[90%] xl:w-auto order-1 lg:order-2 flex items-center justify-center lg:block">
            <Image
              src="/images/booking.png"
              alt=""
              width={350}
              height={500}
              className="w-[350px] h-[500px] xl:w-[450px] xl:h-[600px]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
