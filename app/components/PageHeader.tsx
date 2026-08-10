import { ReactNode } from "react";
import Reveal from "./Reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lede?: string;
  /** Sits under the lede — buttons, meta rows, filters. */
  children?: ReactNode;
  /**
   * Shifts the light so consecutive pages don't look identical.
   * "left" is the default; detail pages use "right".
   */
  light?: "left" | "right";
}

/**
 * The lit header every non-home route opens with.
 *
 * It deliberately bleeds up behind the floating navbar (-mt-[72px]) and pays
 * that back as top padding. Without this the fixed nav leaves a band of dead
 * black above every page, since PageWrapper already reserves 72px.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  children,
  light = "left",
}: PageHeaderProps) {
  return (
    <section className="relative -mt-[72px] overflow-hidden border-b border-white/10">
      <div
        aria-hidden
        className={`light-shaft animate-drift ${
          light === "right" ? "left-auto -right-[220px] -scale-x-100" : ""
        }`}
      />
      <div
        aria-hidden
        className={`bloom -top-52 h-[520px] w-[520px] ${light === "right" ? "right-[4%]" : "left-[4%]"}`}
      />
      <div aria-hidden className="particles" />
      <div aria-hidden className="vignette" />

      <div className="shell relative z-[2] pb-16 pt-36 md:pb-20 md:pt-44">
        <Reveal>
          <div className="chip">
            <span className="chip-dot" />
            {eyebrow}
          </div>
          <h1 className="mt-8 max-w-[20ch] text-balance text-display-lg font-bold text-platinum">
            {title}
          </h1>
          {lede && (
            <p className="mt-7 max-w-[60ch] text-[16.5px] leading-relaxed text-silver-400">{lede}</p>
          )}
          {children && <div className="mt-9">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
