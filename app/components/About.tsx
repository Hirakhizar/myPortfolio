"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Database, GitBranch } from "lucide-react";
import { useTilt } from "@/lib/useTilt";

const cards = [
  { icon:<Server size={22} />,    title:"Backend Expert",  desc:"Laravel & PHP specialist with 2+ years building production systems.", color:"#00e5ff",  bg:"rgba(0,229,255,0.08)"  },
  { icon:<Code2 size={22} />,     title:"API Architect",   desc:"RESTful APIs for SaaS, POS, and e-commerce platforms.",              color:"#00ffc8",  bg:"rgba(0,255,200,0.08)"  },
  { icon:<Database size={22} />,  title:"Database Design", desc:"MySQL schema design, query optimisation, and data integrity.",        color:"#9b6dff",  bg:"rgba(155,109,255,0.08)" },
  { icon:<GitBranch size={22} />, title:"Clean Code",      desc:"Git workflows, CI/CD pipelines, and maintainable codebases.",        color:"#ff9f7f",  bg:"rgba(255,159,127,0.08)" },
];

function HighlightCard({ icon, title, desc, color, bg, i, inView }:
  { icon:React.ReactNode; title:string; desc:string; color:string; bg:string; i:number; inView:boolean }) {
  const { ref, onMove, onLeave } = useTilt(14);
  return (
    <motion.div
      initial={{ opacity:0, y:32, scale:.9 }}
      animate={inView?{opacity:1,y:0,scale:1}:{}}
      transition={{ duration:.55, delay:.25+i*.12 }}
      className="perspective-1000">
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        className="neon-card ice-card p-5 cursor-default h-full relative overflow-hidden"
        style={{ transition:"transform .25s cubic-bezier(.4,0,.2,1)", willChange:"transform" }}>

        {/* Background glow */}
        <div className="absolute inset-0 rounded-[1.25rem] opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{ background:`radial-gradient(circle at 30% 30%, ${bg} 0%, transparent 70%)` }} />

        <motion.div className="mb-3 w-10 h-10 rounded-xl flex items-center justify-center relative z-10"
          style={{ color, background:bg, border:`1px solid ${color}33` }}
          animate={{ rotate:[0,5,-5,0] }} transition={{ duration:4+i, repeat:Infinity, delay:i*.6 }}>
          {icon}
        </motion.div>
        <h3 className="font-semibold text-sm mb-1.5 relative z-10" style={{ color:"#eaf6ff" }}>{title}</h3>
        <p className="text-xs leading-relaxed relative z-10" style={{ color:"rgba(160,200,230,0.75)" }}>{desc}</p>

        {/* Bottom accent line */}
        <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-[1.25rem]"
          style={{ background:`linear-gradient(90deg,transparent,${color}66,transparent)` }}
          animate={{ opacity:[0.3,1,0.3] }} transition={{ duration:2.5+i*.4, repeat:Infinity, delay:i*.35 }} />
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage:"repeating-linear-gradient(0deg,rgba(0,229,255,1) 0,transparent 1px,transparent 80px),repeating-linear-gradient(90deg,rgba(0,229,255,1) 0,transparent 1px,transparent 80px)" }}
        aria-hidden="true" />

      {/* Ambient glow */}
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width:"600px", height:"400px",
          background:"radial-gradient(ellipse,rgba(155,109,255,0.06) 0%,rgba(0,229,255,0.04) 50%,transparent 70%)" }}
        animate={{ scale:[1,1.1,1] }} transition={{ duration:10, repeat:Infinity }}
        aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div initial={{ opacity:0, y:28 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:.7 }} className="text-center mb-16">
          <span className="section-label">Who I Am</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-1" style={{ color:"#eaf6ff" }}>
            About <span className="grad-text">Me</span>
          </h2>
          <motion.div className="ice-divider mt-4 mx-auto" style={{ width:0 }}
            animate={inView?{width:"120px"}:{}} transition={{ duration:.8, delay:.3 }} />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Bio */}
          <motion.div className="md:col-span-3"
            initial={{ opacity:0, x:-40 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:.8, delay:.15 }}>
            <div className="neon-card ice-card p-8 space-y-5 h-full relative overflow-hidden">
              {/* Decorative spin icon */}
              <div className="absolute top-4 right-4 opacity-10 spin-slow" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <path d="M15 2v26M2 15h26M6 6l18 18M24 6L6 24" stroke="#00e5ff" strokeWidth="1.2"/>
                </svg>
              </div>

              <p className="leading-relaxed text-sm" style={{ color:"rgba(170,210,240,0.9)" }}>
                I&apos;m a passionate Web Developer based in{" "}
                <span style={{ color:"#00e5ff", fontWeight:600 }}>Sargodha, Pakistan</span>, specialising in
                Laravel for backend development. I build secure, scalable web applications
                that solve real business problems.
              </p>
              <p className="leading-relaxed text-sm" style={{ color:"rgba(140,185,220,0.8)" }}>
                With experience across e-commerce platforms, SaaS construction tools, POS
                systems, and school management software, I bring a practical, results-driven
                approach to every project.
              </p>
              <p className="leading-relaxed text-sm" style={{ color:"rgba(140,185,220,0.8)" }}>
                Currently expanding my frontend skills with{" "}
                <span style={{ color:"#9b6dff", fontWeight:600 }}>Vue.js</span> to become a more complete
                full-stack developer.
              </p>

              {/* Stats row */}
              <div className="pt-2 grid grid-cols-3 gap-4 border-t border-[rgba(0,229,255,0.1)]">
                {[
                  { val:"2+",  label:"Years Exp." },
                  { val:"5+",  label:"Systems Built" },
                  { val:"10+", label:"Projects" },
                ].map(({ val, label }, i) => (
                  <motion.div key={label}
                    initial={{ opacity:0, y:12 }} animate={inView?{opacity:1,y:0}:{}}
                    transition={{ delay:.6+i*.1 }}
                    className="text-center">
                    <div className="text-2xl font-bold grad-text">{val}</div>
                    <div className="text-[10px] tracking-wide mt-0.5" style={{ color:"rgba(100,160,200,0.65)" }}>{label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {["Laravel","PHP","REST APIs","MySQL","Vue.js"].map((tag, i) => (
                  <motion.span key={tag}
                    initial={{ opacity:0, scale:.85 }} animate={inView?{opacity:1,scale:1}:{}}
                    transition={{ delay:.7+i*.07 }} whileHover={{ scale:1.1, y:-2 }}
                    className="px-3 py-1 rounded-full text-xs cursor-default transition-all duration-200"
                    style={{ border:"1px solid rgba(0,229,255,0.25)", color:"#00e5ff", background:"rgba(0,229,255,0.07)" }}>
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {cards.map((c, i) => (
              <HighlightCard key={c.title} {...c} i={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
