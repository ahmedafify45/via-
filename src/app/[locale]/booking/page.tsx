import React from "react";
import Booking from "@/components/booking";
import { generateStaticParams } from "@/lib/generateStaticParams";

export { generateStaticParams };

function Bookingpage() {
  return (
    <main className="my-[220px] lg:mx-[300px]">
      <Booking />
    </main>
  );
}

export default Bookingpage;
