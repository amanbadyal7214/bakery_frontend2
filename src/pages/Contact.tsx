import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/home/FooterSection";
import {
  MapPin, Phone, Mail, Clock, Send,
  Instagram, Facebook, Twitter, CheckCircle2,
  ChevronDown, MessageSquare, ShoppingBag, Cake, Star,
  Quote, ArrowRight, X
} from "lucide-react";

/* ─── animation helpers ─── */
const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp   = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const fadeLeft = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } } };
const fadeRight= { hidden: { opacity: 0, x:  50 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } } };
const stagger  = { show: { transition: { staggerChildren: 0.12 } } };
const itemV    = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } };

const infoCards = [
  { icon: MapPin,  label: "Visit Us",       val: "12 Baker Street, Old Town,\nCity Centre, SW1 4AB", color: "text-[#F5CB73]", bg: "bg-[#353336]", border: "border-[#F5CB73]/10" },
  { icon: Phone,   label: "Call Us",         val: "+1 (555) 123-4567",                               color: "text-[#F5CB73]", bg: "bg-[#353336]", border: "border-[#F5CB73]/10" },
  { icon: Mail,    label: "Email Us",        val: "hello@hangarys-sweet.com",                         color: "text-[#F5CB73]", bg: "bg-[#353336]", border: "border-[#F5CB73]/10" },
  { icon: Clock,   label: "Opening Hours",   val: "Mon – Sat: 7 AM – 7 PM\nSun: 8 AM – 3 PM",         color: "text-[#F5CB73]", bg: "bg-[#353336]", border: "border-[#F5CB73]/10" },
];

const faqs = [
  { q: "Do you take custom cake orders?",          a: "Yes! We love custom orders. Fill the form above or call us directly. We need at least 48 hours notice for custom cakes." },
  { q: "Do you offer same-day delivery?",          a: "We offer same-day delivery for orders placed before 11 AM within a 10 km radius of our studio." },
  { q: "Are there vegan or gluten-free options?",  a: "Absolutely. We have a dedicated vegan and gluten-free menu. Just ask our team when you visit or mention it in your order." },
  { q: "Can you cater for large events?",          a: "Yes — weddings, corporate events, birthdays. Reach out via the form or email us and we'll send you a custom catering quote." },
];

const quickLinks = [
  { icon: ShoppingBag, label: "View Full Menu",      to: "/menu" },
  { icon: Cake,        label: "Customize Your Order", to: "/customize-order" },
  { icon: Star,        label: "About Our Studio",    to: "/about" },
];

export default function Contact() {
  const [open, setOpen] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FEF0FD]/30 font-inter text-[#353336] overflow-x-hidden selection:bg-[#F5CB73] selection:text-[#353336]">
      <Navbar />

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* watermark */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playfair font-black tracking-tighter text-[#353336]/[0.03] whitespace-nowrap select-none pointer-events-none uppercase"
          style={{ fontSize: "clamp(5rem,22vw,22rem)" }}
        >
          Contact
        </div>

        {/* spinning stamp */}
        <div aria-hidden className="absolute top-[15%] right-[8%] w-28 h-28 animate-spin-slow hidden lg:block opacity-40">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <defs><path id="cc" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" /></defs>
            <text fontSize="10" letterSpacing="4" fill="#353336" className="font-black uppercase">
              <textPath href="#cc">Hangary Sweet • ARTISAN • EST.1984 •</textPath>
            </text>
            <text x="60" y="57" textAnchor="middle" fill="#F5CB73" className="font-playfair font-black" fontSize="12" letterSpacing="2">STUDIO</text>
            <text x="60" y="72" textAnchor="middle" fill="#353336" className="font-playfair font-black" fontSize="8" letterSpacing="2">CONTACT</text>
          </svg>
        </div>

        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          className="relative z-10 text-center max-w-3xl mx-auto px-6"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-[#F5CB73]"></span>
              <p className="text-[0.7rem] font-black tracking-[0.4em] uppercase text-[#F5CB73]">Get in Touch</p>
              <span className="w-12 h-[1px] bg-[#F5CB73]"></span>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl font-black text-[#353336] mb-8 leading-[1.1] tracking-tight">
            We'd Love to<br />
            <span className="italic text-[#F5CB73]">Hear</span> from You
          </h1>
          <p className="text-[#434144] text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            Custom orders, catering enquiries, feedback — whatever's on your mind, we're just a message away.
          </p>
        </motion.div>
      </section>

      {/* ══════════════════ INFO CARDS ══════════════════ */}
      <section className="max-w-7xl mx-auto px-10 py-12">
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {infoCards.map((c) => (
            <motion.div
              key={c.label}
              variants={fadeUp}
              className={`bg-white rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(53,51,54,0.06)] border ${c.border} hover:shadow-[0_48px_80px_-24px_rgba(53,51,54,0.1)] transition-all duration-500 group`}
            >
              <div className={`w-16 h-16 ${c.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-[#353336]/10`}>
                <c.icon className={`w-6 h-6 ${c.color}`} />
              </div>
              <p className="text-[0.6rem] font-black tracking-[0.34em] uppercase text-[#F5CB73] mb-3">{c.label}</p>
              <p className="text-[#353336] text-lg font-black leading-relaxed whitespace-pre-line tracking-tight">{c.val}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════ FORM + SIDEBAR ══════════════════ */}
      <section className="max-w-7xl mx-auto px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── LEFT: form ── */}
          <motion.div
            variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  className="bg-white rounded-[3.5rem] p-16 shadow-[0_64px_128px_-32px_rgba(53,51,54,0.1)] border border-[#F5CB73]/5 text-center flex flex-col items-center gap-8"
                >
                  <div className="w-24 h-24 bg-[#FEF0FD] rounded-[2rem] flex items-center justify-center shadow-xl">
                    <CheckCircle2 className="w-10 h-10 text-[#F5CB73]" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-4xl font-black text-[#353336] mb-4 tracking-tighter">Message Sent!</h3>
                    <p className="text-[#434144] text-lg leading-relaxed max-w-md font-medium">
                      Thank you, <strong>{form.name || "friend"}</strong>! We'll get back to you within 24 hours. Our art takes time, but our service is swift. 🧁
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name:"", email:"", subject:"", message:"" }); }}
                      className="px-10 py-4 rounded-2xl border-2 border-[#F5CB73]/20 text-[#353336] text-xs font-black uppercase tracking-widest hover:bg-[#FEF0FD] transition-all duration-500"
                    >
                      Send Another
                    </button>
                    <Link to="/menu" className="px-10 py-4 rounded-2xl bg-[#F5CB73] text-[#353336] text-xs font-black uppercase tracking-widest hover:bg-[#353336] hover:text-[#F5CB73] transition-all duration-500 no-underline shadow-xl shadow-[#F5CB73]/20">
                      Browse Menu
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <form
                  key="form"
                  onSubmit={handleSubmit}
                  className="bg-white rounded-[3.5rem] p-12 md:p-16 shadow-[0_64px_128px_-32px_rgba(53,51,54,0.1)] border border-[#F5CB73]/5 flex flex-col gap-10"
                >
                  <div>
                    <h2 className="font-playfair text-4xl font-black text-[#353336] mb-3 tracking-tighter">Send Us a Message</h2>
                    <p className="text-[#434144] text-lg font-medium opacity-60">We read every message and reply within 24 hours.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3 group">
                      <label htmlFor="cf-name" className="text-[0.6rem] font-black text-[#353336] ml-2 tracking-[0.3em] uppercase group-focus-within:text-[#F5CB73] transition-colors">
                        Your Name
                      </label>
                      <input
                        id="cf-name" type="text" placeholder="Jane Doe" required
                        value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full bg-[#FEF0FD]/40 border-2 border-transparent rounded-2xl px-6 py-4 text-[#353336] text-sm font-black outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:shadow-[0_0_24px_rgba(245,203,115,0.1)] transition-all placeholder:text-[#353336]/20"
                      />
                    </div>
                    <div className="flex flex-col gap-3 group">
                      <label htmlFor="cf-email" className="text-[0.6rem] font-black text-[#353336] ml-2 tracking-[0.3em] uppercase group-focus-within:text-[#F5CB73] transition-colors">
                        Email Address
                      </label>
                      <input
                        id="cf-email" type="email" placeholder="jane@example.com" required
                        value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full bg-[#FEF0FD]/40 border-2 border-transparent rounded-2xl px-6 py-4 text-[#353336] text-sm font-black outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:shadow-[0_0_24px_rgba(245,203,115,0.1)] transition-all placeholder:text-[#353336]/20"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 group">
                    <label htmlFor="cf-subject" className="text-[0.6rem] font-black text-[#353336] ml-2 tracking-[0.3em] uppercase group-focus-within:text-[#F5CB73] transition-colors">
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        id="cf-subject"
                        value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                        className="w-full bg-[#FEF0FD]/40 border-2 border-transparent rounded-2xl px-6 py-4 text-[#353336] text-sm font-black outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:shadow-[0_0_24px_rgba(245,203,115,0.1)] transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select a topic…</option>
                        <option value="order">Custom Collection Inquiry</option>
                        <option value="catering">Royalty Event Catering</option>
                        <option value="delivery">Logistics & Delivery</option>
                        <option value="feedback">Studio Feedback</option>
                        <option value="other">General Enquiry</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#353336]/40 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 group">
                    <label htmlFor="cf-message" className="text-[0.6rem] font-black text-[#353336] ml-2 tracking-[0.3em] uppercase group-focus-within:text-[#F5CB73] transition-colors">
                      Message
                    </label>
                    <textarea
                      id="cf-message" rows={5} placeholder="Tell us about your project or enquiry…" required
                      value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full bg-[#FEF0FD]/40 border-2 border-transparent rounded-3xl px-6 py-5 text-[#353336] text-sm font-black outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:shadow-[0_0_24px_rgba(245,203,115,0.1)] transition-all resize-none placeholder:text-[#353336]/20 min-h-[160px]"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}
                    className="group relative w-full bg-[#353336] hover:bg-[#F5CB73] text-white hover:text-[#353336] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] cursor-pointer overflow-hidden transition-all duration-500 shadow-2xl shadow-[#353336]/20"
                  >
                    <span className="relative flex items-center justify-center gap-4">
                      Direct Message
                      <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                    </span>
                  </motion.button>

                  <p className="text-center text-[0.6rem] font-black tracking-widest text-[#434144] opacity-30 uppercase">
                    🔒 Secure Transmission • No Spam Policy
                  </p>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: sidebar ── */}
          <motion.div
            variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col gap-10"
          >
            {/* Quick Links */}
            <div className="bg-white rounded-[3rem] p-10 shadow-[0_32px_64px_-16px_rgba(53,51,54,0.06)] border border-[#F5CB73]/5">
              <h3 className="font-playfair text-2xl font-black text-[#353336] mb-8 tracking-tighter">Studio Links</h3>
              <div className="flex flex-col gap-4">
                {quickLinks.map(l => (
                  <Link
                    key={l.to} to={l.to}
                    className="flex items-center gap-5 p-5 rounded-2xl hover:bg-[#FEF0FD] transition-all duration-500 group no-underline border border-transparent hover:border-[#F5CB73]/10"
                  >
                    <div className="w-12 h-12 bg-[#353336] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#F5CB73] transition-all duration-500 shadow-lg shadow-[#353336]/10">
                      <l.icon size={20} className="text-[#F5CB73] group-hover:text-[#353336] transition-colors" />
                    </div>
                    <span className="text-[#353336] text-sm font-black uppercase tracking-widest group-hover:text-[#F5CB73] transition-all">{l.label}</span>
                    <ChevronDown size={18} className="ml-auto -rotate-90 text-[#353336]/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-[#353336] rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
              <div aria-hidden className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white opacity-5 transition-all duration-700 group-hover:scale-150" />
              <div aria-hidden className="absolute -bottom-12 -left-8 w-44 h-44 rounded-full bg-white opacity-5 transition-all duration-700 group-hover:scale-150" />
              <h3 className="font-playfair text-3xl font-black text-white mb-3 relative z-10 tracking-tighter">Follow The Process</h3>
              <p className="text-white/40 text-[0.7rem] font-black uppercase tracking-widest mb-10 relative z-10">Daily bakes, studio secrets & limited editions</p>
              <div className="flex gap-4 relative z-10">
                {[
                  { icon: Instagram, label: "@hangarys.sweet", color: "hover:bg-[#F5CB73]" },
                  { icon: Facebook,  label: "Hangary Sweet",  color: "hover:bg-[#F5CB73]" },
                  { icon: Twitter,   label: "@hangarysweet", color: "hover:bg-[#F5CB73]" },
                ].map(s => (
                  <button key={s.label} className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white ${s.color} hover:text-[#353336] transition-all duration-500 hover:scale-110 shadow-xl`}>
                    <s.icon size={24} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="bg-[#FEF0FD] rounded-[3rem] p-10 border-2 border-[#F5CB73]/10 relative overflow-hidden group">
              <Quote size={60} className="text-[#F5CB73]/10 absolute top-8 right-8 transition-all duration-700 group-hover:rotate-12 group-hover:scale-125" />
              <MessageSquare size={24} className="text-[#F5CB73] mb-6 relative z-10" />
              <p className="font-playfair italic text-[#353336] text-2xl font-black leading-relaxed relative z-10 tracking-tight">
                Life is uncertain. Eat dessert first.
              </p>
              <p className="text-[#434144] text-[0.6rem] mt-6 font-black uppercase tracking-[0.4em] relative z-10 opacity-30">The Hangary Sweet Collective 🍰</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ MAP ══════════════════ */}
      <section className="max-w-7xl mx-auto px-10 pb-12">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="bg-white rounded-[4rem] overflow-hidden shadow-[0_64px_128px_-32px_rgba(53,51,54,0.12)] border border-[#F5CB73]/10"
        >
          <div className="p-10 border-b border-[#F5CB73]/5 flex items-center justify-between flex-wrap gap-6 bg-white relative z-10">
            <div>
              <h3 className="font-playfair text-3xl font-black text-[#353336] tracking-tighter">Locate The Studio</h3>
              <p className="text-[#434144] text-sm mt-2 flex items-center gap-3 font-medium opacity-60">
                <MapPin size={16} className="text-[#F5CB73]" /> 12 Baker Street, Old Town District, SW1 4AB
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank" rel="noreferrer"
              className="px-8 py-4 rounded-2xl bg-[#353336] text-white text-xs font-black uppercase tracking-widest hover:bg-[#F5CB73] hover:text-[#353336] transition-all duration-500 no-underline flex items-center gap-4 shadow-xl"
            >
              <MapPin size={16} /> Get Directions
            </a>
          </div>
          {/* Embedded map placeholder */}
          <div className="relative h-[400px] bg-[#353336] flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F5CB73_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
              <div className="w-20 h-20 bg-[#F5CB73] rounded-3xl flex items-center justify-center shadow-2xl animate-bob">
                <MapPin size={32} className="text-[#353336]" />
              </div>
              <div>
                <p className="font-playfair font-black text-white text-3xl tracking-tighter mb-2">12 Baker Street</p>
                <p className="text-white/40 text-[0.65rem] font-black uppercase tracking-[0.4em]">Old Town District, SW1 4AB</p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank" rel="noreferrer"
                className="mt-4 px-10 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[0.6rem] font-black tracking-[0.4em] hover:bg-white hover:text-[#353336] transition-all duration-500 uppercase"
              >
                Open in Global Maps
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════ FAQ ══════════════════ */}
      <section className="max-w-7xl mx-auto px-10 py-32">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#F5CB73]"></span>
              <p className="text-[0.7rem] font-black tracking-[0.4em] uppercase text-[#F5CB73]">Queries & Curiosities</p>
              <span className="w-12 h-[1px] bg-[#F5CB73]"></span>
          </div>
          <h2 className="font-playfair text-5xl md:text-7xl font-black text-[#353336] tracking-tighter">Common Questions</h2>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="flex flex-col gap-6 max-w-4xl mx-auto"
        >
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              variants={itemV}
              className="bg-white rounded-[2rem] border border-[#F5CB73]/5 shadow-[0_32px_64px_-16px_rgba(53,51,54,0.06)] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-8 px-10 py-8 text-left group transition-all duration-500"
              >
                <span className="font-playfair font-black text-[#353336] text-xl tracking-tight group-hover:text-[#F5CB73] transition-colors">{f.q}</span>
                <ChevronDown
                  size={24}
                  className={`text-[#F5CB73] shrink-0 transition-transform duration-500 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="px-10 pb-10 text-[#434144] text-lg leading-relaxed font-medium opacity-60 ml-[4px] border-l-2 border-[#F5CB73]/20">{f.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════ CTA BAND ══════════════════ */}
      <section className="bg-[#353336] py-32 px-10 text-center relative overflow-hidden">
        <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playfair font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none uppercase" style={{ fontSize: "clamp(4rem,22vw,22rem)" }}>Bake</div>
        <div className="relative z-10 max-w-3xl mx-auto">
           <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-16 h-[1px] bg-[#F5CB73]/50"></span>
              <p className="text-[0.8rem] font-black tracking-[0.4em] uppercase text-[#F5CB73]">The Next Chapter</p>
              <span className="w-16 h-[1px] bg-[#F5CB73]/50"></span>
          </div>
          <h2 className="font-playfair text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter">Something Sweet<br /><span className="text-[#F5CB73] italic">Awaits You</span></h2>
          <p className="text-white/50 text-xl leading-relaxed mb-16 max-w-2xl mx-auto font-medium">
            Browse our full menu or design your dream cake — we bake it fresh, just for you.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }}>
              <Link to="/menu" className="inline-flex items-center gap-4 bg-[#F5CB73] hover:bg-white text-[#353336] font-black px-12 py-5 rounded-2xl shadow-2xl transition-all duration-500 text-xs tracking-[0.3em] uppercase no-underline">
                Explore Menu
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }}>
              <Link to="/customize-order" className="inline-flex items-center gap-4 bg-white/5 border-2 border-white/10 hover:border-white/20 text-white font-black px-12 py-5 rounded-2xl transition-all duration-500 text-xs tracking-[0.3em] uppercase no-underline backdrop-blur-xl">
                Custom Creator
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
