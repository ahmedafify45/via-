import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

function BookingInput() {
  const bookingForm = [
    { label: "Full Name", placeholder: "Enter Your Name" },
    { label: "Email", placeholder: "debra.holt@example.com" },
    { label: "Phone Number", placeholder: "319.555.0115" },
    { label: "Company Name", placeholder: "Enter Your Message" },
  ];
  return (
    <div className="flex flex-col gap-[24px] md:gap-[34px] mt-[20px] md:mt-[25px] w-full">
      {bookingForm.map((item) => (
        <div key={item.label} className="w-full">
          <label
            htmlFor={item.label}
            className="text-[16px] md:text-[20px] font-medium text-white mb-[8px] block"
          >
            {item.label}
          </label>
          <Input
            className="w-full h-[44px] border-secondary bg-[#161718] placeholder:text-[#808080] text-white"
            type="text"
            id={item.label}
            placeholder={item.placeholder}
          />
        </div>
      ))}

      <div className="w-full">
        <label className="text-[16px] md:text-[20px] font-medium text-white mb-[8px] block">
          Enter your Massage
        </label>
        <Textarea
          className="w-full h-[120px] md:h-[44px] border-secondary bg-[#161718] placeholder:text-[#808080]"
          placeholder="What Would You Like To Discuses?"
        />
      </div>
    </div>
  );
}

export default BookingInput;
