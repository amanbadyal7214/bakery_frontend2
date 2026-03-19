import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductActions } from "../components/home/home-data";
import { api } from "@/services/api";
import Navbar from "@/components/Navbar";
import CartSheet from "@/components/CartSheet";
import FooterSection from "@/components/home/FooterSection";
import { ArrowLeft, Star, ShoppingBag, Truck, ShieldCheck, Heart, Share2, Plus, Minus, Sparkles, ChefHat, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleAddToCart } = useProductActions();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0); 
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);

  const [flavors, setFlavors] = useState<string[]>(["Classic Artisan", "Velvet Silk", "Ebony Ganache"]);
  const [weightOptions, setWeightOptions] = useState<Array<{label:string; pack:string; multiplier:number}>>([
    { label: "500 g", pack: "Individual Collection", multiplier: 1 },
    { label: "1 kg", pack: "Royal Collection", multiplier: 1.8 },
  ]);

  useEffect(() => {
    if (!id || id === 'undefined' || String(id).trim() === '') {
      setError('Invalid artifact identifier.');
      return;
    }
    let mounted = true;
    setError(null);
    setLoading(true);
    api.products.getById(String(id))
      .then((res) => { 
        if (!mounted) return; 
        const p = res as any;
        setProduct(p);
        if (Array.isArray(p?.flavor) && p.flavor.length > 0) {
          setFlavors(p.flavor as string[]);
          setSelectedFlavor(String(p.flavor[0]));
        }
        if (Array.isArray(p?.weight) && p.weight.length > 0) {
          const parsed = (p.weight as string[]).map((w: string, idx: number) => {
            const match = w.match(/([0-9]+(?:\.[0-9]+)?)/);
            let multiplier = 1;
            if (match) {
              const num = Number(match[1]);
              if (/kg/i.test(w)) multiplier = (num * 1000) / 500;
              else if (/g/i.test(w)) multiplier = num / 500;
              else multiplier = idx === 0 ? 1 : 1 + idx;
            }
            return { label: w, pack: 'Studio Collection', multiplier };
          });
          setWeightOptions(parsed);
          setSelectedWeightIndex(0);
        }
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        const status = (err as unknown as { response?: { status?: number } })?.response?.status;
        if (status === 404) setError('Artifact not found in archive.');
        else setError('Failed to retrieve studio creation.');
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id]);

  const currentPrice = product
    ? (Array.isArray(product.pricesByWeight) && product.pricesByWeight[selectedWeightIndex] !== undefined)
      ? product.pricesByWeight[selectedWeightIndex]
      : product.price
    : 0;

  const formatCurrency = (v: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(v);

  if (loading) return (
    <div className="min-h-screen bg-[#FEF0FD]/30 flex flex-col items-center justify-center font-inter">
      <div className="w-16 h-16 border-4 border-[#F5CB73]/20 border-t-[#F5CB73] rounded-full animate-spin mb-6" />
      <p className="text-[#353336] font-black uppercase tracking-[0.4em] text-xs">Accessing Studio Archive...</p>
    </div>
  );

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FEF0FD]/30 font-inter px-6 text-center">
        <div className="w-24 h-24 bg-[#353336] rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl">
          <Info size={40} className="text-[#F5CB73]" />
        </div>
        <h2 className="font-playfair text-4xl md:text-5xl font-black text-[#353336] mb-6 tracking-tighter">{error || "Artifact Not Found"}</h2>
        <button onClick={() => navigate("/")}
          className="group bg-[#353336] hover:bg-[#F5CB73] text-white hover:text-[#353336] px-12 py-5 rounded-2xl font-black text-xs tracking-[0.3em] uppercase transition-all duration-500 flex items-center gap-4 no-underline shadow-2xl shadow-[#353336]/20"
        >
          <ArrowLeft size={16} /> Return to Gallery
        </button>
      </div>
    );
  }

  const productImages = [
    product.imgBase64 || product.img || (product.images && product.images[0] && (product.images[0].base64 || product.images[0].url)) || '/placeholder.svg',
    ...(product.images || []).slice(0,2).map((it: any) => it.base64 || it.url).filter(Boolean),
  ];

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) setQuantity(prev => prev - 1);
    if (type === "inc" && quantity < 10) setQuantity(prev => prev + 1);
  };

  const onAddToCart = () => {
    if (!product) return;
    const variantProduct = {
      ...product,
      name: `${product.name} (${selectedFlavor}, ${weightOptions[selectedWeightIndex].label})`,
      price: currentPrice
    };
    for(let i=0; i<quantity; i++) handleAddToCart(variantProduct);
  };

  return (
    <div className="min-h-screen bg-[#FEF0FD]/30 font-inter text-[#353336] overflow-x-hidden selection:bg-[#F5CB73] selection:text-[#353336]">
      <Navbar />
      <CartSheet />
      
      <div className="pt-40 pb-32 px-6 md:px-10 max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <button 
          onClick={() => navigate("/menu")}
          className="flex items-center gap-4 text-[#353336]/40 hover:text-[#F5CB73] mb-12 transition-all duration-500 text-[0.65rem] font-black uppercase tracking-[0.3em] group no-underline"
        >
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm group-hover:shadow-xl group-hover:-translate-x-2 transition-all flex items-center justify-center">
            <ArrowLeft size={16} /> 
          </div>
          Return to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          
          {/* Left: Cinematic Image Gallery */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-[3.5rem] overflow-hidden shadow-[0_64px_128px_-32px_rgba(53,51,54,0.15)] bg-white p-16 group border-2 border-[#F5CB73]/10"
            >
                <div className="absolute inset-0 bg-[#FEF0FD]/20" />
                <AnimatePresence mode="wait">
                    <motion.img 
                        key={activeImage} initial={{ opacity: 0, scale: 0.9, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        src={productImages[activeImage]} alt={product.name} 
                        className="w-full h-full object-contain drop-shadow-[0_24px_48px_rgba(53,51,54,0.15)] z-10 relative"
                    />
                </AnimatePresence>
                
                {product.badge && (
                  <div className="absolute top-10 left-10 z-20">
                    <div className="bg-[#353336] text-[#F5CB73] px-6 py-2 rounded-xl text-[0.6rem] font-black uppercase tracking-[0.4em] shadow-2xl flex items-center gap-3">
                      <Sparkles size={12} className="animate-pulse" />
                      {product.badge}
                    </div>
                  </div>
                )}

                <div className="absolute top-10 right-10 z-20 flex flex-col gap-4">
                    <button className="w-14 h-14 bg-white/80 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl hover:bg-[#F5CB73] hover:text-[#353336] text-[#353336]/20 transition-all duration-500 scale-90 hover:scale-100">
                        <Heart size={20} className="group-hover:fill-current" />
                    </button>
                    <button className="w-14 h-14 bg-white/80 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl hover:bg-[#F5CB73] hover:text-[#353336] text-[#353336]/20 transition-all duration-500 scale-90 hover:scale-100">
                        <Share2 size={20} />
                    </button>
                </div>
            </motion.div>

            {/* Thumbnail Selection */}
            <div className="flex justify-center gap-6">
                {productImages.map((img, idx) => (
                    <button key={idx} onClick={() => setActiveImage(idx)}
                        className={`relative w-24 h-24 rounded-2xl bg-white p-3 border-2 transition-all duration-500 ${activeImage === idx ? 'border-[#F5CB73] shadow-xl -translate-y-2' : 'border-transparent opacity-40 hover:opacity-100 hover:scale-105'}`}
                    >
                        <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-contain" />
                    </button>
                ))}
            </div>
          </div>

          {/* Right: Detailed Specification */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col pt-4"
          >
            <div className="flex items-center gap-6 mb-10">
              <span className="px-5 py-2 bg-[#353336] rounded-xl text-[#F5CB73] font-black text-[0.6rem] tracking-[0.4em] uppercase shadow-lg shadow-[#353336]/20">{product.category}</span>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={Number(product.rating) >= i + 1 ? "fill-[#F5CB73] text-[#F5CB73]" : "text-[#353336]/10"} />
                ))}
                <span className="text-[#353336]/40 text-[0.7rem] font-black uppercase tracking-widest ml-3">{Number(product.rating).toFixed(1)} {product.reviewsCount ? ` • ${product.reviewsCount} Archive Notes` : ''}</span>
              </div>
            </div>

            <h1 className="font-playfair text-6xl md:text-8xl font-black text-[#353336] mb-8 leading-[0.85] tracking-tighter">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-6 mb-12">
              <span className="text-6xl font-playfair font-black text-[#353336] tracking-tighter">
                {formatCurrency(currentPrice * quantity)}
              </span>
              {quantity > 1 && (
                 <span className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#353336]/40 mb-2">
                    ({formatCurrency(currentPrice)} per creation)
                 </span>
              )}
            </div>

            {/* Profile Selection */}
            <div className="mb-10 p-8 rounded-[2.5rem] bg-white border border-[#F5CB73]/10 shadow-sm">
                <p className="text-[0.65rem] font-black tracking-[0.4em] uppercase text-[#F5CB73] mb-6">Flavor Profile Selector</p>
                <div className="flex flex-wrap gap-3">
                    {flavors.map((flavor) => (
                        <button key={flavor} onClick={() => setSelectedFlavor(flavor)}
                            className={`px-6 py-3 rounded-xl border-2 text-[0.7rem] font-black uppercase tracking-widest transition-all duration-500 ${selectedFlavor === flavor ? "border-[#353336] bg-[#353336] text-[#F5CB73] shadow-xl" : "border-transparent bg-[#FEF0FD]/40 text-[#353336] hover:bg-[#FEF0FD]"}`}
                        >
                            {flavor}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dimension Selection */}
            <div className="mb-12 p-8 rounded-[2.5rem] bg-white border border-[#F5CB73]/10 shadow-sm">
                <p className="text-[0.65rem] font-black tracking-[0.4em] uppercase text-[#F5CB73] mb-6">Creation Magnitude</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {weightOptions.map((option, index) => {
                         const optionPrice = Array.isArray(product.pricesByWeight) && product.pricesByWeight[index] !== undefined ? product.pricesByWeight[index] : product.price;
                          return (
                            <button key={index} onClick={() => setSelectedWeightIndex(index)}
                                className={`text-left p-6 rounded-2xl border-2 transition-all duration-500 group/opt ${selectedWeightIndex === index ? "border-[#353336] bg-[#353336] text-white shadow-2xl" : "border-transparent bg-[#FEF0FD]/40 text-[#353336] hover:bg-[#FEF0FD]"}`}
                            >
                                <div className="font-black text-[0.7rem] uppercase tracking-widest mb-1">{option.label}</div>
                                <div className={`text-[0.55rem] font-black uppercase tracking-widest mb-4 opacity-40 ${selectedWeightIndex === index ? "text-[#F5CB73]" : ""}`}>{option.pack}</div>
                                <div className="font-playfair text-xl font-black tracking-tight">{formatCurrency(optionPrice)}</div>
                            </button>
                         );
                    })}
                 </div>
             </div>
            
            {/* Action Matrix */}
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
                <div className="flex items-center bg-white rounded-2xl p-2 shadow-sm border border-[#F5CB73]/10 w-fit">
                    <button onClick={() => handleQuantityChange("dec")} disabled={quantity <= 1}
                        className="w-14 h-14 flex items-center justify-center rounded-xl hover:bg-[#FEF0FD] transition-all text-[#353336] disabled:opacity-10"
                    >
                        <Minus size={20} />
                    </button>
                    <span className="w-14 text-center text-xl font-black font-playfair">{quantity}</span>
                    <button onClick={() => handleQuantityChange("inc")} disabled={quantity >= 10}
                        className="w-14 h-14 flex items-center justify-center rounded-xl hover:bg-[#FEF0FD] transition-all text-[#353336]"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                <Button onClick={onAddToCart}
                    className="flex-1 h-20 bg-[#353336] text-white hover:text-[#353336] font-black text-xs uppercase tracking-[0.4em] rounded-[1.5rem] hover:bg-[#F5CB73] transition-all duration-700 shadow-2xl shadow-[#353336]/20 active:scale-95 flex items-center justify-center gap-4 relative overflow-hidden group"
                >
                    <ShoppingBag size={20} className="relative z-10" />
                    <span className="relative z-10">Archive Acquisition</span>
                </Button>
            </div>

            {/* Knowledge Accordion */}
            <div className="mb-16">
                <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="desc">
                    {[
                      { id: "desc", title: "Creation Narrative", content: product.tasteDescription || product.description || 'No descriptive arc available for this creation.' },
                      { id: "ingredients", title: "Elemental Composition", content: (product.ingredients || []).length > 0 ? (product.ingredients || []).join(', ') : 'Proprietary studio blend.' },
                      { id: "shipping", title: "Logistical Transit", content: "Artisan-grade secure transit available. Global handling varies by region." },
                      { id: "details", title: "Studio Metadata", content: `Shape: ${product.shape || 'Sculptural'} • Theme: ${product.theme || 'Artisan Legacy'}` }
                    ].map((item) => (
                      <AccordionItem key={item.id} value={item.id} className="border-none">
                          <AccordionTrigger className="flex gap-4 p-8 rounded-3xl bg-white border border-[#F5CB73]/5 text-[#353336] font-playfair font-black text-xl hover:no-underline hover:bg-[#FEF0FD]/50 transition-all text-left">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent className="p-10 text-[#434144] leading-relaxed text-lg font-medium opacity-60 ml-4 border-l-2 border-[#F5CB73]/20">
                              {item.content}
                          </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
            </div>

            {/* Artisan Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-10 bg-[#353336] rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div aria-hidden className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150" />
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-[#F5CB73] shadow-inner">
                  <Truck size={28} />
                </div>
                <div>
                  <h4 className="font-playfair font-black text-white text-lg tracking-tight">Gallerie Transit</h4>
                  <p className="text-[0.6rem] text-[#F5CB73] font-black uppercase tracking-[0.2em] mt-1">Insured over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-[#F5CB73] shadow-inner">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 className="font-playfair font-black text-white text-lg tracking-tight">Studio Certified</h4>
                  <p className="text-[0.6rem] text-[#F5CB73] font-black uppercase tracking-[0.2em] mt-1">Baked Fresh Hour of Order</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
