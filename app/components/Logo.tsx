import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  /** Height of the mark in px. Wordmark scales from it. */
  size?: number;
  className?: string;
}

/**
 * The Novus mark is a brushed-platinum SVG, so it is never recoloured —
 * the metal gradient is the brand. The wordmark beside it picks up the
 * same platinum via .text-platinum.
 */
export default function Logo({ size = 30, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Novus Solutions — home"
      className={`group flex items-center gap-3 ${className}`}
    >
      <Image
        src="/novus-logo.svg"
        alt=""
        width={size}
        height={size}
        priority
        /* SVGs are blocked by the image optimizer unless dangerouslyAllowSVG
           is set globally; serving this one directly is the safer trade. */
        unoptimized
        className="transition-transform duration-500 group-hover:scale-105"
        style={{
          height: size,
          width: "auto",
          filter: "drop-shadow(0 0 14px rgba(77,139,255,0.28))",
        }}
      />
      <span
        className="text-platinum text-[17px] font-bold tracking-[0.26em]"
        style={{ fontSize: size * 0.56 }}
      >
        NOVUS
      </span>
    </Link>
  );
}
