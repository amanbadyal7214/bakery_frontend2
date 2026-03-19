import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Mail, Lock, CheckCircle2, Sparkles, ChefHat, Heart, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/customers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to login");
      }

      dispatch(setCredentials({ user: data.customer, token: data.token }));
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FEF0FD]/30 font-inter selection:bg-[#F5CB73] selection:text-[#353336]">
      
      {/* ── Left Side: Cinematic Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#353336]">
        {/* Background Image with Parallax Effect */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 grayscale-[0.2]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=2000&auto=format&fit=crop")' }}
        />
        
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#353336] via-[#353336]/60 to-transparent" />
        
        {/* Abstract Decorative Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#F5CB73]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#FEF0FD]/10 rounded-full blur-[120px] animate-pulse" />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-end p-20 h-full text-white w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-10 shadow-2xl">
              <Sparkles size={14} className="text-[#F5CB73]" />
              <span className="text-[0.6rem] font-black tracking-[0.4em] uppercase">Welcome Back</span>
            </div>
            
            <h2 className="font-playfair text-6xl font-black leading-[0.9] mb-8 tracking-tighter">
              Sign in to <br/>
              <span className="text-[#F5CB73] italic">Your Account.</span>
            </h2>
            
            <p className="text-white/40 text-xl max-w-md font-medium leading-relaxed mb-12">
              Access your orders, track deliveries, and manage your account all in one place.
            </p>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-12 border-t border-white/5">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-2xl border-4 border-[#353336] bg-[#434144] flex items-center justify-center shadow-2xl overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={10} className="fill-[#F5CB73] text-[#F5CB73]" />)}
                </div>
                <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[#F5CB73]">Hangary Sweet • 10K+ Happy Customers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Right Side: Elegance Form ── */}
      <div className="w-full lg:w-1/2 flex flex-col relative px-8 md:px-24 py-16 justify-center bg-white">
        
        {/* Navigation Home */}
        <Link 
          to="/" 
          className="absolute top-12 left-8 md:left-24 flex items-center gap-3 text-[#353336]/40 hover:text-[#F5CB73] transition-all duration-500 text-[0.65rem] font-black uppercase tracking-[0.3em] group no-underline"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back to Home
        </Link>
        
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md w-full mx-auto"
        >

          {/* Identity Header */}
          <div className="text-center lg:text-left mb-16">
            <div className="inline-flex lg:hidden items-center justify-center w-20 h-20 bg-[#FEF0FD] rounded-[2rem] shadow-2xl shadow-[#353336]/5 mb-10 text-4xl">
              <ChefHat className="text-[#F5CB73]" size={40} />
            </div>
            <h1 className="font-playfair text-5xl font-black text-[#353336] mb-4 tracking-tighter leading-none">
              Welcome <br />
              <span className="text-[#353336]/20 italic">Back!</span>
            </h1>
            <p className="text-[#434144] text-lg font-medium opacity-60">
              Sign in to your account to continue.
            </p>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleLogin} className="space-y-8">
            
            {/* Field: Identity Email */}
            <div className="space-y-4 group">
              <label 
                htmlFor="email" 
                className="text-[0.6rem] font-black text-[#353336] uppercase tracking-[0.4em] ml-2 group-focus-within:text-[#F5CB73] transition-colors"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Mail size={20} className="text-[#353336]/10 group-focus-within:text-[#F5CB73] transition-all" />
                </div>
                <input
                  id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@archived.com" required
                  className="w-full pl-16 pr-8 py-5 bg-[#FEF0FD]/40 border-2 border-transparent rounded-2xl text-[#353336] text-sm font-black outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:shadow-[0_24px_48px_-12px_rgba(245,203,115,0.1)] transition-all placeholder:text-[#353336]/5"
                />
              </div>
            </div>

            {/* Field: Credential Access */}
            <div className="space-y-4 group">
              <label 
                htmlFor="password" 
                className="text-[0.6rem] font-black text-[#353336] uppercase tracking-[0.4em] ml-2 group-focus-within:text-[#F5CB73] transition-colors"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Lock size={20} className="text-[#353336]/10 group-focus-within:text-[#F5CB73] transition-all" />
                </div>
                <input
                  id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="w-full pl-16 pr-8 py-5 bg-[#FEF0FD]/40 border-2 border-transparent rounded-2xl text-[#353336] text-sm font-black outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:shadow-[0_24px_48px_-12px_rgba(245,203,115,0.1)] transition-all placeholder:text-[#353336]/5"
                />
              </div>
            </div>

            {/* Advanced Options */}
            <div className="flex items-center justify-between pt-2 px-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-6 h-6 rounded-lg border-2 border-[#FEF0FD] bg-white group-hover:border-[#F5CB73]/30 transition-all">
                  <input type="checkbox" className="peer opacity-0 absolute w-full h-full cursor-pointer" />
                  <CheckCircle2 size={14} className="text-[#F5CB73] opacity-0 peer-checked:opacity-100 transition-all" />
                </div>
                <span className="text-[0.65rem] font-black uppercase tracking-widest text-[#353336]/30 group-hover:text-[#353336] transition-all">Remember Me</span>
              </label>
              <button 
                type="button" 
                className="text-[0.65rem] font-black uppercase tracking-widest text-[#353336] hover:text-[#F5CB73] transition-all"
              >
                Forgot Password?
              </button>
            </div>

            {/* Execution Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 bg-[#353336] hover:bg-[#F5CB73] text-white hover:text-[#353336] py-6 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.4em] transition-all duration-500 shadow-2xl shadow-[#353336]/20 disabled:opacity-70 flex items-center justify-center gap-4 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <Heart size={16} className="group-hover:fill-[#353336] transition-all" /></>
              )}
            </motion.button>

          </form>

          {/* Navigation to Registration */}
          <div className="mt-16 text-center">
            <p className="text-[#434144] text-[0.7rem] font-black uppercase tracking-[0.2em] opacity-40">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#353336] hover:text-[#F5CB73] transition-colors font-black ml-2 no-underline">
                Create Account
              </Link>
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
