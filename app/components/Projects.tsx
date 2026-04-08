"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import GithubIcon from "./icons/GithubIcon";
import { useTilt } from "@/lib/useTilt";
import { PROJECTS } from "@/lib/data";

// Each card gets a distinct accent color
const ACCENTS = [
  { color:"#00e5ff", bg:"rgba(0,229,255,0.07)",   glow:"rgba(0,229,255,0.25)"   },
  { color:"#9b6dff", bg:"rgba(155,109,255,0.07)", glow:"rgba(155,109,255,0.25)" },
  { color:"#00ffc8", bg:"rgba(0,255,200,0.07)",   glow:"rgba(0,255,200,0.25)"   },
  { color:"#ff9f7f", bg:"rgba(255,159,127,0.07)", glow:"rgba(255,159,127,0.25)" },
  { color:"#ff4dff", bg:"rgba(255,77,255,0.07)",  glow:"rgba(255,77,255,0.25)"  },
  { color:"#ffb347", bg:"rgba(255,179,71,0.07)",  glow:"rgba(255,179,71,0.25)"  },
];

function ProjectCard({ project, i, inView }: { project: typeof PROJECTS[0]; i: number; inView: boolean }) {
  const { ref, onMove, onLeave } = useTilt(10);
  const accent = ACCENTS[i % ACCENTS.length];

  return (
    <motion.div
      initial={{ opacity:0, y:60, rotateX:15, filter:"blur(8px)" }}
      animate={inView ? { opacity:1, y:0, rotateX:0, filter:"blur(0px)" } : {}}
      transition={{ duration:.7, delay:i*.12, ease:[.16,1,.3,1] }}
      className="perspective-1000">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="neon-card ice-card p-6 flex flex-col gap-4 h-full cursor-default relative overflow-hidden group"
        style={{ transition:"transform .25s cubic-bezier(.4,0,.2,1)", willChange:"transform" }}>

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[1.25rem]"
          style={{ background:`linear-gradient(90deg,transparent,${accent.color}88,transparent)` }} />

        {/* Background glow on hover */}
        <div className="absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background:`radial-gradient(circle at 20% 20%, ${accent.bg} 0%, transparent 60%)` }} />

        {/* Scan line */}
        <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden pointer-events-none">
          <motion.div className="absolute left-0 right-0 h-px"
            style={{ background:`linear-gradient(90deg,transparent,${accent.color}44,transparent)` }}
            animate={{ top:["-2px","102%"] }}
            transition={{ duration:3.5, repeat:Infinity, ease:"linear", repeatDelay:2.5, delay:i*.5 }} />
        </div>

        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl relative z-10"
          style={{ background:accent.bg, border:`1px solid ${accent.color}33` }}
          whileHover={{ rotateY:180, scale:1.1 }}
          transition={{ duration:.6 }}>
          <span className="absolute">{project.icon}</span>
          <motion.div className="absolute inset-0 rounded-2xl"
            animate={{ boxShadow:[`0 0 0 ${accent.glow.replace("0.25","0")}`,`0 0 20px ${accent.glow}`,`0 0 0 ${accent.glow.replace("0.25","0")}`] }}
            transition={{ duration:2.5, repeat:Infinity, delay:i*.3 }} />
        </motion.div>

        <h3 className="font-bold text-base leading-snug relative z-10" style={{ color:"#eaf6ff" }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1 relative z-10" style={{ color:"rgba(155,200,230,0.8)" }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 relative z-10">
          {project.tech.map((t) => (
            <span key={t}
              className="px-2.5 py-0.5 rounded-full text-[11px] transition-all duration-200"
              style={{ border:`1px solid ${accent.color}33`, color:accent.color, background:accent.bg }}>
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t flex items-center justify-between relative z-10"
          style={{ borderColor:"rgba(0,229,255,0.08)" }}>
          <a href="https://github.com/Hirakhizar" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs transition-colors duration-200"
            style={{ color:"rgba(100,160,200,0.6)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = accent.color}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(100,160,200,0.6)"}
            aria-label={`View ${project.title} on GitHub`}>
            <GithubIcon width={13} height={13} />
            <span>View Code</span>
          </a>
          <motion.div animate={{ rotate:[0,360] }} transition={{ duration:9, repeat:Infinity, ease:"linear" }}
            style={{ opacity:0.3 }}>
            <svg width="13" height="13" viewBox="0 0 13 13">
              <path d="M6.5 1v11M1 6.5h11M3 3l7 7M10 3l-7 7" stroke={accent.color} strokeWidth="1"/>
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden">
      {/* Ambient glow */}
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width:"800px", height:"600px",
          background:"radial-gradient(ellipse,rgba(155,109,255,0.05) 0%,rgba(0,229,255,0.04) 50%,transparent 70%)" }}
        animate={{ scale:[1,1.15,1], rotate:[0,5,0] }} transition={{ duration:10, repeat:Infinity }}
        aria-hidden="true" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div initial={{ opacity:0, y:28 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:.7 }} className="text-center mb-16">
          <span className="section-label">What I&apos;ve Built</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-1" style={{ color:"#eaf6ff" }}>
            Featured <span className="grad-text">Projects</span>
          </h2>
          <motion.div className="ice-divider mt-4 mx-auto" style={{ width:0 }}
            animate={inView?{width:"120px"}:{}} transition={{ duration:.8, delay:.3 }} />
          <motion.p className="mt-4 text-sm max-w-md mx-auto"
            style={{ color:"rgba(130,180,220,0.7)" }}
            initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
            transition={{ delay:.5 }}>
            A selection of systems and applications I&apos;ve designed and shipped.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} i={i} inView={inView} />
          ))}
        </div>

        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
          transition={{ delay:1 }} className="text-center mt-12">
          <motion.a href="https://github.com/Hirakhizar" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05, y:-3 }} whileTap={{ scale:.97 }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm transition-all duration-300"
            style={{
              background:"rgba(0,10,30,0.5)",
              border:"1px solid rgba(0,229,255,0.25)",
              color:"#00e5ff",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,0.6)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,229,255,0.2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,0.25)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
            <GithubIcon width={15} height={15} />
            More on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
