"use client";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { useParams } from "next/navigation";
import en from "@/dictionaries/en.json";
import ar from "@/dictionaries/ar.json";

const dictionaries = { en, ar };

function ContactForm() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = dictionaries[locale as keyof typeof dictionaries].contact.form;

  const bookingForm = [
    {
      id: 1,
      name: "name",
      label: t.fields.name.label,
      placeholder: t.fields.name.placeholder,
    },
    {
      id: 2,
      name: "email",
      label: t.fields.email.label,
      placeholder: t.fields.email.placeholder,
    },
    {
      id: 3,
      name: "phone",
      label: t.fields.phone.label,
      placeholder: t.fields.phone.placeholder,
    },
    {
      id: 4,
      name: "subject",
      label: t.fields.subject.label,
      placeholder: t.fields.subject.placeholder,
    },
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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
    setStatus(t.status.loading);

    try {
      const response = await fetch(`${API_BASE_URL}/items/contact_form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus(t.status.success);
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus(t.status.error);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
      setStatus(t.status.error);
    }
  };

  return (
    <form
      onSubmit={handelSubmit}
      className="bg-[#17181C] p-[32px] md:p-[24px] sm:p-[16px] rounded-[2px]"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {status && <p className="text-green-500">{status}</p>}
      <div>
        <h2 className="text-primary text-[24px] md:text-[20px] sm:text-[18px] font-bold">
          {t.title}
        </h2>
        <p className="text-[14px] font-medium text-white mb-[34px] mt-[8px]">
          {t.description}
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
              name={item.name}
              value={form[item.name as keyof typeof form]}
              onChange={handelChange}
            />
          </div>
        ))}
      </div>
      <div className="mt-[34px] md:mt-[24px] sm:mt-[20px]">
        <label className="text-[16px] md:text-[14px] font-medium text-white mb-[8px] block">
          {t.message.label}
        </label>
        <div>
          <Textarea
            className="w-full md:w-[561px] h-[104px] border-secondary bg-[#161718] placeholder:text-[#808080] resize-none overflow-y-auto text-white whitespace-pre-wrap"
            placeholder={t.message.placeholder}
            name="message"
            value={form.message}
            onChange={handelChange}
            required
          />
        </div>
      </div>
      <Button className="mt-[34px] md:mt-[24px] sm:mt-[20px] h-[48px] w-full md:w-[269px]">
        {t.submit}
      </Button>
    </form>
  );
}

export default ContactForm;
