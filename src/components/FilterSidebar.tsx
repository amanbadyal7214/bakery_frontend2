import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Filter } from "lucide-react";
import { api } from "@/services/api";

export interface FilterState {
  category: string[];
  flavor: string[];
  type: string[];
  occasion: string[];
  priceRange: [number, number];
  weight: string[];
  delivery: string[];
  dietary: string[];
  rating: number | null;
  shape: string[];
  theme: string[];
}

const initialFilters: FilterState = {
  category: [],
  flavor: [],
  type: [],
  occasion: [],
  priceRange: [0, 2000],
  weight: [],
  delivery: [],
  dietary: [],
  rating: null,
  shape: [],
  theme: [],
};

const defaultFilterOptions = {
  category: ["Cakes", "Cupcakes", "Pastries", "Cookies", "Donuts", "Pies & Tarts", "Gift Hampers", "Chocolates"],
  flavor: ["Chocolate", "Vanilla", "Red Velvet", "Butterscotch", "Black Forest", "Pineapple", "Strawberry", "Coffee", "Mango"],
  type: ["Eggless", "Egg Cake", "Vegan Cake", "Sugar-Free Cake", "Gluten-Free Cake", "Designer Cake", "Photo Cake", "Fondant Cake", "Theme Cake"],
  occasion: ["Birthday", "Anniversary", "Valentine's Day", "Baby Shower", "Graduation", "Christmas", "Diwali", "Party"],
  weight: ["500g", "1 Kg", "1.5 Kg", "2 Kg", "3 Kg+"],
  delivery: [],
  dietary: [],
  shape: ["Round", "Heart Shape", "Square", "Cartoon Shape", "Number Cake"],
  theme: ["Kids Theme", "Superhero Theme", "Princess Theme", "Football Theme", "Wedding Theme"],
};

const useDynamicOptions = () => {
  const [options, setOptions] = useState<typeof defaultFilterOptions>(defaultFilterOptions);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const requests = [
          api.categories.getAll().catch(() => []),
          api.flavors.getAll().catch(() => []),
          api.weights.getAll().catch(() => []),
          api.types.getAll().catch(() => []),
          api.occasions.getAll().catch(() => []),
          api.shapes.getAll().catch(() => []),
          api.themes.getAll().catch(() => []),
        ];

        const results = await Promise.all(requests);
        if (!mounted) return;

        const normalizeResp = (r: any) => {
          if (!r) return [];
          if (Array.isArray(r)) return r;
          if (r && typeof r === 'object' && r.data !== undefined) {
            return Array.isArray(r.data) ? r.data : [r.data];
          }
          if (typeof r === 'object') return [r];
          return [];
        };

        const toStrings = (arr: any[]) => (arr || []).map((it) => {
          if (typeof it === 'string') return it;
          if (it && typeof it === 'object') {
            const obj = it as any;
            return obj.name || obj.title || obj.label || obj.type || String(obj._id) || '';
          }
          return '';
        }).filter(Boolean);

        const [cats, flvs, wts, types, occ, shp, thm] = results.map(normalizeResp);

        let built = {
          category: toStrings(cats),
          flavor: toStrings(flvs),
          type: toStrings(types),
          occasion: toStrings(occ),
          weight: toStrings(wts),
          shape: toStrings(shp),
          theme: toStrings(thm),
        };

        setOptions({
          category: built.category.length ? built.category : defaultFilterOptions.category,
          flavor: built.flavor.length ? built.flavor : defaultFilterOptions.flavor,
          type: built.type.length ? built.type : defaultFilterOptions.type,
          occasion: built.occasion.length ? built.occasion : defaultFilterOptions.occasion,
          weight: built.weight.length ? built.weight : defaultFilterOptions.weight,
          shape: built.shape.length ? built.shape : defaultFilterOptions.shape,
          theme: built.theme.length ? built.theme : defaultFilterOptions.theme,
          delivery: defaultFilterOptions.delivery,
          dietary: defaultFilterOptions.dietary,
        });
      } catch (e) {
        // noop
      }
    })();
    return () => { mounted = false; };
  }, []);

  return options;
};

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({ onFilterChange, className, isOpen, onClose }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const options = useDynamicOptions();

  const handleCheckboxChange = (section: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const current = prev[section] as string[];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      
      const newFilters = { ...prev, [section]: updated };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: value as [number, number] };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    onFilterChange?.(initialFilters);
  };

  return (
    <div className={`bg-[#FEF0FD]/80 backdrop-blur-xl border-r border-[#F5CB73]/10 h-full ${className}`}>
      <div className="p-6 border-b border-[#F5CB73]/10 flex items-center justify-between sticky top-0 bg-[#FEF0FD]/90 backdrop-blur-md z-20">
        <div className="flex items-center gap-3 text-[#353336]">
          <div className="w-10 h-10 rounded-xl bg-[#F5CB73]/10 flex items-center justify-center text-[#F5CB73]">
            <Filter size={22} strokeWidth={2.5} />
          </div>
          <h2 className="font-playfair font-bold text-2xl tracking-tight">Refine</h2>
        </div>
        <div className="flex items-center gap-3">
           <button 
            onClick={clearFilters}
            className="text-[10px] font-black leading-none text-[#686669] hover:text-[#F5CB73] uppercase tracking-[0.2em] transition-colors"
          >
            Clear
          </button>
          {onClose && (
            <button onClick={onClose} className="md:hidden text-[#434144] w-10 h-10 flex items-center justify-center rounded-xl bg-white/50 border border-[#F5CB73]/10 shadow-sm">
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-80px)] p-6">
        <div className="space-y-6 pb-20">
          <Accordion type="multiple" defaultValue={["category", "price", "flavor"]} className="w-full space-y-4">
            
            <AccordionItem value="price" className="border-none bg-white rounded-2xl px-5 py-2 shadow-sm border border-[#F5CB73]/5">
              <AccordionTrigger className="text-[#353336] font-bold hover:no-underline hover:text-[#F5CB73] text-sm uppercase tracking-widest py-4">
                Price Range
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 px-1">
                <Slider
                  defaultValue={[0, 2000]}
                  max={5000}
                  min={0}
                  step={50}
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  className="mb-6"
                />
                <div className="flex justify-between items-center bg-[#FEF0FD] p-3 rounded-xl border border-[#F5CB73]/10">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#686669] uppercase tracking-tighter">Min</span>
                    <span className="text-sm font-black text-[#353336]">${filters.priceRange[0]}</span>
                  </div>
                  <div className="w-8 h-[1px] bg-[#686669]/20" />
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-bold text-[#686669] uppercase tracking-tighter">Max</span>
                    <span className="text-sm font-black text-[#353336]">${filters.priceRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {Object.entries(options).map(([key, opts]) => (
              <AccordionItem value={key} key={key} className="border-none bg-white rounded-2xl px-5 py-2 shadow-sm border border-[#F5CB73]/5">
                <AccordionTrigger className="capitalize text-[#353336] font-bold hover:no-underline hover:text-[#F5CB73] text-sm uppercase tracking-widest py-4">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-1 pt-1 pb-4">
                    {opts.map((option) => (
                      <div
                        key={option}
                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                          (filters[key as keyof FilterState] as string[]).includes(option)
                            ? "bg-[#F5CB73]/10 border border-[#F5CB73]/20"
                            : "hover:bg-[#FEF0FD] border border-transparent"
                        }`}
                      >
                        <Checkbox 
                          id={`${key}-${option}`} 
                          checked={(filters[key as keyof FilterState] as string[]).includes(option)}
                          onCheckedChange={() => handleCheckboxChange(key as keyof FilterState, option)}
                          className="border-[#F5CB73] data-[state=checked]:bg-[#F5CB73] data-[state=checked]:border-[#F5CB73] rounded-md"
                        />
                        <label
                          htmlFor={`${key}-${option}`}
                          className="text-sm font-medium leading-none text-[#434144] cursor-pointer w-full select-none"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}

            <AccordionItem value="ratings" className="border-none bg-white rounded-2xl px-5 py-2 shadow-sm border border-[#F5CB73]/5">
              <AccordionTrigger className="text-[#353336] font-bold hover:no-underline hover:text-[#F5CB73] text-sm uppercase tracking-widest py-4">
                Ratings
              </AccordionTrigger>
              <AccordionContent>
                 <div className="space-y-1 pt-1 pb-4">
                    {[4, 3, 2, 1].map((rating) => (
                      <div
                        key={rating}
                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                          filters.rating === rating ? "bg-[#F5CB73]/10 border border-[#F5CB73]/20" : "hover:bg-[#FEF0FD] border border-transparent"
                        }`}
                      >
                        <Checkbox 
                          id={`rating-${rating}`}
                          checked={filters.rating === rating}
                          onCheckedChange={(checked) => {
                               setFilters(prev => {
                                   const newVal = checked ? rating : null;
                                   const newFilters = { ...prev, rating: newVal };
                                   onFilterChange?.(newFilters);
                                   return newFilters;
                               });
                          }}
                          className="border-[#F5CB73] data-[state=checked]:bg-[#F5CB73] data-[state=checked]:border-[#F5CB73] rounded-md"
                        />
                        <label htmlFor={`rating-${rating}`} className="text-sm font-bold text-[#434144] flex items-center gap-2 cursor-pointer w-full select-none">
                          <div className="flex text-[#F5CB73] text-xs">
                            {"★".repeat(rating)}{"☆".repeat(4 - rating)}
                          </div>
                          <span className="text-[10px] text-[#686669] font-black uppercase tracking-tighter">& above</span>
                        </label>
                      </div>
                    ))}
                 </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}
