import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Reveal from "../../components/Reveal";
import { services, getService } from "../../lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return { title: service.title, description: service.short };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative -mt-[72px] overflow-hidden border-b border-white/10">
        {/* Photo layer, same approach as the home hero: a CSS background so a
            file that hasn't been produced yet falls through to the gradient
            treatment rather than leaving a broken frame. */}
        {service.image && (
          <>
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{
                backgroundImage: `url('${service.image}')`,
                filter: "brightness(1.55) saturate(1.1)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(11,18,38,0.72) 0%, rgba(11,18,38,0.44) 40%, rgba(11,18,38,0.82) 82%, #0B1226 100%)",
              }}
            />
          </>
        )}
        <div aria-hidden className="light-shaft animate-drift left-auto -right-[220px] -scale-x-100" />
        <div aria-hidden className="bloom -top-52 right-[4%] h-[520px] w-[520px]" />
        <div aria-hidden className="particles" />
        <div aria-hidden className="vignette" />
        <div className="shell relative z-[2] pb-14 pt-32 md:pb-16 md:pt-40">
          <Link href="/services" className="link-underline">
            <ArrowLeft size={14} /> All services
          </Link>

          <Reveal>
            <Icon size={30} className="mt-10 text-electric-500" />
            <h1 className="mt-7 max-w-[16ch] text-display-lg font-bold text-gradient">
              {service.title}
            </h1>
            <p className="mt-7 max-w-[60ch] text-[17px] leading-relaxed text-silver-400">
              {service.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shell py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div>
              <h2 className="text-[13px] uppercase tracking-[0.22em] text-silver-500">
                What&apos;s included
              </h2>
              <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-4 py-5 text-[15px] text-silver-300">
                    <Check size={17} className="mt-0.5 shrink-0 text-electric-500" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="card p-8">
              <h3 className="text-[13px] uppercase tracking-[0.2em] text-silver-500">Deliverables</h3>
              <ul className="mt-5 space-y-2.5">
                {service.deliverables.map((d) => (
                  <li key={d} className="text-[14.5px] text-silver-300">
                    — {d}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/10 pt-6">
                <h3 className="text-[13px] uppercase tracking-[0.2em] text-silver-500">Timeline</h3>
                <p className="mt-2.5 text-[17px] font-semibold text-white">{service.timeline}</p>
              </div>

              <Link href="/contact" className="btn-primary mt-8 w-full">
                Start a consultation <ArrowUpRight size={15} />
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink-950/60">
        <div className="shell py-20">
          <h2 className="text-[13px] uppercase tracking-[0.22em] text-silver-500">
            Other services
          </h2>
          <div className="mt-9 grid gap-px bg-white/10 sm:grid-cols-3">
            {others.map((s) => {
              const OtherIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group bg-ink-950 p-8 transition-colors hover:bg-navy-800"
                >
                  <OtherIcon size={20} className="text-electric-500" />
                  <h3 className="mt-5 text-[17px] font-semibold text-white">{s.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-silver-500">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-silver-400 group-hover:text-electric-400">
                    View <ArrowUpRight size={13} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
