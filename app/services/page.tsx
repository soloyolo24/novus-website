import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "../components/Reveal";
import { services } from "../lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, AI chatbots, phone assistants, SEO, paid advertising, email marketing, branding, and UI/UX design for local business.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-white/10">
        <div className="shell py-24 md:py-28">
          <Reveal>
            <div className="eyebrow">
              <span className="h-px w-8 bg-electric-500" />
              Services
            </div>
            <h1 className="mt-6 max-w-[18ch] text-display-lg font-bold text-gradient">
              Three core systems, and the pieces that support them.
            </h1>
            <p className="mt-7 max-w-[58ch] text-[16.5px] leading-relaxed text-silver-400">
              Website with an AI chatbot, an AI phone assistant, and automated lead follow-up — the
              three that stop customers slipping away. Everything else on this page exists to support
              them. We only recommend what the audit actually turns up.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shell py-20 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={(i % 2) * 0.06}>
                <article id={service.slug} className="card card-hover flex h-full flex-col p-9 scroll-mt-24">
                  <div className="flex items-start justify-between gap-6">
                    <Icon size={24} className="text-electric-500" />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-silver-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="mt-7 text-[24px] font-semibold tracking-tight text-white">
                    {service.title}
                  </h2>
                  <p className="mt-3.5 text-[15px] leading-relaxed text-silver-400">
                    {service.description}
                  </p>

                  <ul className="mt-7 space-y-2.5">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-[14px] text-silver-500">
                        <Check size={15} className="mt-0.5 shrink-0 text-electric-500" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <span className="text-[12px] uppercase tracking-[0.14em] text-silver-500">
                      {service.timeline}
                    </span>
                    <div className="flex gap-5">
                      <Link href={`/services/${service.slug}`} className="link-underline">
                        Details
                      </Link>
                      <Link href="/contact" className="link-underline text-electric-400 hover:text-electric-400">
                        Start a consultation <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-navy-950">
        <div className="shell py-24 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-[18ch] text-display-md font-bold text-white">
              Not sure which of these you need?
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-[16px] text-silver-500">
              That&apos;s what the audit is for. Thirty minutes, no cost, and a straight answer about
              what&apos;s worth fixing first.
            </p>
            <Link href="/contact" className="btn-primary mt-9">
              Book a call <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
