import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function ContactForm() {
  const bookingForm = [
    { id: 1, label: "Full Name", placeholder: "Enter Your Name" },
    { id: 2, label: "Email Address ", placeholder: "debra.holt@example.com" },
    { id: 3, label: "Phone Number", placeholder: "319.555.0115" },
    { id: 4, label: "Your Subject", placeholder: "NAW" },
  ];
  return (
    <form className="bg-[#17181C] p-[32px] md:p-[24px] sm:p-[16px] rounded-[2px]">
      <div>
        <h2 className="text-primary text-[24px] md:text-[20px] sm:text-[18px] font-bold">
          Let&apos;s talk about your project.
        </h2>
        <p className="text-[14px] font-medium text-white mb-[34px] mt-[8px]">
          Please give us a call, drop us an email or fill out the contact form
          and we&apos;ll get back to you.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[27px] md:gap-[20px] sm:gap-[16px]">
        {bookingForm.map((item) => (
          <div key={item.id}>
            <label className="text-[16px] md:text-[14px] font-medium text-white mb-[8px] block">
              {item.label}
            </label>
            <Input
              className="w-full md:w-[267px] h-[44px] border-secondary bg-[#161718] placeholder:text-[#808080] text-white"
              type="text"
              placeholder={item.placeholder}
            />
          </div>
        ))}
      </div>
      <div className="mt-[34px] md:mt-[24px] sm:mt-[20px]">
        <label className="text-[16px] md:text-[14px] font-medium text-white mb-[8px] block">
          Message
        </label>
        <div>
          <Textarea
            className="w-full md:w-[561px] h-[104px] border-secondary bg-[#161718] placeholder:text-[#808080] resize-none overflow-y-auto text-white whitespace-pre-wrap"
            placeholder="Write your message here..."
          />
        </div>
      </div>
      <Button className="mt-[34px] md:mt-[24px] sm:mt-[20px] h-[48px] w-full md:w-[269px]">
        Send Message
      </Button>
    </form>
  );
}

export default ContactForm;
