import { useProductActions } from "./home-data";
import { motion } from "framer-motion";

export default function CtaBannerSection() {
  const { scrollTo } = useProductActions();

  return (
    <section className="bg-gradient-to-br from-[#353336] via-[#434144] to-[#353336] py-32 px-6 text-center relative overflow-hidden">
      {/* Abstract background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#F5CB73_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
      
      <motion.div 
        initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
        whileInView={{ rotate: 10, scale: 1, opacity: 0.05 }}
        transition={{ duration: 1.5 }}
        aria-hidden="true" 
        className="absolute -top-12 right-[10%] text-[15rem] pointer-events-none select-none"
      >
        🧁
      </motion.div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-8 h-[1px] bg-[#F5CB73]/50"></span>
              <p className="text-[0.7rem] font-black tracking-[0.4em] uppercase text-[#F5CB73]">Limited Time Offers</p>
              <span className="w-8 h-[1px] bg-[#F5CB73]/50"></span>
          </div>

          <h2 className="font-playfair text-4xl md:text-6xl text-white font-black mb-10 leading-[1.1] tracking-tight">
            Ready to Order something <br/>
            <span className="text-[#F5CB73] italic">Magical?</span>
          </h2>
          
          <p className="text-white/60 text-xl mb-12 max-w-xl mx-auto font-medium leading-relaxed">
            From sunrise treats to midnight cravings, we bake happiness around the clock. Custom orders welcome!
          </p>

          <motion.div 
            className="flex flex-wrap gap-6 justify-center"
          >
            <motion.button 
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo("Contact")}
              className="bg-[#F5CB73] text-[#353336] px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] cursor-pointer shadow-2xl shadow-[#F5CB73]/20 transition-all duration-300"
            >
              Get in Touch
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, y: -4, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo("Menu")}
              className="bg-transparent text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer backdrop-blur-sm"
            >
              Explore Menu
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
