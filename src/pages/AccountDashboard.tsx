import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, Crown, Star, Award, ShieldCheck, 
  ShoppingBag, Heart, CalendarDays, Gift, Brain, Coffee, 
  TrendingUp, Bell, MessageSquare, MapPin, CreditCard, 
  Lock, FileText, HelpCircle, LogOut, ChevronRight, 
  Download, RefreshCw, Play, Zap, Thermometer, Droplets, 
  ArrowUpRight, Activity, Clock, CheckCircle2, MoreHorizontal,
  ChevronDown, Truck, Copy
} from 'lucide-react';

const ACCENT = '#D4AF37';
const BG = '#090909';

// Reusable Glass Card Component
const GlassCard = ({ children, className = "", delay = 0, noHover = false }: { children: React.ReactNode, className?: string, delay?: number, noHover?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`bg-foreground/[0.02] backdrop-blur-xl border border-foreground/5 rounded-xl overflow-hidden shadow-lg ${!noHover && 'hover:bg-foreground/[0.04] hover:border-foreground/10 transition-all duration-500'} ${className}`}
  >
    {children}
  </motion.div>
);

// --- LEFT SIDEBAR COMPONENTS ---

const NavigationMenu = () => {
  const menuItems = [
    { icon: User, label: "Overview", active: true },
    { icon: ShoppingBag, label: "My Orders" },
    { icon: Heart, label: "Wishlist", badge: "12" },
    { icon: CalendarDays, label: "Subscriptions" },
    { icon: MapPin, label: "Address Book" },
    { icon: CreditCard, label: "Payment Methods" },
    { icon: Lock, label: "Security Center" },
    { icon: FileText, label: "Downloads" },
    { icon: HelpCircle, label: "Help Center" },
  ];

  return (
    <GlassCard delay={0.1} className="p-1">
      <div className="flex flex-col gap-0.5">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button key={idx} className={`flex items-center justify-between px-2 py-1.5 rounded-lg transition-all duration-300 group ${item.active ? 'bg-gradient-to-r from-accent/20 to-transparent border border-accent/30' : 'hover:bg-foreground/5 border border-transparent'}`}>
              <div className="flex items-center gap-2">
                <Icon className={`w-3 h-3 ${item.active ? 'text-accent' : 'text-foreground/50 group-hover:text-foreground transition-colors'}`} />
                <span className={`text-[10px] font-semibold ${item.active ? 'text-foreground' : 'text-foreground/70 group-hover:text-foreground transition-colors'}`}>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-accent/20 text-accent text-[8px] font-black px-1.5 py-0.5 rounded-full border border-accent/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
};

const MembershipCard = () => (
  <GlassCard delay={0.2} className="relative overflow-hidden group">
    {/* Gold Gradient BG */}
    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent opacity-50" />
    <div className="absolute top-0 right-0 w-20 h-20 bg-accent/20 blur-[30px] -translate-y-1/2 translate-x-1/2" />
    
    <div className="relative p-2.5 z-10">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-[8px] font-black uppercase tracking-[0.2em] text-accent/80 mb-0.5">Current Tier</h3>
          <div className="flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-accent" />
            <h2 className="text-xs font-black text-foreground">Gold Elite</h2>
          </div>
        </div>
        <div className="w-6 h-6 rounded-full border border-accent/30 flex items-center justify-center bg-accent/10 backdrop-blur-md">
          <Star className="w-3 h-3 text-accent fill-[#D4AF37]" />
        </div>
      </div>
      
      <div className="space-y-1 mb-2">
        <div className="flex items-center gap-1.5 text-[9px] font-medium text-foreground/80">
          <CheckCircle2 className="w-2.5 h-2.5 text-accent" /> 2.5x Reward Multiplier
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-medium text-foreground/80">
          <CheckCircle2 className="w-2.5 h-2.5 text-accent" /> Free Priority Shipping
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-foreground/60">
          <span>12.4k Pts</span>
          <span className="text-accent">Plat(15k)</span>
        </div>
        <div className="w-full h-1 bg-background/50 rounded-full overflow-hidden border border-foreground/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '83%' }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-accent/50 to-accent rounded-full shadow-[0_0_8px_rgba(212,175,55,0.5)]"
          />
        </div>
      </div>
    </div>
  </GlassCard>
);

const SettingsCard = () => (
  <GlassCard delay={0.3} className="p-1.5 mt-auto">
    <button className="w-full flex items-center justify-between p-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 border border-foreground/5 hover:border-foreground/20 transition-all group">
      <div className="flex items-center gap-2">
        <LogOut className="w-3 h-3 text-red-400 group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-semibold text-red-400/90 group-hover:text-red-400">Sign Out</span>
      </div>
    </button>
  </GlassCard>
);

const ReferralWidget = () => (
  <GlassCard delay={0.25} className="p-3 relative overflow-hidden group border-accent/10 flex-1 flex flex-col">
    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-30" />
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-1.5 mb-2">
        <Gift className="w-3 h-3 text-accent" />
        <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-accent">Refer & Earn</h3>
      </div>
      <p className="text-[8px] font-medium text-foreground/60 leading-relaxed mb-3 flex-1">
        Invite friends and get a free bag of Roaster's Reserve for each successful referral.
      </p>
      
      <div className="bg-background/50 rounded flex items-center p-1.5 border border-foreground/5 mt-auto">
        <span className="text-[9px] font-mono text-foreground/80 w-full truncate pl-1">ELENA-26</span>
        <button className="bg-foreground/10 hover:bg-accent hover:text-background text-foreground/70 transition-colors rounded p-1 ml-1 shrink-0">
          <Copy className="w-2.5 h-2.5" />
        </button>
      </div>
    </div>
  </GlassCard>
);

// --- CENTER COMPONENTS ---

const ProfileHeader = () => (
  <GlassCard delay={0.1} className="relative overflow-hidden noHover" noHover>
    {/* Cover Banner (Video/Image) */}
    <div className="h-16 relative overflow-hidden">
      <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200" alt="Cover" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <button className="absolute top-2 right-2 bg-background/40 backdrop-blur-md border border-foreground/10 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/10 transition-colors">
        Edit Cover
      </button>
    </div>

    {/* Profile Info */}
    <div className="px-3 pb-2 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 -mt-6 mb-2">
        <div className="flex items-end gap-3">
          <div className="relative group">
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-[#090909] relative shadow-lg z-10 bg-background">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-accent w-4 h-4 rounded-full border-2 border-[#090909] flex items-center justify-center z-20">
              <ShieldCheck className="w-2.5 h-2.5 text-background" />
            </div>
          </div>
          <div className="pb-0.5">
            <h1 className="text-sm font-black text-foreground flex items-center gap-2 leading-tight">
              Elena Rodriguez
            </h1>
            <div className="text-[9px] text-foreground/50 font-medium mt-0.5 flex items-center gap-1.5">
              <span>elena.r@example.com</span>
              <span className="w-0.5 h-0.5 rounded-full bg-foreground/20" />
              <span>Joined 2024</span>
            </div>
          </div>
        </div>
        <div className="pb-0.5">
          <button className="bg-accent hover:bg-[#b5952f] text-background px-2.5 py-1 rounded-md font-bold text-[9px] uppercase tracking-widest transition-colors shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2 mt-2 pt-2 border-t border-foreground/5">
        {[
          { label: "Orders", value: "42", icon: ShoppingBag },
          { label: "Points", value: "12.4k", icon: Award },
          { label: "Level", value: "14", icon: Brain },
          { label: "Origin", value: "Ethiopia", icon: MapPin },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="flex flex-col gap-0">
              <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                <Icon className="w-2 h-2" /> {stat.label}
              </div>
              <div className="text-xs font-black text-foreground">{stat.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  </GlassCard>
);

const ProfileAnalytics = () => (
  <div className="grid grid-cols-4 gap-2">
    {[
      { label: "Saved", value: "₹340.50", trend: "+12%", color: "text-green-400" },
      { label: "Reviews", value: "18", trend: "+3", color: "text-blue-400" },
      { label: "Avg Ord", value: "₹45.20", trend: "-2%", color: "text-red-400" },
      { label: "Coupons", value: "4", trend: "Active", color: "text-accent" },
    ].map((stat, i) => (
      <GlassCard key={i} delay={0.2 + (i * 0.1)} className="p-2 flex flex-col justify-between h-14">
        <h4 className="text-[8px] font-bold uppercase tracking-widest text-foreground/50">{stat.label}</h4>
        <div className="flex items-end justify-between">
          <span className="text-xs font-black text-foreground">{stat.value}</span>
          <span className={`text-[8px] font-bold ${stat.color}`}>{stat.trend}</span>
        </div>
      </GlassCard>
    ))}
  </div>
);

const MyOrders = () => {
  const orders = [
    { id: "#ORD-9921", date: "Today", item: "Ethiopian Yirgacheffe", status: "Out for Delivery", img: "https://images.unsplash.com/photo-1524350876685-274059332603?w=100", total: "₹24.99" },
    { id: "#ORD-9844", date: "Oct 12", item: "Chemex Pour-Over Glass", status: "Delivered", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=100", total: "₹45.00" },
  ];

  return (
    <GlassCard delay={0.3} className="p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-1.5">
          <ShoppingBag className="w-3 h-3 text-accent" /> Recent Orders
        </h3>
        <button className="text-[8px] font-bold uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {orders.map((order, i) => (
          <div key={i} className="flex gap-2 p-1.5 rounded-lg border border-foreground/5 bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-colors group cursor-pointer items-center">
            <div className="w-8 h-8 rounded shrink-0 bg-background overflow-hidden">
              <img src={order.img} alt={order.item} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-foreground text-[10px] truncate w-full pr-1">{order.item}</h4>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest text-foreground/50">
                  <span>{order.date}</span>
                </div>
                <div className={`text-[7px] font-black uppercase tracking-widest px-1 py-0.5 rounded ${order.status === 'Delivered' ? 'bg-foreground/5 text-foreground/60' : 'bg-accent/10 text-accent border border-accent/20'}`}>
                  {order.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

const Wishlist = () => {
  const items = [
    { name: "Panama Geisha", price: "₹85.00", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200" },
    { name: "Fellow Stagg EKG", price: "₹165.00", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200" },
    { name: "Niche Zero", price: "₹699.00", img: "https://images.unsplash.com/photo-1520286824908-166ce50fb8b4?w=200" },
  ];

  return (
    <GlassCard delay={0.4} className="p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-1.5">
          <Heart className="w-3 h-3 text-accent" /> Wishlist
        </h3>
        <button className="text-[8px] font-bold uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {items.map((item, i) => (
          <div key={i} className="relative rounded-lg overflow-hidden group h-16 bg-background border border-foreground/5 cursor-pointer flex items-end">
            <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            
            <div className="relative p-1.5 w-full">
              <h4 className="font-bold text-foreground text-[9px] truncate">{item.name}</h4>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-accent font-black text-[9px]">{item.price}</span>
              </div>
            </div>
            <button className="absolute top-1 right-1 w-4 h-4 rounded-full bg-background/40 backdrop-blur-md flex items-center justify-center border border-foreground/10">
              <Heart className="w-2 h-2 text-accent fill-[#D4AF37]" />
            </button>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

const MySubscriptions = () => (
  <GlassCard delay={0.5} className="p-2 relative overflow-hidden group">
    <div className="absolute -right-8 -top-8 w-16 h-16 bg-accent/5 rounded-full blur-[20px] pointer-events-none" />
    
    <div className="flex items-center justify-between mb-2 relative z-10 px-1">
      <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-1.5">
        <CalendarDays className="w-3 h-3 text-accent" /> Subscriptions
      </h3>
    </div>

    <div className="bg-foreground/[0.03] border border-foreground/10 p-2 rounded-lg flex justify-between items-center relative z-10 hover:border-accent/30 transition-colors">
      <div className="flex gap-2 items-center">
        <div className="w-7 h-7 rounded-full bg-background flex items-center justify-center border border-foreground/10 shrink-0">
          <Coffee className="w-3 h-3 text-accent" />
        </div>
        <div>
          <h4 className="font-bold text-foreground text-[10px] mb-0.5">Roaster's Reserve</h4>
          <div className="text-[8px] font-bold uppercase tracking-widest text-foreground/50">Monthly • 2 Bags</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 justify-end">
        <div className="text-right">
          <div className="text-[7px] font-bold uppercase tracking-widest text-foreground/40 mb-0.5">Next Ship</div>
          <div className="font-mono text-foreground font-bold text-[9px] tracking-wider">Oct 24, 2026</div>
        </div>
        <button className="bg-foreground/10 hover:bg-foreground/20 text-foreground px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest transition-colors">
          Manage
        </button>
      </div>
    </div>
  </GlassCard>
);

const CoffeePersonality = () => (
  <GlassCard delay={0.6} className="p-3">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-1.5">
        <Brain className="w-3 h-3 text-accent" /> Taste Profile
      </h3>
    </div>
    
    <div className="grid grid-cols-2 gap-2 items-center">
      {/* Fake Radar Chart using SVG */}
      <div className="relative aspect-square w-16 mx-auto flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Grid lines */}
          <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          <polygon points="50,25 75,37.5 75,62.5 50,75 25,62.5 25,37.5" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          {/* Axes */}
          <line x1="50" y1="50" x2="50" y2="10" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <line x1="50" y1="50" x2="90" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <line x1="50" y1="50" x2="90" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <line x1="50" y1="50" x2="50" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <line x1="50" y1="50" x2="10" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <line x1="50" y1="50" x2="10" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          
          {/* Data Polygon */}
          <motion.polygon 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            points="50,20 80,40 60,80 50,70 30,60 25,25" 
            fill="rgba(212,175,55,0.3)" 
            stroke="#D4AF37" 
            strokeWidth="2"
            style={{ transformOrigin: 'center' }}
          />
        </svg>
      </div>

      <div className="flex flex-col justify-center gap-1.5">
        <div className="bg-foreground/5 p-1.5 rounded border border-foreground/5">
          <div className="text-[8px] font-bold uppercase tracking-widest text-foreground/50 mb-0.5">Fav Profile</div>
          <div className="text-foreground font-bold text-[9px]">Bright, Fruity & Floral</div>
        </div>
        <div className="bg-accent/10 p-1.5 rounded border border-accent/20">
          <div className="text-[8px] font-bold uppercase tracking-widest text-accent/70 mb-0.5">AI Pick</div>
          <div className="text-accent font-bold text-[9px]">Kenya Washed</div>
        </div>
      </div>
    </div>
  </GlassCard>
);

// --- RIGHT SIDEBAR COMPONENTS ---

const QuickActions = () => (
  <GlassCard delay={0.2} className="p-2">
    <h3 className="text-[8px] font-black uppercase tracking-[0.2em] text-foreground/50 mb-2 px-1">Quick Actions</h3>
    <div className="grid grid-cols-4 gap-1.5">
      {[
        { icon: Truck, label: "Track" },
        { icon: RefreshCw, label: "Reorder" },
        { icon: Download, label: "Invoice" },
        { icon: MessageSquare, label: "Help" },
      ].map((action, i) => {
        const Icon = action.icon;
        return (
          <button key={i} className="flex flex-col items-center justify-center gap-1 p-1.5 bg-foreground/5 hover:bg-foreground/10 rounded border border-foreground/5 transition-colors group">
            <Icon className="w-3 h-3 text-foreground/40 group-hover:text-accent transition-colors" />
            <span className="text-[7px] font-bold uppercase tracking-widest text-foreground/70 group-hover:text-foreground transition-colors">{action.label}</span>
          </button>
        );
      })}
    </div>
  </GlassCard>
);

const NotificationCenter = () => (
  <GlassCard delay={0.3} className="p-3">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/50">Notifications</h3>
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
    </div>
    
    <div className="space-y-2">
      {[
        { title: "Subscription Processed", time: "2 hours ago", icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10" },
        { title: "Price Drop on Niche", time: "1 day ago", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
        { title: "New Masterclass", time: "2 days ago", icon: Play, color: "text-blue-400", bg: "bg-blue-400/10" },
      ].map((notif, i) => {
        const Icon = notif.icon;
        return (
          <div key={i} className="flex gap-2 group cursor-pointer hover:bg-foreground/5 p-1 -mx-1 rounded transition-colors">
            <div className={`w-5 h-5 rounded-full ${notif.bg} flex items-center justify-center shrink-0`}>
              <Icon className={`w-2.5 h-2.5 ${notif.color}`} />
            </div>
            <div>
              <div className="text-[9px] font-bold text-foreground/90 group-hover:text-foreground transition-colors leading-tight">{notif.title}</div>
              <div className="text-[7px] font-bold uppercase tracking-widest text-foreground/40 mt-0.5">{notif.time}</div>
            </div>
          </div>
        );
      })}
    </div>
    
    <button className="w-full mt-2 text-[8px] font-bold uppercase tracking-widest text-foreground/30 hover:text-accent transition-colors flex items-center justify-center gap-1">
      View All <ChevronRight className="w-2 h-2" />
    </button>
  </GlassCard>
);

const AiCoffeeAssistant = () => (
  <GlassCard delay={0.4} className="p-3 relative overflow-hidden group border-accent/20">
    <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent opacity-50" />
    
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="w-8 h-8 rounded-full bg-background border-[1px] border-accent/30 flex items-center justify-center mb-2 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
        <Brain className="w-3 h-3 text-accent" />
      </div>
      <h3 className="text-[10px] font-black text-foreground mb-1">AI Assistant</h3>
      <p className="text-[8px] uppercase tracking-widest text-foreground/50 mb-2 leading-relaxed font-bold">
        Analyze profile & get a recommendation.
      </p>
      
      <button className="w-full bg-foreground text-background font-black text-[8px] uppercase tracking-widest py-1.5 rounded hover:bg-accent transition-all flex items-center justify-center gap-1 group/btn">
        Analyze <ArrowUpRight className="w-2 h-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  </GlassCard>
);

// MAIN PAGE EXPORT

export default function AccountDashboard() {
  return (
    <div className="h-[calc(100vh-90px)] w-full overflow-hidden bg-background text-foreground selection:bg-accent selection:text-background font-sans relative flex flex-col">
      {/* Global Noise Texture */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.03] mix-blend-screen" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
      
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[80px]" />
        <div className="absolute top-[50%] right-[-10%] w-[30%] h-[40%] bg-blue-500/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="w-full max-w-[1400px] mx-auto relative z-10 px-3 h-full flex flex-col">
        
        {/* Page Header */}
        <header className="py-2 flex items-center justify-between shrink-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-lg font-black tracking-tight text-foreground flex items-center gap-2">
              Command Center
            </h1>
            <p className="text-[8px] uppercase tracking-widest text-accent/70 font-bold">Premium Member Dashboard</p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="hidden md:flex items-center gap-1.5 bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 px-3 py-1.5 rounded-lg text-[9px] font-bold transition-colors shadow hover:border-foreground/20"
          >
            <Settings className="w-3 h-3 text-foreground/70" /> Account Settings
          </motion.button>
        </header>

        {/* 12-COLUMN DASHBOARD GRID - MODIFIED FOR COMPACTNESS */}
        <div className="grid grid-cols-12 gap-3 flex-1 pb-3">
          
          {/* LEFT SIDEBAR (2 cols) */}
          <div className="col-span-2 flex flex-col gap-3 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <NavigationMenu />
            <ReferralWidget />
            <SettingsCard />
          </div>

          {/* MIDDLE COLUMN (7 cols) - Contains most stuff */}
          <div className="col-span-7 flex flex-col gap-3">
            <ProfileHeader />
            <ProfileAnalytics />
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-3">
                <MyOrders />
                <MySubscriptions />
              </div>
              <div className="flex flex-col gap-3">
                <Wishlist />
                <CoffeePersonality />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (3 cols) */}
          <div className="col-span-3 flex flex-col gap-3">
            <MembershipCard />
            <QuickActions />
            <NotificationCenter />
            <AiCoffeeAssistant />
          </div>

        </div>
      </div>
    </div>
  );
}
