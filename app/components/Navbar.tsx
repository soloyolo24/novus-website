"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/insights", label: "Insights" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 glass ${
        scrolled ? "shadow-[0_1px_0_0_rgba(255,255,255,0.06)]" : ""
      }`}
    >
      <nav className="shell flex h-[72px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="h-2 w-2 rotate-45 bg-electric-500 transition-transform duration-300 group-hover:rotate-[135deg]" />
          <span className="text-[17px] font-bold tracking-[0.24em] text-white">NOVUS</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative py-1 text-[13px] tracking-wide transition-colors ${
                  isActive(link.href) ? "text-white" : "text-silver-400 hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-electric-500"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/book"
            className="inline-flex border border-white/20 px-3.5 py-2 text-[10.5px] uppercase tracking-[0.12em] text-silver-200 transition-all hover:border-electric-500 hover:bg-electric-500 hover:text-white sm:px-5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.16em]"
          >
            Book a call
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="p-1.5 text-silver-200 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden border-t border-white/10 bg-navy-900/95 lg:hidden"
          >
            <ul className="shell flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between border-b border-white/5 py-3.5 text-[15px] text-silver-200"
                  >
                    {link.label}
                    <ArrowUpRight size={16} className="text-silver-500" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book"
                  className="mt-4 block bg-electric-500 py-3.5 text-center text-[12px] uppercase tracking-[0.16em] font-semibold text-white"
                >
                  Book a call
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
