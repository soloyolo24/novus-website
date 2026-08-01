"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Check,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Loader2,
} from "lucide-react";
import Reveal from "../components/Reveal";
import { services, BOOKING_URL } from "../lib/data";

const budgets = ["Under $2k", "$2k – $5k", "$5k – $10k", "$10k+", "Not sure yet"];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const toggleService = (slug: string) =>
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  async function handleSubmit() {
    if (!form.name || !form.email) return;
    setStatus("sending");

    try {
      // Point this at your Apps Script Web App URL or /api/contact route
      const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            name: form.name,
            email: form.email,
            company: form.company,
            message: form.message,
            services: selected.join(", "),
            budget,
            source: "contact page",
          }),
        });
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border border-white/15 bg-navy-800/50 px-4 py-3.5 text-[15px] text-white placeholder:text-silver-500 transition-colors focus:border-electric-500 focus:outline-none";

  return (
    <>
      <section className="border-b border-white/10">
        <div className="shell py-24 md:py-28">
          <Reveal>
            <div className="eyebrow">
              <span className="h-px w-8 bg-electric-500" />
              Contact
            </div>
            <h1 className="mt-6 max-w-[16ch] text-display-lg font-bold text-gradient">
              Let&apos;s find what you&apos;re losing.
            </h1>
            <p className="mt-7 max-w-[56ch] text-[16.5px] leading-relaxed text-silver-400">
              Tell us a bit about your business and we&apos;ll come back within one working day. The
              audit is free and there&apos;s no obligation attached to it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Direct booking */}
      <section className="border-b border-white/10 bg-navy-950/50">
        <div className="shell py-14 md:py-16">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 border border-white/10 bg-navy-800/40 p-8 md:flex-row md:items-center md:p-10">
              <div>
                <h2 className="text-[13px] uppercase tracking-[0.22em] text-silver-500">
                  Prefer to just grab a time?
                </h2>
                <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-silver-400">
                  Skip the form and book a free 15-minute call directly on our calendar — pick
                  whatever slot works for you.
                </p>
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary shrink-0"
              >
                <CalendarCheck size={15} /> Book a time <ArrowUpRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell py-20 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT — contact details */}
          <Reveal>
            <div>
              <h2 className="text-[13px] uppercase tracking-[0.22em] text-silver-500">
                Direct contact
              </h2>

              <ul className="mt-8 space-y-6">
                <li>
                  <a
                    href="mailto:contact@novussolutions.co"
                    className="group flex items-start gap-4"
                  >
                    <Mail size={18} className="mt-1 shrink-0 text-electric-500" />
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.16em] text-silver-500">
                        Email
                      </span>
                      <span className="text-[15.5px] text-white transition-colors group-hover:text-electric-400">
                        contact@novussolutions.co
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="tel:+13125550000" className="group flex items-start gap-4">
                    <Phone size={18} className="mt-1 shrink-0 text-electric-500" />
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.16em] text-silver-500">
                        Phone
                      </span>
                      <span className="text-[15.5px] text-white transition-colors group-hover:text-electric-400">
                        (312) 555-0000
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={18} className="mt-1 shrink-0 text-electric-500" />
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.16em] text-silver-500">
                      Location
                    </span>
                    <span className="text-[15.5px] text-white">Chicago, Illinois</span>
                  </span>
                </li>
              </ul>

              <div className="mt-12 border-t border-white/10 pt-8">
                <h3 className="text-[13px] uppercase tracking-[0.22em] text-silver-500">Follow</h3>
                <div className="mt-5 flex gap-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="border border-white/10 p-3 text-silver-400 transition-colors hover:border-electric-500 hover:text-white"
                  >
                    <Linkedin size={17} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="border border-white/10 p-3 text-silver-400 transition-colors hover:border-electric-500 hover:text-white"
                  >
                    <Instagram size={17} />
                  </a>
                </div>
              </div>

              <div className="mt-12 border border-white/10 bg-navy-800/40 p-6">
                <p className="text-[14px] leading-relaxed text-silver-500">
                  We work with a limited number of clients at a time so each build gets proper
                  attention. If we&apos;re at capacity we&apos;ll tell you honestly rather than take the
                  work and rush it.
                </p>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — form */}
          <Reveal delay={0.1}>
            {status === "sent" ? (
              <div className="card flex h-full flex-col items-center justify-center p-14 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-electric-500">
                  <Check size={26} className="text-white" />
                </div>
                <h2 className="mt-7 text-[26px] font-bold text-white">Got it.</h2>
                <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-silver-500">
                  Check your inbox — you should have a note from us shortly. We&apos;ll follow up
                  properly within one working day.
                </p>
                <Link href="/work" className="btn-secondary mt-9">
                  Browse our work
                </Link>
              </div>
            ) : (
              <div className="card p-9 md:p-11">
                <h2 className="text-[13px] uppercase tracking-[0.22em] text-silver-500">
                  Project details
                </h2>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-[12px] uppercase tracking-[0.14em] text-silver-500"
                    >
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[12px] uppercase tracking-[0.14em] text-silver-500"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@business.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="company"
                    className="mb-2 block text-[12px] uppercase tracking-[0.14em] text-silver-500"
                  >
                    Business name
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Your business"
                    className={inputClass}
                  />
                </div>

                {/* Service chips */}
                <div className="mt-9">
                  <span className="mb-3.5 block text-[12px] uppercase tracking-[0.14em] text-silver-500">
                    What are you interested in?
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {services.map((s) => {
                      const active = selected.includes(s.slug);
                      return (
                        <button
                          key={s.slug}
                          type="button"
                          onClick={() => toggleService(s.slug)}
                          className={`border px-4 py-2.5 text-[13px] transition-all ${
                            active
                              ? "border-electric-500 bg-electric-500/15 text-white"
                              : "border-white/15 text-silver-400 hover:border-silver-400 hover:text-white"
                          }`}
                        >
                          {active && <Check size={13} className="mr-1.5 inline" />}
                          {s.title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget */}
                <div className="mt-9">
                  <span className="mb-3.5 block text-[12px] uppercase tracking-[0.14em] text-silver-500">
                    Rough budget
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className={`border px-4 py-2.5 text-[13px] transition-all ${
                          budget === b
                            ? "border-electric-500 bg-electric-500/15 text-white"
                            : "border-white/15 text-silver-400 hover:border-silver-400 hover:text-white"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-9">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[12px] uppercase tracking-[0.14em] text-silver-500"
                  >
                    What&apos;s going on?
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us about your business and what's not working right now."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === "sending" || !form.name || !form.email}
                  className="btn-primary mt-9 w-full disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Sending
                    </>
                  ) : (
                    <>
                      Send it over <ArrowRight size={15} />
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p className="mt-4 text-center text-[13.5px] text-red-400">
                    Something went wrong — email us directly at contact@novussolutions.co
                  </p>
                )}

                <p className="mt-5 text-center text-[12.5px] text-silver-500">
                  No spam, no sales sequence you can&apos;t get out of.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
