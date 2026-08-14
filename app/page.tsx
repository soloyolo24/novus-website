import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import Marquee from "./components/Marquee";
import Reveal from "./components/Reveal";
import SectionHeading from "./components/SectionHeading";
import ImageSlot from "./components/ImageSlot";
import { services, capabilities } from "./lib/data";

const oldWay = [
  "A call rings out while you're under a car. No message, no callback.",
  "Someone asks for an estimate, goes quiet, and nobody follows up.",
  "Repair records and insurance files live on one computer with no backup.",
  "No real way to know how many estimate requests became booked jobs.",
];

const newWay = [
  "Someone always answers — a person, or an assistant that knows your hours and takes the details properly.",
  "Every estimate request gets followed up automatically until they book or say no.",
  "Records backed up automatically — nothing rides on one machine.",
  "Every lead tracked from first call to job booked.",
];

const phonePoints = [
  "Answers when you're mid-repair, after close, and on weekends",
  "Knows your hours, services, and what you do and don't take on",
  "Takes the details and books the estimate without pulling you off the car",
  "Hands off to you rather than guessing at a price",
];

const startSteps = [
  {
    n: "01",
    title: "We walk your setup",
    body: "Phone, website, messages, follow-up, backups. Thirty minutes, free, no obligation attached to it.",
  },
  {
    n: "02",
    title: "You get a straight answer",
    body: "Plain English: what's costing you jobs and what fixing it is worth. A fixed number, not a range.",
  },
  {
    n: "03",
    title: "We build the smallest thing that works",
    body: "Start with the one gap losing you the most, prove it works, then decide together what's next.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      {/* Pulls up under the floating nav so the photo bleeds to the top edge. */}
      <section className="relative -mt-[72px] flex min-h-[100svh] flex-col justify-between overflow-hidden">
        {/*
          The photo is a CSS background rather than next/image so the section
          still reads as a finished dark hero before hero-shop.jpg is dropped in
          — a missing file falls through to the gradient instead of breaking.
        */}
        {/* Photo on its own layer so it can be lifted without also lifting the
            scrims that sit over it. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-ink-950 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero-shop.jpg')",
            filter: "brightness(1.42) saturate(1.12) contrast(0.96)",
          }}
        />
        {/* Scrims. Lighter than before, and keyed to the *current* ink-950
            (#0B1226) so the bottom of the hero meets the page with no seam. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(11,18,38,0.78) 0%, rgba(11,18,38,0.20) 24%, rgba(11,18,38,0.30) 56%, rgba(11,18,38,0.86) 88%, #0B1226 100%)," +
              "radial-gradient(ellipse 62% 48% at 50% 45%, rgba(11,18,38,0.48), transparent 72%)",
          }}
        />
        {/* No CSS light shaft here — the photograph supplies its own, from the
            upper right. A second synthetic shaft from the left fights it. */}

        <div className="shell relative z-[2] flex flex-1 flex-col items-center justify-center pb-16 pt-36 text-center md:pt-40">
          <Reveal>
            <div className="chip">
              <span className="chip-dot" />
              Chicago · Technology &amp; Business Growth for Auto Shops
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            {/* The shadow is load-bearing, not decorative: the photo's light
                shaft crosses the headline, and without it ~12% of the blue
                accent's area falls under 4.5:1 contrast. */}
            <h1 className="mt-9 max-w-[17ch] text-balance text-display-xl font-bold uppercase leading-[0.95] tracking-[-0.03em] [text-shadow:0_2px_28px_rgba(11,18,38,0.92),0_1px_4px_rgba(11,18,38,0.55)]">
              <span className="text-platinum-hero">Your shop has an old way.</span>{" "}
              <span className="text-electric-400">We build the new one.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-8 max-w-[58ch] text-[16.5px] leading-relaxed text-silver-300 [text-shadow:0_1px_18px_rgba(11,18,38,0.92)]">
              The phone rings out while you&apos;re under a car. An estimate request goes quiet and
              nobody chases it. Nobody chose that setup —{" "}
              <strong className="font-semibold text-white">
                it&apos;s just how shops have always run
              </strong>
              . We replace it, one piece at a time.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/book" className="btn-primary">
                Book a free audit <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="btn-secondary backdrop-blur-md">
                See the new way
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Trust strip — what we build, not borrowed logos. */}
        <div className="relative z-[2] pb-10">
          <Reveal delay={0.32}>
            <p className="text-center text-[12px] uppercase tracking-[0.22em] text-silver-400">
              What we build for shops
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6">
              {capabilities.slice(0, 6).map((item) => (
                <span
                  key={item}
                  className="text-[13px] font-medium uppercase tracking-[0.14em] text-silver-300/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={capabilities} />

      {/* ---------------- THE SHIFT ---------------- */}
      <section className="relative overflow-hidden py-24 md:py-28">
        <div aria-hidden className="section-glow section-glow-r" />
        <div className="shell relative">
        <Reveal>
          <SectionHeading
            eyebrow="The shift"
            title="Same shop. Completely different week."
            lede="Nobody sat down and designed the old way — it accumulated, one workaround at a time. Here's what changes when you replace it."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal delay={0.06}>
            <div className="h-full rounded-2xl border border-white/[0.09] bg-white/[0.018] p-8 md:p-9">
              <span className="inline-block rounded-full bg-white/[0.07] px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-silver-500">
                The Old Way
              </span>
              <ul className="mt-7">
                {oldWay.map((row, i) => (
                  <li
                    key={row}
                    className={`flex gap-3.5 py-4 text-[14.5px] leading-relaxed text-silver-500 ${
                      i > 0 ? "border-t border-white/[0.06]" : ""
                    }`}
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-silver-500">
                      <X size={11} strokeWidth={3} />
                    </span>
                    <span>{row}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div
              className="h-full rounded-2xl border border-electric-500/30 bg-gradient-to-b from-electric-500/[0.13] to-white/[0.02] p-8
                         shadow-[0_0_60px_rgba(77,139,255,0.09)] md:p-9"
            >
              <span className="inline-block rounded-full bg-electric-500 px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-950">
                The New Way
              </span>
              <ul className="mt-7">
                {newWay.map((row, i) => (
                  <li
                    key={row}
                    className={`flex gap-3.5 py-4 text-[14.5px] leading-relaxed text-silver-300 ${
                      i > 0 ? "border-t border-white/[0.06]" : ""
                    }`}
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric-500/25 text-electric-400">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span>{row}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
      </section>

      {/* ---------------- PHONE ASSISTANT ---------------- */}
      <section className="relative overflow-hidden border-y border-white/10 bg-ink-950/50 py-24 md:py-28">
        <div aria-hidden className="horizon" />
        <div aria-hidden className="section-glow section-glow-l" />
        <div className="shell relative">
          <Reveal>
            <SectionHeading
              eyebrow="Why shops specifically"
              title="You can't answer the phone and the wrench at the same time."
            />
          </Reveal>

          <div className="mt-14 grid items-center gap-11 lg:grid-cols-2">
            <Reveal delay={0.06}>
              <ImageSlot
                src="/phone-unanswered.jpg"
                label="Image 2 · Phone assistant visual"
                hint="Abstract glowing waveform arcing across black, dissolving into particles. A call being answered."
                ratio="4:3 · ~1200×900"
                alt="A shop phone ringing unanswered on a workbench while a mechanic works under the hood of a car in the background"
                className="min-h-[300px] md:min-h-[420px]"
              />
            </Reveal>

            <Reveal delay={0.12}>
              <div>
                <p className="text-[16px] leading-relaxed text-silver-500">
                  A shop&apos;s busiest hours are exactly the hours nobody can pick up. That&apos;s
                  not a staffing problem you can hire your way out of — it&apos;s a systems problem.
                </p>
                <ul className="mt-7">
                  {phonePoints.map((point, i) => (
                    <li
                      key={point}
                      className={`flex gap-3.5 py-4 text-[15px] leading-relaxed text-silver-300 ${
                        i > 0 ? "border-t border-white/[0.07]" : ""
                      }`}
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric-500/20 text-electric-400">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services/ai-phone-assistant"
                  className="link-underline mt-8 border-b border-white/15 pb-1.5"
                >
                  How the phone assistant works <ArrowUpRight size={14} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="relative overflow-hidden py-24 md:py-28">
        <div aria-hidden className="section-glow section-glow-l" />
        <div className="shell relative">
        <Reveal>
          <SectionHeading
            eyebrow="What we build"
            title="Each piece replaces one thing that's leaking work."
            link={{ href: "/services", label: "View all services" }}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="card card-hover group relative flex h-full flex-col overflow-hidden p-8"
                >
                  {service.image && (
                    <>
                      {/* CSS background, not next/image: a file that hasn't been
                          produced yet degrades to the plain glass card. */}
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-cover bg-center opacity-[0.55] transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-80"
                        style={{
                          backgroundImage: `url('${service.image}')`,
                          // Shop photography is dark by nature; without a lift it
                          // disappears entirely under the scrim.
                          filter: "brightness(1.55) saturate(1.1)",
                        }}
                      />
                      {/* Scrim. Deliberately flat, not a bottom-heavy hero
                          gradient: copy fills the whole card here, so every
                          part of it needs the same protection. */}
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/[0.78] to-ink-950/[0.66]"
                      />
                    </>
                  )}

                  <div className="relative flex h-full flex-col">
                    <Icon size={22} className="text-electric-400" />
                    <h3 className="mt-6 text-[18px] font-semibold leading-snug text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-silver-300">
                      {service.short}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-silver-300 transition-colors group-hover:text-electric-400">
                      Learn more <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
      </section>

      {/* ---------------- HOW IT STARTS ---------------- */}
      <section className="relative overflow-hidden border-y border-white/10 bg-ink-950/50 py-24 md:py-28">
        <div aria-hidden className="horizon" />
        <div aria-hidden className="section-glow section-glow-l" />
        <div className="shell relative">
          <Reveal>
            <SectionHeading
              eyebrow="How it starts"
              title="Audit first. Build second."
              lede="We don't quote a package before we've seen how your shop actually runs."
            />
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {startSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.07}>
                <div className="card card-sheen h-full p-8">
                  <div className="relative text-[11px] tracking-[0.2em] text-electric-500">
                    {step.n}
                  </div>
                  <h3 className="relative mt-4 text-[18px] font-semibold leading-snug text-white">
                    {step.title}
                  </h3>
                  <p className="relative mt-3 text-[14.5px] leading-relaxed text-silver-500">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- LOCAL ---------------- */}
      <section className="relative overflow-hidden py-24 md:py-28">
        <div aria-hidden className="section-glow section-glow-r" />
        <div className="shell relative">
        <div className="grid items-center gap-11 lg:grid-cols-2">
          <Reveal>
            <div>
              <div className="eyebrow">
                <span className="h-px w-8 bg-electric-500" />
                Local, and reachable
              </div>
              <h2 className="mt-5 max-w-[18ch] text-display-sm font-bold text-white md:text-display-md">
                We&apos;re in Chicago. You can meet us.
              </h2>
              <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-silver-500">
                When something breaks you&apos;re calling a person who knows your setup, not a ticket
                queue. We work with a limited number of shops at a time so each build gets proper
                attention.
              </p>
              <Link href="/about" className="btn-secondary mt-8">
                About Novus
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ImageSlot
              src="/chicago-team.jpg"
              label="Image 3 · Atmospheric shop photo"
              hint="A real Chicago shop floor or the team on site, colour-graded dark with a subtle blue wash."
              ratio="4:3 · ~1200×900"
              alt="The Novus team working late in a Chicago office overlooking the city skyline at dusk"
              className="min-h-[300px] md:min-h-[420px]"
            />
          </Reveal>
        </div>
      </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden border-t border-white/10 bg-ink-950 py-28 text-center md:py-32">
        <div
          aria-hidden
          className="bloom -bottom-[300px] left-1/2 h-[600px] w-[900px] -translate-x-1/2"
        />
        <div className="shell relative z-[2]">
          <Reveal>
            <div className="eyebrow justify-center">Start the conversation</div>
            <h2 className="mx-auto mt-6 max-w-[15ch] text-display-lg font-bold text-white">
              Let&apos;s build your new way.
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] text-[16px] leading-relaxed text-silver-500">
              Book a free, no-pressure audit. We&apos;ll walk your shop&apos;s setup, show you
              exactly where customers are slipping away, and tell you straight whether we can help.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/book" className="btn-primary">
                Book a free audit <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="btn-secondary">
                View services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={capabilities} reverse />
    </>
  );
}
