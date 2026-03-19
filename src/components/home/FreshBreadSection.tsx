import { useProductActions } from "./home-data";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function FreshBreadSection() {
  const { scrollTo } = useProductActions();

  return (
    <section className="py-32 px-6 bg-white overflow-hidden relative selection:bg-[#F5CB73] selection:text-[#353336]">
      {/* Decorative text watermark */}
      <div className="absolute top-[20%] right-[-5%] font-playfair font-black text-[#353336]/[0.02] text-[20rem] leading-none pointer-events-none select-none">
        Bespoke
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32">
        
        {/* Left Gallery Column */}
        <div className="flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4 text-[#F5CB73]">
                <span className="w-12 h-[1px] bg-[#F5CB73]"></span>
                <span className="text-[0.6rem] font-black uppercase tracking-[0.4em]">Every Dawn, a New Era</span>
            </div>
            <h2 className="font-playfair text-6xl md:text-8xl text-[#353336] leading-[0.9] tracking-tighter hover:text-[#F5CB73] transition-colors duration-700">
               Atmospheric <br />
               <span className="text-[#353336]/20 italic">Creation.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-[3rem] overflow-hidden aspect-[4/5] relative group shadow-2xl shadow-[#353336]/5"
            >
                <img src="/bread.png" alt="Artisan Sourdough" className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-[#353336] to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-black text-[0.6rem] uppercase tracking-widest text-center">Harvested 4:00 AM</p>
                </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 60 }}
               whileInView={{ opacity: 1, scale: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="rounded-[3rem] overflow-hidden aspect-square md:mt-24 relative group shadow-2xl shadow-[#353336]/5"
            >
              <img src="/about-baker.png" alt="Head Artisan" className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
            </motion.div>
          </div>
        </div>

        {/* Right Philosophical Column */}
        <div className="flex flex-col gap-24 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="space-y-12"
          >
            <div className="space-y-8">
                <p className="text-[#353336] text-3xl font-playfair italic leading-relaxed tracking-tight">
                "Our philosophy is simple: we do not merely bake. We orchestrate textures and synchronize flavors to create a sensory legacy."
                </p>
                <div className="h-px w-24 bg-[#F5CB73]"></div>
                <p className="text-[#434144]/60 text-lg leading-relaxed font-medium">
                  Each loaf represents a forty-eight-hour commitment to fermentation, mineral equilibrium, and architectural integrity. We invite you to experience the difference of a studio dedicated to the perfection of the grain.
                </p>
            </div>
            
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, delay: 0.8 }}
               className="font-dancing text-6xl text-[#353336]/20 select-none group-hover:text-[#F5CB73] transition-colors"
            >
              The Artisan Collective
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="p-12 bg-[#353336] rounded-[4rem] text-white relative flex flex-col items-center text-center space-y-8 shadow-[0_64px_128px_-32px_rgba(53,51,54,0.4)]"
          >
            <div className="absolute top-0 right-10 -translate-y-1/2 w-20 h-20 bg-[#F5CB73] rounded-3xl flex items-center justify-center rotate-12 shadow-2xl">
                <ShoppingBag size={32} className="text-[#353336]" />
            </div>
            
            <h3 className="font-playfair text-5xl font-black tracking-tighter">Acquire the Archive.</h3>
            <p className="text-white/40 text-sm max-w-sm font-medium leading-relaxed">
              Explore the full spectrum of our daily archives, from architectural cakes to gravity-defying pastries.
            </p>
            
            <button 
              onClick={() => scrollTo("Menu")}
              className="group flex items-center gap-6 bg-white text-[#353336] px-12 py-6 rounded-2xl text-[0.7rem] font-black uppercase tracking-[0.4em] hover:bg-[#F5CB73] transition-all duration-700"
            >
              View Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
