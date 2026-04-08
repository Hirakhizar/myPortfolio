"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error ?? "Something went wrong."); setStatus("error"); return; }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputBase =
    "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300"
    + " bg-[rgba(0,10,25,0.6)] border";

  const CONTACTS = [
    { icon:<Mail size={17} />,                      label:"Email",    value:"hirakhizarkhizarhayat@gmail.com", href:"mailto:hirakhizarkhizarhayat@gmail.com", color:"#00e5ff" },
    { icon:<MapPin size={17} />,                    label:"Location", value:"Sargodha, Pakistan",              href:null,                                     color:"#00ffc8" },
    { icon:<GithubIcon width={17} height={17} />,   label:"GitHub",   value:"github.com/Hirakhizar",           href:"https://github.com/Hirakhizar",          color:"#9b6dff" },
    { icon:<LinkedinIcon width={17} height={17} />, label:"LinkedIn", value:"hira-khizar-264686294",           href:"https://linkedin.com/in/hira-khizar-264686294", color:"#ff9f7f" },
  ];

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      {/* Bottom aurora */}
      <div className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none"
        style={{ background:"linear-gradient(0deg,rgba(0,229,255,0.07) 0%,transparent 100%)", filter:"blur(24px)" }}
        aria-hidden="true" />

      {/* Ambient orb */}
      <motion.div className="absolute top-1/3 right-1/4 pointer-events-none"
        style={{ width:"400px", height:"400px",
          background:"radial-gradient(circle,rgba(155,109,255,0.07) 0%,transparent 70%)",
          filter:"blur(40px)" }}
        animate={{ scale:[1,1.2,1] }} transition={{ duration:8, repeat:Infinity }}
        aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:.7 }} className="text-center mb-16">
          <span className="section-label">Let&apos;s Connect</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-1" style={{ color:"#eaf6ff" }}>
            Get in <span className="grad-text">Touch</span>
          </h2>
          <motion.div className="ice-divider mt-4 mx-auto" style={{ width:0 }}
            animate={inView?{width:"120px"}:{}} transition={{ duration:.8, delay:.3 }} />
          <p className="mt-5 max-w-md mx-auto text-sm" style={{ color:"rgba(130,180,220,0.75)" }}>
            Open to new opportunities, collaborations, or just a friendly chat about tech.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div initial={{ opacity:0, x:-50 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:.8, delay:.2 }} className="space-y-5">
            <div className="glass ice-card rounded-2xl p-6 space-y-5">
              {CONTACTS.map(({ icon, label, value, href, color }, i) => (
                <motion.div key={label}
                  initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}}
                  transition={{ delay:.3+i*.1 }}
                  className="flex items-start gap-4">
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background:`${color}14`, border:`1px solid ${color}33`, color }}
                    whileHover={{ scale:1.15, boxShadow:`0 0 18px ${color}55` }}>
                    {icon}
                  </motion.div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color:"rgba(100,155,190,0.7)" }}>{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith("mailto")?undefined:"_blank"}
                        rel="noopener noreferrer"
                        className="text-sm break-all transition-colors duration-200"
                        style={{ color:"rgba(180,215,240,0.9)" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = color}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(180,215,240,0.9)"}>
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm" style={{ color:"rgba(180,215,240,0.9)" }}>{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Rotating crystal */}
            <motion.div className="flex justify-center"
              animate={{ rotate:[0,360] }}
              transition={{ duration:22, repeat:Infinity, ease:"linear" }}
              style={{ opacity:.18 }}
              aria-hidden="true">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <path d="M40 5 L40 75 M5 40 L75 40 M15 15 L65 65 M65 15 L15 65 M40 5 L50 20 M40 5 L30 20 M40 75 L50 60 M40 75 L30 60"
                  stroke="#00e5ff" strokeWidth="1.5" fill="none"/>
                <circle cx="40" cy="40" r="8" stroke="#9b6dff" strokeWidth="1" fill="none"/>
              </svg>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity:0, x:50 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:.8, delay:.3 }}>
            <form onSubmit={handleSubmit} className="glass ice-card rounded-2xl p-6 space-y-4">
              {[
                { id:"name",  label:"Name",  type:"text",  placeholder:"Your name" },
                { id:"email", label:"Email", type:"email", placeholder:"your@email.com" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="text-xs mb-1.5 block" style={{ color:"rgba(100,155,190,0.8)" }}>
                    {label}
                  </label>
                  <input id={id} name={id} type={type} required placeholder={placeholder}
                    value={form[id as keyof typeof form]}
                    onChange={handleChange}
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused(null)}
                    disabled={status === "sending"}
                    style={{ color:"#eaf6ff" }}
                    className={`${inputBase} placeholder:text-[rgba(80,130,170,0.5)] ${
                      focused === id
                        ? "border-[rgba(0,229,255,0.6)] shadow-[0_0_18px_rgba(0,229,255,0.15)]"
                        : "border-[rgba(0,229,255,0.12)]"
                    } disabled:opacity-50`}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="text-xs mb-1.5 block" style={{ color:"rgba(100,155,190,0.8)" }}>
                  Message
                </label>
                <textarea id="message" name="message" required rows={5}
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  disabled={status === "sending"}
                  style={{ color:"#eaf6ff" }}
                  className={`${inputBase} resize-none placeholder:text-[rgba(80,130,170,0.5)] ${
                    focused === "message"
                      ? "border-[rgba(0,229,255,0.6)] shadow-[0_0_18px_rgba(0,229,255,0.15)]"
                      : "border-[rgba(0,229,255,0.12)]"
                  } disabled:opacity-50`}
                />
              </div>

              {status === "success" && (
                <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
                  className="flex items-center gap-2 text-sm rounded-xl px-4 py-3"
                  style={{ color:"#4ade80", background:"rgba(74,222,128,0.08)", border:"1px solid rgba(74,222,128,0.2)" }}>
                  <CheckCircle size={16} />
                  Message sent! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
                  className="flex items-center gap-2 text-sm rounded-xl px-4 py-3"
                  style={{ color:"#f87171", background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.2)" }}>
                  <AlertCircle size={16} />
                  {errorMsg}
                </motion.div>
              )}

              <motion.button type="submit"
                disabled={status === "sending" || status === "success"}
                whileHover={status === "idle" ? { scale:1.02, y:-1 } : {}}
                whileTap={status === "idle" ? { scale:.97 } : {}}
                className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background:"linear-gradient(135deg,#00e5ff,#00ffc8)", color:"#020d1a",
                  boxShadow:"0 0 25px rgba(0,229,255,0.35)" }}>
                {status === "idle" && (
                  <motion.span className="absolute inset-0"
                    animate={{ opacity:[0,.25,0] }} transition={{ duration:2, repeat:Infinity }}
                    style={{ background:"linear-gradient(135deg,#00ffc8,#00e5ff)" }} />
                )}
                <span className="relative flex items-center gap-2">
                  {status === "sending" && (
                    <>
                      <motion.span className="w-4 h-4 border-2 border-[#020d1a] border-t-transparent rounded-full"
                        animate={{ rotate:360 }} transition={{ duration:.8, repeat:Infinity, ease:"linear" }} />
                      Sending...
                    </>
                  )}
                  {status === "success" && <><CheckCircle size={15} />Sent!</>}
                  {(status === "idle" || status === "error") && <><Send size={15} />Send Message</>}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
