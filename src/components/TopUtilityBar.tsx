import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Package, Heart, HeadphonesIcon, Map, Scale, Sun, Moon, Bell, User, ShoppingCart, Users, Coffee, Flame, CheckCircle2, Star, X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import SmartSearch from '@/components/search/SmartSearch';
import ThemeToggle from '@/components/theme/ThemeToggle';

const ANNOUNCEMENTS = [
  "✨ PREMIUM COFFEE ECOMMERCE EXPERIENCE ✨",
  "☕ World's Finest Coffee & Brewing Equipment",
  "🚚 FREE SHIPPING ON ORDERS ABOVE ₹999",
  "☕ Freshly Roasted Every Week",
  "🎁 Buy 2 Get 1 Free",
  "⭐ Rated 4.9 by 20,000+ Coffee Lovers",
  "🌎 Imported Beans From 15 Countries"
];

const TopUtilityBar = () => {
  const navigate = useNavigate();
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur-2xl border-b border-accent/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col transition-colors duration-500">
      
      {/* ================= TOP ROW (Announcements & Locale) ================= */}
      <div className="h-[35px] border-b border-foreground/5 px-4 md:px-6 lg:px-8 flex items-center justify-between text-foreground/80 text-[10px] font-medium transition-colors duration-500">
        
        {/* LEFT: Animated Announcement */}
        <div className="flex-1 flex justify-start overflow-hidden h-full items-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={announcementIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute text-[9px] font-bold uppercase tracking-[0.1em] text-accent flex items-center gap-2 drop-shadow-[0_0_8px_rgba(255,213,79,0.2)]"
            >
              {ANNOUNCEMENTS[announcementIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT: Locale & Live Stats */}
        <div className="flex-1 flex justify-end items-center space-x-6">
          <div className="hidden lg:flex items-center gap-3 bg-foreground/[0.02] px-2 py-0.5 rounded-full border border-foreground/5">
            <div className="flex items-center gap-1.5 text-green-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              <span className="text-[9px]">324 Online</span>
            </div>
            <div className="w-px h-2.5 bg-foreground/10" />
            <div className="flex items-center gap-1.5 text-accent/80 text-[9px]">
              🟢 17 Orders Today
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-accent transition-colors">
              <span>🇮🇳</span> <span>India (INR)</span>
            </button>
            <button className="flex items-center gap-1 hover:text-accent transition-colors">
              <MapPin className="w-2.5 h-2.5 text-accent/80" /> <span>Free Delivery</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ROW (Navigation & Actions) ================= */}
      <div className="h-[55px] px-4 md:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LEFT: Navigation Links */}
        <div className="flex-1 flex items-center justify-start gap-6">
          <nav className="hidden md:flex items-center space-x-6">
            {['Shop', 'Machines', 'Accessories', 'Journal'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/70 hover:text-accent transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
        </div>

        {/* CENTER: E-Commerce Logo */}
        <div className="flex-1 flex justify-center items-center">
          <a href="/" className="text-xl lg:text-2xl font-black tracking-[0.2em] uppercase flex items-center gap-2 relative group text-foreground">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 group-hover:from-accent group-hover:to-foreground transition-all duration-500">
              E-Commerce
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent mt-0.5 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(255,213,79,0.5)]"></span>
          </a>
        </div>

        {/* RIGHT: Premium Action Icons */}
        <div className="flex-1 flex items-center justify-end space-x-1">
          <ThemeToggle />
          <IconButton icon={Search} tooltip="Search" onClick={() => setIsSearchOpen(true)} />
          <IconButton icon={Package} tooltip="Track Order" onClick={() => navigate('/track-order')} />
          <IconButton icon={Heart} tooltip="Wishlist" />
          <div className="relative group/support">
            <IconButton icon={HeadphonesIcon} tooltip="" />
            
            {/* Support Dropdown Menu */}
            <div className="absolute top-full mt-3 right-0 w-80 bg-background/95 backdrop-blur-2xl border border-foreground/10 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover/support:opacity-100 group-hover/support:visible transition-all duration-300 z-50 transform origin-top-right group-hover/support:scale-100 scale-95 flex flex-col overflow-hidden">
               <div className="p-3 border-b border-foreground/5 flex justify-between items-center bg-foreground/[0.02]">
                 <div className="flex items-center gap-2">
                   <HeadphonesIcon className="w-3.5 h-3.5 text-foreground" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Premium Support</span>
                 </div>
                 <div className="flex items-center gap-1.5 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                   <span className="relative flex h-1.5 w-1.5">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                   </span>
                   <span className="text-[8px] font-bold text-green-400 uppercase tracking-widest">Online</span>
                 </div>
               </div>
               
               <div className="p-4 flex flex-col gap-3">
                 <p className="text-[9px] text-white/60 leading-relaxed font-medium">
                   Our coffee experts are ready to assist. Describe your issue in detail and we'll connect you with a specialist immediately.
                 </p>
                 
                 <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                   <div className="space-y-1.5">
                     <label className="text-[8px] font-bold uppercase tracking-widest text-foreground/50 pl-1">Category</label>
                     <select className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-[10px] text-foreground/90 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all cursor-pointer">
                       <option>Order Tracking & Delivery</option>
                       <option>Brewing Advice & Recipes</option>
                       <option>Subscription Management</option>
                       <option>Equipment Troubleshooting</option>
                     </select>
                   </div>
                   
                   <div className="space-y-1.5">
                     <label className="text-[8px] font-bold uppercase tracking-widest text-foreground/50 pl-1">Description</label>
                     <textarea 
                       rows={4} 
                       className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-[10px] text-foreground outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none placeholder:text-foreground/20 custom-scrollbar"
                       placeholder="Please provide details (e.g. order number, machine model, or specific brewing issue)..."
                     ></textarea>
                   </div>
                   
                   <button type="submit" className="w-full bg-[#D4AF37] hover:bg-white text-black font-black text-[9px] uppercase tracking-widest py-2.5 rounded-lg transition-colors flex justify-center items-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                     Submit Ticket
                   </button>
                 </form>
               </div>
               
               <div className="p-2 border-t border-white/5 bg-white/[0.01] flex justify-center gap-4 text-[8px] font-bold uppercase tracking-widest text-white/40">
                 <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">FAQ</span>
                 <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Live Chat</span>
                 <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Call Us</span>
               </div>
            </div>
          </div>
          <IconButton icon={Scale} tooltip="Compare" />
          
          <div className="w-px h-4 bg-white/10 mx-2" />
          
          <div className="relative group/notify">
            <IconButton icon={Bell} tooltip="" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)] pointer-events-none" />
            
            {/* Dropdown Menu */}
            <div className="absolute top-full mt-3 right-0 w-72 bg-background/95 backdrop-blur-2xl border border-foreground/10 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover/notify:opacity-100 group-hover/notify:visible transition-all duration-300 z-50 transform origin-top-right group-hover/notify:scale-100 scale-95 flex flex-col overflow-hidden">
               <div className="p-3 border-b border-foreground/5 flex justify-between items-center bg-foreground/[0.02]">
                 <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Notifications</span>
                 <span className="text-[8px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded">2 New</span>
               </div>
               <div className="flex flex-col max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10">
                 
                 <div className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 group/item">
                   <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
                     <CheckCircle2 className="w-3.5 h-3.5 text-green-400 group-hover/item:scale-110 transition-transform" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <div className="text-[10px] font-bold text-white mb-0.5 truncate">Order Delivered</div>
                     <div className="text-[9px] text-white/50 leading-tight">Your Ethiopian Yirgacheffe has arrived safely.</div>
                     <div className="text-[8px] text-white/30 uppercase tracking-widest mt-1">10 mins ago</div>
                   </div>
                 </div>
                 
                 <div className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 group/item">
                   <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 border border-[#D4AF37]/20">
                     <Star className="w-3.5 h-3.5 text-[#D4AF37] group-hover/item:scale-110 transition-transform" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <div className="text-[10px] font-bold text-white mb-0.5 truncate">New VIP Tier Reached</div>
                     <div className="text-[9px] text-white/50 leading-tight">You've reached Gold Elite status! Enjoy perks.</div>
                     <div className="text-[8px] text-white/30 uppercase tracking-widest mt-1">2 hours ago</div>
                   </div>
                 </div>

               </div>
               <button className="p-2.5 text-center text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] transition-colors w-full border-t border-white/5">
                 View All Notifications
               </button>
            </div>
          </div>
          
          <IconButton icon={User} tooltip="Account" onClick={() => navigate('/account')} />
          
          <div className="relative group">
            <IconButton icon={ShoppingCart} tooltip="Cart" onClick={() => setIsCartOpen(true)} />
            <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-accent text-black text-[8px] font-bold flex items-center justify-center shadow-[0_0_12px_rgba(255,213,79,0.8)] pointer-events-none group-hover:scale-110 group-hover:bg-white transition-all">
              2
            </span>
          </div>
        </div>
      </div>
    </header>
    
    <AnimatePresence>
      {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
    </AnimatePresence>

    {/* Smart Search Overlay */}
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex justify-center items-start pt-[12vh] px-4"
        >
          <div className="absolute inset-0" onClick={() => setIsSearchOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-4xl z-10"
          >
            <button 
              className="absolute -top-12 right-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>
            <SmartSearch />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

const IconButton = ({ icon: Icon, tooltip, onClick }: { icon: any, tooltip: string, onClick?: () => void }) => (
  <div className="relative group/icon">
    <button onClick={onClick} className="h-8 w-8 rounded-full flex items-center justify-center text-foreground/50 hover:text-accent hover:bg-foreground/[0.08] hover:shadow-[0_0_15px_rgba(255,213,79,0.2)] transition-all duration-300 relative overflow-hidden group-hover/icon:border group-hover/icon:border-accent/30 border border-transparent">
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover/icon:opacity-100 transition-opacity" />
      <Icon className="w-4 h-4 relative z-10 group-hover/icon:scale-110 transition-transform" />
    </button>
    
    {/* Tooltip */}
    {tooltip && (
      <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-[#111]/95 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white whitespace-nowrap rounded shadow-xl opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-300 z-50">
        {tooltip}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111] border-l border-t border-white/10 rotate-45" />
      </div>
    )}
  </div>
);

const CartDrawer = ({ onClose }: { onClose: () => void }) => {
  const cartItems = [
    {
      id: 1,
      name: "Ethiopian Yirgacheffe",
      variant: "Whole Bean • 250g",
      price: "₹24.99",
      img: "https://images.unsplash.com/photo-1524350876685-274059332603?w=200",
      quantity: 1
    },
    {
      id: 2,
      name: "Chemex Pour-Over Glass",
      variant: "6-Cup Classic",
      price: "₹45.00",
      img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200",
      quantity: 1
    },
    {
      id: 3,
      name: "Fellow Stagg EKG",
      variant: "Matte Black",
      price: "₹165.00",
      img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200",
      quantity: 1
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90]"
      />
      
      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-[#090909]/95 backdrop-blur-3xl border-l border-white/10 shadow-[-20px_0_40px_rgba(0,0,0,0.8)] z-[100] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Your Cart <span className="text-white/40 font-bold">(3)</span></h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl group hover:border-[#D4AF37]/30 hover:bg-white/[0.04] transition-all">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-black shrink-0 relative border border-white/5">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[11px] font-bold text-white mb-0.5">{item.name}</h3>
                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider">{item.variant}</p>
                  </div>
                  <button className="text-white/20 hover:text-red-400 transition-colors p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-black text-[#D4AF37]">{item.price}</span>
                  <div className="flex items-center gap-3 bg-black/50 rounded-lg px-2 py-1 border border-white/10">
                    <button className="text-white/50 hover:text-white transition-colors"><Minus className="w-3 h-3" /></button>
                    <span className="text-[10px] font-bold w-3 text-center text-white">{item.quantity}</span>
                    <button className="text-white/50 hover:text-white transition-colors"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Summary */}
        <div className="p-5 border-t border-white/5 bg-[#090909]">
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              placeholder="Promo Code" 
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 text-[10px] font-bold uppercase tracking-widest text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all"
            />
            <button className="px-5 py-2 bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors border border-white/5">
              Apply
            </button>
          </div>
          
          <div className="space-y-2 mb-4 bg-white/[0.02] p-3 rounded-lg border border-white/5">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/50">
              <span>Subtotal</span>
              <span className="text-white/80">₹234.99</span>
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-red-400">
              <span>Discount</span>
              <span>-₹24.99</span>
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/50">
              <span>Shipping</span>
              <span className="text-green-400">Free</span>
            </div>
            <div className="h-px w-full bg-white/10 my-2" />
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Total</span>
              <span className="text-lg font-black text-[#D4AF37]">₹210.00</span>
            </div>
          </div>
          
          <button className="w-full bg-[#D4AF37] hover:bg-white text-black font-black text-[10px] uppercase tracking-widest py-3.5 rounded-lg transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] flex justify-center items-center gap-2 group/btn">
            Secure Checkout <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default TopUtilityBar;
