import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "../components/Reveal";
import PageHeader from "../components/PageHeader";
import { services } from "../lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, AI chatbots, phone assistants, SEO, paid advertising, email marketing, branding, and UI/UX design for local business.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Three core systems, and the pieces that support them."
        lede="Website with an AI chatbot, an AI phone assistant, and automated lead follow-up — the three that stop customers slipping away. Everything else on this page exists to support them. We only recommend what the audit actually turns up."
      />

      <section className="shell py-20 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={(i % 2) * 0.06}>
                <article
                  id={service.slug}
                  className="card card-hover group relative flex h-full flex-col overflow-hidden p-9 scroll-mt-24"
                >
                  {service.image && (
                    <>
                      {/* CSS background, not next/image: a file that hasn't been
                          produced yet degrades to the plain glass card. */}
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-cover bg-center opacity-[0.55] transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-80"
                        style={{
                          backgroundImage: `url('${service.image}')`,
                          // Shop photography is dark by nature; without a lift it
                          // disappears entirely under the scrim. Same treatment
                          // as the home hero.
                          filter: "brightness(1.55) saturate(1.1)",
                        }}
                      />
                      {/* Flat scrim — copy runs the full height of these cards,
                          so every part of the photo needs the same protection. */}
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/[0.78] to-ink-950/[0.66]"
                      />
                    </>
                  )}

                  <div className="relative z-[1] flex items-start justify-between gap-6">
                    <Icon size={24} className="text-electric-500" />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-silver-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="relative z-[1] mt-7 text-[24px] font-semibold tracking-tight text-white">
                    {service.title}
                  </h2>
                  <p className="relative z-[1] mt-3.5 text-[15px] leading-relaxed text-silver-400">
                    {service.description}
                  </p>

                  <ul className="relative z-[1] mt-7 space-y-2.5">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-[14px] text-silver-500">
                        <Check size={15} className="mt-0.5 shrink-0 text-electric-500" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="relative z-[1] mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
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

      <section className="border-t border-white/10 bg-ink-950">
        <div className="shell py-24 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-[18ch] text-display-md font-bold text-white">
              Not sure which of these you need?
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-[16px] text-silver-500">
              That&apos;s what the audit is for. Thirty minutes, no cost, and a straight answer about
              what&apos;s worth fixing first.
            </p>
            <Link href="/book" className="btn-primary mt-9">
              Book a call <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
