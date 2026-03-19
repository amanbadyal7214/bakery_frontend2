import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, User, Mail, MapPin, Lock, CheckCircle2, Phone, Sparkles, ChefHat, Heart, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/customers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, address, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register account");
      }

      dispatch(setCredentials({ user: data.customer, token: data.token }));

      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to register account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FEF0FD]/30 font-inter selection:bg-[#F5CB73] selection:text-[#353336]">
      
      {/* ── Left Side: Elegance Form ── */}
      <div className="w-full lg:w-1/2 flex flex-col relative px-8 md:px-24 py-16 justify-center bg-white order-2 lg:order-1">
        
        {/* Navigation Home */}
        <Link 
          to="/login" 
          className="absolute top-12 left-8 md:left-24 flex items-center gap-3 text-[#353336]/40 hover:text-[#F5CB73] transition-all duration-500 text-[0.65rem] font-black uppercase tracking-[0.3em] group no-underline"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back to Login
        </Link>
        
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md w-full mx-auto"
        >

          {/* Identity Header */}
          <div className="text-center lg:text-left mb-12">
            <h1 className="font-playfair text-5xl font-black text-[#353336] mb-4 tracking-tighter leading-none">
              Create Your <br />
              <span className="text-[#353336]/20 italic">Account</span>
            </h1>
            <p className="text-[#434144] text-lg font-medium opacity-60">
              Join us and enjoy a premium bakery experience.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-6">
            
            {/* Field: Legal Handle */}
            <div className="space-y-2 group">
              <label htmlFor="name" className="text-[0.6rem] font-black text-[#353336] uppercase tracking-[0.4em] ml-2 group-focus-within:text-[#F5CB73] transition-colors">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <User size={18} className="text-[#353336]/10 group-focus-within:text-[#F5CB73] transition-all" />
                </div>
                <input
                  id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name" required
                  className="w-full pl-16 pr-8 py-4 bg-[#FEF0FD]/40 border-2 border-transparent rounded-2xl text-[#353336] text-sm font-black outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:shadow-[0_24px_48px_-12px_rgba(245,203,115,0.1)] transition-all placeholder:text-[#353336]/5"
                />
              </div>
            </div>

            {/* Field: Identity Email */}
            <div className="space-y-2 group">
              <label htmlFor="email" className="text-[0.6rem] font-black text-[#353336] uppercase tracking-[0.4em] ml-2 group-focus-within:text-[#F5CB73] transition-colors">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Mail size={18} className="text-[#353336]/10 group-focus-within:text-[#F5CB73] transition-all" />
                </div>
                <input
                  id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@archived.com" required
                  className="w-full pl-16 pr-8 py-4 bg-[#FEF0FD]/40 border-2 border-transparent rounded-2xl text-[#353336] text-sm font-black outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:shadow-[0_24px_48px_-12px_rgba(245,203,115,0.1)] transition-all placeholder:text-[#353336]/5"
                />
              </div>
            </div>

            {/* Field: Direct Channel */}
            <div className="space-y-2 group">
              <label htmlFor="phone" className="text-[0.6rem] font-black text-[#353336] uppercase tracking-[0.4em] ml-2 group-focus-within:text-[#F5CB73] transition-colors">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Phone size={18} className="text-[#353336]/10 group-focus-within:text-[#F5CB73] transition-all" />
                </div>
                <input
                  id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 8900" required
                  className="w-full pl-16 pr-8 py-4 bg-[#FEF0FD]/40 border-2 border-transparent rounded-2xl text-[#353336] text-sm font-black outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:shadow-[0_24px_48px_-12px_rgba(245,203,115,0.1)] transition-all placeholder:text-[#353336]/5"
                />
              </div>
            </div>

            {/* Field: Destination */}
            <div className="space-y-2 group">
              <label htmlFor="address" className="text-[0.6rem] font-black text-[#353336] uppercase tracking-[0.4em] ml-2 group-focus-within:text-[#F5CB73] transition-colors">
                Delivery Address
              </label>
              <div className="relative">
                <div className="absolute top-4 left-6 pointer-events-none">
                  <MapPin size={18} className="text-[#353336]/10 group-focus-within:text-[#F5CB73] transition-all" />
                </div>
                <textarea
                  id="address" value={address} onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street Anchor, Landmark..." required rows={2}
                  className="w-full pl-16 pr-8 py-4 bg-[#FEF0FD]/40 border-2 border-transparent rounded-2xl text-[#353336] text-sm font-black outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:shadow-[0_24px_48px_-12px_rgba(245,203,115,0.1)] transition-all resize-none placeholder:text-[#353336]/5"
                />
              </div>
            </div>

            {/* Field: Secret Phrase */}
            <div className="space-y-2 group">
              <label htmlFor="password" className="text-[0.6rem] font-black text-[#353336] uppercase tracking-[0.4em] ml-2 group-focus-within:text-[#F5CB73] transition-colors">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#353336]/10 group-focus-within:text-[#F5CB73] transition-all" />
                </div>
                <input
                  id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="w-full pl-16 pr-8 py-4 bg-[#FEF0FD]/40 border-2 border-transparent rounded-2xl text-[#353336] text-sm font-black outline-none focus:bg-white focus:border-[#F5CB73]/30 focus:shadow-[0_24px_48px_-12px_rgba(245,203,115,0.1)] transition-all placeholder:text-[#353336]/5"
                />
              </div>
            </div>

            {/* Terms Engagement */}
            <label className="flex items-start gap-4 cursor-pointer group pt-2">
              <div className="relative flex items-center justify-center w-6 h-6 mt-1 shrink-0 rounded-lg border-2 border-[#FEF0FD] bg-white group-hover:border-[#F5CB73]/30 transition-all">
                <input type="checkbox" required className="peer opacity-0 absolute w-full h-full cursor-pointer" />
                <CheckCircle2 size={14} className="text-[#F5CB73] opacity-0 peer-checked:opacity-100 transition-all" />
              </div>
              <span className="text-[0.65rem] font-black uppercase tracking-widest text-[#353336]/30 leading-relaxed select-none">
                I agree to the <span className="text-[#353336]">Terms & Conditions</span> and <span className="text-[#353336]">Privacy Policy</span>.
              </span>
            </label>

            {/* Execution Button */}
            <motion.button
              type="submit" disabled={loading}
              whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}
              className="w-full mt-4 bg-[#353336] hover:bg-[#F5CB73] text-white hover:text-[#353336] py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.4em] transition-all duration-500 shadow-2xl shadow-[#353336]/20 disabled:opacity-70 flex items-center justify-center gap-4 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <Sparkles size={16} /></>
              )}
            </motion.button>

          </form>

          {/* Alternative for Mobile */}
          <div className="mt-12 text-center block lg:hidden">
            <p className="text-[#434144] text-[0.7rem] font-black uppercase tracking-[0.2em] opacity-40">
              Already have an account?{" "}
              <Link to="/login" className="text-[#353336] hover:text-[#F5CB73] transition-colors font-black ml-2 no-underline">
                Sign In
              </Link>
            </p>
          </div>

        </motion.div>
      </div>

      {/* ── Right Side: Cinematic Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#353336] order-1 lg:order-2">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 grayscale-[0.2]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1614145121029-83a9f7b68bf4?q=80&w=2000&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#353336] via-transparent to-transparent opacity-80" />
        
        {/* Floating Glass Box */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] bg-white/5 backdrop-blur-3xl border border-white/10 p-16 rounded-[4rem] shadow-2xl"
        >
          <div className="mb-10 flex justify-center">
            <div className="w-20 h-20 bg-[#F5CB73] rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
              <ChefHat size={40} className="text-[#353336]" />
            </div>
          </div>
          <h2 className="font-playfair text-4xl font-black text-white text-center mb-8 tracking-tighter">
            Join the <br /> <span className="text-[#F5CB73] italic">Hangary Family</span>
          </h2>
          <ul className="space-y-6">
            {[
              "Exclusive deals & early access",
              "Order tracking & history",
              "Priority custom cake requests",
              "Birthday & event reminders"
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-5 text-white/60 font-medium">
                <CheckCircle2 size={18} className="text-[#F5CB73]" />
                <span className="text-xs uppercase tracking-[0.2em] font-black">{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
