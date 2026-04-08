"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SKILLS, SKILL_LEVELS } from "@/lib/data";

const BAR_COLORS = [
  "linear-gradient(90deg,#0099cc,#00e5ff,#00ffc8)",
  "linear-gradient(90deg,#6633cc,#9b6dff,#00e5ff)",
  "linear-gradient(90deg,#00aa88,#00ffc8,#00e5ff)",
  "linear-gradient(90deg,#cc6633,#ff9f7f,#ffb347)",
];

const CAT_COLORS: Record<string, { color:string; bg:string }> = {
  Backend:  { color:"#00e5ff", bg:"rgba(0,229,255,0.07)"   },
  Frontend: { color:"#9b6dff", bg:"rgba(155,109,255,0.07)" },
  Database: { color:"#00ffc8", bg:"rgba(0,255,200,0.07)"   },
  Tools:    { color:"#ff9f7f", bg:"rgba(255,159,127,0.07)" },
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden">
      {/* Top glow */}
      <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width:"900px", height:"450px",
          background:"radial-gradient(ellipse at top,rgba(0,229,255,0.09) 0%,rgba(155,109,255,0.06) 45%,transparent 70%)",
          filter:"blur(30px)" }}
        animate={{ opacity:[.4,.85,.4] }} transition={{ duration:6, repeat:Infinity }}
        aria-hidden="true" />

      {/* Arc SVG */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true">
        <svg width="700" height="120" viewBox="0 0 700 120" fill="none">
          {[0,50,100].map((o,i) => (
            <motion.path key={i}
              d={`M ${o} 120 Q 350 ${-10+i*10} ${700-o} 120`}
              stroke={i===1?"rgba(155,109,255,.18)":"rgba(0,229,255,.14)"}
              strokeWidth="1" fill="none"
              animate={{ strokeOpacity:[.05,.28,.05] }}
              transition={{ duration:4+i, repeat:Infinity, delay:i*.7 }} />
          ))}
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        <motion.div initial={{ opacity:0, y:28 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:.7 }} className="text-center mb-16">
          <span className="section-label">Technical Arsenal</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-1" style={{ color:"#eaf6ff" }}>
            My <span className="grad-text">Skills</span>
          </h2>
          <motion.div className="ice-divider mt-4 mx-auto" style={{ width:0 }}
            animate={inView?{width:"120px"}:{}} transition={{ duration:.8, delay:.3 }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Skill bars */}
          <motion.div initial={{ opacity:0, x:-36 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:.7, delay:.2 }} className="space-y-5">
            <h3 className="text-xs tracking-[.25em] uppercase mb-6" style={{ color:"rgba(0,229,255,0.7)" }}>
              Proficiency
            </h3>
            {SKILL_LEVELS.map(({ name, level }, i) => (
              <div key={name}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color:"rgba(180,215,240,0.9)" }}>{name}</span>
                  <motion.span className="text-xs font-mono font-bold"
                    style={{ color:i%2===0?"#00e5ff":"#9b6dff" }}
                    initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
                    transition={{ delay:.5+i*.08 }}>
                    {level}%
                  </motion.span>
                </div>
                <div className="h-2 rounded-full overflow-hidden"
                  style={{ background:"rgba(0,229,255,0.07)", border:"1px solid rgba(0,229,255,0.08)" }}>
                  <motion.div className="h-full rounded-full relative overflow-hidden"
                    initial={{ width:0 }}
                    animate={inView?{width:`${level}%`}:{}}
                    transition={{ duration:1.4, delay:.3+i*.09, ease:[.16,1,.3,1] }}
                    style={{ background:BAR_COLORS[i%4], boxShadow:"0 0 10px rgba(0,229,255,.4)" }}>
                    {/* Shimmer */}
                    <motion.span className="absolute inset-0 block"
                      style={{ background:"linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)", width:"55%" }}
                      animate={{ left:["-55%","155%"] }}
                      transition={{ duration:2.5, repeat:Infinity, delay:1.3+i*.12, ease:"linear" }} />
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Category chips */}
          <motion.div initial={{ opacity:0, x:36 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:.7, delay:.3 }} className="space-y-4">
            <h3 className="text-xs tracking-[.25em] uppercase mb-6" style={{ color:"rgba(155,109,255,0.7)" }}>
              Categories
            </h3>
            {Object.entries(SKILLS).map(([cat, items], ci) => {
              const c = CAT_COLORS[cat] ?? { color:"#00e5ff", bg:"rgba(0,229,255,0.07)" };
              return (
                <motion.div key={cat}
                  initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
                  transition={{ duration:.5, delay:.4+ci*.12 }}
                  className="neon-card ice-card p-5 relative overflow-hidden">

                  {/* Side accent */}
                  <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
                    style={{ background:`linear-gradient(180deg,transparent,${c.color},transparent)` }} />

                  <div className="flex items-center gap-2 mb-3 pl-2">
                    <motion.div className="w-2 h-2 rounded-full"
                      style={{ background:c.color }}
                      animate={{ scale:[1,1.8,1], opacity:[.5,1,.5] }}
                      transition={{ duration:2.2, repeat:Infinity, delay:ci*.3 }} />
                    <span className="text-[10px] font-bold tracking-[.22em] uppercase" style={{ color:c.color }}>{cat}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-2">
                    {items.map((skill, si) => (
                      <motion.span key={skill}
                        initial={{ opacity:0, scale:.8 }} animate={inView?{opacity:1,scale:1}:{}}
                        transition={{ delay:.5+ci*.12+si*.06 }}
                        whileHover={{ scale:1.1, y:-2 }}
                        className="px-3 py-1.5 rounded-xl text-xs cursor-default transition-all duration-200"
                        style={{
                          color:"rgba(170,210,240,0.8)",
                          border:`1px solid ${c.color}22`,
                          background:c.bg,
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = c.color; (e.currentTarget as HTMLElement).style.borderColor = `${c.color}66`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(170,210,240,0.8)"; (e.currentTarget as HTMLElement).style.borderColor = `${c.color}22`; }}>
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
