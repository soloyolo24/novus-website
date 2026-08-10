interface MarqueeProps {
  items: string[];
  reverse?: boolean;
}

export default function Marquee({ items, reverse = false }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.015] py-5">
      <div
        className={`flex w-max gap-10 whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-[13px] uppercase tracking-[0.2em] text-silver-500">
            {item}
            <span className="text-electric-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
