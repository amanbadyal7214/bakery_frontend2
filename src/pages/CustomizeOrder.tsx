import React, { useState, FormEvent, ChangeEvent, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/home/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";  
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  Calendar, 
  Clock, 
  IndianRupee, 
  Utensils, 
  Gift, 
  User, 
  Image as ImageIcon, 
  MapPin, 
  Truck, 
  Cake, 
  Heart,
  MessageCircle,
  Palette,
  Check,
  X,
  Phone,
  ArrowRight,
  ChefHat,
  Sparkles,
  Layers,
  Users as UsersIcon
} from "lucide-react";

/* ─── animation helpers ─── */
const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const occasions = [
  "Birthday", "Wedding", "Anniversary", "Baby Shower", "Graduation", "Corporate Event", "Festival", "Other"
];

const cakeWeights = [
  { id: "0.5kg", name: "0.5 kg (Small)" },
  { id: "1kg", name: "1 kg (Medium)" },
  { id: "2kg", name: "2 kg (Large)" },
  { id: "3kg", name: "3 kg (Extra Large)" },
  { id: "custom", name: "Custom / Describe in notes" },
];

const flavors = [
  "Chocolate Noir", "Madagascar Vanilla", "Salted Butterscotch", "Velvet Rouge", "Forêt-Noire", "Tropical Pineapple", "Grand Fruit Cake", "Artisan Custom"
];

const shapes = [
  "Classic Round", "Sleek Square", "Heart Silhouette", "Iconic 2-Tier", "Grand 3-Tier", "Bespoke Sculpture"
];

const frostings = [
  "Silk Whipped Cream", "Velvet Buttercream", "Artistic Fondant", "Dark Ganache Noir"
];

export default function CustomizeOrder() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    occasion: "",
    weight: "",
    servingCount: "",
    flavor: "",
    shape: "",
    designTheme: "",
    image: null as File | null,
    message: "",
    frosting: "",
    isEggless: "egg",
    deliveryType: "pickup",
    deliveryDate: "",
    deliveryTime: "",
    name: "",
    mobile: "",
    address: "",
    pincode: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!formData.name || formData.name.trim().length < 2) {
      toast({ title: 'Invalid Name', description: 'Please enter your full name.' });
      return false;
    }
    const digits = formData.mobile ? formData.mobile.replace(/\D/g, '') : '';
    if (!digits || digits.length < 10) {
      toast({ title: 'Invalid Mobile Number', description: 'Please enter a valid 10-digit mobile number.' });
      return false;
    }
    if (formData.deliveryType === 'delivery') {
      if (!formData.address || formData.address.trim().length < 5) {
        toast({ title: 'Address Required', description: 'Please enter a delivery address.' });
        return false;
      }
      const pin = formData.pincode ? formData.pincode.replace(/\D/g, '') : '';
      if (!pin || pin.length !== 6) {
        toast({ title: 'Invalid Pincode', description: 'Please enter a 6-digit pincode for delivery.' });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (key === 'image') return;
        data.append(key, String(value));
      });
      if (formData.image) data.set('image', formData.image);

      const base = (import.meta.env.VITE_API_URL as string) || '';
      const url = base ? `${base.replace(/\/$/, '')}/api/orders` : '/api/orders';
      
      const token = localStorage.getItem('token');
      if (!token) {
        toast({ title: 'Identification Required', description: 'Please sign in to the studio to submit your design.' });
        setIsSubmitting(false);
        return;
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data,
      });

      if (!res.ok) throw new Error('Failed to submit design');

      toast({ title: 'Bespoke Design Received!', description: "Our head artisan will contact you shortly to refine your concept." });

      setFormData({
        occasion: "",
        weight: "",
        servingCount: "",
        flavor: "",
        shape: "",
        designTheme: "",
        image: null,
        message: "",
        frosting: "",
        isEggless: "egg",
        deliveryType: "pickup",
        deliveryDate: "",
        deliveryTime: "",
        name: "",
        mobile: "",
        address: "",
        pincode: "",
      });
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error(err);
      toast({ title: 'Studio Error', description: 'Could not submit your design. Please attempt again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      e.target.value = "";
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-[#FEF0FD]/30 font-inter text-[#353336] overflow-x-hidden selection:bg-[#F5CB73] selection:text-[#353336]">
      <Navbar />
      
      {/* ─── Hero Section ─── */}
      <section className="relative pt-40 pb-24 bg-[#353336] text-white overflow-hidden">
        {/* Waterfall backgrounds */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover scale-110" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#353336]/60 via-[#353336]/90 to-[#353336]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: EASE }}
            className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 text-[#F5CB73] text-[0.6rem] font-black tracking-[0.4em] uppercase px-8 py-3 rounded-full mb-10 shadow-2xl"
          >
            <Sparkles size={14} className="animate-pulse" />
            Bespoke Artisan Studio
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="font-playfair text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
          >
            Curate Your <br />
            <span className="text-[#F5CB73] italic">Dream Masterpiece</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 text-xl max-w-2xl mx-auto font-medium"
          >
            From conceptual flavors to sculptural icing—translate your vision into edible art. Our head artisans await your direction.
          </motion.p>
        </div>
      </section>

      {/* ─── Main Form Studio ─── */}
      <main className="max-w-6xl mx-auto px-6 md:px-10 -mt-16 pb-32 relative z-20">
        <motion.div variants={stagger} initial="hidden" animate="show"
          className="bg-white rounded-[4rem] shadow-[0_64px_128px_-32px_rgba(53,51,54,0.15)] p-12 md:p-20 border border-[#F5CB73]/10"
        >
          <form onSubmit={handleSubmit} className="space-y-16">
            
            {/* 1. Master Inspiration */}
            <motion.div variants={fadeUp} className="group p-10 rounded-[3rem] bg-[#FEF0FD]/30 border-2 border-transparent hover:border-[#F5CB73]/20 transition-all duration-700">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-[#353336] flex items-center justify-center text-[#F5CB73] shadow-xl group-hover:scale-110 transition-transform duration-700">
                  <ImageIcon size={28} />
                </div>
                <div>
                  <h2 className="font-playfair text-3xl font-black text-[#353336] tracking-tighter">Master Inspiration</h2>
                  <p className="text-[0.65rem] font-black tracking-[0.3em] text-[#F5CB73] uppercase mt-1">Reference Visuals (Optional)</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                 <div className="space-y-6">
                   <Label className="text-[#434144] text-lg font-semibold block px-2">Visual Concept Upload</Label>
                   <div className="relative group/upload h-64">
                     <Input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-20"
                      />
                      <div className="h-full border-2 border-dashed border-[#F5CB73]/30 rounded-[2.5rem] flex flex-col items-center justify-center bg-white group-hover/upload:bg-[#FEF0FD]/50 transition-all duration-700">
                        <Upload className="h-12 w-12 text-[#F5CB73] mb-4 group-hover/upload:-translate-y-2 transition-transform duration-500" />
                        <p className="font-black text-[#353336] text-xs uppercase tracking-widest">Architectural Draft</p>
                        <p className="text-[0.6rem] text-[#434144]/40 mt-2 font-bold uppercase tracking-[0.2em]">JPG • PNG • PDF</p>
                      </div>
                   </div>
                 </div>
                 
                 <AnimatePresence mode="wait">
                  {imagePreview ? (
                    <motion.div 
                      key="preview" initial={{ opacity: 0, scale: 0.8, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 2 }} exit={{ opacity: 0, scale: 0.8 }}
                      className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden border-[12px] border-white shadow-2xl group/preview"
                    >
                      <img src={imagePreview} alt="Reference" className="w-full h-full object-cover transition-transform duration-1000 group-hover/preview:scale-110" />
                      <button type="button" onClick={removeImage}
                        className="absolute top-6 right-6 bg-[#353336] hover:bg-red-500 text-white rounded-2xl p-3 shadow-2xl transition-all duration-500 group-hover/preview:scale-110"
                      >
                        <X size={20} />
                      </button>
                    </motion.div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-[#F5CB73]/20 italic border-2 border-[#F5CB73]/5 rounded-[2.5rem]">
                       <ImageIcon size={48} className="mb-4 opacity-5" />
                       <span className="text-[0.7rem] font-black uppercase tracking-widest">No visual anchored</span>
                    </div>
                  )}
                 </AnimatePresence>
              </div>
            </motion.div>

            {/* 2. Occasion Selection */}
            <motion.div variants={fadeUp} className="group p-10 rounded-[3rem] bg-[#FEF0FD]/30 border-2 border-transparent hover:border-[#F5CB73]/20 transition-all duration-700">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-[#353336] flex items-center justify-center text-[#F5CB73] shadow-xl">
                  <Gift size={28} />
                </div>
                <div>
                   <h2 className="font-playfair text-3xl font-black text-[#353336] tracking-tighter">Grand Occasion</h2>
                   <p className="text-[0.65rem] font-black tracking-[0.3em] text-[#F5CB73] uppercase mt-1">Foundational Theme</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {occasions.map((occ) => (
                  <label key={occ} className={`
                    relative cursor-pointer border-2 rounded-2xl px-6 py-5 text-center transition-all duration-500 shadow-sm
                    ${formData.occasion === occ 
                      ? "bg-[#353336] text-[#F5CB73] border-[#353336] shadow-2xl shadow-[#353336]/30 -translate-y-2" 
                      : "bg-white text-[#434144] hover:bg-[#FEF0FD] border-transparent hover:border-[#F5CB73]/20"}
                  `}>
                    <input type="radio" name="occasion" value={occ} checked={formData.occasion === occ} 
                      onChange={(e) => handleInputChange("occasion", e.target.value)}
                      className="hidden" 
                    />
                    <span className="text-[0.7rem] font-black uppercase tracking-widest">{occ}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* 3. Specifications Grid */}
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Size & Servings */}
                <motion.div variants={fadeUp} className="group p-10 rounded-[3rem] bg-[#FEF0FD]/30 border-2 border-transparent hover:border-[#F5CB73]/20 transition-all duration-700">
                    <div className="flex items-center gap-5 mb-8">
                        <UsersIcon size={24} className="text-[#353336]" />
                        <h2 className="font-playfair text-2xl font-black text-[#353336] tracking-tighter">Architectural Scale</h2>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-3">
                           <Label className="text-[0.65rem] font-black tracking-widest uppercase text-[#434144] ml-2">Collection Magnitude</Label>
                           <Select value={formData.weight} onValueChange={(val) => handleInputChange("weight", val)}>
                            <SelectTrigger className="bg-white border-2 border-transparent rounded-2xl h-16 shadow-sm focus:border-[#F5CB73]/30 font-black text-sm uppercase tracking-widest">
                              <SelectValue placeholder="Select Magnitude" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-2 border-[#F5CB73]/10">
                              {cakeWeights.map((w) => (
                                <SelectItem key={w.id} value={w.id} className="font-black text-[0.65rem] py-3 uppercase tracking-widest">{w.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3">
                           <Label className="text-[0.65rem] font-black tracking-widest uppercase text-[#434144] ml-2">Guest Archetype</Label>
                           <div className="relative">
                               <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-[#F5CB73]" />
                               <Input placeholder="Estimate Attendee Count" value={formData.servingCount} onChange={(e) => handleInputChange("servingCount", e.target.value)}
                                  className="pl-16 bg-white border-2 border-transparent rounded-2xl h-16 shadow-sm focus:border-[#F5CB73]/30 font-black text-sm uppercase tracking-widest placeholder:text-[#353336]/10"
                               />
                           </div>
                        </div>
                    </div>
                </motion.div>

                {/* Details */}
                <motion.div variants={fadeUp} className="group p-10 rounded-[3rem] bg-[#FEF0FD]/30 border-2 border-transparent hover:border-[#F5CB73]/20 transition-all duration-700">
                    <div className="flex items-center gap-5 mb-8">
                        <ChefHat size={24} className="text-[#353336]" />
                        <h2 className="font-playfair text-2xl font-black text-[#353336] tracking-tighter">Artisan Profiling</h2>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <Label className="text-[0.65rem] font-black tracking-widest uppercase text-[#434144] ml-2">Signature Flavor</Label>
                            <Select value={formData.flavor} onValueChange={(val) => handleInputChange("flavor", val)}>
                              <SelectTrigger className="bg-white border-2 border-transparent rounded-2xl h-16 shadow-sm focus:border-[#F5CB73]/30 font-black text-sm uppercase tracking-widest">
                                <SelectValue placeholder="Select Profile" />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-2 border-[#F5CB73]/10">
                                {flavors.map((f) => (
                                  <SelectItem key={f} value={f} className="font-black text-[0.65rem] py-3 uppercase tracking-widest">{f}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-3">
                            <Label className="text-[0.65rem] font-black tracking-widest uppercase text-[#434144] ml-2">Structural Silhouette</Label>
                            <Select value={formData.shape} onValueChange={(val) => handleInputChange("shape", val)}>
                              <SelectTrigger className="bg-white border-2 border-transparent rounded-2xl h-16 shadow-sm focus:border-[#F5CB73]/30 font-black text-sm uppercase tracking-widest">
                                <SelectValue placeholder="Select Silhouette" />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-2 border-[#F5CB73]/10">
                                {shapes.map((s) => (
                                  <SelectItem key={s} value={s} className="font-black text-[0.65rem] py-3 uppercase tracking-widest">{s}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* 4. Vision Narrative */}
            <motion.div variants={fadeUp} className="group p-10 rounded-[3rem] bg-[#FEF0FD]/30 border-2 border-transparent hover:border-[#F5CB73]/20 transition-all duration-700">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-[#353336] flex items-center justify-center text-[#F5CB73] shadow-xl">
                  <Palette size={28} />
                </div>
                <div>
                  <h2 className="font-playfair text-3xl font-black text-[#353336] tracking-tighter">Vision Narrative</h2>
                  <p className="text-[0.65rem] font-black tracking-[0.3em] text-[#F5CB73] uppercase mt-1">Design Specifications</p>
                </div>
              </div>
              <div className="space-y-4">
                 <Label className="text-[0.65rem] font-black tracking-widest uppercase text-[#434144] ml-2 block">Define Your Aesthetic Concept</Label>
                 <Textarea 
                   value={formData.designTheme}
                   placeholder="e.g. A Minimalist Sculptural Concept in Lavenders and Gold Leaf. Focus on movement and organic texture."
                   className="min-h-[160px] bg-white border-2 border-transparent rounded-[2rem] p-8 font-medium text-lg focus:border-[#F5CB73]/30 shadow-sm resize-none"
                   onChange={(e) => handleInputChange("designTheme", e.target.value)}
                 />
              </div>
            </motion.div>

            {/* 5. Message on Cake */}
            <motion.div variants={fadeUp} className="group p-10 rounded-[3rem] bg-[#FEF0FD]/30 border-2 border-transparent hover:border-[#F5CB73]/20 transition-all duration-700">
               <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-[#353336] flex items-center justify-center text-[#F5CB73] shadow-xl">
                  <MessageCircle size={28} />
                </div>
                <div>
                   <h2 className="font-playfair text-3xl font-black text-[#353336] tracking-tighter">Calligraphy</h2>
                   <p className="text-[0.65rem] font-black tracking-[0.3em] text-[#F5CB73] uppercase mt-1">Inscription On Deck</p>
                </div>
              </div>
              <Input 
                value={formData.message}
                placeholder="Inscription Script..." 
                className="text-4xl py-12 bg-white border-2 border-transparent rounded-[2.5rem] font-playfair text-center italic font-black focus:border-[#F5CB73]/30 shadow-sm placeholder:not-italic placeholder:text-[#353336]/5"
                onChange={(e) => handleInputChange("message", e.target.value)}
              />
            </motion.div>

            {/* 6. Advanced Preferences */}
            <div className="grid lg:grid-cols-2 gap-12">
               <motion.div variants={fadeUp} className="group p-10 rounded-[3rem] bg-[#FEF0FD]/30 border-2 border-transparent hover:border-[#F5CB73]/20 transition-all duration-700">
                  <div className="flex items-center gap-5 mb-8">
                     <Layers size={24} className="text-[#353336]" />
                     <h2 className="font-playfair text-2xl font-black text-[#353336] tracking-tighter">Icing Texture</h2>
                  </div>
                  <Select onValueChange={(val) => handleInputChange("frosting", val)}>
                    <SelectTrigger className="bg-white border-2 border-transparent rounded-2xl h-16 shadow-sm focus:border-[#F5CB73]/30 font-black text-sm uppercase tracking-widest">
                      <SelectValue placeholder="Select Finish" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-2 border-[#F5CB73]/10">
                      {frostings.map((f) => (
                        <SelectItem key={f} value={f} className="font-black text-[0.65rem] py-3 uppercase tracking-widest">{f}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
               </motion.div>

               <motion.div variants={fadeUp} className="group p-10 rounded-[3rem] bg-[#FEF0FD]/30 border-2 border-transparent hover:border-[#F5CB73]/20 transition-all duration-700">
                  <div className="flex items-center gap-5 mb-8">
                     <Heart size={24} className="text-[#353336]" />
                     <h2 className="font-playfair text-2xl font-black text-[#353336] tracking-tighter">Dietary Ethos</h2>
                  </div>
                  <RadioGroup value={formData.isEggless} onValueChange={(val) => handleInputChange("isEggless", val)} className="flex items-center gap-6">
                    <label className={`flex-1 flex items-center justify-center gap-4 border-2 rounded-2xl h-16 cursor-pointer transition-all duration-500 ${formData.isEggless === 'egg' ? 'bg-[#353336] border-[#353336] text-[#F5CB73] shadow-xl' : 'bg-white border-transparent hover:bg-[#FEF0FD] text-[#353336]'}`}>
                      <RadioGroupItem value="egg" id="r-egg" className="hidden" />
                      <span className="font-black text-[0.65rem] uppercase tracking-widest">Classic</span>
                    </label>
                    <label className={`flex-1 flex items-center justify-center gap-4 border-2 rounded-2xl h-16 cursor-pointer transition-all duration-500 ${formData.isEggless === 'eggless' ? 'bg-[#353336] border-[#353336] text-[#F5CB73] shadow-xl' : 'bg-white border-transparent hover:bg-[#FEF0FD] text-[#353336]'}`}>
                      <RadioGroupItem value="eggless" id="r-eggless" className="hidden" />
                       <span className="font-black text-[0.65rem] uppercase tracking-widest">Egg-Free</span>
                    </label>
                  </RadioGroup>
               </motion.div>
            </div>

            {/* 7. Logistics Orchestration */}
            <motion.div variants={fadeUp} className="group p-10 rounded-[4rem] bg-[#FEF0FD]/30 border-2 border-transparent hover:border-[#F5CB73]/20 transition-all duration-700">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 rounded-2xl bg-[#353336] flex items-center justify-center text-[#F5CB73] shadow-xl">
                  <Truck size={28} />
                </div>
                <div>
                  <h2 className="font-playfair text-3xl font-black text-[#353336] tracking-tighter">Logistics</h2>
                  <p className="text-[0.65rem] font-black tracking-[0.3em] text-[#F5CB73] uppercase mt-1">Fulfillment Orchestration</p>
                </div>
              </div>
              
              <RadioGroup value={formData.deliveryType} onValueChange={(val) => handleInputChange("deliveryType", val)} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                 <label className={`flex-1 flex items-center gap-6 border-2 rounded-[2.5rem] px-8 py-10 cursor-pointer transition-all duration-700 ${formData.deliveryType === 'pickup' ? 'border-[#353336] bg-white shadow-2xl' : 'border-dashed border-[#F5CB73]/30 hover:bg-white'}`}>
                    <RadioGroupItem value="pickup" id="d-pickup" />
                    <div className="flex-1">
                        <div className="flex items-center gap-3 font-black text-[#353336] text-sm uppercase tracking-widest mb-2">
                            <MapPin size={20} className="text-[#F5CB73]" /> Studio Pickup
                        </div>
                        <p className="text-[0.65rem] font-medium text-[#434144]/60 uppercase tracking-widest">Collect from the Central Gallery</p>
                    </div>
                 </label>
                 <label className={`flex-1 flex items-center gap-6 border-2 rounded-[2.5rem] px-8 py-10 cursor-pointer transition-all duration-700 ${formData.deliveryType === 'delivery' ? 'border-[#353336] bg-white shadow-2xl' : 'border-dashed border-[#F5CB73]/30 hover:bg-white'}`}>
                    <RadioGroupItem value="delivery" id="d-delivery" />
                    <div className="flex-1">
                         <div className="flex items-center gap-3 font-black text-[#353336] text-sm uppercase tracking-widest mb-2">
                            <Truck size={20} className="text-[#F5CB73]" /> Private Transit
                        </div>
                        <p className="text-[0.65rem] font-medium text-[#434144]/60 uppercase tracking-widest">Secure Doorstep Conveyance</p>
                    </div>
                 </label>
              </RadioGroup>

              {formData.deliveryType === "delivery" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 space-y-8">
                  <div className="space-y-3">
                    <Label className="text-[0.65rem] font-black tracking-widest uppercase text-[#434144] ml-2 block">Primary Destination</Label>
                    <Textarea 
                      value={formData.address}
                      placeholder="Street Anchor, Landmark, Security Instructions..." 
                      className="bg-white border-2 border-transparent rounded-[2rem] p-8 text-lg font-medium min-h-[120px] focus:border-[#F5CB73]/30 shadow-sm resize-none"
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>
                  
                  <div className="max-w-xs space-y-3">
                     <Label className="text-[0.65rem] font-black tracking-widest uppercase text-[#434144] ml-2 block">Region Code</Label>
                     <Input value={formData.pincode} type="text" placeholder="6-Digit Zip" className="bg-white border-2 border-transparent rounded-2xl h-16 shadow-sm focus:border-[#F5CB73]/30 font-black text-sm uppercase tracking-widest px-8" maxLength={6} onChange={(e) => handleInputChange("pincode", e.target.value)} />
                  </div>
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[0.65rem] font-black tracking-widest uppercase text-[#434144] ml-2">Arriving Calendar</Label>
                  <div className="relative">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-[#F5CB73]" />
                      <Input value={formData.deliveryDate} type="date" className="pl-16 bg-white border-2 border-transparent rounded-2xl h-16 shadow-sm focus:border-[#F5CB73]/30 font-black text-sm uppercase tracking-widest" onChange={(e) => handleInputChange("deliveryDate", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-[0.65rem] font-black tracking-widest uppercase text-[#434144] ml-2">Arriving Window</Label>
                   <div className="relative">
                      <Clock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-[#F5CB73]" />
                      <Input value={formData.deliveryTime} type="time" className="pl-16 bg-white border-2 border-transparent rounded-2xl h-16 shadow-sm focus:border-[#F5CB73]/30 font-black text-sm uppercase tracking-widest" onChange={(e) => handleInputChange("deliveryTime", e.target.value)} />
                   </div>
                </div>
              </div>
            </motion.div>

            {/* 8. Identification */}
            <motion.div variants={fadeUp} className="group p-10 rounded-[3rem] bg-[#FEF0FD]/30 border-2 border-transparent hover:border-[#F5CB73]/20 transition-all duration-700">
               <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-[#353336] flex items-center justify-center text-[#F5CB73] shadow-xl">
                  <User size={28} />
                </div>
                <div>
                   <h2 className="font-playfair text-3xl font-black text-[#353336] tracking-tighter">Client Identity</h2>
                   <p className="text-[0.65rem] font-black tracking-[0.3em] text-[#F5CB73] uppercase mt-1">Personal Verification</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <Label className="text-[0.65rem] font-black tracking-widest uppercase text-[#434144] ml-2">Legal Handle</Label>
                   <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-[#F5CB73]" />
                      <Input value={formData.name} type="text" placeholder="Full Signature" className="pl-16 bg-white border-2 border-transparent rounded-2xl h-16 shadow-sm focus:border-[#F5CB73]/30 font-black text-sm uppercase tracking-widest px-8" onChange={(e) => handleInputChange("name", e.target.value)} />
                   </div>
                </div>

                <div className="space-y-3">
                   <Label className="text-[0.65rem] font-black tracking-widest uppercase text-[#434144] ml-2">Direct Channel</Label>
                   <div className="relative">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-[#F5CB73]" />
                      <Input value={formData.mobile} type="tel" placeholder="Digitized Contact" className="pl-16 bg-white border-2 border-transparent rounded-2xl h-16 shadow-sm focus:border-[#F5CB73]/30 font-black text-sm uppercase tracking-widest px-8" onChange={(e) => handleInputChange("mobile", e.target.value)} />
                   </div>
                </div>
              </div>
              <p className="text-[0.6rem] font-black tracking-[0.2em] uppercase text-[#F5CB73] mt-8 text-center bg-[#353336]/5 py-4 rounded-xl">🔒 Direct consultation to follow for valuation and material selection.</p>
            </motion.div>

            <motion.div variants={fadeUp} whileHover={{ scale: 1.01, y: -8 }} whileTap={{ scale: 0.99 }}>
              <Button type="submit" disabled={isSubmitting}
                className="w-full bg-[#353336] hover:bg-[#F5CB73] text-white hover:text-[#353336] h-24 rounded-[2rem] text-xl font-black uppercase tracking-[0.5em] shadow-2xl shadow-[#353336]/30 transition-all duration-700 group flex items-center justify-center gap-6"
              >
                {isSubmitting ? 'TRANSMITTING...' : 'COMMIT CONCEPT'} 
                {!isSubmitting && <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform duration-500" />}
              </Button>
            </motion.div>

          </form>
        </motion.div>
      </main>
      <FooterSection />
    </div>
  );
}
