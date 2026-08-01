import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Reveal from "../../components/Reveal";
import { posts, getPost } from "../../lib/data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <section className="border-b border-white/10">
          <div className="shell py-20 md:py-24">
            <Link href="/insights" className="link-underline">
              <ArrowLeft size={14} /> All insights
            </Link>

            <Reveal>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-silver-500">
                <span className="text-electric-500">{post.category}</span>
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime} read</span>
              </div>

              <h1 className="mt-6 max-w-[22ch] text-display-md font-bold text-gradient">
                {post.title}
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="shell py-16 md:py-20">
          <Reveal>
            <div className="max-w-[68ch] space-y-6">
              <p className="text-[18px] leading-relaxed text-silver-200">{post.excerpt}</p>
              {post.body.map((para, i) => (
                <p key={i} className="text-[16px] leading-[1.75] text-silver-400">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 max-w-[68ch] border-l border-electric-500/50 bg-navy-800/40 p-8">
              <h2 className="text-[18px] font-semibold text-white">
                Want us to look at your setup?
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-silver-500">
                The audit is free and takes about thirty minutes. We&apos;ll tell you straight what we
                find, whether or not there&apos;s work in it for us.
              </p>
              <Link href="/book" className="btn-primary mt-6">
                Book a call <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </section>
      </article>

      <section className="border-t border-white/10 bg-navy-950/60">
        <div className="shell py-20">
          <h2 className="text-[13px] uppercase tracking-[0.22em] text-silver-500">Keep reading</h2>
          <div className="mt-9 grid gap-px bg-white/10 sm:grid-cols-3">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/insights/${p.slug}`}
                className="group bg-navy-950 p-8 transition-colors hover:bg-navy-800"
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-electric-500">
                  {p.category}
                </span>
                <h3 className="mt-4 text-[17px] font-semibold leading-snug text-white">{p.title}</h3>
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
