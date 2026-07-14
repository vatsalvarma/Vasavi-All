import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, ChevronRight, Activity, Beaker, MapPin, Wind, Leaf, Thermometer, 
  Clock, Zap, CheckCircle2, RefreshCcw, Truck, Shield, MessageSquare, Plus, Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductDetailsPage() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Static Taste Profile
  const roast = 50;
  const sweetness = 70;
  const acidity = 60;
  const body = 85;
  
  // Purchase Options
  const [selectedRoast, setSelectedRoast] = useState('Medium Roast');
  const [processType, setProcessType] = useState('Cherry/ Sundried Coffee');
  const [quantity, setQuantity] = useState(1);
  const [packageSize, setPackageSize] = useState('250g');

  return (
    <div className="h-[calc(100vh-90px)] bg-background text-foreground overflow-hidden flex flex-col pt-4">
      {/* Background Decor */}
      <div className="fixed top-0 inset-x-0 h-[600px] bg-gradient-to-b from-accent/5 via-accent/2 to-transparent pointer-events-none z-0" />
      <div className="fixed -top-64 -right-64 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[8px] font-bold text-foreground/40 uppercase tracking-widest mb-4">
          <span className="hover:text-accent cursor-pointer transition-colors">Store</span>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="hover:text-accent cursor-pointer transition-colors">Single Origin</span>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="text-foreground">Ethiopian Yirgacheffe</span>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch h-[calc(100vh-140px)]">
          
          {/* ============================================================== */}
          {/* LEFT: Sticky Gallery (30%) */}
          {/* ============================================================== */}
          <div className="w-full lg:w-[28%] h-full flex flex-col gap-3">
            <Gallery />
          </div>
          {/* ============================================================== */}
          {/* CENTER: Intelligence Dashboard (44%) */}
          {/* ============================================================== */}
          <div className="w-full lg:w-[44%] h-full flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
            <HeaderSection />
            
            {/* Customizer & Radar Chart */}
            <div className="flex gap-4 shrink-0">
              {/* Radar Chart */}
              <div className="flex-1 flex items-center justify-start">
                <CoffeeDNAChart data={{ roast, sweetness, acidity, body, complexity: 90, aroma: 85 }} />
              </div>

              {/* Customizer */}
              <div className="flex flex-col gap-3 flex-1 justify-center">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">Taste Profile</h3>
                </div>
                <CustomSlider label="Roast Level" value={roast} />
                <CustomSlider label="Sweetness" value={sweetness} />
                <CustomSlider label="Acidity" value={acidity} />
                <CustomSlider label="Body" value={body} />
              </div>
            </div>

            <div className="h-px w-full bg-foreground/5 shrink-0" />
            <LiveStatus />
          </div>

          {/* ============================================================== */}
          {/* RIGHT: Purchase Dashboard (28%) */}
          {/* ============================================================== */}
          <div className="w-full lg:w-[28%] h-full flex flex-col gap-3">
            <PurchaseDashboard 
              quantity={quantity} setQuantity={setQuantity}
              packageSize={packageSize} setPackageSize={setPackageSize}
              selectedRoast={selectedRoast} setSelectedRoast={setSelectedRoast}
              processType={processType} setProcessType={setProcessType}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

// ==============================================================
// COMPONENTS
// ==============================================================

const Gallery = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const images = [
    'https://www.mokkafarms.com/cdn/shop/files/6.webp?v=1774596810',
    'https://www.mokkafarms.com/cdn/shop/files/6.webp?v=1774596810',
    'https://www.mokkafarms.com/cdn/shop/files/6.webp?v=1774596810'
  ];

  const activeImg = images[activeIdx];

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <motion.div 
        className="w-full aspect-square rounded-[24px] bg-[#F8F9FA] dark:bg-zinc-900 border border-foreground/5 overflow-hidden relative group shrink-0"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Steam / Background Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay opacity-30 animate-pulse z-10 pointer-events-none" />
        
        {/* Full Cover Image */}
        <motion.img 
          key={activeIdx + '-img'}
          src={activeImg} 
          alt="Coffee" 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover relative z-10 brightness-[1.1]" 
        />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-40 flex flex-col gap-2">
          <div className="px-2 py-1 text-[8px] font-black uppercase tracking-widest rounded-full bg-gradient-to-r from-accent to-yellow-600 text-background border border-accent/50 shadow-xl">
            Gold Medal
          </div>
        </div>
      </motion.div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-2 shrink-0">
        {images.map((img, idx) => (
          <button 
            key={idx} 
            onClick={() => setActiveIdx(idx)}
            className={`w-full aspect-square rounded-[8px] overflow-hidden border transition-all duration-300 relative bg-[#F8F9FA] dark:bg-zinc-900 ${activeIdx === idx ? 'border-accent shadow-lg scale-[1.02] opacity-100' : 'border-foreground/10 opacity-50 hover:opacity-100 hover:scale-[1.02]'}`}
          >
            <img src={img} className="w-full h-full object-cover brightness-[1.1]" alt="Thumb" />
          </button>
        ))}
      </div>
    </div>
  );
};

const HeaderSection = () => (
  <div className="flex flex-col gap-3 shrink-0">
    <div className="flex flex-wrap items-center gap-2 text-[8px] font-bold text-foreground/50 uppercase tracking-widest">
      <div className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5 text-accent" /> 🇪🇹 Ethiopia</div>
      <div className="w-1 h-1 rounded-full bg-foreground/20" />
      <div>Yirgacheffe</div>
      <div className="w-1 h-1 rounded-full bg-foreground/20" />
      <div>1950m</div>
      <div className="w-1 h-1 rounded-full bg-foreground/20" />
      <div>Natural</div>
    </div>

    <div>
      <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-foreground/40 tracking-tight leading-[1.1] mb-2">
        Ethiopian Yirgacheffe
      </h1>
      <p className="text-[10px] text-foreground/50 leading-snug line-clamp-2">
        An exceptional micro-lot cultivated at 1,950 meters. Expect an explosive floral bouquet of jasmine and bergamot, leading into complex notes of ripe peach and a lingering honey-like sweetness.
      </p>
    </div>

    <div className="flex items-center gap-3 border border-foreground/5 bg-foreground/5 backdrop-blur-md rounded-xl p-2 w-max">
      <div className="flex items-center gap-0.5 text-accent">
        {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-foreground">4.9</span>
        <span className="text-[8px] text-foreground/40 uppercase tracking-widest">(4.2k)</span>
      </div>
    </div>
  </div>
);

const LiveStatus = () => (
  <div className="grid grid-cols-4 gap-2 shrink-0">
    <StatusBox icon={Clock} label="Freshness" value="Roasted 2h Ago" color="text-green-400" />
    <StatusBox icon={Truck} label="Shipping" value="Ships Today" color="text-blue-400" />
    <StatusBox icon={Activity} label="Stock" value="12 Remaining" color="text-yellow-400" />
    <StatusBox icon={CheckCircle2} label="Grade" value="88.5 Specialty" color="text-purple-400" />
  </div>
);

const StatusBox = ({ icon: Icon, label, value, color }: any) => (
  <div className="flex flex-col gap-1 p-2 rounded-xl bg-foreground/5 border border-foreground/5 backdrop-blur-md hover:bg-foreground/10 transition-colors justify-center items-center text-center">
    <Icon className={`w-3.5 h-3.5 ${color}`} />
    <span className="text-[7px] font-bold text-foreground/40 uppercase tracking-widest truncate w-full">{label}</span>
    <span className="text-[9px] font-bold text-foreground truncate w-full">{value}</span>
  </div>
);

const CustomSlider = ({ label, value }: any) => (
  <div className="flex flex-col gap-2 relative group py-1">
    <div className="flex justify-between items-end mb-1">
      <span className="text-[9px] font-bold text-foreground/50 uppercase tracking-widest group-hover:text-foreground/80 transition-colors">{label}</span>
      <span className="text-[10px] font-black text-accent shadow-accent/20 drop-shadow-md">{value}%</span>
    </div>
    
    <div className="relative h-2.5 w-full bg-background/60 rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,1)] border border-foreground/5 overflow-visible">
      {/* Glow behind fill */}
      <motion.div 
        className="absolute top-0 left-0 h-full bg-accent/40 blur-[4px] rounded-full pointer-events-none"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      />
      
      {/* Solid fill */}
      <motion.div 
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent/50 to-accent rounded-full pointer-events-none shadow-[0_0_8px_hsl(var(--accent),0.4)]"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      />

      {/* Premium Thumb Indicator */}
      <motion.div
        className="absolute top-1/2 w-4 h-4 bg-card border-[1.5px] border-accent rounded-full shadow-[0_0_12px_hsl(var(--accent),0.6)] pointer-events-none flex items-center justify-center z-20"
        initial={{ left: 0, y: "-50%", x: "-50%" }}
        animate={{ left: `${value}%`, y: "-50%", x: "-50%" }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      >
        <div className="w-1 h-1 bg-accent rounded-full shadow-[0_0_5px_hsl(var(--foreground) / 0.8)]" />
      </motion.div>
    </div>
  </div>
);

const CoffeeDNAChart = ({ data }: { data: any }) => {
  // SVG Radar Chart Logic
  const size = 180;
  const center = size / 2;
  const radius = (size / 2) - 25;
  
  const metrics = ['roast', 'sweetness', 'acidity', 'body', 'complexity', 'aroma'];
  const total = metrics.length;
  const angle = (Math.PI * 2) / total;

  const getPoint = (value: number, index: number) => {
    const r = (value / 100) * radius;
    const a = (index * angle) - (Math.PI / 2);
    return { x: center + r * Math.cos(a), y: center + r * Math.sin(a) };
  };

  const points = metrics.map((m, i) => getPoint(data[m], i)).map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col items-center bg-background/40 rounded-[20px] border border-foreground/5 p-4 relative overflow-hidden group w-full">
      <div className="absolute top-3 left-3 flex items-center gap-1.5">
        <Activity className="w-3 h-3 text-accent" />
        <span className="text-[8px] font-bold text-foreground uppercase tracking-widest">DNA</span>
      </div>

      <div className="relative w-[180px] h-[180px]">
        <svg width={size} height={size} className="overflow-visible drop-shadow-[0_0_10px_hsl(var(--accent),0.2)]">
          {/* Grid lines */}
          {[1, 2, 3, 4].map((level) => {
            const r = (level / 4) * radius;
            const gridPts = metrics.map((_, i) => {
              const a = (i * angle) - (Math.PI / 2);
              return `${center + r * Math.cos(a)},${center + r * Math.sin(a)}`;
            }).join(' ');
            return (
              <polygon key={level} points={gridPts} fill="none" stroke="hsl(var(--foreground) / 0.05)" strokeWidth="1" />
            );
          })}
          
          {/* Axis lines */}
          {metrics.map((_, i) => {
            const outer = getPoint(100, i);
            return (
              <line key={i} x1={center} y1={center} x2={outer.x} y2={outer.y} stroke="hsl(var(--foreground) / 0.05)" strokeWidth="1" />
            );
          })}

          {/* Data Polygon */}
          <polygon 
            points={points}
            fill="hsl(var(--accent), 0.2)"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            style={{ transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />

          {/* Data Points */}
          {metrics.map((m, i) => {
            const pt = getPoint(data[m], i);
            return (
              <circle 
                key={i} 
                cx={pt.x} cy={pt.y} r="4" 
                fill="#0A0A0A" stroke="hsl(var(--accent))" strokeWidth="2"
                style={{ transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
            );
          })}

          {/* Labels */}
          {metrics.map((m, i) => {
            const pt = getPoint(115, i);
            return (
              <text 
                key={i} 
                x={pt.x} y={pt.y} 
                fill="rgba(255,255,255,0.5)" 
                fontSize="8" 
                fontWeight="bold"
                textAnchor="middle" 
                alignmentBaseline="middle"
                className="uppercase tracking-widest group-hover:fill-accent transition-colors duration-500"
              >
                {m}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

const AIBarista = () => (
  <div className="flex flex-col gap-2 bg-gradient-to-br from-foreground/10 to-transparent p-[1px] rounded-[20px] shrink-0">
    <div className="bg-background p-4 rounded-[20px] flex flex-col gap-3 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[40px]" />
      
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center">
          <MessageSquare className="w-3 h-3 text-accent" />
        </div>
        <div>
          <h3 className="text-[10px] font-black text-foreground uppercase tracking-widest">AI Barista</h3>
          <p className="text-[8px] text-foreground/50 uppercase tracking-widest">Ask anything about this coffee</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {['Milk drinks?', 'Brewing ratio?'].map((q) => (
          <button key={q} className="text-center px-2 py-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 border border-foreground/5 text-[9px] text-foreground/70 hover:text-foreground transition-all hover:-translate-y-0.5">
            "{q}"
          </button>
        ))}
      </div>
    </div>
  </div>
);

const PurchaseDashboard = ({ quantity, setQuantity, packageSize, setPackageSize, selectedRoast, setSelectedRoast, processType, setProcessType }: any) => {
  return (
    <div className="bg-background/80 backdrop-blur-3xl border border-foreground/10 rounded-[24px] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col gap-3 flex-1 min-h-0 overflow-hidden">
      
      {/* Price */}
      <div className="flex items-end justify-between shrink-0">
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-foreground/40 uppercase tracking-widest mb-1">Total Price</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-foreground tracking-tighter leading-none">₹{(1300.99 * quantity).toFixed(2)}</span>
          </div>
        </div>
        <div className="bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20 text-[8px] font-bold text-green-400 uppercase tracking-widest">
          In Stock
        </div>
      </div>

      <div className="h-px w-full bg-foreground/5 shrink-0" />

      {/* Process Option */}
      <div className="flex flex-col gap-2 shrink-0">
        <span className="text-[8px] font-bold text-foreground/60 uppercase tracking-widest">Process</span>
        <div className="grid grid-cols-1 gap-1.5">
          {['Cherry/ Sundried Coffee', 'Plantation/ Washed Coffee'].map(p => (
            <button 
              key={p}
              onClick={() => setProcessType(p)}
              className={`py-2 px-2 rounded-lg text-[9px] font-bold transition-all ${
                processType === p ? 'bg-accent text-background shadow-[0_0_15px_hsl(var(--accent),0.3)]' : 'bg-foreground/5 border border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/10'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Roast Option */}
      <div className="flex flex-col gap-2 shrink-0">
        <span className="text-[8px] font-bold text-foreground/60 uppercase tracking-widest">Roast Type</span>
        <div className="grid grid-cols-2 gap-1.5">
          {['Light Roast', 'Light-Medium Roast', 'Medium Roast', 'Medium-Dark Roast', 'Vienna Roast', 'Dark Roast'].map(r => (
            <button 
              key={r}
              onClick={() => setSelectedRoast(r)}
              className={`py-2 px-1 rounded-lg text-[9px] font-bold transition-all ${
                selectedRoast === r ? 'bg-accent text-background shadow-[0_0_15px_hsl(var(--accent),0.3)]' : 'bg-foreground/5 border border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/10'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Package Size */}
      <div className="flex flex-col gap-2 shrink-0">
        <span className="text-[8px] font-bold text-foreground/60 uppercase tracking-widest">Package Size</span>
        <div className="grid grid-cols-3 gap-1.5">
          {['250g', '500g', '1kg'].map(size => (
            <button 
              key={size}
              onClick={() => setPackageSize(size)}
              className={`py-2 rounded-lg text-[9px] font-bold transition-all ${
                packageSize === size ? 'bg-accent text-background shadow-[0_0_15px_hsl(var(--accent),0.3)]' : 'bg-foreground/5 border border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/10'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex flex-col gap-2 shrink-0">
        <span className="text-[8px] font-bold text-foreground/60 uppercase tracking-widest">Quantity</span>
        <div className="flex items-center justify-between bg-foreground/5 border border-foreground/10 rounded-xl p-1.5">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-7 h-7 rounded-lg bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center text-foreground transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm font-black text-foreground w-8 text-center">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-7 h-7 rounded-lg bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center text-foreground transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 mt-auto shrink-0">
        <Button className="w-full h-10 rounded-xl bg-foreground text-background hover:bg-accent hover:scale-[1.02] transition-all duration-300 font-black text-[10px] uppercase tracking-widest shadow-[0_0_20px_hsl(var(--foreground) / 0.2)] hover:shadow-[0_0_30px_hsl(var(--accent),0.4)]">
          Add To Cart
        </Button>
        <Button className="w-full h-9 rounded-xl bg-transparent border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors font-bold text-[9px] uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Shield className="w-3 h-3" /> Subscribe & Save
        </Button>
      </div>

      {/* Mini Trust */}
      <div className="flex items-center justify-center gap-3 text-[7px] text-foreground/40 font-bold uppercase tracking-widest mt-1 shrink-0">
        <div className="flex items-center gap-1"><Truck className="w-2.5 h-2.5" /> Free Ship</div>
        <div className="w-0.5 h-0.5 rounded-full bg-foreground/20" />
        <div className="flex items-center gap-1"><RefreshCcw className="w-2.5 h-2.5" /> 30-Day</div>
      </div>

    </div>
  );
};
