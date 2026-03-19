import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MoveLeft, Sparkles, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Access violation in studio archive:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FEF0FD]/30 font-inter text-center px-6 selection:bg-[#F5CB73] selection:text-[#353336]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full"
      >
        <div className="relative mb-12">
          <motion.h1 
            initial={{ y: 20 }} animate={{ y: 0 }}
            className="text-[12rem] md:text-[16rem] font-playfair font-black text-[#353336]/5 leading-none tracking-tighter"
          >
            404
          </motion.h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-[#353336] rounded-[2rem] flex items-center justify-center shadow-2xl animate-pulse">
              <ChefHat size={40} className="text-[#F5CB73]" />
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-3 bg-[#F5CB73] text-[#353336] px-6 py-2 rounded-full mb-8 shadow-xl">
          <Sparkles size={14} className="animate-spin-slow" />
          <span className="text-[0.6rem] font-black tracking-[0.4em] uppercase">Archive Misalignment</span>
        </div>

        <h2 className="font-playfair text-5xl md:text-6xl font-black text-[#353336] mb-6 tracking-tighter">
          The Scent has <br />
          <span className="text-[#353336]/20 italic">Dissipated.</span>
        </h2>

        <p className="text-lg md:text-xl font-medium text-[#434144]/60 mb-12 max-w-md mx-auto leading-relaxed">
          The creation you seek has crumbled or exists only in the mind of the Head Artisan. Let us guide you back to the collection.
        </p>

        <Link
          to="/"
          className="group inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-[#353336] text-white hover:bg-[#F5CB73] hover:text-[#353336] font-black text-xs uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl shadow-[#353336]/20 no-underline"
        >
          <MoveLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> 
          Return to Studio
        </Link>
      </motion.div>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#F5CB73]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#353336]/5 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};

export default NotFound;
