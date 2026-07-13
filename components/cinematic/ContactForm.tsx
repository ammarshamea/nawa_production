"use client";

import { useState, type FormEvent } from "react";
import { useContent, useLanguage } from "@/lib/i18n/LanguageProvider";

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-sm text-studio-white placeholder:text-white/25 transition-[border-color,background-color,box-shadow] focus:border-studio-gold/40 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-studio-gold/20";

export function ContactForm() {
  const { brand, contact } = useContent();
  const { isRtl } = useLanguage();
  const { form } = contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const subject = encodeURIComponent(`${contact.title} — ${name}`);
    const body = encodeURIComponent(
      `${form.nameLabel}: ${name}\n${form.emailLabel}: ${email}\n\n${message}`,
    );

    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      dir={isRtl ? "rtl" : "ltr"}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-10"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-studio-gold/50 to-transparent"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2.5 block text-[10px] uppercase tracking-[0.3em] text-studio-gold/80">
            {form.nameLabel}
          </span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={form.namePlaceholder}
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="mb-2.5 block text-[10px] uppercase tracking-[0.3em] text-studio-gold/80">
            {form.emailLabel}
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={form.emailPlaceholder}
            className={inputClass}
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="mb-2.5 block text-[10px] uppercase tracking-[0.3em] text-studio-gold/80">
          {form.messageLabel}
        </span>
        <textarea
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={form.messagePlaceholder}
          className={`${inputClass} min-h-[10rem] resize-y`}
        />
      </label>

      <button
        type="submit"
        className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-studio-gold/60 bg-studio-gold/15 px-8 py-4 text-xs uppercase tracking-[0.24em] text-studio-gold transition-colors hover:border-studio-gold hover:bg-studio-gold/25"
      >
        {form.submit}
      </button>
    </form>
  );
}
