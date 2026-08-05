import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Reveal from "../../components/Reveal";
import { projects, getProject } from "../../lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Case study not found" };
  return { title: `${project.client} — Case Study`, description: project.summary };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = projects.filter((p) => p.slug !== slug);

  return (
    <>
      <section className="border-b border-white/10">
        <div className="shell py-20 md:py-24">
          <Link href="/work" className="link-underline">
            <ArrowLeft size={14} /> All work
          </Link>

          <Reveal>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-silver-500">
              <span>{project.industry}</span>
              <span>{project.year}</span>
              <span className="text-electric-500">{project.status}</span>
            </div>

            <h1 className="mt-6 max-w-[16ch] text-display-lg font-bold text-gradient">
              {project.client}
            </h1>
            <p className="mt-7 max-w-[60ch] text-[17px] leading-relaxed text-silver-400">
              {project.summary}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shell py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div>
              <h2 className="text-[13px] uppercase tracking-[0.22em] text-silver-500">
                The challenge
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-silver-300">{project.challenge}</p>

              <div className="mt-10 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/10 px-3.5 py-1.5 text-[11px] tracking-wide text-silver-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h2 className="text-[13px] uppercase tracking-[0.22em] text-silver-500">
                What we did
              </h2>
              <ol className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {project.approach.map((item, i) => (
                  <li key={i} className="flex gap-6 py-6">
                    <span className="text-[12px] tracking-[0.18em] text-electric-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[15px] leading-relaxed text-silver-300">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 bg-navy-950/60">
        <div className="shell py-20">
          <h2 className="text-[13px] uppercase tracking-[0.22em] text-silver-500">More work</h2>
          <div className="mt-9 grid gap-px bg-white/10 sm:grid-cols-2">
            {next.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group bg-navy-950 p-8 transition-colors hover:bg-navy-800"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-silver-500">
                  {p.industry}
                </div>
                <h3 className="mt-3.5 text-[20px] font-semibold text-white">{p.client}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-silver-500">{p.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-silver-400 group-hover:text-electric-400">
                  Read <ArrowUpRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
