"use client";

import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, ChevronDown, Sparkles } from "lucide-react";
import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import HeroCrystal from "./HeroCrystal";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: .12, delayChildren: .2 } },
};
const up: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)",
    transition: { duration: .9, ease: [.16,1,.3,1] } },
};

const FIRST = "Hira".split("");
const LAST  = "Khizar".split("");

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start","end start"] });
  const contentY  = useTransform(scrollYProgress, [0,1], [0, -100]);
  const contentOp = useTransform(scrollYProgress, [0,.65], [1, 0]);

  return (
    <section ref={sectionRef} id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <HeroCrystal />

      {/* Radial vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(2,8,16,.85) 100%)" }}
        aria-hidden="true" />

      {/* Animated corner accents */}
      {[
        { cls:"top-8 left-8",  rot:0   },
        { cls:"top-8 right-8", rot:90  },
        { cls:"bottom-8 left-8",  rot:270 },
        { cls:"bottom-8 right-8", rot:180 },
      ].map(({ cls, rot }, i) => (
        <motion.div key={i} className={`absolute ${cls} pointer-events-none`}
          initial={{ opacity:0, scale:0 }}
          animate={{ opacity:.35, scale:1 }}
          transition={{ delay:2+i*.15, duration:.6 }}
          aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 32 32" style={{ transform:`rotate(${rot}deg)` }}>
            <path d="M2 30 L2 2 L30 2" stroke="rgba(0,229,255,0.6)" strokeWidth="1.5" fill="none"/>
          </svg>
        </motion.div>
      ))}

      {/* Scan line */}
      <motion.div className="absolute left-0 right-0 h-px pointer-events-none z-[3]"
        style={{ background:"linear-gradient(90deg,transparent,rgba(0,229,255,.45),rgba(155,109,255,.35),transparent)" }}
        animate={{ top:["-2px","102%"] }}
        transition={{ duration:6, repeat:Infinity, ease:"linear", repeatDelay:3 }}
        aria-hidden="true" />

      {/* Content */}
      <motion.div style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center">

        <motion.div variants={stagger} initial="hidden" animate="show">

          {/* Badge */}
          <motion.div variants={up} className="flex justify-center mb-8">
            <motion.span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] tracking-[.25em] uppercase"
              style={{
                color:"#00e5ff",
                background:"rgba(0,229,255,0.08)",
                border:"1px solid rgba(0,229,255,0.3)",
                backdropFilter:"blur(12px)",
              }}
              animate={{ boxShadow:["0 0 0 rgba(0,229,255,0)","0 0 24px rgba(0,229,255,.5)","0 0 0 rgba(0,229,255,0)"] }}
              transition={{ duration:3, repeat:Infinity }}>
              <motion.span
                className="w-2 h-2 rounded-full bg-[#00e5ff]"
                animate={{ scale:[1,1.5,1], opacity:[1,.5,1] }}
                transition={{ duration:1.5, repeat:Infinity }} />
              <Sparkles size={10} />
              Available for opportunities
            </motion.span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={up}
            className="text-6xl sm:text-7xl md:text-[5.5rem] font-extrabold leading-none tracking-tight mb-6"
            style={{ perspective:"700px" }}>
            <span className="inline-block mr-4">
              {FIRST.map((ch, i) => (
                <motion.span key={i} className="inline-block"
                  style={{ color:"#eaf6ff", textShadow:"0 0 30px rgba(200,235,255,.4), 0 2px 0 rgba(0,0,0,.5)" }}
                  initial={{ opacity:0, rotateX:-90, y:30 }}
                  animate={{ opacity:1, rotateX:0, y:0 }}
                  transition={{ delay:.3+i*.07, duration:.6, ease:[.16,1,.3,1] }}>
                  {ch}
                </motion.span>
              ))}
            </span>
            <span className="inline-block">
              {LAST.map((ch, i) => (
                <motion.span key={i} className="inline-block grad-text"
                  initial={{ opacity:0, rotateX:-90, y:30 }}
                  animate={{ opacity:1, rotateX:0, y:0 }}
                  transition={{ delay:.55+i*.07, duration:.6, ease:[.16,1,.3,1] }}>
                  {ch}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Role */}
          <motion.p variants={up} className="text-xl sm:text-2xl font-light mb-2"
            style={{ color:"rgba(170,210,240,0.85)" }}>
            Web Developer &amp;{" "}
            <motion.span className="font-bold"
              style={{ color:"#eaf6ff" }}
              animate={{ textShadow:["0 0 8px rgba(0,229,255,.4)","0 0 28px rgba(0,229,255,.9)","0 0 8px rgba(0,229,255,.4)"] }}
              transition={{ duration:3.5, repeat:Infinity }}>
              Laravel Specialist
            </motion.span>
          </motion.p>

          {/* Location */}
          <motion.div variants={up}
            className="flex items-center justify-center gap-1.5 text-xs mb-8"
            style={{ color:"rgba(100,160,200,0.7)" }}>
            <MapPin size={11} />
            <span>Sargodha, Pakistan</span>
          </motion.div>

          {/* Summary */}
          <motion.p variants={up}
            className="max-w-lg mx-auto mb-10 leading-relaxed text-sm sm:text-base"
            style={{ color:"rgba(140,190,220,0.8)" }}>
            Building secure, scalable web applications with Laravel. Experienced in
            API design, e-commerce, and SaaS platforms. Leveling up with Vue.js.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={up} className="flex flex-wrap justify-center gap-4 mb-10">
            <MagneticBtn href="#projects" primary>View Projects</MagneticBtn>
            <MagneticBtn href="#contact">Get in Touch</MagneticBtn>
          </motion.div>

          {/* Socials */}
          <motion.div variants={up} className="flex justify-center gap-3">
            {[
              { href:"https://github.com/Hirakhizar",                 icon:<GithubIcon width={18} height={18} />,   label:"GitHub",   color:"rgba(0,229,255,0.8)" },
              { href:"https://linkedin.com/in/hira-khizar-264686294", icon:<LinkedinIcon width={18} height={18} />, label:"LinkedIn", color:"rgba(155,109,255,0.8)" },
              { href:"mailto:hirakhizarkhizarhayat@gmail.com",        icon:<Mail size={18} />,                      label:"Email",    color:"rgba(0,255,200,0.8)" },
            ].map(({ href, icon, label, color }, i) => (
              <motion.a key={label} href={href}
                target={href.startsWith("mailto")?undefined:"_blank"}
                rel="noopener noreferrer" aria-label={label}
                initial={{ opacity:0, scale:0, rotate:-180 }}
                animate={{ opacity:1, scale:1, rotate:0 }}
                transition={{ delay:1.8+i*.12, type:"spring", stiffness:200 }}
                whileHover={{ scale:1.25, y:-5 }}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background:"rgba(0,10,30,0.6)",
                  border:"1px solid rgba(0,229,255,0.2)",
                  color:"rgba(100,160,200,0.7)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = color; (e.currentTarget as HTMLElement).style.borderColor = color; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(100,160,200,0.7)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,0.2)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior:"smooth" })}
        initial={{ opacity:0 }} animate={{ opacity:1 }}
        transition={{ delay:2.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        style={{ color:"rgba(100,160,200,0.6)" }}
        aria-label="Scroll down">
        <span className="text-[9px] tracking-[.3em] uppercase">Scroll</span>
        <motion.div animate={{ y:[0,6,0] }} transition={{ duration:1.5, repeat:Infinity }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}

function MagneticBtn({ href, children, primary }: { href:string; children:React.ReactNode; primary?:boolean }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior:"smooth" });
  };
  return (
    <motion.a href={href} onClick={handleClick}
      whileHover={{ scale:1.07, y:-2 }} whileTap={{ scale:.95 }}
      className={`relative px-8 py-3.5 rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 ${
        primary ? "text-[#020810]" : "text-[#00e5ff]"
      }`}
      style={primary ? {
        background:"linear-gradient(135deg,#00e5ff,#00ffc8)",
        boxShadow:"0 0 35px rgba(0,229,255,.5), 0 0 70px rgba(0,229,255,.2)",
      } : {
        background:"rgba(0,10,30,0.5)",
        border:"1px solid rgba(0,229,255,0.35)",
        boxShadow:"0 0 0 rgba(0,229,255,0)",
      }}>
      {primary && (
        <motion.span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <motion.span className="absolute top-0 bottom-0 w-1/3"
            style={{ background:"linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)" }}
            animate={{ left:["-40%","140%"] }}
            transition={{ duration:2.5, repeat:Infinity, repeatDelay:1 }} />
        </motion.span>
      )}
      <span className="relative">{children}</span>
    </motion.a>
  );
}
