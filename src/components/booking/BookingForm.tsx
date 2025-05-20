"use client";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import en from "@/dictionaries/en.json";
import ar from "@/dictionaries/ar.json";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";

const dictionaries = { en, ar };

function BookingForm() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const safeLocale: "en" | "ar" = locale === "ar" ? "ar" : "en";
  const t = dictionaries[safeLocale].booking.form;

  const [form, setForm] = useState({
    status: "published",
    name: "",
    email: "",
    phone_number: "",
    company: "",
    message: "",
    date_slot: "",
    time_slot: "",
  });

  const [date, setDate] = useState<Date>();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE as string;

  const handelChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setForm({ ...form, date_slot: format(selectedDate, "yyyy-MM-dd") });
    }
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.date_slot || !form.time_slot) {
      toast.error("Please select a date and enter your preferred time", {
        style: {
          background: "#17181C",
          color: "#fff",
          border: "1px solid #2A2B2F",
        },
        className: "error-toast",
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/items/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Booking submitted successfully!", {
          style: {
            background: "#17181C",
            color: "#fff",
            border: "1px solid #2A2B2F",
          },
          className: "success-toast",
        });
        setForm({
          status: "published",
          name: "",
          email: "",
          phone_number: "",
          company: "",
          message: "",
          date_slot: "",
          time_slot: "",
        });
        setDate(undefined);
      } else {
        toast.error("Failed to submit booking. Please try again.", {
          style: {
            background: "#17181C",
            color: "#fff",
            border: "1px solid #2A2B2F",
          },
          className: "error-toast",
        });
      }
      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.", {
        style: {
          background: "#17181C",
          color: "#fff",
          border: "1px solid #2A2B2F",
        },
        className: "error-toast",
      });
    }
  };

  return (
    <form
      onSubmit={handelSubmit}
      className="mt-[30px] bg-[#17181C] py-[40px] md:py-[50px] md:px-[50px] rounded-[4px]  w-full"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <h2 className="text-white text-[20px] md:text-[24px] font-bold mb-6">
        {t.title}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Form fields */}
        <div className="space-y-6">
          <div>
            <label className="text-[16px] font-medium text-white mb-2 block">
              {t.fields.name.label}
            </label>
            <Input
              className="w-full h-[44px] border-secondary bg-[#161718] placeholder:text-[#808080] text-white"
              type="text"
              placeholder={t.fields.name.placeholder}
              name="name"
              value={form.name}
              onChange={handelChange}
              required
            />
          </div>

          <div>
            <label className="text-[16px] font-medium text-white mb-2 block">
              {t.fields.email.label}
            </label>
            <Input
              className="w-full h-[44px] border-secondary bg-[#161718] placeholder:text-[#808080] text-white"
              type="email"
              placeholder={t.fields.email.placeholder}
              name="email"
              value={form.email}
              onChange={handelChange}
              required
            />
          </div>

          <div>
            <label className="text-[16px] font-medium text-white mb-2 block">
              {t.fields.phone.label}
            </label>
            <Input
              className="w-full h-[44px] border-secondary bg-[#161718] placeholder:text-[#808080] text-white"
              type="tel"
              placeholder={t.fields.phone.placeholder}
              name="phone_number"
              value={form.phone_number}
              onChange={handelChange}
              required
            />
          </div>

          <div>
            <label className="text-[16px] font-medium text-white mb-2 block">
              {t.fields.company.label}
            </label>
            <Input
              className="w-full h-[44px] border-secondary bg-[#161718] placeholder:text-[#808080] text-white"
              type="text"
              placeholder={t.fields.company.placeholder}
              name="company"
              value={form.company}
              onChange={handelChange}
              required
            />
          </div>

          <div>
            <label className="text-[16px] font-medium text-white mb-2 block">
              {t.message.label}
            </label>
            <Textarea
              className="w-full h-[120px] border-secondary bg-[#161718] placeholder:text-[#808080] text-white"
              placeholder={t.message.placeholder}
              name="message"
              value={form.message}
              onChange={handelChange}
              required
            />
          </div>
        </div>

        {/* Right side - Calendar and Time selection */}
        <div className="space-y-6">
          <div>
            <label className="text-[16px] font-medium text-white mb-2 block">
              {t.fields.date.label}
            </label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border bg-[#161718]"
              disabled={(date) => date < new Date()}
            />
          </div>

          <div>
            <label className="text-[16px] font-medium text-white mb-2 block">
              {t.fields.time.label}
            </label>
            <Input
              className="w-full h-[44px] border-secondary bg-[#161718] placeholder:text-[#808080] text-white"
              type="time"
              name="time_slot"
              value={form.time_slot}
              onChange={handelChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          className="w-[326px] h-[56px] p-[16px] text-[#0C0D0F]"
        >
          {t.submit}
        </Button>
      </div>
    </form>
  );
}

export default BookingForm;
