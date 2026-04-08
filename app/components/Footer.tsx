"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";

export default function Footer() {
  return (
    <footer className="relative py-10 px-6 overflow-hidden">
      <div className="ice-divider mb-8" />

      {/* Icicle drips */}
      <div className="absolute top-0 left-0 right-0 flex justify-around pointer-events-none" aria-hidden="true">
        {[10,18,8,14,22,9,16,12,20,7].map((h, i) => (
          <motion.div key={i}
            style={{ width:"1.5px", height:`${h}px`,
              background:"linear-gradient(180deg,rgba(0,212,255,0.35),transparent)",
              borderRadius:"0 0 2px 2px" }}
            animate={{ opacity:[.25,.75,.25], scaleY:[.85,1.1,.85] }}
            transition={{ duration:2.2+i*.28, repeat:Infinity, delay:i*.18 }} />
        ))}
      </div>

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.p className="text-xs"
          style={{ color:"rgba(80,130,170,0.6)" }}
          animate={{ opacity:[.45,.75,.45] }} transition={{ duration:5, repeat:Infinity }}>
          © {new Date().getFullYear()} Hira Khizar — Built with Next.js &amp; Tailwind CSS
        </motion.p>

        <div className="flex items-center gap-4">
          {[
            { href:"https://github.com/Hirakhizar",                 icon:<GithubIcon width={16} height={16} />,   label:"GitHub",   color:"#00e5ff" },
            { href:"https://linkedin.com/in/hira-khizar-264686294", icon:<LinkedinIcon width={16} height={16} />, label:"LinkedIn", color:"#9b6dff" },
            { href:"mailto:hirakhizarkhizarhayat@gmail.com",        icon:<Mail size={16} />,                      label:"Email",    color:"#00ffc8" },
          ].map(({ href, icon, label, color }) => (
            <motion.a key={label} href={href}
              target={href.startsWith("mailto")?undefined:"_blank"}
              rel="noopener noreferrer" aria-label={label}
              whileHover={{ scale:1.25, y:-3 }}
              style={{ color:"rgba(80,130,170,0.6)" }}
              className="transition-colors duration-200"
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = color}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(80,130,170,0.6)"}>
              {icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
