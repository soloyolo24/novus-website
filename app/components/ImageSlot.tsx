import Image from "next/image";

interface ImageSlotProps {
  /** Drop the generated file in /public and pass its path to go live. */
  src?: string;
  alt: string;
  /** Shown only while src is empty. */
  label: string;
  hint: string;
  ratio: string;
  className?: string;
  priority?: boolean;
}

/**
 * Holds the place of an image that hasn't been generated yet.
 *
 * Until `src` is set it renders a lit, dashed slot that looks deliberate
 * rather than broken — so the page can ship and the art can land later
 * without touching layout. Set `src` and the slot becomes the real image.
 */
export default function ImageSlot({
  src,
  alt,
  label,
  hint,
  ratio,
  className = "",
  priority = false,
}: ImageSlotProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 900px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`imgslot ${className}`}>
      <div>
        <div className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-electric-400">
          {label}
        </div>
        <p className="mx-auto mt-2.5 max-w-[42ch] text-[12.5px] leading-relaxed text-silver-500">
          {hint}
        </p>
        <div className="mt-3 text-[10.5px] tracking-[0.1em] text-silver-500/80">{ratio}</div>
      </div>
    </div>
  );
}
