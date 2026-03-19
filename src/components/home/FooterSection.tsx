import { Link } from "react-router-dom";
import { navLinks, useProductActions } from "./home-data";
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import bakeryIllustrations from "@/assets/bakery-illustrations.png";
import { motion } from "framer-motion";
import logo from "@/assets/logo.jpg";

export default function FooterSection() {
  const { scrollTo } = useProductActions();

  return (
    <footer className="relative bg-[#353336] text-[#FEF0FD] pt-12 pb-12 overflow-hidden">
        {/* Background Texture */}
        <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay invert"
            style={{ backgroundImage: `url(${bakeryIllustrations})`, backgroundSize: '500px' }}
        />
        
        <div className="container mx-auto relative z-10 px-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-20 ">
                {/* Left: Big Statement */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="max-w-2xl"
                >
                    <h2 className="font-playfair text-7xl md:text-8xl leading-[0.85] mb-10 text-[#FEF0FD] tracking-tighter">
                        Taste the <br/>
                        <span className="text-[#F5CB73] italic pr-4">Magic</span>
                        <span className="text-4xl align-middle tracking-normal opacity-50 font-sans font-light block mt-4 max-w-md">
                           Artisan pastries baked with passion since 1984.
                        </span>
                    </h2>
                </motion.div>

                {/* Right: Links & Action */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-col gap-12 w-full lg:w-auto min-w-[300px]"
                >
                    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                        {navLinks.map((link, i) => (
                            <motion.button 
                              key={link} 
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 + (i * 0.1) }}
                              onClick={() => scrollTo(link)} 
                              className="text-left text-[#FEF0FD]/50 hover:text-[#F5CB73] transition-colors text-sm font-medium uppercase tracking-widest bg-transparent border-none p-0 cursor-pointer group flex items-center gap-2"
                            >
                                <span className="w-0 group-hover:w-3 h-[1px] bg-[#F5CB73] transition-all duration-300"></span>
                                {link}
                            </motion.button>
                        ))}
                    </div>

                    <div className="flex flex-col gap-6 mt-4">
                        <span className="text-xs font-bold text-[#FEF0FD]/90 uppercase tracking-widest">Newsletter</span>
                        <div className="flex items-center border-b border-[#FEF0FD]/20 pb-4 focus-within:border-[#F5CB73] transition-colors w-full group">
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                className="bg-transparent border-none outline-none text-[#FEF0FD] placeholder:text-[#FEF0FD]/30 w-full text-lg font-light" 
                            />
                            <button className="bg-transparent border-none cursor-pointer text-[#FEF0FD]/50 group-focus-within:text-[#F5CB73] hover:text-[#FEF0FD] transition-colors">
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom: Footer Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col md:flex-row justify-between items-end border-t border-[#FEF0FD]/10 pt-10 gap-8"
            >
                <div className="flex flex-col gap-3 group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 bg-white">
                            <img src={logo} alt="Hangary Sweet" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-playfair text-3xl font-bold tracking-wider group-hover:text-[#F5CB73] transition-colors">Hangary Sweet</span>
                    </div>
                    <p className="text-[#FEF0FD]/30 text-xs tracking-wide">© 2024 Hangary Sweet Inc. All rights reserved.</p>
                    <div className="flex gap-4 mt-2 text-[0.65rem] text-[#FEF0FD]/20 uppercase tracking-widest leading-none">
                         <Link to="/login" className="hover:text-[#F5CB73] transition-colors no-underline">Admin Portal</Link>
                         <span className="opacity-10">•</span>
                         <a href="#" className="hover:text-[#F5CB73] transition-colors no-underline">Privacy Policy</a>
                         <span className="opacity-10">•</span>
                         <a href="#" className="hover:text-[#F5CB73] transition-colors no-underline">Terms of Service</a>
                    </div>
                </div>
                
                <div className="flex gap-4">
                     {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                        <a key={i} href="#" className="w-12 h-12 border border-[#FEF0FD]/10 rounded-full flex items-center justify-center text-[#FEF0FD]/60 hover:bg-[#F5CB73] hover:text-[#353336] hover:border-[#F5CB73] transition-all duration-300 group">
                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                     ))}
                </div>
            </motion.div>
        </div>
    </footer>
  );
}
