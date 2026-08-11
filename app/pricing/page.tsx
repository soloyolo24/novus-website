import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "../components/Reveal";
import { tiers } from "../lib/data";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent packages for auto shops. Foundation from $799 setup, Growth from $1,699, Scale from $2,399 — every one includes a free audit and monthly reporting.",
};

const faqs = [
  {
    q: "Do you handle our customers' payments?",
    a: "No — and that's deliberate. Payments run through Stripe or Square under your own account. We connect it, you own it, and card data never touches anything we built.",
  },
  {
    q: "What does the monthly fee actually cover?",
    a: "Hosting and platform costs, monitoring, tuning the assistants as your business changes, and a monthly report on what's coming in. It also covers you calling us when something needs changing.",
  },
  {
    q: "Do we own everything if we stop working with you?",
    a: "Yes. Your domain, your site, your accounts, your customer data. We'll hand over access and documentation.",
  },
  {
    q: "Why is the setup fee fixed but the monthly a starting price?",
    a: "The build is a defined piece of work, so we can quote it flat. The monthly scales with what the system actually handles — call volume, message volume, how many locations. After the audit you get a fixed number for both, not a range.",
  },
  {
    q: "Can we start at Foundation and move up later?",
    a: "That's how most shops do it. Foundation stops the immediate leaks, and once you can see what's coming in, it's obvious whether the chatbot or the phone assistant is worth adding. You only pay the difference in setup.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Start where it counts."
        lede="Every package includes the audit, monthly reporting, and a real person in Chicago who picks up when you call. Most shops land on Growth — it's the point where lead capture, booking, and reviews all run without anyone remembering to do them."
      />

      <section className="shell py-20 md:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div
                className={`flex h-full flex-col rounded-2xl p-9 ${
                  tier.featured
                    ? "border border-electric-500/40 bg-gradient-to-b from-electric-500/[0.13] to-white/[0.02] shadow-[0_0_60px_rgba(77,139,255,0.09)]"
                    : "card"
                }`}
              >
                {tier.featured && (
                  <span className="mb-5 self-start rounded-full bg-electric-500 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-950">
                    Most common
                  </span>
                )}

                <h2 className="text-[12px] uppercase tracking-[0.22em] text-electric-400">
                  {tier.name}
                </h2>

                {/* Setup and monthly are separate commitments — show them as such
                    rather than merging into one ambiguous number. */}
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-[34px] font-bold leading-none tracking-tight text-white">
                    {tier.setup}
                  </span>
                  <span className="text-[13px] text-silver-500">one-time setup</span>
                </div>
                <div className="mt-2.5 text-[15px] font-semibold text-silver-200">
                  {tier.monthly}
                  <span className="ml-1.5 text-[13px] font-normal text-silver-500">
                    operational
                  </span>
                </div>

                <p className="mt-5 text-[14.5px] leading-relaxed text-silver-500">{tier.goal}</p>

                <ul className="mt-8 flex-1 space-y-4 border-t border-white/10 pt-7">
                  {tier.features.map((f) => (
                    <li key={f.title} className="flex gap-3">
                      <Check size={15} className="mt-1 shrink-0 text-electric-500" />
                      <div>
                        <div className="text-[14.5px] font-medium text-silver-200">{f.title}</div>
                        {f.detail && (
                          <p className="mt-1 text-[13.5px] leading-relaxed text-silver-500">
                            {f.detail}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-9 w-full ${tier.featured ? "btn-primary" : "btn-secondary"}`}
                >
                  Get started <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 bg-ink-950/50 py-24">
        <div className="shell">
          <Reveal>
            <div className="eyebrow">
              <span className="h-px w-8 bg-electric-500" />
              Common questions
            </div>
            <h2 className="mt-5 text-display-md font-bold text-white">Straight answers</h2>
          </Reveal>

          <div className="mt-12 border-t border-white/10">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.05}>
                <details className="group border-b border-white/10 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-medium text-white">
                    {faq.q}
                    <span className="shrink-0 text-[22px] leading-none text-electric-500 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[68ch] text-[14.5px] leading-relaxed text-silver-500">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
