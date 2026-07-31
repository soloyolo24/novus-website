"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../components/Reveal";
import { projects, workCategories } from "../lib/data";

export default function WorkPage() {
  const [filter, setFilter] = useState<string>("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section className="border-b border-white/10">
        <div className="shell py-24 md:py-28">
          <Reveal>
            <div className="eyebrow">
              <span className="h-px w-8 bg-electric-500" />
              Selected work
            </div>
            <h1 className="mt-6 max-w-[17ch] text-display-lg font-bold text-gradient">
              Things we&apos;ve built, running live.
            </h1>
            <p className="mt-7 max-w-[58ch] text-[16.5px] leading-relaxed text-silver-400">
              We build working demos on real local businesses before we pitch them. Each of these is
              something you can actually open and use, not a mockup.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        {/* Filter pills */}
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
          {workCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`shrink-0 border px-5 py-2.5 text-[12px] uppercase tracking-[0.14em] transition-all ${
                filter === cat
                  ? "border-electric-500 bg-electric-500 font-semibold text-white"
                  : "border-white/15 text-silver-400 hover:border-silver-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="card card-hover group flex h-full flex-col p-8"
                >
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-silver-500">
                    <span>{project.industry}</span>
                    <span>{project.year}</span>
                  </div>

                  <h2 className="mt-4 text-[23px] font-semibold tracking-tight text-white">
                    {project.client}
                  </h2>
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

                  <span className="mt-7 inline-flex items-center gap-2 border-t border-white/10 pt-5 text-[12px] uppercase tracking-[0.14em] text-silver-400 transition-colors group-hover:text-electric-400">
                    View case study <ArrowUpRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-[15px] text-silver-500">
            Nothing in this category yet — more work shipping soon.
          </p>
        )}
      </section>

      <section className="border-t border-white/10 bg-navy-950">
        <div className="shell py-24 text-center">
          <h2 className="mx-auto max-w-[20ch] text-display-md font-bold text-white">
            Want to see one of these running on your business?
          </h2>
          <Link href="/contact" className="btn-primary mt-9">
            Request a demo <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
