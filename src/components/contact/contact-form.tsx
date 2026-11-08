"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Mail, Phone, User } from "lucide-react";
import { EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const EMAIL = "info@chopbaze.com";

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/chopbaze", icon: "/images/social-facebook.svg" },
  { label: "X (Twitter)", href: "https://x.com/chopbaze", icon: "/images/social-x.svg" },
  { label: "Instagram", href: "https://www.instagram.com/chopbaze", icon: "/images/social-instagram.svg" },
  { label: "WhatsApp", href: "https://wa.me/2348116164485?text=Hello%20Chopbaze!%20I%27d%20like%20to%20get%20in%20touch.", icon: "/images/social-whatsapp.svg" },
  { label: "TikTok", href: "https://www.tiktok.com/@chopbaze", icon: "/images/social-tiktok.svg" },
];

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  if (name.length < 2) errors.name = "Tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (phone && !/^\+?[\d\s()-]{7,20}$/.test(phone)) errors.phone = "Enter a valid phone number.";
  if (message.length < 10) errors.message = "Add a few more details so we can help.";
  return errors;
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  // shortcut: no backend yet, the form hands off to the visitor's email app; wire to an API route when one exists
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) return;
    const body = [
      String(data.get("message")).trim(),
      "",
      `Name: ${String(data.get("name")).trim()}`,
      `Email: ${String(data.get("email")).trim()}`,
      data.get("phone") ? `Phone: ${String(data.get("phone")).trim()}` : "",
    ]
      .filter((l, i) => i < 4 || l)
      .join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Message from chopbaze.com")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-fluid-28 font-bold">Email Us</h2>
        <p className="text-fluid-16">
          You can report any complaints, concerns, or suggestions about our bulk food products, orders, or delivery
          services through our contact form or via email at{" "}
          <a href={`mailto:${EMAIL}`} className="font-bold text-red-ink underline underline-offset-2">
            {EMAIL}
          </a>
          . You can also reach our support team through the social media.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field name="name" label="Your Name" icon={<User className="size-4" />} error={errors.name} autoComplete="name" />
        <Field name="email" label="Your Email Address" type="email" icon={<Mail className="size-4" />} error={errors.email} autoComplete="email" />
        <Field name="phone" label="Your Phone Number" type="tel" icon={<Phone className="size-4" />} error={errors.phone} autoComplete="tel" optional />
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          rows={8}
          placeholder="Type a Message here..."
          aria-invalid={!!errors.message}
          className={cn(
            "min-h-[clamp(180px,14vw,270px)] resize-y rounded-[14px] border border-transparent bg-mist px-5 py-4 text-fluid-16 outline-none transition-all duration-300 placeholder:text-grey-300 focus:border-red-ink focus:bg-white focus:shadow-[0_0_0_4px_rgba(193,42,41,0.12)]",
            errors.message && "border-red-ink",
          )}
        />
        <ErrorText text={errors.message} />
      </label>

      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row sm:items-center">
        <ul className="flex gap-2.5">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chopbaze on ${s.label}`}
                className="grid size-9 place-items-center rounded-[10px] border border-grey-500/70 dark:border-foreground/50 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-red-ink hover:bg-red-500 [&:hover_img]:[filter:none]"
              >
                <Image src={s.icon} alt="" width={18} height={18} className="size-[18px] [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]" />
              </a>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className="group relative inline-flex h-[clamp(50px,3.1vw,58px)] w-full items-center justify-center overflow-hidden rounded-[12px] bg-red-500 px-9 text-fluid-20 font-bold text-white transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(193,42,41,0.6)] active:scale-[0.97] sm:w-auto"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative">Submit Message</span>
        </button>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex items-center gap-2 rounded-[12px] bg-[#f0fee9] px-4 py-3 text-fluid-16 text-[#2c6a17]"
          >
            <Check className="size-4" /> Your email app is opening with your message. Send it from there and we&apos;ll
            get back to you.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  name,
  label,
  icon,
  error,
  type = "text",
  autoComplete,
  optional,
}: {
  name: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="sr-only">
        {label}
        {optional && " (optional)"}
      </span>
      <span
        className={cn(
          "group flex h-[clamp(50px,3.6vw,68px)] items-center gap-3 rounded-[14px] border border-transparent bg-mist px-4 text-grey-300 transition-all duration-300 focus-within:border-red-ink focus-within:bg-white focus-within:text-red-ink focus-within:shadow-[0_0_0_4px_rgba(193,42,41,0.12)]",
          error && "border-red-ink",
        )}
      >
        {icon}
        <input
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={label}
          aria-invalid={!!error}
          className="h-full w-full bg-transparent text-fluid-16 text-foreground outline-none placeholder:text-grey-300"
        />
      </span>
      <ErrorText text={error} />
    </label>
  );
}

function ErrorText({ text }: { text?: string }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.span
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-[13px] text-red-ink"
        >
          {text}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
