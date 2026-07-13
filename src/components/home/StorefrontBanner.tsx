import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Star, CheckCircle2, Play, Activity, 
  VolumeX, Settings, Cpu, Leaf, MapPin, Sun, 
  Droplets, Thermometer, Gauge, ShieldCheck, Truck, 
  Clock, Package, Calendar
} from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-fade';

const banners = [
  {
    id: 1,
    badge: "SPECIALTY COFFEE BEANS",
    rating: "4.9",
    title: "Ethiopian Yirgacheffe.",
    description: "Discover the rich, floral notes of our newest single-origin arrivals. Cultivated at 2,000 meters and washed to perfection.",
    highlights: ["Single Origin", "Light Roast", "Floral Notes", "Ethically Sourced", "Free Delivery"],
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800",
    bgImage: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1600",
    cards: [
      { title: "Roast Profile", value: "Light" },
      { title: "Process", value: "Washed" },
      { title: "Altitude", value: "1900m" }
    ],
    features: [{ icon: Leaf, label: "Organic" }, { icon: MapPin, label: "Ethiopia" }, { icon: Sun, label: "Sun Dried" }]
  },
  {
    id: 2,
    badge: "PREMIUM COFFEE GRINDERS",
    rating: "4.9",
    title: "The Perfect Grind.",
    description: "Professional burr grinders engineered for espresso, pour-over, French press and specialty coffee.",
    highlights: ["Stainless Steel Burrs", "64 Grind Levels", "Ultra Quiet", "Commercial Grade", "2 Year Warranty"],
    image: "https://images.unsplash.com/photo-1585237233261-9c8828b86d9a?auto=format&fit=crop&q=80&w=800",
    bgImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1600",
    cards: [
      { title: "Low Noise", value: "58 dB" },
      { title: "Burr Size", value: "64mm" },
      { title: "Settings", value: "Stepless" }
    ],
    features: [{ icon: VolumeX, label: "Silent" }, { icon: Settings, label: "Precision" }, { icon: Cpu, label: "Smart" }]
  },
  {
    id: 3,
    badge: "LUXURY ESPRESSO MACHINES",
    rating: "5.0",
    title: "Cafe Quality at Home.",
    description: "Experience ultimate temperature stability and pressure control with our dual-boiler espresso powerhouses.",
    highlights: ["Dual Boiler System", "PID Temperature", "9-Bar Extraction", "Commercial Steam", "Auto-Purge"],
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800",
    bgImage: "https://images.unsplash.com/photo-1495474472201-3e50df44bc30?auto=format&fit=crop&q=80&w=1600",
    cards: [
      { title: "Pressure", value: "9 Bar" },
      { title: "Boilers", value: "Dual PID" },
      { title: "Warm Up", value: "3 Min" }
    ],
    features: [{ icon: Gauge, label: "9 Bar" }, { icon: Thermometer, label: "PID Temp" }, { icon: Droplets, label: "Pre-infuse" }]
  },
  {
    id: 4,
    badge: "PRO ACCESSORIES",
    rating: "4.8",
    title: "Precision Matters.",
    description: "Elevate your brewing ritual with our high-precision scales, elegant kettles, and calibrated tampers.",
    highlights: ["0.1g Accuracy", "Flow Control", "Ergonomic Design", "Premium Materials", "Water Resistant"],
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800",
    bgImage: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1600",
    cards: [
      { title: "Accuracy", value: "0.1g" },
      { title: "Response", value: "20ms" },
      { title: "Material", value: "Walnut" }
    ],
    features: [{ icon: Activity, label: "Fast" }, { icon: ShieldCheck, label: "Durable" }, { icon: Package, label: "Compact" }]
  },
  {
    id: 5,
    badge: "MONTHLY SUBSCRIPTION",
    rating: "5.0",
    title: "Never Run Out.",
    description: "Curated specialty coffees delivered fresh to your door on your schedule. Discover a new origin every month.",
    highlights: ["Freshly Roasted", "Free Shipping", "Pause Anytime", "Exclusive Access", "Surprise Gifts"],
    image: "https://images.unsplash.com/photo-1601053077395-5dbd81e3a6a9?auto=format&fit=crop&q=80&w=800",
    bgImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1600",
    cards: [
      { title: "Frequency", value: "Weekly" },
      { title: "Freshness", value: "2 Days" },
      { title: "Savings", value: "15% Off" }
    ],
    features: [{ icon: Calendar, label: "Flexible" }, { icon: Truck, label: "Free Ship" }, { icon: Star, label: "VIP Perks" }]
  }
];

export default function StorefrontBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full rounded-[32px] overflow-hidden relative group bg-background border border-foreground/5 shadow-2xl">
      
      {/* Live Activity Toast (Global overlay) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}
        className="absolute bottom-16 right-8 z-50 flex items-center gap-3 bg-background/60 backdrop-blur-xl border border-foreground/10 px-4 py-2.5 rounded-full shadow-2xl"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <div className="text-[10px] font-medium text-foreground/80">
          Someone just purchased <span className="text-foreground font-bold">{banners[activeIndex].badge.toLowerCase()}</span>
        </div>
        <div className="text-[9px] text-foreground/40 ml-2">2 min ago</div>
      </motion.div>

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-[50vh] lg:h-[60vh] min-h-[400px] max-h-[600px]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            {({ isActive }) => (
              <div className="relative w-full h-full overflow-hidden flex items-center">
                
                {/* Background & Overlays */}
                <motion.div 
                  initial={{ scale: 1.1 }} animate={{ scale: isActive ? 1 : 1.1 }} transition={{ duration: 7, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <img src={banner.bgImage} alt="" className="w-full h-full object-cover opacity-30" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between h-full py-8 lg:py-10 gap-8">
                  
                  {/* LEFT SIDE CONTENT */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center mt-[-40px]">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
                      className="flex items-center gap-4 mb-3"
                    >
                      <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[9px] font-bold text-accent tracking-widest uppercase">
                        {banner.badge}
                      </span>
                      <div className="flex items-center gap-1 text-[9px] font-bold text-foreground/80">
                        <Star className="w-3 h-3 text-accent fill-accent" /> {banner.rating} Rating
                      </div>
                    </motion.div>

                    <motion.h2 
                      initial={{ opacity: 0, x: -30 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-4 tracking-tight"
                    >
                      {banner.title.split('.').map((part, i) => (
                        <React.Fragment key={i}>
                          {part}{i === 0 && <span className="text-accent">.</span>}
                        </React.Fragment>
                      ))}
                    </motion.h2>

                    <motion.p 
                      initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-sm text-foreground/60 max-w-md mb-6 leading-relaxed font-light"
                    >
                      {banner.description}
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
                      className="grid grid-cols-2 gap-y-2 gap-x-6 mb-8"
                    >
                      {banner.highlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] text-foreground/80 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-accent" /> {hl}
                        </div>
                      ))}
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex items-center gap-4"
                    >
                      <button className="h-10 px-6 bg-accent text-background rounded-full font-bold text-xs flex items-center gap-2 hover:bg-foreground transition-all shadow-[0_0_30px_rgba(255,213,79,0.3)] group/btn">
                        Explore Collection
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <button className="h-10 px-5 bg-foreground/5 border border-foreground/10 text-foreground rounded-full font-semibold text-xs flex items-center gap-2 hover:bg-foreground/10 transition-colors backdrop-blur-md">
                        <Play className="w-3 h-3 fill-foreground" /> Watch Demo
                      </button>
                    </motion.div>
                  </div>

                  {/* RIGHT SIDE (Interactive 3D / Floating Image) */}
                  <div className="w-full lg:w-1/2 h-[75%] lg:h-full hidden lg:flex items-center justify-center relative perspective-1000 mt-[-20px]">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8, rotateY: 15 }} 
                      animate={isActive ? { opacity: 1, scale: 1, rotateY: [15, -5, 5, 0] } : {}} 
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="relative z-20 w-[65%] aspect-square rounded-full border border-foreground/5 bg-gradient-to-tr from-white/5 to-transparent flex items-center justify-center backdrop-blur-3xl shadow-2xl"
                    >
                      <motion.img 
                        animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        src={banner.image} alt={banner.title} 
                        className="w-3/4 h-3/4 object-cover rounded-full mix-blend-screen drop-shadow-[0_0_50px_rgba(255,213,79,0.2)]"
                      />

                      {/* Hotspots / Feature Icons */}
                      {banner.features.map((feat, i) => (
                        <motion.div 
                          key={i}
                          initial={{ scale: 0, opacity: 0 }} animate={isActive ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 1 + (i * 0.2) }}
                          className={`absolute w-8 h-8 rounded-full bg-background/60 border border-foreground/10 backdrop-blur-md flex items-center justify-center group cursor-crosshair shadow-xl ${
                            i === 0 ? 'top-[10%] left-[20%]' : i === 1 ? 'top-[50%] -right-4' : 'bottom-[15%] left-[30%]'
                          }`}
                        >
                          <feat.icon className="w-3 h-3 text-accent" />
                          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-background/80 rounded border border-foreground/10 text-[8px] font-bold text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            {feat.label}
                          </div>
                        </motion.div>
                      ))}

                    </motion.div>

                    {/* Floating Info Cards */}
                    {banner.cards.map((card, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 30, y: 30 }} 
                        animate={isActive ? { opacity: 1, x: 0, y: [0, -10, 0] } : {}} 
                        transition={{ duration: 3, delay: 0.8 + (i * 0.2), repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                        className={`absolute z-30 bg-background/40 backdrop-blur-xl border border-foreground/10 p-2.5 rounded-xl shadow-2xl w-28 ${
                          i === 0 ? 'top-[10%] right-[10%]' : i === 1 ? 'bottom-[25%] -left-[5%]' : 'bottom-[10%] right-[20%]'
                        }`}
                      >
                        <div className="text-[8px] text-foreground/50 uppercase tracking-wider mb-1">{card.title}</div>
                        <div className="text-xs font-bold text-foreground">{card.value}</div>
                      </motion.div>
                    ))}

                    {/* Decorative Rings */}
                    <div className="absolute w-[110%] aspect-square border border-foreground/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none" />
                    <div className="absolute w-[130%] aspect-square border border-foreground/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none" />
                  </div>

                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CUSTOM PAGINATION & BOTTOM STRIP */}
      <div className="absolute bottom-0 inset-x-0 z-40 bg-gradient-to-t from-background via-background/80 to-transparent pt-8 pb-4 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-none">
        
        {/* Navigation / Progress */}
        <div className="flex items-center gap-6 w-full md:w-1/3">
          <div className="text-xl font-light text-foreground w-8">
            0{activeIndex + 1}
          </div>
          <div className="flex-1 flex gap-2">
            {banners.map((_, i) => (
              <div key={i} className="h-1 flex-1 bg-foreground/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: activeIndex === i ? '100%' : activeIndex > i ? '100%' : '0%' }}
                  transition={activeIndex === i ? { duration: 7, ease: "linear" } : { duration: 0 }}
                  className={`h-full ${activeIndex >= i ? 'bg-accent' : ''}`}
                />
              </div>
            ))}
          </div>
          <div className="text-sm font-bold text-foreground/40 w-8">
            0{banners.length}
          </div>
        </div>

        {/* Info Bar */}
        <div className="hidden md:flex items-center gap-6 text-[10px] font-semibold text-foreground/60 tracking-wider uppercase">
          <div className="flex items-center gap-2"><Star className="w-3 h-3 text-accent fill-accent" /> 2,800 Reviews</div>
          <div className="w-1 h-1 rounded-full bg-foreground/20" />
          <div className="flex items-center gap-2"><Truck className="w-3 h-3" /> Free Shipping</div>
          <div className="w-1 h-1 rounded-full bg-foreground/20" />
          <div className="flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> 2 Year Warranty</div>
        </div>
      </div>
    </div>
  );
}
