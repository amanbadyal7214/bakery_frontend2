import { testimonials } from "./home-data";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 px-6 bg-[#FEF0FD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block p-2 px-4 rounded-full bg-white border border-[#F5CB73]/20 shadow-sm mb-6">
             <span className="text-xs font-black tracking-[0.3em] uppercase text-[#F5CB73]">Customer Stories</span>
          </div>
          <h2 className="font-playfair text-4xl md:text-6xl font-black text-[#353336] mb-6 tracking-tight">
            Word on the <span className="text-[#F5CB73] italic">Street</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.blockquote key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(53,51,54,0.06)] border border-[#F5CB73]/5 m-0 hover:-translate-y-2 hover:shadow-[0_48px_80px_-24px_rgba(53,51,54,0.12)] transition-all duration-500 relative">
              
              <div className="text-[#F5CB73] text-sm tracking-[0.2em] mb-8 flex gap-1">
                {[...Array(t.stars)].map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
              </div>

              <p className="text-[#434144] italic leading-relaxed mb-10 text-lg font-medium relative z-10">
                "{t.text}"
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-[#F5CB73]/10">
                <div className="w-14 h-14 rounded-2xl bg-[#353336] text-[#F5CB73] font-black text-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#353336]/10 group-hover:bg-[#F5CB73] group-hover:text-[#353336] transition-colors duration-500">
                  {t.name[0]}
                </div>
                <div>
                  <strong className="block text-lg font-black text-[#353336] tracking-tight">{t.name}</strong>
                  <span className="block text-[0.7rem] font-black uppercase tracking-widest text-[#F5CB73] mt-1">{t.role}</span>
                </div>
              </div>

              <div className="absolute top-10 right-10 text-6xl font-serif text-[#F5CB73]/5 select-none pointer-events-none group-hover:text-[#F5CB73]/10 transition-colors duration-500">
                ”
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
