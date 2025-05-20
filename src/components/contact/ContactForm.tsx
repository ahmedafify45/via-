"use client";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
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

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE as string;

  const handelChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/items/contact_form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(t.status.success, {
          style: {
            background: "#17181C",
            color: "#fff",
            border: "1px solid #2A2B2F",
          },
          className: "success-toast",
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(t.status.error, {
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
      toast.error(t.status.error);
    }
  };

  return (
    <form
      onSubmit={handelSubmit}
      className="bg-[#17181C] p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="mb-8">
        <h2 className="text-primary text-2xl md:text-3xl font-bold mb-3">
          {t.title}
        </h2>
        <p className="text-white text-base md:text-lg">{t.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookingForm.map((item) => (
          <div key={item.id} className="w-full">
            <label className="text-white text-base font-medium mb-2 block">
              {item.label}
            </label>
            <Input
              className="w-full h-12 border-secondary bg-[#161718] placeholder:text-[#808080] text-white focus:ring-2 focus:ring-primary transition-all duration-300"
              type="text"
              placeholder={item.placeholder}
              name={item.name}
              value={form[item.name as keyof typeof form]}
              onChange={handelChange}
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <label className="text-white text-base font-medium mb-2 block">
          {t.message.label}
        </label>
        <Textarea
          className="w-full h-32 border-secondary bg-[#161718] placeholder:text-[#808080] resize-none text-white focus:ring-2 focus:ring-primary transition-all duration-300"
          placeholder={t.message.placeholder}
          name="message"
          value={form.message}
          onChange={handelChange}
          required
        />
      </div>

      <Button className="mt-8 w-full md:w-auto px-8 h-12 text-black hover:bg-primary/90 transition-all duration-300">
        {t.submit}
      </Button>
    </form>
  );
}

export default ContactForm;
