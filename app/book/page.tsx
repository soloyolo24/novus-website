import type { Metadata } from "next";
import { ArrowUpRight, CalendarCheck, Clock, ShieldCheck, Video } from "lucide-react";
import Reveal from "../components/Reveal";
import { BOOKING_URL } from "../lib/data";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Book a free 30-minute intro call with Novus Solutions. See a live demo and get a straight answer on what's worth fixing first.",
};

const expectations = [
  {
    icon: Clock,
    title: "30 minutes, no prep needed",
    body: "A quick call to understand your business and what's currently falling through the cracks — missed calls, slow follow-up, an outdated site.",
  },
  {
    icon: Video,
    title: "A live demo, not a slide deck",
    body: "We'll show you a working AI chatbot or phone assistant in action, built off a business like yours, so you can see exactly what it does before committing to anything.",
  },
  {
    icon: ShieldCheck,
    title: "No pressure, no obligation",
    body: "If we're not the right fit, or you don't need us yet, we'll tell you honestly. The goal is a straight answer, not a sales pitch.",
  },
];

export default function BookPage() {
  return (
    <>
      <section className="border-b border-white/10">
        <div className="shell py-24 md:py-28">
          <Reveal>
            <div className="eyebrow">
              <span className="h-px w-8 bg-electric-500" />
              Book a call
            </div>
            <h1 className="mt-6 max-w-[18ch] text-display-lg font-bold text-gradient">
              Let&apos;s see what&apos;s worth fixing.
            </h1>
            <p className="mt-7 max-w-[58ch] text-[16.5px] leading-relaxed text-silver-400">
              A free 30-minute intro call. We&apos;ll look at how your business currently handles
              calls, messages, and follow-up, and show you what an AI assistant looks like for a
              business like yours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shell py-20 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <div className="grid gap-8 sm:grid-cols-1">
              {expectations.map((item) => (
                <div key={item.title} className="flex gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 bg-navy-800/50">
                    <item.icon size={18} className="text-electric-500" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-semibold text-white">{item.title}</h2>
                    <p className="mt-2 max-w-[48ch] text-[14.5px] leading-relaxed text-silver-400">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card flex h-full flex-col justify-center p-9 text-center md:p-11">
              <CalendarCheck size={28} className="mx-auto text-electric-500" />
              <h2 className="mt-6 text-[22px] font-bold text-white">Pick a time that works</h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-silver-500">
                You&apos;ll book directly on our calendar and get a confirmation with a link to
                join.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 w-full justify-center"
              >
                Book on Google Calendar <ArrowUpRight size={15} />
              </a>
              <p className="mt-5 text-[12.5px] text-silver-500">
                Prefer to send a message first?{" "}
                <a href="/contact" className="link-underline text-electric-400">
                  Use the contact form
                </a>{" "}
                instead.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
