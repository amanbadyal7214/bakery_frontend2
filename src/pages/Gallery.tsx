import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/home/FooterSection";
import { X, ChevronLeft, ChevronRight, ArrowRight, Star } from "lucide-react";
import cakeJpg      from "../assets/cake.jpg";
import chocolateJpg from "../assets/choclate.jpg";
import pastryJpg    from "../assets/pastery.jpg";
import doJpg        from "../assets/DO.jpg";
import GEpng        from "../assets/GE.png";
import { api } from "@/services/api";

/* ─────────────────── types ─────────────────── */
interface GalleryItem {
  id: number | string;
  _id?: string;
  imgBase64?: string;
  src?: string;
  alt?: string;
  category?: string;
  title?: string;
  desc?: string;
  badge?: string;
  price?: string;
}

/* ─────────────────── data ──────────────────── */
const galleryItems: GalleryItem[] = [
  { id: 1,  src: "/cake.png",        alt: "Strawberry Dream Cake",  category: "Cakes",              title: "Strawberry Dream Cake",    desc: "Handcrafted with fresh strawberries & Belgian cream",        badge: "Bestseller", price: "$28" },
  { id: 2,  src: "/croissant.png",   alt: "Butter Croissants",      category: "Pastries",           title: "Golden Butter Croissants", desc: "72 flaky layers of pure French butter perfection",           badge: "Fresh",      price: "$3.50" },
  { id: 3,  src: "/bread.png",       alt: "Rustic Sourdough",       category: "Breads",             title: "Rustic Sourdough Loaf",    desc: "72-hour cold-fermented artisan sourdough",                  badge: "Artisan",    price: "$9" },
  { id: 4,  src: cakeJpg,            alt: "Blueberry Muffin",       category: "Muffins",            title: "Blueberry Morning Muffin", desc: "Bursting with wild blueberries, baked fresh daily",         badge: "New",        price: "$3" },
  { id: 5,  src: "/hero-bg.png",     alt: "Bakery Kitchen",         category: "Behind the Scenes",  title: "Our Craft Kitchen",        desc: "Where every morning magic begins at 3 AM",                               },
  { id: 6,  src: chocolateJpg,       alt: "Choco Chip Cookies",     category: "Cookies",            title: "Choco Chip Cookies",       desc: "Crispy edges, gooey warm centre — always irresistible",     badge: "Classic",    price: "$2.50" },
  { id: 7,  src: pastryJpg,          alt: "Cinnamon Swirl",         category: "Pastries",           title: "Cinnamon Swirl Roll",      desc: "Rolled in brown sugar, glazed with cream cheese drizzle",   badge: "Hot",        price: "$4" },
  { id: 8,  src: doJpg,              alt: "NY Cheesecake",          category: "Cakes",              title: "New York Cheesecake",      desc: "Velvety smooth, baked slow on a buttery graham crust",      badge: "Creamy",     price: "$5" },
  { id: 9,  src: "/about-baker.png", alt: "Baker at work",          category: "Behind the Scenes",  title: "Artisan at Work",          desc: "Passion dusted in flour — our baker every sunrise",                      },
  { id: 10, src: GEpng,              alt: "Chef's Special Pastry",  category: "Pastries",           title: "Chef's Seasonal Special",  desc: "A limited creation with seasonal fruits & florals",         badge: "Limited",    price: "$6" },
  { id: 11, src: "/cake.png",        alt: "Custom Birthday Cake",   category: "Cakes",              title: "Custom Birthday Cake",     desc: "Personalised cakes designed just the way you dream",        badge: "Custom",     price: "$35" },
  { id: 12, src: "/croissant.png",   alt: "Almond Croissant",       category: "Pastries",           title: "Almond Croissant",         desc: "Twice-baked with almond cream & toasted flake topping",     badge: "Popular",    price: "$4.50" },
];

/* ─────────────────── framer variants ──────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const cardV = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.07 },
  }),
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

/* ═══════════════════════════════════════════════════════ */
export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox,     setLightbox]     = useState<number | string | null>(null);
  const [items, setItems] = useState<GalleryItem[]>(galleryItems);
  const objectUrlsRef = useRef<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetchItems = async () => {
      try {
        const res = await api.gallery.getAll() as any;
        const data = Array.isArray(res) ? res : (res && (res.data || res)) || [];
        objectUrlsRef.current.forEach(u => { try { URL.revokeObjectURL(u); } catch (e) {} });
        objectUrlsRef.current = [];
        const normalized = (data as unknown[]).map(itRaw => {
          const it = itRaw as Record<string, unknown>;
          const id = (it._id as string) || (it.id as string) || Math.random().toString();
          const imgBase64 = it.imgBase64 as unknown;
          const srcVal = it.src as unknown;
          let src: string | undefined;
          if (typeof imgBase64 === 'string' && imgBase64.trim()) {
            src = imgBase64;
            if (!src.startsWith('data:')) src = `data:image/png;base64,${src}`;
          } else if (typeof srcVal === 'string') {
            src = srcVal;
            if (!src.startsWith('data:') && !src.startsWith('/') && !src.startsWith('http')) {
              src = `data:image/png;base64,${src}`;
            }
          }
          return { id, _id: it._id as string | undefined, imgBase64: typeof imgBase64 === 'string' ? imgBase64 : undefined, src, alt: it.alt as string | undefined, category: it.category as string | undefined, title: it.title as string | undefined, desc: it.desc as string | undefined, badge: it.badge as string | undefined, price: it.price as string | undefined } as GalleryItem;
        });
        if (mounted) setItems(normalized.length ? normalized : galleryItems);
      } catch (e) { setItems(galleryItems); }
    };
    fetchItems();
    return () => {
      mounted = false;
      objectUrlsRef.current.forEach(u => { try { URL.revokeObjectURL(u); } catch (e) {} });
    };
  }, []);
  
  const categoryCounts = items.reduce((acc: Record<string, number>, it) => {
    const c = (it.category || 'Misc') as string;
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});

  const availableCategories = ['All', ...Object.keys(categoryCounts).filter(c => categoryCounts[c] > 0)];
  const filtered = activeFilter === "All" ? items : items.filter(i => i.category === activeFilter);
  const lbIdx  = lightbox !== null ? filtered.findIndex(i => i.id === lightbox) : -1;
  const lbItem = lbIdx !== -1 ? filtered[lbIdx] : null;

  const openLb  = useCallback((id: number | string) => setLightbox(id), []);
  const closeLb = useCallback(() => setLightbox(null), []);
  const prevLb  = () => lbIdx > 0 && setLightbox(filtered[lbIdx - 1].id);
  const nextLb  = () => lbIdx < filtered.length - 1 && setLightbox(filtered[lbIdx + 1].id);
  const handleLbKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  prevLb();
    if (e.key === "ArrowRight") nextLb();
    if (e.key === "Escape")     closeLb();
  };

  return (
    <div className="min-h-screen bg-[#FEF0FD]/30 selection:bg-[#F5CB73] selection:text-[#353336]">
      <Navbar />

      <section className="relative bg-transparent pt-40 pb-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -track-tighter -translate-x-1/2 -translate-y-1/2 font-playfair font-black text-[#353336]/[0.03] whitespace-nowrap select-none pointer-events-none uppercase"
          style={{ fontSize: "clamp(6rem,22vw,22rem)" }}
        >
          Gallery
        </div>

        <div aria-hidden className="absolute top-[15%] right-[8%] w-28 h-28 animate-spin-slow hidden lg:block opacity-40">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <defs>
              <path id="gc" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" />
            </defs>
            <text fontSize="10" letterSpacing="4" fill="#353336" className="font-black uppercase">
              <textPath href="#gc">Hangary Sweet • ARTISAN • EST.1984 •</textPath>
            </text>
            <text x="60" y="57" textAnchor="middle" fill="#F5CB73" className="font-playfair font-black" fontSize="12" letterSpacing="2">STUDIO</text>
            <text x="60" y="72" textAnchor="middle" fill="#353336" className="font-playfair font-black" fontSize="8" letterSpacing="2">GALLERY</text>
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative z-10 text-center max-w-3xl mx-auto px-6"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-[#F5CB73]"></span>
              <p className="text-[0.7rem] font-black tracking-[0.4em] uppercase text-[#F5CB73]">Our Visual Story</p>
              <span className="w-12 h-[1px] bg-[#F5CB73]"></span>
          </div>

          <h1 className="font-playfair text-5xl md:text-7xl font-black text-[#353336] mb-8 leading-[1.1] tracking-tight">
            Baked with Love,<br />
            <span className="text-[#F5CB73] italic">Shot with Pride</span>
          </h1>
          <p className="text-[#686669] text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            Every photo is a story of craft, warmth, and the irresistible aromas that fill our kitchen each morning.
          </p>
        </motion.div>

        <span className="absolute w-4 h-4 rounded-full bg-[#F5CB73]/20 top-[20%] left-[10%] hidden md:block" />
        <span className="absolute w-3 h-3 rounded-full bg-[#353336]/10 top-[60%] left-[5%] hidden md:block" />
        <span className="absolute w-3 h-3 rounded-full bg-[#F5CB73]/20 bottom-[20%] right-[15%] hidden md:block" />
      </section>

      <div className="sticky top-[80px] z-30 bg-white/80 backdrop-blur-xl border-y border-[#F5CB73]/10">
        <div className="max-w-[1800px] mx-auto px-10 py-5 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-4">
            {availableCategories.map(cat => {
              const count = cat === 'All' ? items.length : (categoryCounts[cat] || 0);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-8 py-3 rounded-2xl text-[0.65rem] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-3 select-none ${
                    activeFilter === cat
                      ? "bg-[#353336] text-[#F5CB73] shadow-xl shadow-[#353336]/20 transform -translate-y-1"
                      : "bg-white text-[#686669] border border-[#F5CB73]/5 hover:border-[#F5CB73]/30 hover:text-[#353336]"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${activeFilter === cat ? "bg-[#F5CB73]" : "bg-[#686669]/20"}`} />
                  {cat} {count > 0 ? <span className="opacity-40 text-[0.6rem]">({count})</span> : null}
                </button>
              );
            })}
          </div>
          <p className="text-[0.6rem] font-black text-[#686669] uppercase tracking-widest hidden sm:block">
            Found <span className="text-[#353336]">{filtered.length}</span> Masterpiece{filtered.length === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      <main className="max-w-[1800px] mx-auto px-10 py-24">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.article
                key={item.id}
                layout
                custom={idx}
                variants={cardV}
                initial="hidden"
                animate="show"
                exit="exit"
                onClick={() => openLb(item.id)}
                className="group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(53,51,54,0.06)] cursor-pointer transform transition-all duration-700 hover:shadow-[0_48px_80px_-24px_rgba(53,51,54,0.1)] border border-[#F5CB73]/5 hover:border-[#F5CB73]/20"
              >
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#353336] via-[#353336]/40 to-transparent opacity-80" />

                <div className="absolute inset-0 p-10 flex flex-col justify-end text-white z-10">
                  <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="flex justify-between items-end mb-4">
                      <div className="flex flex-col gap-2">
                        {item.badge && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5CB73] text-[#353336] text-[0.6rem] font-black uppercase tracking-wider mb-2">
                            {item.badge}
                          </span>
                        )}
                        <h3 className="font-playfair text-3xl font-black leading-tight tracking-tight group-hover:text-[#F5CB73] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      {item.price && (
                        <span className="bg-white/10 px-4 py-1.5 rounded-xl text-md font-black backdrop-blur-md border border-white/10 text-[#F5CB73]">
                          {item.price}
                        </span>
                      )}
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed mb-6 font-medium line-clamp-2 opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 delay-100">
                      {item.desc}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className="text-[#F5CB73] fill-[#F5CB73]" />
                        ))}
                      </div>
                      <span className="text-white/40 text-[0.6rem] font-black uppercase tracking-widest">{item.category}</span>
                    </div>
                  </div>
                </div>
               </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="py-40 text-center flex flex-col items-center"
          >
            <div className="w-32 h-32 bg-[#F5CB73]/10 rounded-full flex items-center justify-center mb-10 text-6xl opacity-40">🍰</div>
            <p className="font-playfair text-4xl font-black text-[#353336] mb-4">Nothing here yet</p>
            <p className="text-[#686669] text-lg font-medium">Try exploring another category of our studio works.</p>
          </motion.div>
        )}
      </main>

      <section className="bg-[#353336] py-32 px-10 text-center relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -track-tighter -translate-x-1/2 -translate-y-1/2 font-playfair font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none uppercase"
          style={{ fontSize: "clamp(5rem,20vw,20rem)" }}
        >
          Flavor
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-[#F5CB73]/50"></span>
              <p className="text-[0.7rem] font-black tracking-[0.4em] uppercase text-[#F5CB73]">Begin Your Journey</p>
              <span className="w-12 h-[1px] bg-[#F5CB73]/50"></span>
          </div>
          <h2 className="font-playfair text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
            See Something<br />
            <span className="text-[#F5CB73] italic">You Love?</span>
          </h2>
          <p className="text-white/50 text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
            Every item here is available fresh. Walk in, order online, or customise it your way with our experts.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/menu")}
              className="bg-[#F5CB73] text-[#353336] px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#F5CB73]/20 transition-all duration-300 flex items-center gap-4"
            >
              Explore Full Menu <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -4, backgroundColor: "rgba(255,255,255,0.1)" }} whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/customize-order")}
              className="bg-transparent border-2 border-white/20 text-white font-black px-12 py-5 rounded-2xl transition-all duration-300 text-xs uppercase tracking-[0.2em]"
            >
              Custom Creation
            </motion.button>
          </div>
        </div>
      </section>

      <FooterSection />

      <AnimatePresence>
        {lightbox !== null && lbItem && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#353336]/98 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={closeLb}
            onKeyDown={handleLbKey}
            tabIndex={0}
          >
            <motion.div
              key={lbItem.id}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-[0_64px_128px_-32px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row bg-[#434144]"
            >
              <div className="relative flex-1 min-h-[400px] overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lbItem.id}
                    src={lbItem.src} alt={lbItem.alt}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  {lbIdx > 0 && (
                    <button onClick={prevLb} className="pointer-events-auto w-14 h-14 rounded-2xl bg-black/40 hover:bg-[#F5CB73] text-white hover:text-[#353336] flex items-center justify-center transition-all duration-500 backdrop-blur-xl border border-white/10 group">
                      <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                  )}
                  {lbIdx < filtered.length - 1 && (
                    <button onClick={nextLb} className="pointer-events-auto w-14 h-14 rounded-2xl bg-black/40 hover:bg-[#F5CB73] text-white hover:text-[#353336] flex items-center justify-center transition-all duration-500 backdrop-blur-xl border border-white/10 group ml-auto">
                      <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>

              <div className="lg:w-96 p-12 flex flex-col justify-between shrink-0 bg-[#353336]">
                <div>
                  <div className="flex flex-wrap gap-3 mb-10">
                    <span className="text-[0.6rem] font-black tracking-widest uppercase px-4 py-1.5 rounded-lg bg-[#F5CB73]/10 text-[#F5CB73] border border-[#F5CB73]/20">
                      {lbItem.category}
                    </span>
                    {lbItem.badge && (
                      <span className="text-[0.6rem] font-black tracking-widest uppercase px-4 py-1.5 rounded-lg bg-[#F5CB73] text-[#353336]">
                        {lbItem.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-playfair text-4xl font-black text-white mb-4 leading-tight tracking-tight">{lbItem.title}</h3>
                  {lbItem.price && (
                    <p className="text-[#F5CB73] font-black text-2xl mb-6 tracking-tighter">{lbItem.price}</p>
                  )}
                  <p className="text-white/40 text-lg leading-relaxed font-medium mb-10">{lbItem.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-8">
                    {filtered.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setLightbox(filtered[i].id)}
                        className={`transition-all duration-500 ${i === lbIdx ? "w-10 h-1.5 bg-[#F5CB73] rounded-full" : "w-1.5 h-1.5 bg-white/10 hover:bg-white/30 rounded-full"}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-12">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}
                    onClick={() => { closeLb(); navigate("/menu"); }}
                    className="w-full bg-[#F5CB73] text-[#353336] font-black py-5 rounded-2xl text-[0.7rem] uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl shadow-black/20"
                  >
                    Place Your Order <ArrowRight size={16} />
                  </motion.button>
                  <p className="text-center text-white/20 text-[0.6rem] font-black uppercase tracking-[0.4em]">{lbIdx + 1} / {filtered.length}</p>
                </div>
              </div>

              <button
                onClick={closeLb}
                className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-black/40 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-500 backdrop-blur-xl border border-white/10 z-10"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
