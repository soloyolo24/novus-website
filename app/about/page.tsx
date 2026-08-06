import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, ShieldCheck, Gauge, Handshake } from "lucide-react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { processSteps } from "../lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Novus is a Chicago AI automation studio building growth systems for automotive business. Audit first, build second.",
};

const values = [
  {
    icon: Compass,
    title: "Diagnose before prescribing",
    body: "We won't recommend a build before we understand the business. Sometimes the honest answer is that you don't need us yet — we'd rather say that than sell you something.",
  },
  {
    icon: ShieldCheck,
    title: "You own everything",
    body: "Your domain, your site, your accounts, your customer data. Payments run through Stripe under your own account — we integrate, you control the money. No hostage situations if you leave.",
  },
  {
    icon: Gauge,
    title: "Measured, not claimed",
    body: "Every build ships with tracking wired in. If something isn't working, you'll see it in the numbers and we'll tell you rather than wait for you to ask.",
  },
  {
    icon: Handshake,
    title: "Local and reachable",
    body: "We're in Chicago. You can meet us, and when something breaks you're calling a person who knows your setup, not a ticket queue.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-white/10">
        <div className="shell py-24 md:py-28">
          <Reveal>
            <div className="eyebrow">
              <span className="h-px w-8 bg-electric-500" />
              About
            </div>
            <h1 className="mt-6 max-w-[18ch] text-display-lg font-bold text-gradient">
              We build the systems most automotive businesses never get around to.
            </h1>
            <p className="mt-7 max-w-[60ch] text-[16.5px] leading-relaxed text-silver-400">
              Not because owners don&apos;t care — because they&apos;re running the business. The
              backup nobody set up, the call nobody answered, the lead nobody followed up on. That&apos;s
              the work we do.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Narrative */}
      <section className="shell py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="text-[13px] uppercase tracking-[0.22em] text-silver-500">Why we started</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-6 text-[16px] leading-relaxed text-silver-300">
              <p>
                Novus started from a simple observation: the tools that let a business answer every
                call, respond in under five minutes, and follow up on every lead used to cost tens of
                thousands of dollars and a full-time staffer to run.
              </p>
              <p>
                That changed. The same systems can now be built for a fraction of that — but almost
                nobody is building them for the shop on the corner. The agencies that do this work
                are chasing companies with twenty-five employees and a marketing budget.
              </p>
              <p>
                We&apos;re a small team in Chicago doing it for everyone else. Family shops, service
                businesses, the places where the owner is also the person answering the phone. We
                start with a free audit, we tell you the truth about what we find, and we only build
                what actually addresses it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Methodology */}
      <section className="border-y border-white/10 bg-navy-950/50 py-24">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Methodology"
              title="Audit first. Build second."
              lede="The same four steps on every engagement, whether it's a one-page site or a full growth system."
            />
          </Reveal>

          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.06}>
                <div className="h-full bg-navy-950 p-8">
                  <div className="text-[12px] tracking-[0.2em] text-electric-500">{step.n}</div>
                  <h3 className="mt-5 text-[18px] font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-silver-500">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="shell py-24">
        <Reveal>
          <SectionHeading eyebrow="How we work" title="Four things we don't compromise on" />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.title} delay={(i % 2) * 0.06}>
                <div className="card h-full p-9">
                  <Icon size={22} className="text-electric-500" />
                  <h3 className="mt-6 text-[20px] font-semibold text-white">{value.title}</h3>
                  <p className="mt-3.5 text-[15px] leading-relaxed text-silver-500">{value.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-navy-950">
        <div className="shell py-24 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-[18ch] text-display-md font-bold text-white">
              Want to see what we&apos;d find in your business?
            </h2>
            <Link href="/book" className="btn-primary mt-9">
              Book a call <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
