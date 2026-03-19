import { useState, useEffect } from "react";
import { useProductActions } from "../components/home/home-data";
import Navbar from "../components/Navbar";
import CartSheet from "../components/CartSheet";
import FooterSection from "../components/home/FooterSection";
import FilterSidebar, { FilterState } from "../components/FilterSidebar";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ShoppingBag, Star, Filter, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom"; 

// derive categories dynamically from loaded products; include 'All' as first option
// default fallback to common categories until products load
const defaultCategories = ["Cakes", "Pastries", "Breads", "Cookies", "Muffins"];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    flavor: [],
    type: [],
    occasion: [],
    priceRange: [0, 5000], 
    weight: [],
    delivery: [],
    rating: null,
    dietary: [],
    shape: [],
    theme: [],
  });
  
  const { handleAddToCart } = useProductActions();
  const navigate = useNavigate(); 

  // products loaded from backend API (replace demo import)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?limit=100`, { signal: controller.signal });
        if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
        const json = await res.json();
        console.log('Menu page API response:', json);
        const result = json && Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : null);
        if (mounted && result) setProducts(result);
        else if (mounted) setProducts([]);
      } catch (e) {
        console.warn('Menu page fetch error:', e);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; controller.abort(); };
  }, []);

  // derive dynamic categories from products
  const categories = (() => {
    try {
      const set = new Set<string>();
      for (const p of products) {
        const cat = p?.category;
        if (!cat) continue;
        if (Array.isArray(cat)) {
          for (const c of cat) if (c) set.add(String(c));
        } else if (typeof cat === 'string') {
          set.add(cat);
        }
      }
      const arr = Array.from(set);
      return ['All', ...(arr.length ? arr : defaultCategories)];
    } catch (e) {
      return ['All', ...defaultCategories];
    }
  })();

  // keep selectedCategory valid if products (and derived categories) change
  useEffect(() => {
    if (selectedCategory === 'All') return;
    if (!categories.includes(selectedCategory)) setSelectedCategory('All');
  }, [categories]);

  // helper to choose image src: prefer base64/data then stored paths
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getImageSrc = (p: Record<string, any>) => {
    if (!p) return '/placeholder.svg';
    if (typeof p.imgBase64 === 'string' && p.imgBase64) return p.imgBase64;
    if (typeof p.img === 'string' && p.img) return (p.img.startsWith('data:') || p.img.startsWith('http') || p.img.startsWith('/')) ? p.img : (`/${p.img}`);
    if (Array.isArray(p.images) && p.images.length) {
      const first = p.images[0];
      if (first && typeof first.base64 === 'string' && first.base64) return first.base64;
      if (first && typeof first.url === 'string' && first.url) return (first.url.startsWith('/') || first.url.startsWith('http')) ? first.url : `/${first.url}`;
    }
    if (typeof p.image === 'string' && p.image) return p.image;
    return '/placeholder.svg';
  };

  // compute which of the currently selected filters a product matches
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMatchedTags = (p: Record<string, any>) => {
    const tags: string[] = [];
    const pushIf = (vals: string[] | undefined) => {
      if (!vals || vals.length === 0) return;
      for (const v of vals) if (v && !tags.includes(v)) tags.push(v);
    };

    // category
    if (filters.category && filters.category.length > 0 && filters.category.includes(p.category)) pushIf([p.category]);

    // flavor (product may have string or array)
    const prodFlavor = Array.isArray(p.flavor) ? p.flavor : (typeof p.flavor === 'string' ? p.flavor.split(',').map((s:string)=>s.trim()) : []);
    const matchedFlavor = filters.flavor?.filter(f => prodFlavor.includes(f)) || [];
    pushIf(matchedFlavor);

    // type
    const prodType = Array.isArray(p.type) ? p.type : (typeof p.type === 'string' ? p.type.split(',').map((s:string)=>s.trim()) : []);
    const matchedType = filters.type?.filter(t => prodType.includes(t)) || [];
    pushIf(matchedType);

    // occasion
    const prodOcc = Array.isArray(p.occasion) ? p.occasion : (typeof p.occasion === 'string' ? p.occasion.split(',').map((s:string)=>s.trim()) : []);
    const matchedOcc = filters.occasion?.filter(o => prodOcc.includes(o)) || [];
    pushIf(matchedOcc);

    // weight
    const prodWeight = Array.isArray(p.weight) ? p.weight : (typeof p.weight === 'string' ? p.weight.split(',').map((s:string)=>s.trim()) : []);
    const matchedWeight = filters.weight?.filter(w => prodWeight.includes(w)) || [];
    pushIf(matchedWeight);

    // delivery, dietary, shape, theme
    const prodDelivery = Array.isArray(p.delivery) ? p.delivery : (p.delivery ? [p.delivery] : []);
    pushIf(filters.delivery?.filter(d => prodDelivery.includes(d)));

    const prodDietary = Array.isArray(p.dietary) ? p.dietary : (p.dietary ? [p.dietary] : []);
    pushIf(filters.dietary?.filter(d => prodDietary.includes(d)));

    if (filters.shape && filters.shape.length > 0 && p.shape && filters.shape.includes(p.shape)) pushIf([p.shape]);
    if (filters.theme && filters.theme.length > 0 && p.theme && filters.theme.includes(p.theme)) pushIf([p.theme]);

    return tags.slice(0, 6);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // If sidebar category filter selects exactly one category, mirror it to the top tab
    if (Array.isArray(newFilters.category) && newFilters.category.length === 1) {
      setSelectedCategory(newFilters.category[0]);
    } else if (Array.isArray(newFilters.category) && newFilters.category.length === 0) {
      setSelectedCategory("All");
    } else if (Array.isArray(newFilters.category) && newFilters.category.length > 1) {
      // When multiple categories are selected, clear the top tab selection to 'All' to avoid conflict
      setSelectedCategory("All");
    }
  };

  // helper to compare tags (case-insensitive and tolerant to simple singular/plural mismatch)
  const matches = (a?: string | null, b?: string | null) => {
    if (!a || !b) return false;
    const A = String(a).toLowerCase().trim();
    const B = String(b).toLowerCase().trim();
    if (A === B) return true;
    if (A === B + 's' || B === A + 's') return true;
    return false;
  };

  const fieldMatchesAny = (fieldValue: any, filtersArr: string[]) => {
    if (!filtersArr || filtersArr.length === 0) return true;
    if (Array.isArray(fieldValue)) {
      return filtersArr.some(f => fieldValue.some((v: any) => matches(v, f)));
    }
    return filtersArr.some(f => matches(fieldValue, f));
  };

  const filteredProducts = products.filter(p => {
    // 1. Category Filter (Top tabs)
    if (selectedCategory !== "All" && !matches(p.category, selectedCategory)) return false;

    // 2. Sidebar Category Filter
    if (filters.category.length > 0 && !filters.category.some(c => matches(p.category, c))) return false;

    // 3. Price Range
    if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;

    // 4. Rating
    if (filters.rating && (p.rating || 0) < filters.rating) return false;

    // 5. Dynamic Filters (Flavor, Type, Occasion, etc.)
    if (filters.flavor.length > 0 && !fieldMatchesAny(p.flavor, filters.flavor)) return false;
    if (filters.type.length > 0 && !fieldMatchesAny(p.type, filters.type)) return false;
    if (filters.occasion.length > 0 && !fieldMatchesAny(p.occasion, filters.occasion)) return false;
    if (filters.weight.length > 0 && !fieldMatchesAny(p.weight, filters.weight)) return false;
    if (filters.delivery.length > 0 && !fieldMatchesAny(p.delivery, filters.delivery)) return false;
    if (filters.dietary.length > 0 && !fieldMatchesAny(p.dietary, filters.dietary)) return false;
    if (filters.shape.length > 0 && !filters.shape.some(s => matches(p.shape, s))) return false;
    if (filters.theme.length > 0 && !filters.theme.some(t => matches(p.theme, t))) return false;

    return true;
  });

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <div className="min-h-screen bg-[#FEF0FD]/30 font-inter text-[#353336] selection:bg-[#F5CB73] selection:text-[#353336] overflow-x-hidden">
      <Navbar />
      <CartSheet />
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#F5CB73]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#353336]/5 rounded-full blur-[100px]" />
      </div>

      <div className="pt-36 relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-10">
        
        <div className="flex flex-col lg:flex-row items-start gap-12 min-h-[calc(100vh-8rem)]">
            
          <aside className="hidden lg:block w-[320px] min-w-[320px] sticky top-32 self-start rounded-[2.5rem] bg-white border border-[#F5CB73]/10 shadow-[0_32px_64px_-16px_rgba(53,51,54,0.05)] transition-all duration-500 hover:shadow-[0_48px_80px_-24px_rgba(53,51,54,0.08)] overflow-hidden">
               <FilterSidebar onFilterChange={handleFilterChange} className="bg-white shadow-none border-none h-auto" />
          </aside>

          <AnimatePresence>
            {isFilterOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFilterOpen(false)}
                  className="fixed inset-0 bg-[#353336]/40 backdrop-blur-sm z-40 lg:hidden"
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-[#FEF0FD] z-50 overflow-y-auto lg:hidden shadow-2xl border-r border-[#F5CB73]/20"
                >
                   <div className="p-6 flex justify-between items-center bg-[#353336] text-[#F5CB73]">
                     <h2 className="font-playfair font-black text-xl tracking-wider flex items-center gap-2">
                        <Filter size={18} /> Filters
                     </h2>
                     <button onClick={() => setIsFilterOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors">
                       <X size={20} />
                     </button>
                   </div>
                   <FilterSidebar onFilterChange={handleFilterChange} className="bg-transparent shadow-none border-none" onClose={() => setIsFilterOpen(false)} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <main className="flex-1 w-full pb-20">
              
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                   <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-[1px] bg-[#F5CB73]"></span>
                      <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#F5CB73]">Our Menu / {selectedCategory}</p>
                   </div>
                   <h1 className="font-playfair font-black text-4xl md:text-6xl text-[#353336] tracking-tight">
                      Baked with <span className="text-[#F5CB73] italic">Soul</span>
                   </h1>
                </div>

                <Button 
                  onClick={() => setIsFilterOpen(true)}
                  variant="outline" 
                  className="lg:hidden bg-white border-[#F5CB73]/20 text-[#353336] hover:bg-[#353336] hover:text-[#F5CB73] gap-3 rounded-2xl h-14 px-8 font-black text-xs uppercase tracking-widest shadow-lg shadow-[#353336]/5 transition-all duration-300"
                >
                  <Filter size={16} /> Filters
                </Button>
            </div>

            <div className="sticky top-[90px] lg:static z-20 -mx-6 px-6 py-4 bg-white/80 backdrop-blur-xl lg:bg-transparent lg:p-0 lg:mx-0 mb-12 border-b border-[#F5CB73]/10 lg:border-none rounded-b-3xl">
              <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none lg:flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setFilters(prev => ({ ...prev, category: cat === 'All' ? [] : [cat] }));
                    }}
                    className={`whitespace-nowrap px-8 py-3.5 rounded-2xl text-[0.7rem] font-black uppercase tracking-[0.2em] transition-all duration-500 border-2 select-none ${
                      selectedCategory === cat
                        ? "bg-[#353336] text-[#F5CB73] border-[#353336] shadow-xl shadow-[#353336]/20 transform -translate-y-1"
                        : "bg-white text-[#686669] border-[#F5CB73]/5 hover:border-[#F5CB73]/30 hover:text-[#353336] hover:bg-white shadow-sm"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <motion.article key={p.id}
                  layout
                  variants={item}
                  initial="hidden"
                  animate="show"
                   exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                  className="group relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(53,51,54,0.08)] cursor-pointer bg-white"
                >
                  <div onClick={() => {
                    const prodId = (p && (p._id ?? p.id ?? '')) || '';
                    if (!prodId) return;
                    navigate(`/product/${prodId}`);
                  }} className="block h-full w-full"> 
                    
                    <div className="absolute inset-0 w-full h-full">
                      <img src={getImageSrc(p)} alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0" />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#353336] via-[#353336]/60 to-transparent opacity-80" />

                    <div className="absolute inset-0 p-10 flex flex-col justify-end text-white z-10">
                      <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <div className="flex justify-between items-end mb-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                              {p.badge && (
                                <span className="w-fit px-3 py-1 rounded-lg bg-[#F5CB73] text-[#353336] text-[0.6rem] font-black uppercase tracking-wider">
                                  {p.badge}
                                </span>
                              )}
                              <h3 className="font-playfair text-3xl font-black leading-tight group-hover:text-[#F5CB73] transition-colors tracking-tight">
                                {p.name}
                              </h3>
                            </div>
                            
                            { (filters && (Object.values(filters).some(v => Array.isArray(v) ? v.length>0 : v !== null)) ) && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {getMatchedTags(p).map((t) => (
                                  <span key={t} className="text-[0.6rem] font-black uppercase tracking-widest bg-white/10 px-3 py-1 rounded-lg border border-white/10 backdrop-blur-md">{t}</span>
                                ))}
                              </div>
                            )}
                         </div>
                          <span className="bg-white/10 px-5 py-2 rounded-xl text-lg font-black backdrop-blur-md border border-white/10 text-[#F5CB73]">
                            ${p.price.toFixed(2)}
                          </span>
                        </div>

                        <p className="text-white/60 text-sm mb-6 line-clamp-2 opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 delay-100 font-medium">
                          Experience the taste of our premium {p.category.toLowerCase()}, baked fresh every morning with organic ingredients.
                        </p>

                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 fill-[#F5CB73] text-[#F5CB73]" />
                            <span className="text-white font-black text-sm">{p.rating || "4.8"}</span>
                          </div>
                          <span className="text-white/40 text-[0.6rem] font-black uppercase tracking-[0.2em]">
                            {p.category}
                          </span>
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(p);
                          }}
                          className="w-full bg-[#F5CB73] text-[#353336] font-black py-5 rounded-2xl hover:bg-white transition-all duration-500 text-[0.7rem] uppercase tracking-[0.2em] shadow-2xl shadow-[#353336]/40 flex items-center justify-center gap-4 group/btn overflow-hidden relative"
                        >
                          <span className="relative z-10">Add to Cart</span>
                          <ShoppingBag size={18} className="relative z-10 group-hover/btn:scale-125 transition-transform duration-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-32 flex flex-col items-center">
                <div className="w-32 h-32 bg-[#F5CB73]/10 rounded-full flex items-center justify-center mb-8 text-6xl shadow-inner shadow-[#F5CB73]/5">🍪</div>
                <h3 className="text-4xl font-playfair font-black text-[#353336] mb-4">No matching recipes</h3>
                <p className="text-[#686669] font-medium text-lg">Try adjusting your filters or search for something else.</p>
                <button 
                   onClick={() => setSelectedCategory("All")}
                   className="mt-10 text-[#F5CB73] font-black text-xs uppercase tracking-[0.3em] border-b-4 border-[#F5CB73] hover:text-[#353336] hover:border-[#353336] transition-all pb-2"
                >
                  Reset Studio Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
 

      <FooterSection />
    </div>
  );
}
