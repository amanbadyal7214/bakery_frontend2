import { useProductActions } from "./home-data";
import { motion } from "framer-motion";

export default function AboutSection() {
  const { scrollTo } = useProductActions();

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-20 items-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative group"
      >
        <div className="absolute -inset-4 bg-[#F5CB73]/5 rounded-[2rem] blur-2xl group-hover:bg-[#F5CB73]/10 transition-all duration-700" />
        <img src="/about-baker.png" alt="Our baker at work"
          className="relative w-full h-[600px] object-cover rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(53,51,54,0.15)] grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
        
        <motion.div 
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
          className="absolute -bottom-8 -right-8 w-36 h-36 bg-[#F5CB73] text-[#353336] rounded-full flex flex-col items-center justify-center shadow-[0_20px_40px_-8px_rgba(245,203,115,0.4)] text-center border-8 border-[#FEF0FD] z-10"
        >
          <span className="font-playfair text-4xl font-black leading-none tracking-tighter">40</span>
          <span className="text-[0.7rem] font-black leading-tight mt-1 uppercase tracking-widest">Years of<br />Passion</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-start"
      >
        <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-[#F5CB73]"></span>
            <p className="text-[0.8rem] font-black tracking-[0.3em] uppercase text-[#F5CB73]">Our Heritage</p>
        </div>
        
        <h2 className="font-playfair text-5xl md:text-6xl font-black text-[#353336] mb-8 leading-[1.1] tracking-tight">
          Baked with Heart,<br />
          <span className="text-[#F5CB73] italic">Served with Soul</span>
        </h2>
        
        <div className="space-y-6 mb-12">
            <p className="text-[#434144] text-lg leading-relaxed font-medium">
              What started as a tiny kitchen experiment in 1984 has grown into a beloved neighbourhood institution. We believe great baking is a conversation between tradition and creativity.
            </p>
            <p className="text-[#686669] leading-relaxed">
              Every loaf, pastry and cake that leaves our ovens carries the care of our entire team. We never compromise on quality, and we never will. We source only the finest organic ingredients locally.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 w-full">
          {["Locally sourced flour & dairy", "No artificial flavours", "Hand-shaped doughs", "Family recipes"].map((i, index) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + (index * 0.1) }}
              className="flex gap-3 items-center p-4 rounded-2xl bg-white shadow-sm border border-[#F5CB73]/5 hover:border-[#F5CB73]/20 transition-all duration-300"
            >
              <div className="w-6 h-6 rounded-full bg-[#F5CB73]/10 flex items-center justify-center text-[#F5CB73] text-xs font-bold">✓</div>
              <span className="text-[0.9rem] font-bold text-[#434144] tracking-tight">{i}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => scrollTo("Contact")}
          className="group relative bg-[#353336] text-[#F5CB73] px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] cursor-pointer shadow-2xl shadow-[#353336]/20 overflow-hidden transition-all duration-300"
        >
          <span className="relative z-10">Get in Touch</span>
          <div className="absolute inset-0 bg-[#F5CB73] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="absolute inset-0 z-20 flex items-center justify-center text-[#353336] opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-black">Get in Touch</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
