import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star, Share2, Sparkles, MapPin, Coffee, ArrowRight, CheckCircle2, ShieldCheck, Truck, RefreshCw, Activity, Layers, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const coffeeProducts = [
  { 
    id: 101, name: 'Ethiopian Yirgacheffe Reserve', type: 'Single Origin', 
    description: 'Rich chocolate notes with delicate floral aromas and a smooth caramel finish.',
    price: 24.99, oldPrice: 32.00, rating: 4.9, reviews: 2847, 
    image: 'https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&q=80&w=800', 
    badges: ['BEST SELLER', 'RARE LOT'],
    origin: { country: '🇪🇹 Ethiopia', region: 'Yirgacheffe', alt: '1950m', process: 'Natural' },
    roast: 'Medium', roastLevel: 45,
    flavors: ['🍫 Chocolate', '🌸 Floral', '☕ Caramel'],
    specs: { body: 85, sweetness: 90, acidity: 60, aftertaste: 75 },
    brew: ['Espresso', 'Pour Over', 'French Press'],
    stock: 12, aiScore: 98,
    quickSpecs: { weight: '250g', grind: 'Whole Bean', freshness: 'Roasted 2 Days Ago' }
  },
  { 
    id: 102, name: 'Colombian Supremo Micro-Lot', type: 'Estate Blend', 
    description: 'Vibrant citrus acidity balanced by deep brown sugar and toasted nut undertones.',
    price: 22.50, oldPrice: null, rating: 4.8, reviews: 1432, 
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800', 
    badges: ['ORGANIC', 'DIRECT TRADE'],
    origin: { country: '🇨🇴 Colombia', region: 'Huila', alt: '1700m', process: 'Washed' },
    roast: 'Medium Dark', roastLevel: 75,
    flavors: ['🍊 Citrus', '🥜 Nutty', '🍯 Honey'],
    specs: { body: 75, sweetness: 85, acidity: 90, aftertaste: 70 },
    brew: ['French Press', 'Aeropress'],
    stock: 45, aiScore: 94,
    quickSpecs: { weight: '250g', grind: 'Custom Grind', freshness: 'Roasted Today' }
  },
  { 
    id: 103, name: 'Panama Geisha Grand Cru', type: 'Limited Edition', 
    description: 'An exceptional cup with intensely floral jasmine aromatics and bright bergamot.',
    price: 85.00, oldPrice: 100.00, rating: 5.0, reviews: 312, 
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800', 
    badges: ['AWARD WINNER', 'LIMITED'],
    origin: { country: '🇵🇦 Panama', region: 'Boquete', alt: '2100m', process: 'Honey' },
    roast: 'Light', roastLevel: 20,
    flavors: ['🌸 Jasmine', '🍋 Bergamot', '🍑 Peach'],
    specs: { body: 60, sweetness: 95, acidity: 95, aftertaste: 90 },
    brew: ['Pour Over', 'Chemex'],
    stock: 5, aiScore: 99,
    quickSpecs: { weight: '150g', grind: 'Whole Bean', freshness: 'Roasted 1 Day Ago' }
  },
  { 
    id: 104, name: 'Kenya AA Top', type: 'Single Origin', 
    description: 'Bold and wine-like, featuring intense blackcurrant and dark berry notes.',
    price: 28.00, oldPrice: 35.00, rating: 4.9, reviews: 1104, 
    image: 'https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&q=80&w=800', 
    badges: ['STAFF PICK', 'NEW ARRIVAL'],
    origin: { country: '🇰🇪 Kenya', region: 'Nyeri', alt: '1850m', process: 'Washed' },
    roast: 'Medium Light', roastLevel: 35,
    flavors: ['🍇 Blackcurrant', '🍷 Winey', '🍅 Tomato'],
    specs: { body: 70, sweetness: 80, acidity: 95, aftertaste: 85 },
    brew: ['Chemex', 'Aeropress'],
    stock: 22, aiScore: 96,
    quickSpecs: { weight: '250g', grind: 'Whole Bean', freshness: 'Roasted 3 Days Ago' }
  },
  { 
    id: 105, name: 'Sumatra Mandheling', type: 'Single Origin', 
    description: 'Heavy syrupy body with earthy, herbal notes and very low acidity.',
    price: 20.00, oldPrice: null, rating: 4.7, reviews: 890, 
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800', 
    badges: ['ORGANIC'],
    origin: { country: '🇮🇩 Indonesia', region: 'Sumatra', alt: '1300m', process: 'Wet-Hulled' },
    roast: 'Dark', roastLevel: 90,
    flavors: ['🌿 Herbal', '🌍 Earthy', '🍫 Dark Cocoa'],
    specs: { body: 95, sweetness: 70, acidity: 30, aftertaste: 80 },
    brew: ['French Press', 'Espresso'],
    stock: 30, aiScore: 91,
    quickSpecs: { weight: '250g', grind: 'Custom Grind', freshness: 'Roasted 1 Day Ago' }
  },
  { 
    id: 106, name: 'Costa Rica Tarrazu', type: 'Estate Blend', 
    description: 'Exceptionally clean and bright with milk chocolate and sweet citrus notes.',
    price: 23.50, oldPrice: 28.00, rating: 4.8, reviews: 1250, 
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800', 
    badges: ['SUSTAINABLE', 'POPULAR'],
    origin: { country: '🇨🇷 Costa Rica', region: 'Tarrazu', alt: '1600m', process: 'Washed' },
    roast: 'Medium', roastLevel: 50,
    flavors: ['🍫 Milk Choc', '🍊 Orange', '🍯 Honey'],
    specs: { body: 75, sweetness: 85, acidity: 80, aftertaste: 75 },
    brew: ['Pour Over', 'Drip'],
    stock: 50, aiScore: 93,
    quickSpecs: { weight: '250g', grind: 'Whole Bean', freshness: 'Roasted Today' }
  },
  { 
    id: 107, name: 'Guatemala Antigua', type: 'Single Origin', 
    description: 'Complex and spicy, featuring notes of smoky cocoa and crisp apple.',
    price: 21.00, oldPrice: null, rating: 4.8, reviews: 2012, 
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800', 
    badges: ['BEST SELLER'],
    origin: { country: '🇬🇹 Guatemala', region: 'Antigua', alt: '1500m', process: 'Washed' },
    roast: 'Medium Dark', roastLevel: 65,
    flavors: ['🔥 Smoky', '🍫 Cocoa', '🍏 Apple'],
    specs: { body: 80, sweetness: 80, acidity: 70, aftertaste: 85 },
    brew: ['French Press', 'Espresso'],
    stock: 15, aiScore: 95,
    quickSpecs: { weight: '500g', grind: 'Custom Grind', freshness: 'Roasted 4 Days Ago' }
  },
  { 
    id: 108, name: 'Brazil Cerrado', type: 'Estate Blend', 
    description: 'Smooth and nutty with a creamy body and sweet notes of roasted almond.',
    price: 18.00, oldPrice: 22.00, rating: 4.6, reviews: 3400, 
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800', 
    badges: ['EVERYDAY', 'VALUE'],
    origin: { country: '🇧🇷 Brazil', region: 'Cerrado', alt: '1000m', process: 'Natural' },
    roast: 'Medium', roastLevel: 55,
    flavors: ['🥜 Almond', '🥛 Cream', '🍫 Chocolate'],
    specs: { body: 85, sweetness: 90, acidity: 40, aftertaste: 70 },
    brew: ['Espresso', 'Drip'],
    stock: 100, aiScore: 88,
    quickSpecs: { weight: '1kg', grind: 'Whole Bean', freshness: 'Roasted Today' }
  },
  { 
    id: 109, name: 'Jamaica Blue Mountain', type: 'Ultra Premium', 
    description: 'Mild, perfectly balanced, and completely lacking bitterness. A rare luxury.',
    price: 120.00, oldPrice: 150.00, rating: 5.0, reviews: 156, 
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=800', 
    badges: ['RARE', 'LUXURY'],
    origin: { country: '🇯🇲 Jamaica', region: 'Blue Mtn', alt: '2000m', process: 'Washed' },
    roast: 'Medium Light', roastLevel: 40,
    flavors: ['🌺 Floral', '🌰 Chestnut', '🧈 Butter'],
    specs: { body: 70, sweetness: 90, acidity: 70, aftertaste: 95 },
    brew: ['Pour Over', 'Chemex'],
    stock: 2, aiScore: 99,
    quickSpecs: { weight: '250g', grind: 'Whole Bean', freshness: 'Roasted 1 Day Ago' }
  }
];

const machineProducts = [
  { 
    id: 201, name: 'Rocket Espresso Mozzafiato', type: 'Prosumer Espresso Machine', 
    description: 'Handcrafted in Milan. Commercial grade rotary pump and PID temperature control.',
    price: 2400.00, oldPrice: 2600.00, rating: 5.0, reviews: 145, 
    image: 'https://media.istockphoto.com/id/1429664696/photo/a-barista-uses-a-coffee-machine-for-making-coffee-in-a-coffee-shop-and-cafe-espresso-poured.jpg?s=2048x2048&w=is&k=20&c=4L3A9a2FjfQIvPGFEDAbUSIJfpqtbX1jej93D3jDVTE=', 
    badges: ['PREMIUM', 'BEST SELLER'],
    origin: { country: '🇮🇹 Italy', region: 'Milan', alt: 'Steel', process: 'Handcrafted' },
    roast: 'Pro', roastLevel: 90,
    flavors: ['⚙️ PID Control', '🌡️ Heat Exchanger', '🔊 Rotary Pump'],
    specs: { body: 100, sweetness: 95, acidity: 90, aftertaste: 98 },
    brew: ['Espresso', 'Latte Art'],
    stock: 3, aiScore: 97,
    quickSpecs: { weight: '27.5kg', grind: 'N/A', freshness: '3-Year Warranty' }
  },
  { 
    id: 202, name: 'Breville Barista Pro', type: 'Integrated Espresso', 
    description: 'Barista-quality performance with an intuitive interface and integrated precision grinder.',
    price: 799.00, oldPrice: 899.00, rating: 4.8, reviews: 1512, 
    image: 'https://media.istockphoto.com/id/1362338743/photo/professional-coffee-machine-brewing-cup-of-fresh-espresso-at-cafe.jpg?s=2048x2048&w=is&k=20&c=2h4zEDZ12aGzV4LZkgnaVsqED56BUPCJhLW-iaTKXYA=', 
    badges: ['SALE', 'POPULAR'],
    origin: { country: '🇦🇺 Australia', region: 'Sydney', alt: 'Alloy', process: 'Manufactured' },
    roast: 'Auto', roastLevel: 60,
    flavors: ['⚡ ThermoJet', '🎛️ LCD Display', '🔪 Conical Burr'],
    specs: { body: 85, sweetness: 90, acidity: 80, aftertaste: 85 },
    brew: ['Espresso', 'Americano'],
    stock: 18, aiScore: 92,
    quickSpecs: { weight: '9kg', grind: 'Built-in Grinder', freshness: '2-Year Warranty' }
  },
  { 
    id: 203, name: 'La Marzocco Linea Micra', type: 'Luxury Home Espresso', 
    description: 'True cafe performance condensed into an elegant, ultra-compact footprint.',
    price: 3900.00, oldPrice: null, rating: 5.0, reviews: 89, 
    image: 'https://media.istockphoto.com/id/1209383995/photo/black-coffee-morning-on-coffee-maker.jpg?s=2048x2048&w=is&k=20&c=I2Vs4TnSY6vkcBIg2y2jzxW8DYTiPaG0fTMIXtPreEM=', 
    badges: ['GRAIL', 'NEW ARRIVAL'],
    origin: { country: '🇮🇹 Italy', region: 'Florence', alt: 'Steel', process: 'Handbuilt' },
    roast: 'Pro', roastLevel: 95,
    flavors: ['🔥 Dual Boiler', '📱 App Connected', '☕ Portafilter'],
    specs: { body: 100, sweetness: 100, acidity: 100, aftertaste: 100 },
    brew: ['Espresso', 'Cortado'],
    stock: 1, aiScore: 99,
    quickSpecs: { weight: '19kg', grind: 'N/A', freshness: '2-Year Warranty' }
  },
  { 
    id: 204, name: 'ECM Synchronika', type: 'Prosumer Espresso Machine', 
    description: 'German engineering meets Italian design. Dual boiler perfection with anthracite chassis.',
    price: 2999.00, oldPrice: 3200.00, rating: 4.9, reviews: 210, 
    image: 'https://media.istockphoto.com/id/1362338743/photo/professional-coffee-machine-brewing-cup-of-fresh-espresso-at-cafe.jpg?s=2048x2048&w=is&k=20&c=2h4zEDZ12aGzV4LZkgnaVsqED56BUPCJhLW-iaTKXYA=', 
    badges: ['PREMIUM'],
    origin: { country: '🇩🇪 Germany', region: 'Heidelberg', alt: 'Steel', process: 'Engineered' },
    roast: 'Pro', roastLevel: 92,
    flavors: ['🔥 Dual Boiler', '🎛️ Flow Control', '💧 Plumbable'],
    specs: { body: 95, sweetness: 90, acidity: 90, aftertaste: 95 },
    brew: ['Espresso', 'Flat White'],
    stock: 4, aiScore: 96,
    quickSpecs: { weight: '30kg', grind: 'N/A', freshness: '3-Year Warranty' }
  },
  { 
    id: 205, name: 'Lelit Bianca V3', type: 'Prosumer Espresso Machine', 
    description: 'Master manual flow profiling with this wooden-accented dual boiler powerhouse.',
    price: 2899.00, oldPrice: 3100.00, rating: 4.9, reviews: 340, 
    image: 'https://media.istockphoto.com/id/1310692687/photo/close-up-double-shot-coffee-pouring-from-espresso-machine-perfect-coffee-brewing-with-bar.jpg?s=2048x2048&w=is&k=20&c=cc7dtdPvTeniR-S8V0Q5pxCObp9g7Huilz4hCgAvSPA=', 
    badges: ['ENTHUSIAST'],
    origin: { country: '🇮🇹 Italy', region: 'Brescia', alt: 'Wood/Steel', process: 'Handcrafted' },
    roast: 'Pro', roastLevel: 94,
    flavors: ['🛶 Wooden Paddle', '🌊 Flow Control', '⚡ Fast Heat'],
    specs: { body: 95, sweetness: 98, acidity: 95, aftertaste: 95 },
    brew: ['Espresso', 'Light Roasts'],
    stock: 2, aiScore: 98,
    quickSpecs: { weight: '26kg', grind: 'N/A', freshness: '3-Year Warranty' }
  },
  { 
    id: 206, name: 'Fellow Ode Gen 2', type: 'Filter Grinder', 
    description: 'Precision flat burr grinder designed specifically for perfect pour-over and drip.',
    price: 345.00, oldPrice: null, rating: 4.7, reviews: 980, 
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800', 
    badges: ['AWARD WINNER', 'POPULAR'],
    origin: { country: '🇺🇸 USA', region: 'San Francisco', alt: 'Alloy', process: 'Design' },
    roast: 'Grinder', roastLevel: 50,
    flavors: ['⚙️ 64mm Flat Burrs', '🤫 Quiet', '📏 Anti-Static'],
    specs: { body: 80, sweetness: 95, acidity: 95, aftertaste: 90 },
    brew: ['Pour Over', 'French Press'],
    stock: 40, aiScore: 94,
    quickSpecs: { weight: '4.5kg', grind: 'Filter Only', freshness: '1-Year Warranty' }
  },
  { 
    id: 207, name: 'Mahlkönig EK43', type: 'Commercial Grinder', 
    description: 'The undisputed king of coffee grinders. Unmatched particle uniformity.',
    price: 2850.00, oldPrice: null, rating: 5.0, reviews: 112, 
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=800', 
    badges: ['COMMERCIAL', 'GRAIL'],
    origin: { country: '🇩🇪 Germany', region: 'Hamburg', alt: 'Cast Iron', process: 'Industrial' },
    roast: 'Pro', roastLevel: 100,
    flavors: ['⚙️ 98mm Flat Burrs', '⚡ High Speed', '📏 Ultimate Precision'],
    specs: { body: 100, sweetness: 100, acidity: 100, aftertaste: 100 },
    brew: ['All Methods'],
    stock: 1, aiScore: 99,
    quickSpecs: { weight: '24kg', grind: 'Espresso to French Press', freshness: '2-Year Warranty' }
  },
  { 
    id: 208, name: 'Sage Oracle Touch', type: 'Fully Automatic Espresso', 
    description: 'Automated touch-screen espresso. Grinds, tamps, and textures milk automatically.',
    price: 2499.00, oldPrice: 2799.00, rating: 4.6, reviews: 560, 
    image: 'https://images.unsplash.com/photo-1520286824908-166ce50fb8b4?auto=format&fit=crop&q=80&w=800', 
    badges: ['SMART', 'VALUE'],
    origin: { country: '🇬🇧 UK', region: 'London', alt: 'Steel', process: 'Automated' },
    roast: 'Auto', roastLevel: 70,
    flavors: ['👆 Touch Screen', '🥛 Auto Milk', '🔨 Auto Tamp'],
    specs: { body: 85, sweetness: 85, acidity: 80, aftertaste: 85 },
    brew: ['Espresso', 'Cappuccino'],
    stock: 12, aiScore: 90,
    quickSpecs: { weight: '16.9kg', grind: 'Built-in Grinder', freshness: '2-Year Warranty' }
  },
  { 
    id: 209, name: 'Profitec Pro 500', type: 'Prosumer Espresso Machine', 
    description: 'Classic E61 heat exchanger with hidden PID for modern temperature stability.',
    price: 1899.00, oldPrice: null, rating: 4.8, reviews: 290, 
    image: 'https://media.istockphoto.com/id/1154684258/photo/fresh-espresso-coffee.jpg?s=2048x2048&w=is&k=20&c=qMUEYmFUmVXlIi_alyl30oZ2U0EqQUk9uluDbdHOgCk=', 
    badges: ['BEST VALUE'],
    origin: { country: '🇩🇪 Germany', region: 'Heidelberg', alt: 'Steel', process: 'Engineered' },
    roast: 'Pro', roastLevel: 88,
    flavors: ['🌡️ PID Control', '⚙️ HX Boiler', '☕ E61 Group'],
    specs: { body: 90, sweetness: 90, acidity: 85, aftertaste: 90 },
    brew: ['Espresso', 'Latte'],
    stock: 8, aiScore: 95,
    quickSpecs: { weight: '23.5kg', grind: 'N/A', freshness: '2-Year Warranty' }
  }
];

interface StorefrontProductsProps {
  category: 'coffee' | 'machines'
}

export default function StorefrontProducts({ category }: StorefrontProductsProps) {
  const products = category === 'coffee' ? coffeeProducts : machineProducts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {products.map((product, idx) => (
          <PremiumProductCard key={product.id} product={product} idx={idx} />
        ))}
      </AnimatePresence>
    </div>
  );
}

const PremiumProductCard = ({ product, idx }: { product: any, idx: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      onClick={() => navigate(`/product/${product.id}`)}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-[24px] bg-background/60 backdrop-blur-3xl border border-foreground/5 overflow-visible transition-all duration-700 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(255,213,79,0.15)] hover:border-accent/40 w-full h-[80vh] min-h-[480px] max-h-[650px] cursor-pointer"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      {/* ================= TOP IMAGE SECTION ================= */}
      <div className="relative h-[45%] min-h-[200px] w-full overflow-hidden bg-gradient-to-b from-[#111] to-[#050505] rounded-t-[24px]">
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover opacity-70 mix-blend-luminosity group-hover:mix-blend-normal"
          animate={{ scale: isHovered ? 1.08 : 1, y: isHovered ? -5 : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Animated Particles / Steam (Fake via CSS) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-0 group-hover:opacity-30 transition-opacity duration-1000 mix-blend-overlay animate-pulse" />
        
        {/* Top Left Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
          {product.badges.map((badge: string, i: number) => (
            <motion.div 
              key={badge} 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`px-2 py-1 text-[8px] font-black uppercase tracking-widest rounded-full backdrop-blur-md shadow-lg ${
                i === 0 ? 'bg-gradient-to-r from-accent to-yellow-600 text-background border border-accent/50' : 'bg-background/60 border border-foreground/20 text-foreground'
              }`}
            >
              {badge}
            </motion.div>
          ))}
        </div>

        {/* Top Right Action Buttons */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5 z-20">
          <ActionButton icon={Heart} tooltip="Wishlist" isHovered={isHovered} delay={0.05} />
          <ActionButton icon={Eye} tooltip="Quick View" isHovered={isHovered} delay={0.1} />
          <ActionButton icon={Layers} tooltip="Compare" isHovered={isHovered} delay={0.15} />
          <ActionButton icon={Share2} tooltip="Share" isHovered={isHovered} delay={0.2} />
        </div>

        {/* AI Recommendation Chip */}
        <motion.div 
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 15, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-2 left-2 right-2 bg-background/70 backdrop-blur-xl border border-accent/30 p-1.5 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(255,213,79,0.2)]"
        >
          <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-3 h-3 text-accent" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[8px] font-bold text-accent">AI MATCH SCORE</span>
              <span className="text-[9px] font-black text-foreground">{product.aiScore}%</span>
            </div>
            <div className="w-full h-0.5 bg-foreground/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: isHovered ? `${product.aiScore}%` : 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-accent/50 to-accent"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="p-3 flex flex-col flex-grow relative z-10 bg-gradient-to-b from-background to-transparent rounded-b-[24px]">
        
        {/* Origin & Meta Info */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-foreground/5">
          <div className="flex flex-col">
            <div className="text-[8px] font-bold tracking-[0.2em] text-foreground/40 uppercase">{product.type}</div>
            <div className="flex items-center gap-1.5 text-[9px] text-foreground/70 font-medium mt-0.5">
              <span>{product.origin.country}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-foreground/20" />
              <span>{product.origin.region}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-foreground/20" />
              <span>{product.origin.alt}</span>
            </div>
          </div>
          
          {/* Live Stock Indicator */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 bg-green-500/10 px-1.5 py-0.5 rounded-full border border-green-500/20">
              <span className="relative flex h-1 w-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1 w-1 bg-green-500"></span>
              </span>
              <span className="text-[8px] font-bold text-green-400 uppercase tracking-widest">{product.stock} Left</span>
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-black text-base text-foreground leading-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-accent transition-all duration-300">
          {product.name}
        </h3>
        <p className="text-[9px] text-foreground/50 leading-snug mb-2 line-clamp-2">
          {product.description}
        </p>

        {/* Flavor Chips */}
        <div className="flex flex-wrap gap-1 mb-2">
          {product.flavors.map((flavor: string) => (
            <div key={flavor} className="px-2 py-0.5 rounded-full bg-foreground/5 border border-foreground/10 text-[8px] font-medium text-foreground/80 hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-colors cursor-default">
              {flavor}
            </div>
          ))}
        </div>

        {/* Expanding Stats Section (Aroma/Body etc) */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-2">
          <StatBar label="Body" value={product.specs.body} isHovered={isHovered} />
          <StatBar label="Sweetness" value={product.specs.sweetness} isHovered={isHovered} />
          <StatBar label="Acidity" value={product.specs.acidity} isHovered={isHovered} />
          <StatBar label="Aftertaste" value={product.specs.aftertaste} isHovered={isHovered} />
        </div>

        {/* Ratings & Brew Methods */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-foreground/5">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-2.5 w-2.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-none opacity-30 text-foreground'}`} />
              ))}
              <span className="text-[9px] text-foreground font-bold ml-1">{product.rating}</span>
            </div>
            <div className="text-[8px] text-foreground/40 tracking-wider mt-0.5">({product.reviews.toLocaleString()} Reviews)</div>
          </div>
          
          <div className="flex gap-1.5 text-foreground/40">
            <Droplets className="w-3.5 h-3.5 group-hover:text-accent transition-colors" />
            <Coffee className="w-3.5 h-3.5 group-hover:text-accent transition-colors delay-75" />
            <Activity className="w-3.5 h-3.5 group-hover:text-accent transition-colors delay-150" />
          </div>
        </div>

        {/* Price & Primary CTA */}
        <div className="mt-auto flex items-end justify-between relative z-20">
          <div className="flex flex-col">
            <span className="text-[8px] text-foreground/40 uppercase tracking-widest font-bold mb-0.5">Your Price</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl lg:text-2xl font-black text-foreground">${product.price}</span>
              {product.oldPrice && (
                <span className="text-[10px] font-bold text-foreground/30 line-through">${product.oldPrice}</span>
              )}
            </div>
          </div>
          
          <Button className="h-9 px-4 rounded-xl bg-foreground text-background hover:bg-accent font-black tracking-widest uppercase text-[9px] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,213,79,0.4)] hover:scale-105 group/btn">
            Buy
            <ArrowRight className="w-3 h-3 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Expandable Hover Details (Trust Bar & Quick Specs) */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden mt-2"
        >
          <div className="pt-2 border-t border-foreground/10 flex flex-col gap-2">
            {/* Trust Indicators */}
            <div className="flex items-center justify-between text-[8px] text-foreground/60 font-medium px-1">
              <div className="flex items-center gap-1"><Truck className="w-2.5 h-2.5 text-accent" /> Free Ship</div>
              <div className="flex items-center gap-1"><RefreshCw className="w-2.5 h-2.5 text-accent" /> 30-Day</div>
              <div className="flex items-center gap-1"><ShieldCheck className="w-2.5 h-2.5 text-accent" /> Premium</div>
            </div>
            
            {/* Quick Specs Box */}
            <div className="bg-background/40 rounded-lg p-2 flex justify-between items-center text-[8px] text-foreground/50 border border-foreground/5">
              <div className="flex flex-col"><span className="text-foreground">Weight</span>{product.quickSpecs.weight}</div>
              <div className="w-px h-5 bg-foreground/10" />
              <div className="flex flex-col"><span className="text-foreground">Grind</span>{product.quickSpecs.grind}</div>
              <div className="w-px h-5 bg-foreground/10" />
              <div className="flex flex-col"><span className="text-foreground">Fresh</span>{product.quickSpecs.freshness}</div>
            </div>
          </div>
        </motion.div>

        {/* Live Toast absolute position inside card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-11/12 bg-foreground/10 backdrop-blur-xl border border-foreground/20 p-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-2xl z-50 pointer-events-none"
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
          </span>
          <span className="text-[7px] text-foreground font-bold uppercase tracking-widest text-center leading-none">
            Someone in Mumbai bought this 2m ago
          </span>
        </motion.div>

      </div>
    </motion.div>
  );
};

const ActionButton = ({ icon: Icon, tooltip, isHovered, delay }: { icon: any, tooltip: string, isHovered: boolean, delay: number }) => (
  <motion.div
    initial={{ x: 15, opacity: 0 }}
    animate={{ x: isHovered ? 0 : 15, opacity: isHovered ? 1 : 0 }}
    transition={{ duration: 0.3, delay }}
    className="relative group/icon"
  >
    <button className="h-7 w-7 rounded-full bg-background/60 backdrop-blur-xl border border-foreground/10 flex items-center justify-center text-foreground/70 hover:bg-accent hover:text-background hover:border-accent transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(255,213,79,0.5)] hover:scale-110">
      <Icon className="w-3.5 h-3.5" />
    </button>
    <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-background/90 backdrop-blur-md border border-foreground/10 text-[8px] font-bold text-foreground whitespace-nowrap rounded opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-300 shadow-xl">
      {tooltip}
    </div>
  </motion.div>
);

const StatBar = ({ label, value, isHovered }: { label: string, value: number, isHovered: boolean }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between items-end">
      <span className="text-[8px] text-foreground/60 font-bold uppercase tracking-wider">{label}</span>
      <span className="text-[8px] text-accent font-black">{value}%</span>
    </div>
    <div className="w-full h-0.5 bg-foreground/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isHovered ? `${value}%` : 0 }}
        transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-foreground/30 to-foreground"
      />
    </div>
  </div>
);
