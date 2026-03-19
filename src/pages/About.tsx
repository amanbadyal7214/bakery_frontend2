import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/home/FooterSection";
import CartSheet from "@/components/CartSheet";
import { Link } from "react-router-dom";
import {
  Award, Heart, Leaf, Clock, Users, Star, ChefHat, MapPin,
  Phone, ArrowRight, CheckCircle2, Flame, Wheat, Quote,
  Instagram, Twitter, Facebook, Moon, Thermometer, BadgeCheck, DoorOpen,
  Home, Store, Croissant, Trophy, Cake, Smartphone, Tv, Rocket
} from "lucide-react";

/* ─── Framer variants ─── */
const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};
const slideRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

/* ─── Data ─── */
const stats = [
  { value: "40+",  label: "Years of Passion",  icon: "⏳" },
  { value: "120+", label: "Unique Recipes",     icon: "📖" },
  { value: "50K+", label: "Happy Customers",    icon: "❤️" },
  { value: "4.9★", label: "Average Rating",     icon: "⭐" },
];

const values = [
  {
    icon: <Leaf size={26} />,
    title: "100% Natural Ingredients",
    desc: "We source only the finest organic flour, dairy, and seasonal produce from local farms within 50km. No artificial colours, flavours, or preservatives — ever.",
  },
  {
    icon: <Flame size={26} />,
    title: "Freshly Baked Every Morning",
    desc: "Our bakers arrive at 3:00 AM every single day. By the time you walk in, everything is fresh out of the oven — still warm, still perfect.",
  },
  {
    icon: <Heart size={26} />,
    title: "Made with Love",
    desc: "Every croissant is hand-laminated, every cake is hand-decorated. We believe the care put into making something is what makes it truly special.",
  },
  {
    icon: <Wheat size={26} />,
    title: "Traditional Techniques",
    desc: "We use slow fermentation, stone-milled heritage grains, and time-honoured recipes passed through four generations of our family.",
  },
  {
    icon: <Users size={26} />,
    title: "Community First",
    desc: "We donate unsold goods to local shelters every evening, and hire locally — 95% of our team lives within 5 minutes of the bakery.",
  },
  {
    icon: <Award size={26} />,
    title: "Award-Winning Quality",
    desc: "Named 'Best Artisan Bakery' by City Food Awards 5 years running. Our sourdough has been featured in national magazines and food shows.",
  },
];

const team = [
  {
    name: "Margaret Howell",
    role: "Founder & Head Baker",
    since: "Est. 1984",
    quote: "Baking is not a job. It is how I say 'I love you' to the world.",
    desc: "Margaret started Hangary Sweet in her home kitchen with nothing but a wooden spoon and a dream. 40 years later, she still personally oversees every sourdough batch.",
    img: "/about-baker.png",
    badge: "Founder",
    badgeBg: "bg-[#353336] text-[#F5CB73]",
  },
  {
    name: "James Howell",
    role: "Master Pastry Chef",
    since: "Since 1998",
    quote: "A perfect croissant is 729 layers of pure patience.",
    desc: "Margaret's son, trained at Le Cordon Bleu Paris. James brought French pastry techniques to Hangary Sweet, creating our legendary croissants and mille-feuilles.",
    img: "/bread.png",
    badge: "Pastry Chef",
    badgeBg: "bg-[#353336] text-[#F5CB73]",
  },
  {
    name: "Priya Sharma",
    role: "Cake Design Director",
    since: "Since 2012",
    quote: "Every cake is a canvas and sugar is my paint.",
    desc: "Priya transforms celebrations into edible art. Her custom cakes have graced weddings, corporate events, and birthdays across the country.",
    img: "/cake.png",
    badge: "Designer",
    badgeBg: "bg-[#353336] text-[#F5CB73]",
  },
  {
    name: "Carlos Rivera",
    role: "Bread Specialist",
    since: "Since 2016",
    quote: "Good bread needs time. Rushing it is the only crime.",
    desc: "Carlos studied traditional breadmaking in Spain and brings authentic techniques to every loaf. His baguettes sell out before 9 AM.",
    img: "/croissant.png",
    badge: "Bread Expert",
    badgeBg: "bg-[#353336] text-[#F5CB73]",
  },
];

const milestones = [
  { year: "1984", event: "Margaret opens Hangary Sweet in her home kitchen.", icon: Home },
  { year: "1992", event: "First brick-and-mortar bakery opens. Queues form daily.", icon: Store },
  { year: "1998", event: "James returns from Paris and introduces pastries.", icon: Croissant },
  { year: "2012", event: "Custom cake studio opens. Priya Sharma joins.", icon: Cake },
  { year: "2018", event: "Online ordering launches nationwide.", icon: Smartphone },
  { year: "2024", event: "Second studio opens; global subscription launches.", icon: Rocket },
];

const testimonials = [
  {
    name: "Sophie Martin", role: "Wedding Client", avatar: "S", stars: 5,
    text: "Hangary Sweet made our wedding cake and it was absolutely perfect. Our guests still talk about it!",
  },
  {
    name: "David Okafor", role: "Regular Tribe", avatar: "D", stars: 5,
    text: "I've been coming here for 8 years. The sourdough is incomparable. This place is a genuine treasure.",
  },
  {
    name: "Aisha Rahman", role: "Art Critic", avatar: "A", stars: 5,
    text: "As someone who has reviewed hundreds of studios, Hangary Sweet is in a league of its own.",
  },
];

/* ─── Parallax image helper ─── */
function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ y }} className="w-full h-full object-cover scale-125" />
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-[#FEF0FD]/30 font-inter text-[#353336] overflow-x-hidden selection:bg-[#F5CB73] selection:text-[#353336]">
      <Navbar />
      <CartSheet />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxImage src="/hero-bg.png" alt="Bakery background" className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#353336]/90 via-[#434144]/70 to-[#353336]/95" />
        </div>
        <div className="absolute top-[15%] left-[8%] w-64 h-64 bg-[#F5CB73]/10 rounded-full blur-[120px] z-0" />
        <div className="absolute bottom-[10%] right-[12%] w-80 h-80 bg-[#FEF0FD]/10 rounded-full blur-[140px] z-0" />

        <motion.img src="/croissant.png" alt=""
          initial={{ opacity: 0, x: -80, rotate: -15 }} animate={{ opacity: 0.12, x: 0, rotate: -12 }}
          transition={{ duration: 1.8 }}
          className="absolute left-[3%] top-[22%] w-44 hidden lg:block z-0 drop-shadow-2xl pointer-events-none grayscale-[0.3]"
        />
        <motion.img src="/cake.png" alt=""
          initial={{ opacity: 0, x: 80, rotate: 10 }} animate={{ opacity: 0.12, x: 0, rotate: 8 }}
          transition={{ duration: 1.8, delay: 0.2 }}
          className="absolute right-[3%] bottom-[22%] w-48 hidden lg:block z-0 drop-shadow-2xl pointer-events-none grayscale-[0.3]"
        />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-32 pb-24">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[0.6rem] font-black tracking-[0.4em] uppercase px-8 py-3 rounded-full mb-10 shadow-2xl"
          >
            <span className="w-1.5 h-1.5 bg-[#F5CB73] rounded-full animate-pulse shadow-[0_0_12px_#F5CB73]" />
            Legacy Studio · Est. 1984
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="font-playfair text-6xl md:text-8xl lg:text-[7.5rem] font-black text-white leading-[0.9] tracking-tighter mb-12"
          >
            Baked with<br />
            <span className="text-[#F5CB73]">Heart</span>
            <span className="text-white">, Served</span><br />
            <span className="text-[#F5CB73] italic font-light drop-shadow-sm">with Soul.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}
            className="text-white/60 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium mb-16"
          >
            For over 40 years, Hangary Sweet has been the heartbeat of this community —
            one loaf, one croissant, one celebration cake at a time.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/menu"
              className="group bg-[#F5CB73] hover:bg-white text-[#353336] px-12 py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105 shadow-[0_24px_48px_-12px_rgba(245,203,115,0.3)] flex items-center justify-center gap-4 no-underline"
            >
              Explore Collection
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <a href="#story"
              className="bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center gap-4 no-underline"
            >
              Read Our Legacy
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div variants={stagger} initial="hidden" animate="show" transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-32"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp}
                className="bg-[#353336]/30 backdrop-blur-2xl border border-white/5 rounded-3xl py-10 px-6 hover:bg-[#353336]/50 transition-all duration-500 cursor-default group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-700 grayscale-[0.2] group-hover:grayscale-0">{s.icon}</div>
                <div className="font-playfair text-4xl md:text-5xl font-black text-[#F5CB73] leading-none tracking-tighter mb-2">{s.value}</div>
                <div className="text-white/30 text-[0.6rem] font-black tracking-[0.3em] uppercase">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 text-white/20"
        >
          <span className="text-[0.6rem] tracking-[0.5em] uppercase font-black">Scroll</span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-white/20 via-white/10 to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* ══ ORIGIN STORY ══ */}
      <section id="story" className="py-40 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FEF0FD]/50 rounded-full blur-[150px] -z-10" />
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative">
              <div className="relative rounded-[3rem] overflow-hidden shadow-[0_64px_128px_-32px_rgba(53,51,54,0.15)] aspect-[4/5] bg-[#353336]">
                <img src="/about-baker.png" alt="Margaret Howell" className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#353336] via-[#353336]/40 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                  <p className="text-white font-playfair text-4xl font-black tracking-tighter">Margaret Howell</p>
                  <p className="text-[#F5CB73] text-[0.65rem] tracking-[0.3em] uppercase font-black mt-2">Founder, since 1984</p>
                </div>
              </div>
              
              <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -10 }} whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
                viewport={{ once: true }} transition={{ duration: 1, delay: 0.4, ease: EASE }}
                className="absolute -top-12 -left-12 bg-[#353336] rounded-[2.5rem] px-12 py-10 shadow-2xl border border-white/5"
              >
                <div className="font-playfair text-6xl font-black text-[#F5CB73] tracking-tighter">40+</div>
                <div className="text-white/40 text-[0.65rem] font-black tracking-[0.3em] uppercase mt-3">Years of Craft</div>
              </motion.div>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-4 mb-8">
                    <span className="w-16 h-[1px] bg-[#F5CB73]"></span>
                    <p className="text-[0.75rem] font-black tracking-[0.4em] uppercase text-[#F5CB73]">How It All Began</p>
                </div>
                <h2 className="font-playfair text-6xl md:text-7xl font-black text-[#353336] leading-[1] mb-12 tracking-tighter">
                  A Kitchen,<br />A Dream, &<br />
                  <span className="text-[#F5CB73] italic">A Wooden Spoon.</span>
                </h2>
              </motion.div>
              <motion.p variants={fadeUp} className="text-[#434144] leading-relaxed mb-8 text-xl font-medium">
                In 1984, Margaret Howell started baking bread in her tiny kitchen. She had no commercial equipment — just a passion for honest food and a wooden spoon.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[#434144] leading-relaxed mb-12 text-lg font-medium opacity-70">
                Word spread fast. Neighbors knocked on her door at 7 AM. Within a year, Margaret opened the first proper Hangary Sweet location. The queue stretched around the block.
              </motion.p>
              
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-8 mb-16">
                {["Fine Local Grains", "100% Organic Dairy", "Slow Fermented", "Award Winning"].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-[#353336] text-[0.7rem] font-black uppercase tracking-[0.2rem]">
                    <div className="w-10 h-10 bg-[#F5CB73]/10 rounded-2xl flex items-center justify-center shrink-0">
                      <CheckCircle2 size={18} className="text-[#F5CB73]" />
                    </div>
                    {item}
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp}>
                <blockquote className="bg-[#FEF0FD] rounded-[3rem] p-12 border border-[#F5CB73]/10 relative shadow-xl shadow-[#353336]/5">
                  <Quote size={50} className="text-[#F5CB73]/10 absolute top-10 right-10" />
                  <p className="italic text-[#434144] text-2xl leading-relaxed font-black mb-8">
                    "I just wanted to feed people food that was honest and made with love."
                  </p>
                  <footer className="text-[#353336] text-[0.75rem] font-black uppercase tracking-[0.4em]">
                    — Margaret Howell, <span className="text-[#F5CB73]">Founder</span>
                  </footer>
                </blockquote>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ OUR VALUES ══ */}
      <section className="py-40 bg-[#FEF0FD] relative">
         <div className="max-w-7xl mx-auto px-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-28">
            <div className="flex items-center justify-center gap-4 mb-8">
                <span className="w-16 h-[1px] bg-[#F5CB73]"></span>
                <p className="text-[0.8rem] font-black tracking-[0.5em] uppercase text-[#F5CB73]">What We Stand For</p>
                <span className="w-16 h-[1px] bg-[#F5CB73]"></span>
            </div>
            <h2 className="font-playfair text-6xl md:text-8xl font-black text-[#353336] mb-8 tracking-tighter">Our Core Identity</h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUp}
                className="bg-white rounded-[3rem] p-16 shadow-[0_64px_128px_-32px_rgba(53,51,54,0.08)] border border-[#F5CB73]/10 hover:shadow-[0_80px_160px_-40px_rgba(53,51,54,0.15)] transition-all duration-700 hover:-translate-y-5 group"
              >
                <div className="w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-110 shadow-2xl bg-[#353336] text-[#F5CB73]" >
                  {v.icon}
                </div>
                <h3 className="font-playfair text-3xl font-black mb-6 text-[#353336] tracking-tight">{v.title}</h3>
                <p className="text-lg leading-relaxed text-[#434144] font-medium opacity-60">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-32">
             <div className="flex items-center justify-center gap-4 mb-8">
                <span className="w-16 h-[1px] bg-[#F5CB73]"></span>
                <p className="text-[0.8rem] font-black tracking-[0.5em] uppercase text-[#F5CB73]">The Artisans</p>
                <span className="w-16 h-[1px] bg-[#F5CB73]"></span>
            </div>
            <h2 className="font-playfair text-6xl md:text-8xl font-black text-[#353336] tracking-tighter">Master Crafters</h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {team.map((member) => (
              <motion.div key={member.name} variants={fadeUp}
                className="group bg-[#FEF0FD]/50 rounded-[3.5rem] overflow-hidden border border-[#F5CB73]/10 hover:bg-white hover:shadow-[0_64px_128px_-32px_rgba(53,51,54,0.1)] transition-all duration-700 hover:-translate-y-6"
              >
                <div className="relative h-80 overflow-hidden bg-[#353336]">
                  <img src={member.img} alt={member.name}
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#353336] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
                  <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-5 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    {[Instagram, Twitter, Facebook].map((Icon, j) => (
                      <a key={j} href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#353336] hover:bg-[#F5CB73] transition-all duration-500 shadow-xl">
                        <Icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-12">
                  <span className="inline-block text-[0.65rem] font-black px-5 py-2 rounded-2xl bg-[#353336] text-[#F5CB73] mb-6 uppercase tracking-[0.3em] shadow-lg shadow-[#353336]/20">
                    {member.badge}
                  </span>
                  <h3 className="font-playfair text-3xl font-black text-[#353336] leading-none mb-3 tracking-tighter">{member.name}</h3>
                  <p className="text-[0.7rem] font-black tracking-[0.3em] text-[#F5CB73] uppercase mb-10">{member.role}</p>
                  <p className="text-base text-[#434144] leading-relaxed font-semibold opacity-60 mb-10">{member.desc}</p>
                  <div className="pt-8 border-t border-[#F5CB73]/20 flex items-center justify-between">
                    <span className="text-[0.65rem] text-[#353336] font-black uppercase tracking-[0.2em] opacity-30">{member.since}</span>
                    <ChefHat size={22} className="text-[#F5CB73] opacity-60" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section className="py-40 bg-[#FEF0FD]/30 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-10 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-36">
             <div className="flex items-center justify-center gap-4 mb-8">
                <span className="w-16 h-[1px] bg-[#F5CB73]"></span>
                <p className="text-[0.8rem] font-black tracking-[0.6em] uppercase text-[#F5CB73]">The Time Machine</p>
                <span className="w-16 h-[1px] bg-[#F5CB73]"></span>
            </div>
            <h2 className="font-playfair text-7xl md:text-9xl font-black text-[#353336] tracking-tighter opacity-[0.05] absolute top-10 left-0 right-0 select-none pointer-events-none uppercase">Evolution</h2>
            <h2 className="font-playfair text-6xl md:text-8xl font-black text-[#353336] tracking-tighter">The Legacy</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#F5CB73]/40 to-transparent hidden lg:block" />

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-16"
            >
              {milestones.map((m, i) => (
                <motion.div key={m.year} variants={fadeUp}
                  className={`flex gap-12 items-start group ${i % 2 === 0 ? "lg:flex-row lg:pr-12" : "lg:flex-row-reverse lg:pl-12 lg:mt-32"}`}
                >
                  <div className="shrink-0">
                    <div className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-1000 bg-[#353336] text-[#F5CB73] ring-8 ring-[#FEF0FD]">
                      <m.icon size={40} strokeWidth={2.5} />
                    </div>
                  </div>

                  <div className="flex-1 bg-white rounded-[3.5rem] p-16 shadow-[0_32px_64px_-16px_rgba(53,51,54,0.06)] hover:shadow-[0_80px_160px_-40px_rgba(53,51,54,0.15)] transition-all duration-700 hover:-translate-y-4 border border-[#F5CB73]/5 group-hover:border-[#F5CB73]/30">
                    <div className={`flex items-center gap-6 mb-8 ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                      <span className="font-playfair text-6xl font-black text-[#F5CB73] tracking-tighter leading-none">{m.year}</span>
                      <span className="h-[3px] flex-1 bg-gradient-to-r from-[#F5CB73]/30 to-transparent rounded-full" />
                    </div>
                    <p className="text-xl text-[#353336] leading-relaxed font-bold opacity-70">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative py-56 bg-[#353336] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover scale-110" />
        </div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="relative z-10 max-w-6xl mx-auto px-10 text-center"
        >
          <div className="flex items-center justify-center gap-6 mb-12">
              <span className="w-20 h-[1px] bg-[#F5CB73]/40"></span>
              <p className="text-[0.9rem] font-black tracking-[0.8em] uppercase text-[#F5CB73]">Final Call</p>
              <span className="w-20 h-[1px] bg-[#F5CB73]/40"></span>
          </div>
          <h2 className="font-playfair text-7xl md:text-9xl font-black text-white leading-[0.9] mb-16 tracking-tighter">
            Ready to <br />
            <span className="text-[#F5CB73] italic">Experience?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-10 justify-center">
            <Link to="/menu"
              className="group bg-[#F5CB73] hover:bg-white text-[#353336] px-16 py-8 rounded-[2.5rem] font-black text-sm tracking-[0.4em] uppercase transition-all duration-700 hover:scale-105 shadow-[0_48px_96px_-24px_rgba(245,203,115,0.4)] flex items-center justify-center gap-6 no-underline"
            >
              Collection
              <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform duration-500" />
            </Link>
          </div>
        </motion.div>
      </section>

      <FooterSection />
    </div>
  );
}
