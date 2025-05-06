"use client";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Button } from "../ui/button";

function BookingForm() {
  const bookingForm = [
    { name: "name", label: "Full Name", placeholder: "Enter Your Name" },
    { name: "email", label: "Email", placeholder: "debra.holt@example.com" },
    {
      name: "phone_number",
      label: "Phone Number",
      placeholder: "319.555.0115",
    },
    {
      name: "company",
      label: "Company Name",
      placeholder: "Enter Your Message",
    },
  ];

  const [form, setForm] = useState({
    status: "published",
    name: "",
    email: "",
    phone_number: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE as string;

  const handelChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/items/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setForm({
          status: "published",
          name: "",
          email: "",
          phone_number: "",
          company: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
      console.log(data);
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handelSubmit}
      className="mt-[30px] bg-[#17181C] py-[20px] md:py-[30px] px-[16px] md:px-[24px] rounded-[4px] max-w-[839px] mx-auto w-full"
    >
      {status && <p className="text-green-500">{status}</p>}

      <h2 className="text-white text-[20px] md:text-[24px] font-bold ">
        Your Information
      </h2>
      <div className="w-full">
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
                name={item.name}
                value={form[item.name as keyof typeof form]}
                onChange={handelChange}
                required
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
              name="message"
              value={form.message}
              onChange={handelChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-[24px]">
        <Button
          type="submit"
          className="w-[326px] h-[56px] p-[16px] text-[#0C0D0F]"
        >
          Book Consultation
        </Button>
      </div>
    </form>
  );
}

export default BookingForm;
