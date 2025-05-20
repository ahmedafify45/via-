import React from "react";
import Booking from "@/components/booking";
import { generateStaticParams } from "@/lib/generateStaticParams";

export { generateStaticParams };

function Bookingpage() {
  return (
    <main className="my-[220px] mx-1 xl:mx-10">
      <Booking />
    </main>
  );
}
export default Bookingpage;
