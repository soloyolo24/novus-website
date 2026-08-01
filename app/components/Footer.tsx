import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { services } from "../lib/data";

const pages = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="shell py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="h-2 w-2 rotate-45 bg-electric-500" />
              <span className="text-[18px] font-bold tracking-[0.24em] text-white">NOVUS</span>
            </Link>
            <p className="mt-5 max-w-[34ch] text-[14.5px] leading-relaxed text-silver-500">
              AI automation and growth systems for local business. Built in Chicago, for Chicago.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="border border-white/10 p-2.5 text-silver-400 transition-colors hover:border-electric-500 hover:text-white"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="border border-white/10 p-2.5 text-silver-400 transition-colors hover:border-electric-500 hover:text-white"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="mb-5 text-[11px] uppercase tracking-[0.22em] text-white">Pages</h4>
            <ul className="space-y-2.5">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-[14px] text-silver-500 transition-colors hover:text-white"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-5 text-[11px] uppercase tracking-[0.22em] text-white">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-[14px] text-silver-500 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-[11px] uppercase tracking-[0.22em] text-white">Get in touch</h4>
            <ul className="space-y-3.5 text-[14px] text-silver-500">
              <li>
                <a
                  href="mailto:contact@novussolutions.co"
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Mail size={15} className="text-electric-500" />
                  contact@novussolutions.co
                </a>
              </li>
              <li>
                <a
                  href="tel:+13125550000"
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Phone size={15} className="text-electric-500" />
                  (312) 555-0000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className="text-electric-500" />
                Chicago, Illinois
              </li>
            </ul>

            <Link
              href="/book"
              className="mt-7 inline-flex items-center gap-2 border-b border-electric-500 pb-1 text-[12px] uppercase tracking-[0.14em] text-white"
            >
              Book a call <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-7 text-[12.5px] text-silver-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Novus Solutions. All rights reserved.</span>
          <span>Never miss another customer.</span>
        </div>
      </div>
    </footer>
  );
}
