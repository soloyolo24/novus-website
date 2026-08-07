import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lede?: string;
  link?: { href: string; label: string };
}

export default function SectionHeading({ eyebrow, title, lede, link }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <div className="eyebrow">
          <span className="h-px w-8 bg-electric-500" />
          {eyebrow}
        </div>
        <h2 className="mt-5 max-w-[20ch] text-display-md font-bold text-white">{title}</h2>
        {lede && <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-silver-500">{lede}</p>}
      </div>

      {link && (
        <Link href={link.href} className="link-underline border-b border-white/15 pb-1.5">
          {link.label} <ArrowUpRight size={14} />
        </Link>
      )}
    </div>
  );
}
