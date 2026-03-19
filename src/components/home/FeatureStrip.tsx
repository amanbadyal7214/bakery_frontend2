import { Star, Truck, Leaf, ChefHat, Sparkles, Gem, Clock } from "lucide-react";
import { motion, Variants } from "framer-motion";

const features = [
  {
    icon: ChefHat,
    title: "Master Artisans",
    description: "Our elite team coordinates years of heritage with modern precision to craft literal edible art.",
    color: "#F5CB73"
  },
  {
    icon: Gem,
    title: "Rare Sourcing",
    description: "Discover the finest global ingredients, from single-origin chocolate to sun-ripened organic grains.",
    color: "#F5CB73"
  },
  {
    icon: Clock,
    title: "Timeless Craft",
    description: "Every item is slow-proofed and small-batch baked to ensure the peak of texture and olfactory bliss.",
    color: "#F5CB73"
  },
  {
    icon: Sparkles,
    title: "VIP Concierge",
    description: "Bespoke delivery and white-glove service ensure your selections arrive in pristine, gallery condition.",
    color: "#F5CB73"
  }
];

export default function FeatureStrip() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="bg-white/50 py-32 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FEF0FD] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-30" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F5CB73]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-30" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10"
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="group flex flex-col items-center text-center space-y-8"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-[#353336] rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-[#353336]/20 rotate-6 group-hover:rotate-0 transition-all duration-700">
                <feature.icon className="w-10 h-10 text-[#F5CB73]" strokeWidth={1.5} />
              </div>
              <div className="absolute -inset-2 bg-[#F5CB73]/20 rounded-[2.5rem] -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <div className="space-y-4">
              <h3 className="font-playfair text-2xl font-black text-[#353336] tracking-tighter group-hover:text-[#F5CB73] transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="text-[#434144]/60 text-sm leading-relaxed px-4 font-medium">
                {feature.description}
              </p>
            </div>
            
            <div className="w-8 h-[2px] bg-[#F5CB73]/30 rounded-full group-hover:w-16 group-hover:bg-[#F5CB73] transition-all duration-700" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
