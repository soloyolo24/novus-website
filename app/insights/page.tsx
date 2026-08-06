import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { posts } from "../lib/data";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical notes on automotive business operations, AI automation, SEO, and the systems that keep customers from slipping away.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function InsightsPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="border-b border-white/10">
        <div className="shell py-24 md:py-28">
          <Reveal>
            <div className="eyebrow">
              <span className="h-px w-8 bg-electric-500" />
              Insights
            </div>
            <h1 className="mt-6 max-w-[17ch] text-display-lg font-bold text-gradient">
              Notes from the work.
            </h1>
            <p className="mt-7 max-w-[58ch] text-[16.5px] leading-relaxed text-silver-400">
              Practical writing on what actually moves the needle for automotive business — no growth
              hacking, no listicles.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      <section className="shell py-16 md:py-20">
        <Reveal>
          <Link
            href={`/insights/${featured.slug}`}
            className="card card-hover group grid gap-8 p-9 md:grid-cols-[1fr_1.4fr] md:p-12"
          >
            <div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-silver-500">
                <span className="text-electric-500">{featured.category}</span>
                <span>{formatDate(featured.date)}</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
            <div>
              <h2 className="text-display-sm font-bold tracking-tight text-white">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-[60ch] text-[15.5px] leading-relaxed text-silver-500">
                {featured.excerpt}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-silver-400 transition-colors group-hover:text-electric-400">
                Read article <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="shell pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link
                href={`/insights/${post.slug}`}
                className="card card-hover group flex h-full flex-col p-8"
              >
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
                  <span className="text-electric-500">{post.category}</span>
                  <span className="text-silver-500">{post.readTime}</span>
                </div>

                <h2 className="mt-5 text-[20px] font-semibold leading-snug tracking-tight text-white">
                  {post.title}
                </h2>
                <p className="mt-3.5 flex-1 text-[14.5px] leading-relaxed text-silver-500">
                  {post.excerpt}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5 text-[12px] uppercase tracking-[0.14em] text-silver-500">
                  {formatDate(post.date)}
                  <ArrowUpRight
                    size={14}
                    className="transition-colors group-hover:text-electric-400"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
