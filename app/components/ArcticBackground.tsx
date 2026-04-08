"use client";

import { motion } from "framer-motion";

const ORBS = [
  { w:700, h:700, top:"5%",  left:"65%", c:"rgba(108,99,255,0.18)",  dur:8  },
  { w:600, h:600, top:"55%", left:"8%",  c:"rgba(0,229,255,0.12)",   dur:11 },
  { w:450, h:450, top:"75%", left:"72%", c:"rgba(255,77,255,0.09)",  dur:9  },
  { w:350, h:350, top:"22%", left:"28%", c:"rgba(0,255,163,0.08)",   dur:13 },
  { w:300, h:300, top:"40%", left:"50%", c:"rgba(0,229,255,0.06)",   dur:15 },
];

export default function ArcticBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Base gradient — deeper purple-to-black */}
      <div className="absolute inset-0"
        style={{ background:"radial-gradient(ellipse 110% 90% at 65% 8%, #0e0828 0%, #060418 40%, #020208 100%)" }} />

      {/* Secondary gradient layer */}
      <div className="absolute inset-0"
        style={{ background:"radial-gradient(ellipse 80% 60% at 20% 80%, rgba(0,229,255,0.06) 0%, transparent 60%)" }} />

      {/* Noise grain */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize:"200px 200px" }} />

      {/* Glowing orbs */}
      {ORBS.map((o, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width:o.w, height:o.h, top:o.top, left:o.left,
            background:`radial-gradient(circle, ${o.c} 0%, transparent 70%)`,
            filter:"blur(70px)", transform:"translate(-50%,-50%)" }}
          animate={{ scale:[1,1.18,1], opacity:[0.55,1,0.55] }}
          transition={{ duration:o.dur, repeat:Infinity, ease:"easeInOut", delay:i*1.2 }} />
      ))}

      {/* Grid lines — violet tint */}
      <div className="absolute inset-0 opacity-[0.045]"
        style={{ backgroundImage:"linear-gradient(rgba(108,99,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(108,99,255,1) 1px,transparent 1px)",
          backgroundSize:"80px 80px" }} />

      {/* Horizontal scan line */}
      <motion.div className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background:"linear-gradient(90deg,transparent,rgba(108,99,255,0.4),rgba(0,229,255,0.3),transparent)" }}
        animate={{ top:["0%","100%"] }}
        transition={{ duration:8, repeat:Infinity, ease:"linear", repeatDelay:3 }} />

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage:"repeating-linear-gradient(45deg, rgba(0,229,255,1) 0, transparent 1px, transparent 120px, rgba(0,229,255,1) 121px)",
          backgroundSize:"170px 170px" }} />
    </div>
  );
}
