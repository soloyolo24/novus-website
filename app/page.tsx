import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import Marquee from "./components/Marquee";
import Reveal from "./components/Reveal";
import SectionHeading from "./components/SectionHeading";
import { services, projects, processSteps, stats, capabilities } from "./lib/data";

export default function HomePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-30%] h-[720px] w-[900px] -translate-x-1/2 rounded-full bg-electric-500/10 blur-[140px]"
        />
        <div className="shell relative py-28 md:py-36">
          <Reveal>
            <div className="eyebrow text-silver-200">
              <span className="h-px w-9 bg-electric-500" />
              Chicago · Built for the Automotive Trade
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 max-w-[18ch] text-display-xl font-bold leading-[1.02] tracking-tight text-gradient md:max-w-[22ch]">
              Growth Systems for your Automotive business.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-[54ch] text-[17px] leading-relaxed text-silver-400">
              We build the websites, AI assistants, and follow-up systems that make sure your
              automotive business never loses another customer.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-11 flex flex-wrap gap-4">
              <Link href="/book" className="btn-primary">
                Book a call <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="btn-secondary">
                View services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={capabilities} />

      {/* ---------------- STATS ---------------- */}
      <section className="shell py-24 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Businesses don't have a marketing problem, they have a response problem."
            lede="A missed call is a customer dialing the next shop on the list. We build the systems that answer, capture, and follow up automatically — so you keep the work you've already earned."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-px border border-white/10 bg-white/10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div className="h-full bg-navy-900 p-8">
                <div className="text-[36px] font-bold leading-none tracking-tight text-white">
                  {stat.value}
                </div>
                <div className="mt-3 text-[12px] uppercase tracking-[0.16em] text-silver-500">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- SERVICES SUMMARY ---------------- */}
      <section className="border-y border-white/10 bg-navy-950/50 py-24 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="We capture every opportunity"
              link={{ href: "/services", label: "View all services" }}
            />
          </Reveal>

          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.slug} delay={i * 0.05}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col bg-navy-900 p-8 transition-colors hover:bg-navy-800"
                  >
                    <Icon size={22} className="text-electric-500" />
                    <h3 className="mt-6 text-[19px] font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-silver-500">
                      {service.short}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-silver-400 transition-colors group-hover:text-electric-400">
                      Learn more <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="shell py-24 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="The approach"
            title="Audit first. Build second."
            lede="Every engagement starts with a free audit — we pinpoint exactly where your shop is losing customers before we build a thing. No guesswork, no wasted spend."
          />
        </Reveal>

        <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.06}>
              <div className="h-full bg-navy-900 p-8">
                <div className="text-[12px] tracking-[0.2em] text-electric-500">{step.n}</div>
                <h3 className="mt-5 text-[18px] font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-silver-500">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- SELECTED WORK ---------------- */}
      <section className="border-y border-white/10 bg-navy-950/50 py-24 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Selected work"
              title="Concepts, live and working"
              lede="Working systems on real automotive businesses, built before we ever pitch."
              link={{ href: "/work", label: "View all work" }}
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.07}>
                <Link
                  href={`/work/${project.slug}`}
                  className="card card-hover group flex h-full flex-col p-8"
                >
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-silver-500">
                    <span>{project.industry}</span>
                    <span className="text-electric-500">{project.status}</span>
                  </div>
                  <h3 className="mt-4 text-[23px] font-semibold tracking-tight text-white">
                    {project.client}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-silver-500">
                    {project.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-white/10 px-3 py-1.5 text-[11px] tracking-wide text-silver-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIAL ---------------- */}
      <section className="shell py-24 md:py-28">
        <Reveal>
          <div className="eyebrow">
            <span className="h-px w-8 bg-electric-500" />
            What clients say
          </div>
          <div className="mt-10 border-l border-electric-500/50 pl-8 md:pl-10">
            <Quote size={28} className="mb-6 text-electric-500/60" />
            <blockquote className="max-w-[24ch] text-display-sm font-medium leading-tight text-white md:max-w-[30ch]">
              Your first real client quote goes here — one sentence about what changed for their
              business after the build.
            </blockquote>
            <div className="mt-8 text-[13.5px] text-silver-500">
              <strong className="block font-semibold text-silver-300">Client Name</strong>
              Owner, Business Name
            </div>
          </div>
          <p className="mt-8 max-w-[70ch] border border-dashed border-white/15 p-4 text-[12.5px] leading-relaxed text-silver-500">
            Placeholder — replace once your first client is live. Leaving this generic is better than
            inventing a quote; a fabricated testimonial is the fastest way to lose a deal when someone
            follows up on it.
          </p>
        </Reveal>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="border-t border-white/10 bg-navy-950">
        <div className="shell py-28 text-center md:py-32">
          <Reveal>
            <div className="eyebrow justify-center">Start the conversation</div>
            <h2 className="mx-auto mt-6 max-w-[16ch] text-display-lg font-bold text-white">
              Let&apos;s build the future.
            </h2>
            <p className="mx-auto mt-6 max-w-[56ch] text-[16px] leading-relaxed text-silver-500">
              We&apos;ll walk through your setup, show you where customers are slipping away, and give
              you no-nonsense feedback. Free, no-pressure audit.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/book" className="btn-primary">
                Book a call <ArrowRight size={15} />
              </Link>
              <Link href="/pricing" className="btn-secondary">
                See pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={capabilities} reverse />
    </>
  );
}
