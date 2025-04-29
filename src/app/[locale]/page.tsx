import Booking from "@/components/booking";
import AboutUs from "./_components/AboutUs";
import Hero from "./_components/Hero";
import OurClients from "./_components/OurClients";
import OurPortfolio from "./_components/OurPortfolio";
import OurService from "./_components/OurService";
import Image from "next/image";
import BookingInput from "@/components/booking/BookingInput";
import BookingButton from "@/components/booking/BookingButton";

export default function Home() {
  return (
    <main className="my-[220px] overflow-x-hidden">
      <Hero />
      <AboutUs />
      <OurPortfolio />
      <OurService />
      <div className="flex items-center justify-center">
        <OurClients />
      </div>
      <div className="flex flex-col items-center mx-[20px] sm:mx-[40px] md:mx-[60px] lg:mx-[80px]">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8">
          <div className="w-full sm:w-[90%] md:w-[809px] bg-[#17181C] border border-[#25231B] rounded-[2px] p-[24px] order-2 lg:order-1">
            <p className="text-white">Your Information</p>
            <BookingInput/>
          </div>
          <div className="w-full sm:w-[90%] lg:w-auto order-1 lg:order-2">
            <Image 
              src="/images/about/ourStory.png" 
              alt="" 
              width={800} 
              height={800}
              className="w-full h-auto object-cover max-w-[800px]"
            />
          </div>
        </div>
        <div className="mt-8">
          <BookingButton/>
        </div>
      </div>
    </main>
  );
}
