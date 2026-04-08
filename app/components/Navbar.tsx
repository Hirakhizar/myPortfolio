"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { threshold: 0.35 }
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Main bar — always has a visible background */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "mx-4 mt-3 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,229,255,0.15)]"
            : "mx-0 mt-0 rounded-none shadow-none"
        }`}
        style={{
          background: scrolled
            ? "rgba(2,8,16,0.85)"
            : "rgba(2,8,16,0.7)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: scrolled ? "none" : "1px solid rgba(0,229,255,0.08)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => go("#home")} className="flex items-center gap-2.5 shrink-0 group">
            <motion.span
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-[#020810] relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#00e5ff,#9b6dff)" }}
              whileHover={{ scale:1.1 }}>
              <span className="relative z-10">HK</span>
              <motion.span className="absolute inset-0"
                style={{ background:"linear-gradient(135deg,#9b6dff,#00ffc8)" }}
                animate={{ opacity:[0,1,0] }} transition={{ duration:3, repeat:Infinity }} />
            </motion.span>
            <span className="text-xs font-semibold hidden sm:block tracking-widest uppercase"
              style={{ color:"rgba(130,185,220,0.8)" }}>
              Portfolio
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={href}>
                  <button
                    onClick={() => go(href)}
                    className={`relative px-4 py-1.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-[#00e5ff]"
                        : "text-[rgba(160,205,235,0.75)] hover:text-[#eaf6ff]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "rgba(0,229,255,0.1)",
                          border: "1px solid rgba(0,229,255,0.3)",
                          boxShadow: "0 0 12px rgba(0,229,255,0.2)",
                        }}
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#8ab4cc] hover:text-[#00e5ff] transition-colors p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-1 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(2,8,16,0.92)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(0,229,255,0.15)",
            }}
          >
            <ul className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => go(href)}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-[#8ab4cc] hover:text-[#00e5ff] hover:bg-[rgba(0,229,255,0.07)] transition-all text-sm font-medium"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
