import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "../components/Reveal";
import { tiers } from "../lib/data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent packages for automotive business. Foundation, Growth, and Partnership tiers — every one includes a free audit and monthly reporting.",
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
    q: "Why is there a range instead of a fixed price?",
    a: "Because a four-page site for a one-location shop and a twelve-page site with booking integration aren't the same job. After the audit you get a fixed number, not a range.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-white/10">
        <div className="shell py-24 md:py-28">
          <Reveal>
            <div className="eyebrow">
              <span className="h-px w-8 bg-electric-500" />
              Pricing
            </div>
            <h1 className="mt-6 max-w-[16ch] text-display-lg font-bold text-gradient">
              Start where it counts.
            </h1>
            <p className="mt-7 max-w-[58ch] text-[16.5px] leading-relaxed text-silver-400">
              Every package includes the audit, monthly reporting, and a real person in Chicago who
              picks up when you call. We recommend starting at Foundation regardless of size — it&apos;s
              the fastest way to see whether this actually works for you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shell py-20 md:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div
                className={`flex h-full flex-col p-9 ${
                  tier.featured
                    ? "border border-electric-500/50 bg-gradient-to-b from-navy-800 to-navy-900"
                    : "card"
                }`}
              >
                {tier.featured && (
                  <span className="mb-5 self-start bg-electric-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                    Most common
                  </span>
                )}

                <h2 className="text-[12px] uppercase tracking-[0.22em] text-electric-400">
                  {tier.name}
                </h2>
                <div className="mt-4 text-[28px] font-bold tracking-tight text-white">
                  {tier.price}
                </div>
                <div className="mt-1 text-[13.5px] text-silver-500">{tier.retainer}</div>
                <p className="mt-5 text-[14.5px] leading-relaxed text-silver-500">{tier.tagline}</p>

                <ul className="mt-8 flex-1 space-y-3 border-t border-white/10 pt-7">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[14.5px] text-silver-300">
                      <Check size={15} className="mt-0.5 shrink-0 text-electric-500" />
                      {f}
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
      <section className="border-t border-white/10 bg-navy-950/50 py-24">
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
