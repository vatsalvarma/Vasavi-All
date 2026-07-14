import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  MapPin, 
  Share2, 
  Heart, 
  Flag,
  Users,
  Maximize2,
  Calendar,
  Building,
  CheckCircle2,
  FileText,
  Phone,
  MessageCircle,
  CalendarDays,
  Coffee,
  ChefHat,
  Car
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock API for safe compilation
const api = {
  get: async (url: string) => ({ data: [] }),
  post: async (url: string, data?: any) => ({ data: {} })
};

const FINANCIAL_DATA = [
  { month: 'Jan', revenue: 7.2, profit: 2.1 },
  { month: 'Feb', revenue: 7.5, profit: 2.3 },
  { month: 'Mar', revenue: 7.8, profit: 2.5 },
  { month: 'Apr', revenue: 8.1, profit: 2.8 },
  { month: 'May', revenue: 8.4, profit: 3.1 },
  { month: 'Jun', revenue: 8.5, profit: 3.2 },
];

const EXPENSE_DATA = [
  { name: 'Rent', value: 1.5, color: '#C89B3C' },
  { name: 'Payroll', value: 1.8, color: '#22c55e' },
  { name: 'Materials', value: 2.2, color: '#3b82f6' },
  { name: 'Utilities', value: 0.4, color: '#a855f7' },
];

const MOCK_LISTING = {
  id: 1,
  title: "The Rustic Bean",
  city: { name: "Koramangala, Bangalore" },
  price: 4500000,
  monthlyRevenue: 1200000,
  monthlyProfit: 350000,
  areaSqft: 1200,
  seatingCapacity: 45,
  isFranchise: false,
  isPremium: true,
  isVerified: true,
  description: "A well-established, highly profitable artisan cafe located in the bustling heart of Koramangala. The Rustic Bean has built a cult-following over the last 3 years with its premium coffee blends, aesthetic Instagram-worthy interiors, and exceptional food menu. The business is fully turnkey with all licenses, trained staff, and equipment included. Perfect for an investor looking for immediate cash flow.",
  images: [
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=800&auto=format&fit=crop"
  ],
  seller: {
    name: "Vasavi Corp",
    memberSince: "2023",
    verified: true
  }
};

const CafeListingDetailsPage = () => {
  const { id } = useParams();
  const listing = MOCK_LISTING;
  
  const [activeTab, setActiveTab] = useState('overview');
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayIsSaved, setLocalIsSaved] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const { register, handleSubmit, reset } = useForm();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleToggleSave = () => {
    setLocalIsSaved(!displayIsSaved);
  };

  const onLeadSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await api.post('/leads', { listingId: id, ...data });
      setLeadSuccess(true);
      reset();
      setTimeout(() => setLeadSuccess(false), 5000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!listing) return null;

  return (
    <div className="min-h-screen bg-background pt-[55px] pb-8 px-4 sm:px-6 lg:px-8 flex flex-col">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 mb-3 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            {listing.isPremium && (
              <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[9px] font-black uppercase tracking-widest border border-accent/30 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                Premium
              </span>
            )}
            {listing.isVerified && (
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 text-[9px] font-black uppercase tracking-widest border border-green-500/30 flex items-center gap-1">
                <CheckCircle2 size={10} /> Verified
              </span>
            )}
            <span className="text-foreground/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><MapPin size={12}/> {listing.city?.name}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground">{listing.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground/50 hover:text-foreground hover:bg-foreground/10 transition-colors">
            <Share2 size={16} />
          </button>
          <button 
            onClick={handleToggleSave}
            className={`p-2 rounded-xl border transition-colors ${displayIsSaved ? 'bg-accent/20 border-accent/50 text-accent shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-foreground/5 border-foreground/10 text-foreground/50 hover:text-foreground hover:bg-foreground/10'}`}
          >
            <Heart size={16} className={displayIsSaved ? 'fill-accent' : ''} />
          </button>
        </div>
      </div>

      {/* Main Bento Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4">
        
        {/* LEFT COLUMN: Gallery & Details */}
        <div className="flex-1 flex flex-col gap-4 min-w-0 pr-1 lg:pr-2">
          
          {/* Top: Bento Image Gallery (Dynamic Height) */}
          <div className="h-[220px] md:h-[260px] shrink-0 grid grid-cols-4 grid-rows-2 gap-2">
            <motion.div 
              className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer border border-foreground/10"
              whileHover={{ scale: 0.99 }}
              onMouseEnter={() => setHoveredImage(0)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img src={listing.images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              {hoveredImage === 0 && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <Maximize2 className="text-white" size={24} />
                </motion.div>
              )}
            </motion.div>
            
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                className="hidden md:block rounded-2xl overflow-hidden relative group cursor-pointer border border-foreground/10"
                whileHover={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredImage(i)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img src={listing.images[i]} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {i === 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-black uppercase tracking-widest text-[9px]">View All</span>
                  </div>
                )}
                {hoveredImage === i && i !== 4 && (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <Maximize2 className="text-white" size={20} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom: Price Bar, Mini Stats, and Tabs */}
          <div className="flex-1 flex flex-col gap-4">
            
            {/* Key Stats Bar (Compact) */}
            <div className="rounded-2xl p-4 bg-card flex flex-wrap gap-4 justify-between items-center border border-foreground/10 shadow-lg shrink-0 relative overflow-hidden group hover:border-accent/30 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
              <div>
                <p className="text-foreground/50 text-[9px] font-black uppercase tracking-widest mb-0.5">Asking Price</p>
                <p className="text-xl md:text-2xl font-black text-accent tracking-tighter leading-none">₹{listing.price.toLocaleString()}</p>
              </div>
              <div className="w-px h-8 bg-foreground/10 hidden md:block"></div>
              <div>
                <p className="text-foreground/50 text-[9px] font-black uppercase tracking-widest mb-0.5">Monthly Revenue</p>
                <p className="text-lg md:text-xl font-black text-foreground tracking-tighter leading-none">₹{listing.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="w-px h-8 bg-foreground/10 hidden md:block"></div>
              <div>
                <p className="text-foreground/50 text-[9px] font-black uppercase tracking-widest mb-0.5">Monthly Profit</p>
                <p className="text-lg md:text-xl font-black text-green-500 tracking-tighter leading-none">₹{listing.monthlyProfit.toLocaleString()}</p>
              </div>
            </div>

            {/* Quick Stats Grid (Compact) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
              {[
                { icon: Maximize2, label: 'Area', value: `${listing.areaSqft} Sq.Ft` },
                { icon: Users, label: 'Seating', value: `${listing.seatingCapacity} Seats` },
                { icon: Building, label: 'Franchise', value: listing.isFranchise ? 'Yes' : 'No' },
                { icon: Calendar, label: 'Age', value: '3 Years' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-foreground/10 shadow-md hover:border-accent/40 transition-colors cursor-default">
                  <div className="p-2 rounded-lg bg-foreground/5 text-accent border border-foreground/5 shrink-0">
                    <stat.icon size={14} />
                  </div>
                  <div>
                    <p className="text-[8px] text-foreground/50 uppercase tracking-widest font-black">{stat.label}</p>
                    <p className="text-[11px] font-black text-foreground mt-0.5 leading-none">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Tabs Content */}
            <div className="flex flex-col bg-card rounded-2xl border border-foreground/10 shadow-lg overflow-hidden">
              <div className="border-b border-foreground/10 flex overflow-x-auto custom-scrollbar shrink-0 bg-foreground/[0.01]">
                {['overview', 'financials', 'facilities', 'location'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[100px] py-3 text-[9px] font-black tracking-widest uppercase transition-colors relative ${activeTab === tab ? 'text-accent bg-accent/5' : 'text-foreground/50 hover:text-foreground hover:bg-foreground/5'}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTab2" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="p-5">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                      <p className="text-foreground/70 leading-relaxed font-medium text-xs">{listing.description}</p>
                      <div className="h-px bg-foreground/10"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-[9px] font-black text-foreground/50 mb-2 uppercase tracking-widest">Licenses Included</h4>
                          <ul className="space-y-1.5 text-foreground font-bold text-[10px]">
                            <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-green-500"/> FSSAI License</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-green-500"/> Trade License</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[9px] font-black text-foreground/50 mb-2 uppercase tracking-widest">Employees</h4>
                          <ul className="space-y-1.5 text-foreground font-bold text-[10px]">
                            <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-green-500"/> 2 Head Baristas</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-green-500"/> 1 Head Chef</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 'financials' && (
                    <motion.div key="financials" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Area Chart (Revenue) */}
                        <div>
                          <h4 className="text-[9px] font-black text-foreground/50 mb-2 uppercase tracking-widest">6-Month Trend</h4>
                          <div className="h-[150px] w-full bg-foreground/5 rounded-2xl border border-foreground/10 p-2 pt-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={FINANCIAL_DATA} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                                <defs>
                                  <linearGradient id="colorRev2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#C89B3C" stopOpacity={0.3}/><stop offset="95%" stopColor="#C89B3C" stopOpacity={0}/></linearGradient>
                                  <linearGradient id="colorProf2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} axisLine={false} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}L`} />
                                <Tooltip contentStyle={{ backgroundColor: '#090909', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '10px' }} />
                                <Area type="monotone" dataKey="revenue" stroke="#C89B3C" strokeWidth={2} fill="url(#colorRev2)" />
                                <Area type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} fill="url(#colorProf2)" />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Pie Chart (Expenses) */}
                        <div>
                          <h4 className="text-[9px] font-black text-foreground/50 mb-2 uppercase tracking-widest">Monthly Expenses</h4>
                          <div className="h-[150px] w-full bg-foreground/5 rounded-2xl border border-foreground/10 p-2 flex items-center">
                            <div className="flex-1 h-full relative">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie data={EXPENSE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} stroke="none">
                                    {EXPENSE_DATA.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <Tooltip contentStyle={{ backgroundColor: '#090909', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '10px' }} formatter={(v) => `₹${v}L`} />
                                </PieChart>
                              </ResponsiveContainer>
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-[10px] font-black text-foreground">₹5.9L</span>
                              </div>
                            </div>
                            <div className="w-[80px] shrink-0 flex flex-col justify-center gap-2 pr-2">
                              {EXPENSE_DATA.map((d) => (
                                <div key={d.name} className="flex items-center gap-1.5">
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }}></div>
                                  <span className="text-[9px] font-bold text-foreground/70 truncate">{d.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 'facilities' && (
                    <motion.div key="facilities" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 bg-foreground/5 p-3 rounded-xl border border-foreground/10 hover:border-accent/30 transition-colors"><Coffee className="text-accent shrink-0" size={16}/> <span className="text-foreground font-bold text-[10px]">La Marzocco</span></div>
                        <div className="flex items-center gap-3 bg-foreground/5 p-3 rounded-xl border border-foreground/10 hover:border-accent/30 transition-colors"><ChefHat className="text-accent shrink-0" size={16}/> <span className="text-foreground font-bold text-[10px]">Comm. Oven</span></div>
                        <div className="flex items-center gap-3 bg-foreground/5 p-3 rounded-xl border border-foreground/10 hover:border-accent/30 transition-colors"><Car className="text-accent shrink-0" size={16}/> <span className="text-foreground font-bold text-[10px]">Valet Parking</span></div>
                        <div className="flex items-center gap-3 bg-foreground/5 p-3 rounded-xl border border-foreground/10 hover:border-accent/30 transition-colors"><FileText className="text-accent shrink-0" size={16}/> <span className="text-foreground font-bold text-[10px]">POS System</span></div>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 'location' && (
                    <motion.div key="location" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                       <div className="h-[150px] bg-foreground/5 border border-foreground/10 rounded-2xl flex flex-col items-center justify-center text-foreground/40">
                         <MapPin size={32} className="mb-2 opacity-50 text-accent" />
                         <p className="font-bold uppercase tracking-widest text-[9px]">Map Hidden for Privacy</p>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Compressed Lead Form & Seller Card */}
        <div className="w-full lg:w-[260px] shrink-0 flex flex-col gap-3 pb-2 self-start sticky top-24">
          
          {/* Compressed Lead Form */}
          <div className="rounded-2xl p-3 bg-card border border-accent/40 shadow-[0_0_20px_rgba(212,175,55,0.1)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-colors" />
            <h3 className="text-base font-black uppercase tracking-tight text-foreground mb-0.5">Interested?</h3>
            <p className="text-foreground/60 text-[8px] font-bold uppercase tracking-widest mb-3">Contact seller or book visit.</p>
            
            <form onSubmit={handleSubmit(onLeadSubmit)} className="space-y-2 relative z-10">
              <div><input {...register('name', { required: true })} type="text" placeholder="Your Name" className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-2.5 py-1.5 text-foreground text-[10px] font-bold focus:border-accent outline-none transition-colors placeholder:text-foreground/40" /></div>
              <div><input {...register('phone', { required: true })} type="tel" placeholder="Phone Number" className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-2.5 py-1.5 text-foreground text-[10px] font-bold focus:border-accent outline-none transition-colors placeholder:text-foreground/40" /></div>
              <div><textarea {...register('message')} rows={2} placeholder="Hi, I am interested..." className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-2.5 py-1.5 text-foreground text-[10px] font-bold focus:border-accent outline-none transition-colors resize-none placeholder:text-foreground/40"></textarea></div>
              
              {leadSuccess && (
                <motion.div initial={{opacity:0, y:-5}} animate={{opacity:1, y:0}} className="p-1.5 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 text-[8px] font-black uppercase tracking-widest text-center shadow-md">
                  Inquiry sent!
                </motion.div>
              )}

              <button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-[#b5952f] text-background font-black text-[9px] uppercase tracking-widest py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 disabled:opacity-50">
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>

            <div className="flex items-center gap-1.5 mt-2 relative z-10">
              <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors font-black uppercase tracking-widest border border-[#25D366]/20 text-[8px]">
                <MessageCircle size={10} /> WhatsApp
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-foreground/5 text-foreground hover:bg-foreground/10 transition-colors font-black uppercase tracking-widest border border-foreground/10 text-[8px]">
                <Phone size={10} /> Call
              </button>
            </div>
            
            <button className="w-full mt-2 flex items-center justify-center gap-1 py-1.5 rounded-lg border border-accent/50 text-accent hover:bg-accent/10 transition-colors font-black uppercase tracking-widest text-[8px] relative z-10 group/visit">
              <CalendarDays size={10} className="group-hover/visit:scale-110 transition-transform" /> Book Site Visit
            </button>
          </div>

          {/* Compressed Seller Info */}
          <div className="rounded-2xl p-2.5 bg-card border border-foreground/10 shadow-md flex items-center gap-2 hover:border-accent/40 transition-colors cursor-pointer group shrink-0">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-black text-sm shrink-0 border border-accent/20 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(212,175,55,0.2)]">
              {listing.seller.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-foreground font-black uppercase tracking-wider text-[9px] truncate">{listing.seller.name}</p>
              <p className="text-[7px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-0.5 mt-0.5 truncate">
                {listing.seller.verified && <CheckCircle2 size={8}/>} 
                {listing.seller.verified ? 'Verified' : 'Unverified'} • Since {listing.seller.memberSince}
              </p>
            </div>
          </div>

          {/* Report */}
          <button className="flex items-center justify-center gap-1 text-foreground/40 hover:text-red-500 text-[8px] font-bold uppercase tracking-widest transition-colors mt-auto pt-1 shrink-0">
            <Flag size={8} /> Report listing
          </button>

        </div>
      </div>
    </div>
  );
};

export default CafeListingDetailsPage;
