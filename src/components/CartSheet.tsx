import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, X, Plus, Minus, Receipt, Gift, Sparkles, ChefHat } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CartSheet = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const [receiptId, setReceiptId] = useState("");
    const [dateStr, setDateStr] = useState("");
    const [timeStr, setTimeStr] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        setReceiptId(Math.floor(100000 + Math.random() * 900000).toString());
        const now = new Date();
        setDateStr(now.toLocaleDateString());
        setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, [count]); 

    useEffect(() => {
        if (count > 0) setIsOpen(true);
        else setIsOpen(false);
    }, [count]);

    return (
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <div className="relative cursor-pointer group selection:bg-[#F5CB73] selection:text-[#353336]">
                    <div className="p-3 rounded-2xl bg-[#353336] text-[#F5CB73] shadow-lg shadow-[#353336]/20 group-hover:scale-110 transition-transform duration-500">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <AnimatePresence>
                        {count > 0 && (
                            <motion.span 
                                initial={{ scale: 0, opacity: 0 }} 
                                animate={{ scale: 1, opacity: 1 }} 
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute -top-2 -right-2 bg-[#F5CB73] text-[#353336] text-[0.6rem] w-6 h-6 flex items-center justify-center rounded-full font-black shadow-xl border-2 border-white z-10"
                            >
                                {count}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </SheetTrigger>
            
            <SheetContent 
                side="bottom" 
                disableOverlay={true}
                className="w-full sm:w-[450px] sm:left-auto sm:right-10 p-0 border-none bg-transparent shadow-none max-h-[100vh] overflow-hidden pointer-events-none"
                style={{ bottom: 0 }}
            >
                <div className="flex flex-col items-end justify-end p-6 pointer-events-auto h-[90vh]">
                    <motion.div 
                        initial={{ y: "100%", opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="w-full bg-white shadow-[0_64px_128px_-32px_rgba(53,51,54,0.3)] relative font-inter rounded-t-[3rem] overflow-hidden flex flex-col max-h-full border border-[#F5CB73]/10"
                    >
                        {/* Header Branding */}
                        <div className="bg-[#353336] text-white p-8 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3 text-[#F5CB73]">
                                        <ChefHat size={20} />
                                        <span className="text-[0.6rem] font-black tracking-[0.4em] uppercase">Bespoke Collection</span>
                                    </div>
                                    <h2 className="font-playfair text-3xl font-black tracking-tighter">Your Archive</h2>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all duration-300"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="flex justify-between items-end pt-4 border-t border-white/10">
                                <div className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-white/40">
                                    <p>Registry ID: <span className="text-white">#{receiptId}</span></p>
                                    <p>Acquisition: <span className="text-white">{dateStr} • {timeStr}</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-[#F5CB73] mb-1">Estimated Value</p>
                                    <p className="font-playfair text-2xl font-black tracking-tight">${total.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        <ScrollArea className="flex-1 px-8 py-6 bg-[#FEF0FD]/20">
                            {cartItems.length === 0 ? (
                                <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 opacity-20">
                                    <ShoppingBag size={64} className="text-[#353336]" />
                                    <p className="font-black text-[0.7rem] uppercase tracking-[0.4em] text-[#353336]">Archive Empty</p>
                                </div>
                            ) : (
                                <div className="space-y-8 pb-8">
                                    {cartItems.map((item) => (
                                        <motion.div 
                                            layout
                                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                            key={item.id} className="flex gap-6 group"
                                        >
                                            <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden shadow-sm border border-[#F5CB73]/10 shrink-0">
                                                <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div>
                                                        <h4 className="font-black text-xs uppercase tracking-widest text-[#353336] group-hover:text-[#F5CB73] transition-colors truncate">{item.name}</h4>
                                                        <p className="text-[0.6rem] font-black uppercase tracking-widest text-[#434144]/40 mt-1">{item.category}</p>
                                                    </div>
                                                    <span className="font-black text-sm text-[#353336]">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                                
                                                <div className="flex justify-between items-center mt-4">
                                                    <div className="flex items-center bg-[#FEF0FD] rounded-xl p-1 gap-1 border border-[#F5CB73]/5">
                                                        <button 
                                                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                                            disabled={item.quantity <= 1}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-[#353336] disabled:opacity-20 transition-all"
                                                        >
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-[#353336] transition-all"
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                    <button 
                                                        onClick={() => dispatch(removeFromCart(item.id))}
                                                        className="text-[0.55rem] font-black uppercase tracking-widest text-red-400 hover:text-red-500 transition-colors"
                                                    >
                                                        Void Item
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>

                        <div className="p-8 bg-white border-t border-[#F5CB73]/10 space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between text-[0.6rem] font-black uppercase tracking-[0.2em] text-[#434144]/40">
                                    <span>Subtotal Archive</span>
                                    <span className="text-[#353336]">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[0.6rem] font-black uppercase tracking-[0.2em] text-[#434144]/40">
                                    <span>Studio Logistics</span>
                                    <span className="text-green-500">Complimentary</span>
                                </div>
                                <div className="h-px bg-dashed border-b border-dashed border-[#F5CB73]/20 my-4" />
                                <div className="flex justify-between items-center text-[#353336]">
                                    <span className="font-playfair text-xl font-black tracking-tight">Total Acquisition</span>
                                    <span className="font-playfair text-3xl font-black tracking-tighter">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 pt-2">
                                <Button className="w-full h-16 bg-[#353336] hover:bg-[#F5CB73] text-white hover:text-[#353336] rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-[#353336]/20 transition-all duration-700 flex items-center justify-center gap-4 group">
                                    Complete Selection <Gift size={16} className="group-hover:rotate-12 transition-transform" />
                                </Button>
                                <p className="text-[0.5rem] font-black uppercase tracking-[0.4em] text-center text-[#434144]/30 flex items-center justify-center gap-2">
                                    <Sparkles size={10} /> Artisan Quality Guaranteed <Sparkles size={10} />
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;
