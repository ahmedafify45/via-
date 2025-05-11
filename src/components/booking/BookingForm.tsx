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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dictionaries = { en, ar };

function BookingForm() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const safeLocale: "en" | "ar" = locale === "ar" ? "ar" : "en";
  const t = dictionaries[safeLocale].booking.form;

  const timeSlots = [
    "9:00AM - 10:00AM",
    "10:00AM - 11:00AM",
    "11:00AM - 12:00PM",
    "12:00PM - 1:00PM",
    "2:00PM - 3:00PM",
    "3:00PM - 4:00PM",
    "4:00PM - 5:00PM",
  ];

  const bookingForm = [
    {
      name: "name",
      label: t.fields.name.label,
      placeholder: t.fields.name.placeholder,
    },
    {
      name: "email",
      label: t.fields.email.label,
      placeholder: t.fields.email.placeholder,
    },
    {
      name: "phone_number",
      label: t.fields.phone.label,
      placeholder: t.fields.phone.placeholder,
    },
    {
      name: "company",
      label: t.fields.company.label,
      placeholder: t.fields.company.placeholder,
    },
  ];

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

  const handleTimeSelect = (value: string) => {
    setForm({ ...form, time_slot: value });
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.date_slot || !form.time_slot) {
      toast.error("Please select a date and time slot", {
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
      className="mt-[30px] bg-[#17181C] py-[20px] md:py-[30px] px-[16px] md:px-[24px] rounded-[4px] max-w-[839px] mx-auto w-full"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <h2 className="text-white text-[20px] md:text-[24px] font-bold ">
        {t.title}
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

          <div className="w-full">
            <label className="text-[16px] md:text-[20px] font-medium text-white mb-[8px] block">
              {t.fields.time.label}
            </label>
            <Select onValueChange={handleTimeSelect} value={form.time_slot}>
              <SelectTrigger className="w-full h-[44px] border-secondary bg-[#161718] text-white">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent className="bg-[#161718] text-white">
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot} className="text-white">
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <label className="text-[16px] md:text-[20px] font-medium text-white mb-[8px] block">
              {t.message.label}
            </label>
            <Textarea
              className="w-full h-[120px] md:h-[44px] border-secondary bg-[#161718] placeholder:text-[#808080]"
              placeholder={t.message.placeholder}
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
          {t.submit}
        </Button>
      </div>
    </form>
  );
}

export default BookingForm;
