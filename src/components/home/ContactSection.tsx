import { MapPin, Phone, Mail, Clock, Send, Star } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function ContactSection() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#FEF0FD] relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
          x: [0, 20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-64 h-64 bg-[#F5CB73]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"
      ></motion.div>
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          y: [0, -20, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 w-64 h-64 bg-[#F2E2F1] rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"
      ></motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-2 px-4 rounded-full bg-white border border-[#F5CB73]/20 shadow-sm mb-4">
             <span className="text-xs font-black tracking-[0.3em] uppercase text-[#F5CB73] flex items-center gap-2">
               <Star className="w-3 h-3 fill-[#F5CB73]" /> Reach Out <Star className="w-3 h-3 fill-[#F5CB73]" />
             </span>
          </div>
          <h2 className="font-playfair text-5xl md:text-6xl font-black text-[#353336] mb-6 leading-tight tracking-tight">
            We&apos;d Love to <span className="text-[#F5CB73] italic">Hear</span> from You
          </h2>
          <p className="text-[#686669] max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Have a custom order in mind? Or just want to say hello? Drop us a line and let&apos;s bake something special together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(53,51,54,0.08)] border border-[#F5CB73]/10 relative overflow-hidden group hover:shadow-[0_48px_80px_-16px_rgba(53,51,54,0.12)] transition-all duration-700">
               <div className="absolute top-0 right-0 w-40 h-40 bg-[#F5CB73]/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700"></div>
               
               <h3 className="font-playfair text-3xl font-black text-[#353336] mb-10 relative z-10">Studio Info</h3>
               
               <motion.div 
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="space-y-10 relative z-10"
               >
                {[
                  { icon: MapPin, label: "Visit Us", val: "12 Baker Street, Mumbai,\nMH 400001" },
                  { icon: Phone, label: "Call Us", val: "+91 98765 43210" },
                  { icon: Mail, label: "Email Us", val: "hello@Hangary Sweet.in" },
                  { icon: Clock, label: "Opening Hours", val: "Mon – Sat: 7 AM – 8 PM\nSun: 8 AM – 5 PM" },
                ].map((c, i) => (
                  <motion.div key={i} variants={item} className="flex gap-6 items-start group/item">
                    <div className="w-14 h-14 bg-[#F5CB73]/10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-500 group-hover/item:bg-[#F5CB73] group-hover/item:text-[#353336] text-[#F5CB73] shadow-sm">
                      <c.icon className="w-6 h-6 transition-transform duration-500 group-hover/item:scale-110" />
                    </div>
                    <div>
                      <strong className="block text-[0.65rem] font-black tracking-[0.2em] uppercase text-[#F5CB73] mb-2">{c.label}</strong>
                      <div className="text-[#434144] text-lg m-0 leading-relaxed whitespace-pre-line font-bold tracking-tight">{c.val}</div>
                    </div>
                  </motion.div>
                ))}
               </motion.div>

               <div className="mt-14 pt-10 border-t border-[#F5CB73]/10">
                  <p className="text-sm text-center text-[#686669] font-dancing text-2xl">
                    "Life is uncertain. Eat dessert first." 🍰
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="lg:col-span-7"
          >
            <form
              className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-[0_32px_64px_-16px_rgba(53,51,54,0.08)] border border-[#F5CB73]/10 flex flex-col gap-8 relative overflow-hidden"
              onSubmit={(e) => { e.preventDefault(); alert("Message sent! We'll get back to you soon. 🧁"); }}
            > 
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5CB73]/5 rounded-bl-[3rem] -mr-8 -mt-8"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3 group">
                  <label htmlFor="cf-name" className="text-xs font-black uppercase tracking-widest text-[#353336] ml-1 group-focus-within:text-[#F5CB73] transition-colors">Full Name</label>
                  <input id="cf-name" type="text" placeholder="Jane Doe" required
                    className="w-full bg-[#FEF0FD]/40 border border-[#F5CB73]/5 rounded-2xl px-6 py-5 text-[#353336] font-bold outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:ring-8 focus:ring-[#F5CB73]/5 transition-all duration-500 placeholder:text-[#686669]/30" />
                </div>
                <div className="flex flex-col gap-3 group">
                  <label htmlFor="cf-email" className="text-xs font-black uppercase tracking-widest text-[#353336] ml-1 group-focus-within:text-[#F5CB73] transition-colors">Email Address</label>
                  <input id="cf-email" type="email" placeholder="jane@example.com" required
                    className="w-full bg-[#FEF0FD]/40 border border-[#F5CB73]/5 rounded-2xl px-6 py-5 text-[#353336] font-bold outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:ring-8 focus:ring-[#F5CB73]/5 transition-all duration-500 placeholder:text-[#686669]/30" />
                </div>
              </div>

              <div className="flex flex-col gap-3 group">
                <label htmlFor="cf-subject" className="text-xs font-black uppercase tracking-widest text-[#353336] ml-1 group-focus-within:text-[#F5CB73] transition-colors">Inquiry Type</label>
                <div className="relative">
                  <select id="cf-subject" 
                    className="w-full bg-[#FEF0FD]/40 border border-[#F5CB73]/5 rounded-2xl px-6 py-5 text-[#353336] font-bold outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:ring-8 focus:ring-[#F5CB73]/5 transition-all duration-500 cursor-pointer appearance-none">
                      <option value="" disabled selected>Select a topic...</option>
                      <option value="order">Custom Order Inquiry</option>
                      <option value="catering">Event Catering</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#F5CB73]">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 group">
                <label htmlFor="cf-message" className="text-xs font-black uppercase tracking-widest text-[#353336] ml-1 group-focus-within:text-[#F5CB73] transition-colors">Your Message</label>
                <textarea id="cf-message" rows={5} placeholder="Tell us what you need…" required
                  className="w-full bg-[#FEF0FD]/40 border border-[#F5CB73]/5 rounded-2xl px-6 py-5 text-[#353336] font-bold outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:ring-8 focus:ring-[#F5CB73]/5 transition-all duration-500 resize-none min-h-[180px] placeholder:text-[#686669]/30" />
              </div>

              <motion.button 
                type="submit"
                whileHover={{ scale: 1.01, y: -4 }}
                whileTap={{ scale: 0.99 }}
                className="group relative w-full bg-[#353336] text-[#F5CB73] border-none py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-[0_24px_48px_-12px_rgba(53,51,54,0.3)] mt-4">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                <span className="relative flex items-center justify-center gap-4">
                  Send Your Inquiry <Send className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
