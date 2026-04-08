"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { useTilt } from "@/lib/useTilt";
import { EXPERIENCE } from "@/lib/data";

const CARD_COLORS = ["#00e5ff", "#9b6dff", "#00ffc8"];

function ExpCard({ exp, i, inView }: { exp: typeof EXPERIENCE[0]; i: number; inView: boolean }) {
  const { ref, onMove, onLeave } = useTilt(6);
  const accent = CARD_COLORS[i % CARD_COLORS.length];

  return (
    <motion.div
      initial={{ opacity:0, x:-60, filter:"blur(8px)" }}
      animate={inView?{opacity:1,x:0,filter:"blur(0px)"}:{}}
      transition={{ duration:.7, delay:.2+i*.2 }}
      className="relative pl-16 perspective-1000">

      {/* Timeline node */}
      <motion.div
        className="absolute left-4 top-7 w-5 h-5 rounded-full border-2 -translate-x-1/2 z-10 flex items-center justify-center"
        style={{
          background: exp.current ? accent : "rgba(2,8,16,0.9)",
          borderColor: accent,
        }}
        animate={exp.current ? {
          boxShadow:[`0 0 6px ${accent}66`,`0 0 22px ${accent}cc`,`0 0 6px ${accent}66`],
        } : {}}
        transition={{ duration:2, repeat:Infinity }}>
        {exp.current && (
          <motion.div className="w-2 h-2 rounded-full"
            style={{ background:"#020810" }}
            animate={{ scale:[1,0.5,1] }} transition={{ duration:1.5, repeat:Infinity }} />
        )}
      </motion.div>

      {/* Connector */}
      <div className="absolute left-6 top-[1.9rem] w-8 h-px"
        style={{ background:`linear-gradient(90deg,${accent}66,transparent)` }} />

      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        className="neon-card ice-card p-6 relative overflow-hidden"
        style={{ transition:"transform .25s cubic-bezier(.4,0,.2,1)", willChange:"transform" }}>

        {/* Top accent bar */}
        <motion.div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[1.25rem]"
          style={{ background:`linear-gradient(90deg,transparent,${accent}88,transparent)` }}
          animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:3, repeat:Infinity, delay:i*.5 }} />

        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-[0.04]"
          style={{ background:`radial-gradient(circle,${accent} 0%,transparent 70%)`, filter:"blur(20px)" }} />

        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background:`${accent}18`, border:`1px solid ${accent}33` }}>
                <Briefcase size={12} style={{ color:accent }} />
              </div>
              <h3 className="font-bold text-base" style={{ color:"#eaf6ff" }}>{exp.role}</h3>
            </div>
            <motion.p className="font-semibold text-sm mb-1"
              style={{ color:accent }}
              animate={{ opacity:[.7,1,.7] }} transition={{ duration:3, repeat:Infinity, delay:i*.5 }}>
              {exp.company}
            </motion.p>
            <div className="flex items-center gap-1 text-xs" style={{ color:"rgba(100,160,200,0.6)" }}>
              <MapPin size={10} /><span>{exp.location}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 text-xs" style={{ color:"rgba(120,175,215,0.7)" }}>
              <Calendar size={10} />
              <span>{exp.period}</span>
            </div>
            {exp.current && (
              <motion.span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ background:`${accent}18`, color:accent, border:`1px solid ${accent}44` }}
                animate={{ borderColor:[`${accent}22`,`${accent}88`,`${accent}22`] }}
                transition={{ duration:2, repeat:Infinity }}>
                ● Current
              </motion.span>
            )}
          </div>
        </div>

        <ul className="space-y-2.5">
          {exp.points.map((pt, j) => (
            <motion.li key={j}
              initial={{ opacity:0, x:-12 }} animate={inView?{opacity:1,x:0}:{}}
              transition={{ delay:.45+i*.2+j*.07 }}
              className="flex items-start gap-2.5 text-sm"
              style={{ color:"rgba(160,200,230,0.85)" }}>
              <motion.span className="mt-1.5 shrink-0 text-[8px]"
                style={{ color:accent }}
                animate={{ opacity:[.5,1,.5] }} transition={{ duration:2.2, repeat:Infinity, delay:j*.3 }}>
                ◆
              </motion.span>
              {pt}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="experience" className="relative py-28 px-6 overflow-hidden">
      {/* Vertical light columns */}
      {[12,30,50,70,88].map((l, i) => (
        <motion.div key={i} className="absolute top-0 bottom-0 w-px pointer-events-none"
          style={{ left:`${l}%`, background:"linear-gradient(180deg,transparent,rgba(0,229,255,.06),transparent)" }}
          animate={{ opacity:[.2,.8,.2] }} transition={{ duration:3+i, repeat:Infinity, delay:i*.4 }}
          aria-hidden="true" />
      ))}

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        <motion.div initial={{ opacity:0, y:28 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:.7 }} className="text-center mb-16">
          <span className="section-label">Career Path</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-1" style={{ color:"#eaf6ff" }}>
            Work <span className="grad-text">Experience</span>
          </h2>
          <motion.div className="ice-divider mt-4 mx-auto" style={{ width:0 }}
            animate={inView?{width:"120px"}:{}} transition={{ duration:.8, delay:.3 }} />
        </motion.div>

        <div className="relative">
          {/* Spine */}
          <motion.div className="absolute left-6 top-0 w-px"
            style={{ background:"linear-gradient(180deg,#00e5ff,rgba(155,109,255,.5),rgba(0,255,200,.3),transparent)" }}
            initial={{ height:0 }} animate={inView?{height:"100%"}:{}}
            transition={{ duration:1.5, delay:.3 }} />

          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <ExpCard key={`${exp.company}-${i}`} exp={exp} i={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
