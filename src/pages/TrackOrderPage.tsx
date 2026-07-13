import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, MapPin, Truck, CheckCircle2,
  Thermometer, Droplets, ShieldCheck, Zap, 
  ChevronRight, Phone, MessageCircle, Share2, 
  Download, RefreshCcw, AlertTriangle, ArrowRight,
  Bot, Navigation, Activity, Star, Flame
} from 'lucide-react';

export default function TrackOrderPage() {
  return (
    <div className="h-[calc(100vh-90px)] w-full bg-background text-foreground p-2 md:p-3 font-sans overflow-hidden flex flex-col selection:bg-accent selection:text-background">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto relative z-10 flex flex-col h-full">
        
        {/* TOP HEADER */}
        <header className="flex flex-row justify-between items-end mb-3 gap-3 border-b border-foreground/5 pb-2 shrink-0">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-1"
            >
              <div className="px-2 py-0.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                </span>
                Live Tracking
              </div>
              <span className="text-foreground/40 text-[8px] uppercase tracking-widest font-bold">Placed Oct 24</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl font-black tracking-tight"
            >
              #ORD-<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-600">10487</span>
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-end"
          >
            <div className="text-[8px] text-foreground/40 uppercase tracking-widest font-bold mb-0.5">ETA</div>
            <div className="text-lg md:text-xl font-black text-foreground flex items-baseline gap-1.5">
              Today <span className="text-accent">4:42 PM</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="text-[8px] text-green-400 font-bold uppercase tracking-wider flex items-center gap-1 bg-green-400/10 px-1.5 py-0.5 rounded">
                <CheckCircle2 className="w-2.5 h-2.5" /> Paid
              </div>
              <div className="text-[8px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1 bg-blue-400/10 px-1.5 py-0.5 rounded">
                <Truck className="w-2.5 h-2.5" /> Out
              </div>
            </div>
          </motion.div>
        </header>

        {/* MAIN 12-COLUMN DASHBOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0 pb-2">
          
          {/* ================= LEFT SIDEBAR (3 cols) ================= */}
          <div className="lg:col-span-3 flex flex-col gap-3 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <OrderSummaryCard />
            <CoffeeFreshnessWidget />
            <PaymentAndSecurityCard />
          </div>

          {/* ================= CENTER (6 cols) ================= */}
          <div className="lg:col-span-6 flex flex-col gap-3 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <LiveMapComponent />
            <LiveProgressBar />
            <InteractiveTimeline />
          </div>

          {/* ================= RIGHT SIDEBAR (3 cols) ================= */}
          <div className="lg:col-span-3 flex flex-col gap-3 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <DriverCard />
            <PackageStatusDashboard />
            <AiAssistantWidget />
            <QuickActions />
          </div>

        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`bg-foreground/[0.02] backdrop-blur-xl border border-foreground/5 rounded-xl overflow-hidden shadow-lg ${className}`}
  >
    {children}
  </motion.div>
);

// --- LEFT SIDEBAR COMPONENTS ---

const OrderSummaryCard = () => (
  <GlassCard delay={0.1} className="p-3 relative group hover:border-accent/30 transition-colors duration-500">
    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
      <Package className="w-16 h-16 text-accent" />
    </div>
    
    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/50 mb-2">Order Summary</h3>
    
    <div className="flex gap-2 items-center mb-3 relative z-10">
      <div className="w-10 h-10 rounded-lg bg-background overflow-hidden border border-foreground/10 shrink-0">
        <img src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=150" className="w-full h-full object-cover mix-blend-luminosity" alt="Coffee" />
      </div>
      <div>
        <h4 className="font-bold text-foreground text-[10px]">Ethiopian Yirgacheffe</h4>
        <p className="text-[8px] text-foreground/50 mt-0.5">250g • Whole Bean</p>
      </div>
    </div>

    <div className="space-y-1.5 pt-2 border-t border-foreground/5 relative z-10 text-[9px] font-medium text-foreground/70">
      <div className="flex justify-between"><span>Subtotal</span><span>$24.99</span></div>
      <div className="flex justify-between"><span>Shipping</span><span className="text-green-400">Free</span></div>
      <div className="flex justify-between"><span>Taxes</span><span>$2.00</span></div>
      <div className="flex justify-between pt-1.5 border-t border-foreground/5 text-foreground font-black text-xs">
        <span>Total</span><span>$26.99</span>
      </div>
    </div>
  </GlassCard>
);

const CoffeeFreshnessWidget = () => (
  <GlassCard delay={0.2} className="p-3 flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/50">Freshness</h3>
      <span className="text-accent text-[8px] font-bold">98% OPTIMAL</span>
    </div>
    
    <div className="relative h-1.5 bg-foreground/10 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '98%' }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-600 to-accent rounded-full shadow-[0_0_10px_rgba(255,213,79,0.8)]"
      />
    </div>

    <div className="grid grid-cols-2 gap-2 mt-1">
      <div className="bg-background/40 rounded border border-foreground/5 p-1.5">
        <div className="text-[8px] text-foreground/40 uppercase tracking-wider mb-0.5">Roasted</div>
        <div className="text-[9px] font-bold text-foreground">Oct 23 (2d)</div>
      </div>
      <div className="bg-background/40 rounded border border-foreground/5 p-1.5">
        <div className="text-[8px] text-foreground/40 uppercase tracking-wider mb-0.5">Peak Flavor</div>
        <div className="text-[9px] font-bold text-foreground">Oct 27-Nov 10</div>
      </div>
    </div>
  </GlassCard>
);

const PaymentAndSecurityCard = () => (
  <GlassCard delay={0.3} className="p-3">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/50">Security</h3>
      <ShieldCheck className="w-3 h-3 text-green-400" />
    </div>
    <div className="space-y-1">
      <button className="w-full flex items-center justify-between p-2 rounded bg-foreground/5 hover:bg-foreground/10 border border-foreground/5 transition-colors group">
        <div className="flex items-center gap-2">
          <Download className="w-3 h-3 text-foreground/50 group-hover:text-accent transition-colors" />
          <span className="text-[9px] font-bold">Invoice</span>
        </div>
        <ChevronRight className="w-3 h-3 text-foreground/30" />
      </button>
      <button className="w-full flex items-center justify-between p-2 rounded bg-foreground/5 hover:bg-foreground/10 border border-foreground/5 transition-colors group">
        <div className="flex items-center gap-2">
          <RefreshCcw className="w-3 h-3 text-foreground/50 group-hover:text-accent transition-colors" />
          <span className="text-[9px] font-bold">Returns</span>
        </div>
        <ChevronRight className="w-3 h-3 text-foreground/30" />
      </button>
    </div>
  </GlassCard>
);

// --- CENTER COMPONENTS ---

const LiveMapComponent = () => (
  <GlassCard delay={0.4} className="flex-1 min-h-[160px] relative overflow-hidden group">
    {/* Simulated Map Background */}
    <div className="absolute inset-0 bg-background">
      {/* Grid Pattern */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* Animated Route SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4B5563" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#FACC15" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Base Path */}
        <path d="M 100 300 Q 300 300 400 200 T 700 100 T 900 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" strokeDasharray="8 8" />
        
        {/* Animated Progress Path */}
        <motion.path 
          d="M 100 300 Q 300 300 400 200 T 700 100 T 900 150" 
          fill="none" 
          stroke="url(#route-gradient)" 
          strokeWidth="3"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.8 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </svg>

      {/* Nodes */}
      <div className="absolute left-[10%] bottom-[25%] flex flex-col items-center -translate-x-1/2 translate-y-1/2">
        <div className="w-3 h-3 rounded-full bg-gray-600 border border-[#0A0A0A] z-10" />
        <span className="text-[8px] font-bold mt-1 uppercase tracking-widest text-foreground/50 bg-background px-1">Source</span>
      </div>
      
      <div className="absolute left-[90%] top-[37.5%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 rounded-full bg-accent border-2 border-[#0A0A0A] z-10 flex items-center justify-center">
          <MapPin className="w-2 h-2 text-background" />
        </div>
        <span className="text-[8px] font-bold mt-1 uppercase tracking-widest text-foreground bg-background px-1">Target</span>
      </div>

      {/* Animated Vehicle */}
      <motion.div 
        className="absolute z-20 flex flex-col items-center"
        initial={{ left: '10%', top: '75%' }}
        animate={{ left: '74%', top: '25%' }}
        transition={{ duration: 3, ease: "easeInOut" }}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative group/truck">
          <div className="w-6 h-6 bg-foreground rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <Truck className="w-3 h-3 text-background" />
          </div>
          {/* Radar Ping */}
          <div className="absolute inset-0 rounded-full border border-foreground/50 animate-ping" />
          
          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-md border border-foreground/10 px-2 py-1 rounded text-[9px] font-bold whitespace-nowrap shadow-xl">
            <div className="text-accent mb-0.5">3.2 km away</div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Overlay Map UI */}
    <div className="absolute top-2 left-2 right-2 flex justify-between pointer-events-none">
      <div className="bg-background/60 backdrop-blur-xl border border-foreground/10 p-2 rounded flex items-center gap-2">
        <Activity className="w-3 h-3 text-accent animate-pulse" />
        <div>
          <div className="text-[8px] text-foreground/50 uppercase tracking-widest font-bold">Traffic</div>
          <div className="text-[9px] font-black text-green-400">Fast Route</div>
        </div>
      </div>
      <div className="bg-background/60 backdrop-blur-xl border border-foreground/10 p-2 rounded flex flex-col items-end">
        <div className="text-[8px] text-foreground/50 uppercase tracking-widest font-bold">ETA</div>
        <div className="text-sm font-black text-foreground font-mono">14 MINS</div>
      </div>
    </div>
  </GlassCard>
);

const LiveProgressBar = () => {
  const steps = [
    { label: "Confirmed", status: "done" },
    { label: "Roasted", status: "done" },
    { label: "Packed", status: "done" },
    { label: "Out", status: "active" },
    { label: "Delivered", status: "pending" }
  ];

  return (
    <GlassCard delay={0.5} className="p-4">
      <div className="relative flex justify-between items-center">
        {/* Background Line */}
        <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-foreground/10 -translate-y-1/2 rounded-full" />
        
        {/* Active Line */}
        <motion.div 
          className="absolute left-0 top-1/2 h-[2px] bg-accent -translate-y-1/2 rounded-full shadow-[0_0_8px_rgba(255,213,79,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: '80%' }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {steps.map((step, idx) => (
          <div key={step.label} className="relative z-10 flex flex-col items-center gap-1.5">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + (idx * 0.1) }}
              className={`w-4 h-4 rounded-full flex items-center justify-center border-2 
                ${step.status === 'done' ? 'bg-accent border-accent' : 
                  step.status === 'active' ? 'bg-background border-accent' : 
                  'bg-background border-foreground/20'}`}
            >
              {step.status === 'done' && <CheckCircle2 className="w-2.5 h-2.5 text-background" />}
              {step.status === 'active' && <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />}
            </motion.div>
            <span className={`text-[8px] font-bold uppercase tracking-wider text-center max-w-[50px]
              ${step.status === 'active' ? 'text-accent' : step.status === 'done' ? 'text-foreground' : 'text-foreground/30'}`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

const InteractiveTimeline = () => {
  const events = [
    { time: "1:45 PM", title: "Out for Delivery", desc: "Courier has picked up your package.", icon: Truck, active: true },
    { time: "9:30 AM", title: "Arrived at Local Hub", desc: "Package scanned at Central Hub.", icon: MapPin },
    { time: "Yesterday", title: "Dispatched", desc: "Left the roastery.", icon: Navigation },
    { time: "Yesterday", title: "Beans Roasted", desc: "Temp: 210°C. Batch #2026.", icon: Flame },
  ];

  return (
    <GlassCard delay={0.6} className="p-4">
      <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/50 mb-3">Timeline</h3>
      
      <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-[2px] before:bg-foreground/10">
        {events.map((event, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + (idx * 0.1) }}
            className="relative flex items-center justify-normal group is-active"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-[#090909] shrink-0 bg-background z-10 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] group-hover:border-accent/30 transition-colors">
              {(() => {
                const Icon = event.icon;
                return <Icon className={`w-3 h-3 ${event.active ? 'text-accent' : 'text-foreground/50'}`} />;
              })()}
            </div>
            
            {/* Content */}
            <div className="w-[calc(100%-2rem)] ml-3 p-2 rounded-lg border border-foreground/5 bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-colors shadow-sm group-hover:border-foreground/10">
              <div className="flex items-center justify-between mb-0.5">
                <span className={`text-[10px] font-bold ${event.active ? 'text-accent' : 'text-foreground'}`}>{event.title}</span>
                <span className="text-[8px] font-bold text-foreground/40 uppercase tracking-widest">{event.time}</span>
              </div>
              <p className="text-[9px] text-foreground/60 leading-relaxed">{event.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
};

// --- RIGHT SIDEBAR COMPONENTS ---

const DriverCard = () => (
  <GlassCard delay={0.7} className="p-3">
    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/50 mb-2">Courier</h3>
    
    <div className="flex gap-2 items-center mb-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-accent">
          <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150" className="w-full h-full object-cover" alt="Driver" />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3 h-3 rounded-full border-2 border-[#090909]" />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-foreground text-[10px]">Alex Morgan</h4>
        <div className="flex items-center gap-1 text-[8px] text-foreground/60 mt-0.5">
          <Star className="w-2 h-2 text-accent fill-accent" /> 4.9 (1.2k Jobs)
        </div>
        <div className="text-[8px] text-foreground/40 mt-0.5 uppercase tracking-widest">White Van</div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-1.5">
      <button className="flex items-center justify-center gap-1 py-1.5 rounded bg-foreground/5 hover:bg-accent hover:text-background text-foreground transition-colors text-[9px] font-bold group">
        <Phone className="w-3 h-3 group-hover:animate-pulse" /> Call
      </button>
      <button className="flex items-center justify-center gap-1 py-1.5 rounded bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors text-[9px] font-bold border border-foreground/5">
        <MessageCircle className="w-3 h-3" /> Msg
      </button>
    </div>
  </GlassCard>
);

const PackageStatusDashboard = () => (
  <GlassCard delay={0.8} className="p-3">
    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/50 mb-2">Sensors</h3>
    
    <div className="grid grid-cols-2 gap-2">
      {/* Temp Gauge */}
      <div className="bg-background/40 rounded p-2 border border-foreground/5 flex flex-col items-center justify-center relative overflow-hidden group">
        <Thermometer className="w-3 h-3 text-blue-400 mb-1" />
        <div className="text-xs font-black text-foreground">22°C</div>
        <div className="text-[7px] text-foreground/40 uppercase tracking-widest mt-0.5">Temp</div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground/10">
          <div className="h-full w-[40%] bg-blue-400 rounded-r-full" />
        </div>
      </div>

      {/* Humidity Gauge */}
      <div className="bg-background/40 rounded p-2 border border-foreground/5 flex flex-col items-center justify-center relative overflow-hidden group">
        <Droplets className="w-3 h-3 text-cyan-400 mb-1" />
        <div className="text-xs font-black text-foreground">45%</div>
        <div className="text-[7px] text-foreground/40 uppercase tracking-widest mt-0.5">Humidity</div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground/10">
          <div className="h-full w-[45%] bg-cyan-400 rounded-r-full" />
        </div>
      </div>

      {/* Shock Sensor */}
      <div className="bg-background/40 rounded p-2 border border-foreground/5 flex flex-col items-center justify-center relative overflow-hidden group col-span-2">
        <div className="flex justify-between w-full items-center mb-1.5">
          <Zap className="w-3 h-3 text-accent" />
          <div className="px-1.5 py-0.5 bg-green-500/10 text-green-400 text-[7px] uppercase tracking-widest font-bold rounded">Stable</div>
        </div>
        <div className="w-full flex items-end gap-[2px] h-4">
          {[4, 2, 6, 3, 2, 8, 4, 2, 3, 5, 2, 4, 3, 2, 6, 4].map((h, i) => (
            <motion.div 
              key={i} 
              className="flex-1 bg-accent/40 rounded-t-[1px]"
              animate={{ height: `${h * 10}%` }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1, repeatType: 'mirror' }}
            />
          ))}
        </div>
      </div>
    </div>
  </GlassCard>
);

const AiAssistantWidget = () => (
  <GlassCard delay={0.9} className="p-0 overflow-hidden flex flex-col h-[140px]">
    <div className="p-2 border-b border-foreground/5 bg-foreground/[0.02] flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Bot className="w-3 h-3 text-accent" />
        <h3 className="text-[8px] font-black uppercase tracking-[0.2em] text-foreground">Delivery AI</h3>
      </div>
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
    </div>
    
    <div className="flex-1 p-2 overflow-y-auto flex flex-col gap-2 text-[9px]">
      <div className="bg-foreground/10 self-start p-2 rounded rounded-tl-none border border-foreground/5 text-foreground/80 max-w-[85%] leading-relaxed">
        Hello! Your coffee is 3.2km away. Traffic is light, expecting arrival in ~14 mins.
      </div>
    </div>

    <div className="p-2 border-t border-foreground/5 bg-background/40">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Ask AI..." 
          className="w-full bg-foreground/5 border border-foreground/10 rounded pl-2 pr-6 py-1.5 text-[9px] text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent/50 transition-colors"
        />
        <button className="absolute right-1.5 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-accent transition-colors">
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  </GlassCard>
);

const QuickActions = () => (
  <div className="grid grid-cols-2 gap-2 mt-auto">
    <button className="bg-foreground/5 hover:bg-foreground/10 border border-foreground/5 p-2 rounded flex flex-col items-center justify-center gap-1 transition-all hover:scale-[1.02] group">
      <Share2 className="w-3 h-3 text-foreground/50 group-hover:text-accent transition-colors" />
      <span className="text-[8px] font-bold uppercase tracking-widest text-foreground/70">Share</span>
    </button>
    <button className="bg-foreground/5 hover:bg-foreground/10 border border-foreground/5 p-2 rounded flex flex-col items-center justify-center gap-1 transition-all hover:scale-[1.02] group">
      <AlertTriangle className="w-3 h-3 text-foreground/50 group-hover:text-red-400 transition-colors" />
      <span className="text-[8px] font-bold uppercase tracking-widest text-foreground/70">Issue</span>
    </button>
  </div>
);
