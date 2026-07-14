import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Coffee, Filter, Search, ChevronDown, CheckCircle2, ChevronRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DUMMY_CAFES = [
  {
    id: 1,
    name: 'The Rustic Bean Roast',
    location: 'Koramangala, Bangalore',
    price: '1.2L',
    size: '1,500 sqft',
    seating: '60+',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop',
    tags: ['Fully Furnished', 'Premium Machine'],
    verified: true
  },
  {
    id: 2,
    name: 'Brew & Bake Social',
    location: 'Bandra West, Mumbai',
    price: '2.5L',
    size: '2,200 sqft',
    seating: '100+',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop',
    tags: ['Rooftop', 'Commercial Kitchen'],
    verified: true
  },
  {
    id: 3,
    name: 'Minimalist Coffee Co.',
    location: 'Jubilee Hills, Hyderabad',
    price: '90K',
    size: '800 sqft',
    seating: '30+',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2069&auto=format&fit=crop',
    tags: ['Boutique', 'High Footfall'],
    verified: false
  },
  {
    id: 4,
    name: 'The Daily Grind',
    location: 'Connaught Place, Delhi',
    price: '3.0L',
    size: '3,000 sqft',
    seating: '150+',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop',
    tags: ['Heritage Building', 'Turnkey'],
    verified: true
  },
  {
    id: 5,
    name: 'Artisan Espresso Bar',
    location: 'Indiranagar, Bangalore',
    price: '1.5L',
    size: '1,200 sqft',
    seating: '45+',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1932&auto=format&fit=crop',
    tags: ['Outdoor Seating', 'Pet Friendly'],
    verified: false
  }
];

export default function CafeListingPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-background pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/50 mb-4">
              <span className="hover:text-accent cursor-pointer transition-colors" onClick={() => navigate('/')}>Home</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-accent">Cafe Properties</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-foreground mb-4">
              Premium Cafe <br/> <span className="text-accent">Listings</span>
            </h1>
            <p className="text-sm font-medium text-foreground/60 max-w-xl">
              Discover turnkey coffee shops, premium commercial spaces, and fully-equipped cafes ready for your next venture.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-foreground/5 hover:bg-foreground/10 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors border border-foreground/10">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <div className="flex items-center gap-2 bg-foreground/5 px-5 py-3 rounded-xl border border-foreground/10 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-foreground/10 transition-colors">
              Sort By: <span className="text-accent">Recommended</span> <ChevronDown className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="hidden lg:block col-span-1 space-y-8">
            <div className="bg-card border border-foreground/10 rounded-3xl p-6 shadow-xl shadow-black/5">
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input 
                  type="text" 
                  placeholder="Search location..." 
                  className="w-full bg-foreground/5 rounded-xl pl-11 pr-4 py-3 text-xs font-bold outline-none border border-transparent focus:border-accent/50 transition-colors placeholder:text-foreground/40 uppercase tracking-wide"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest mb-4">Price Range</h3>
                  <div className="space-y-3">
                    {['Under 1 Lakh/mo', '1L - 2L/mo', '2L - 5L/mo', 'Premium (5L+)'].map(label => (
                      <label key={label} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded text-accent focus:ring-accent accent-accent" />
                        <span className="text-xs font-bold text-foreground/60 group-hover:text-foreground transition-colors">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="h-px bg-foreground/10" />

                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest mb-4">Amenities</h3>
                  <div className="space-y-3">
                    {['Commercial Kitchen', 'Espresso Machine Included', 'Outdoor Seating', 'Parking Space', 'Liquor License'].map(label => (
                      <label key={label} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded text-accent focus:ring-accent accent-accent" />
                        <span className="text-xs font-bold text-foreground/60 group-hover:text-foreground transition-colors">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="col-span-1 lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DUMMY_CAFES.map((cafe, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={cafe.id}
                  className="bg-card border border-foreground/10 rounded-3xl overflow-hidden group hover:border-accent/50 transition-colors cursor-pointer shadow-xl shadow-black/5 flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={cafe.image} 
                      alt={cafe.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-black/70 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                        For Rent
                      </span>
                      {cafe.verified && (
                        <span className="bg-green-500/90 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-green-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-foreground/10 flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      <span className="text-[10px] font-black">{cafe.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-black uppercase tracking-wide text-foreground line-clamp-1">{cafe.name}</h3>
                      <span className="text-xl font-black text-accent whitespace-nowrap ml-2">₹{cafe.price}<span className="text-xs text-foreground/50 font-bold">/mo</span></span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xs text-foreground/60 mb-6 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-accent" /> {cafe.location}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 bg-foreground/5 p-2.5 rounded-xl border border-foreground/5">
                        <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center border border-foreground/10 shrink-0">
                          <MapPin className="w-4 h-4 text-foreground/60" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase tracking-widest text-foreground/50 font-bold">Size</span>
                          <span className="text-xs font-black">{cafe.size}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-foreground/5 p-2.5 rounded-xl border border-foreground/5">
                        <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center border border-foreground/10 shrink-0">
                          <Users className="w-4 h-4 text-foreground/60" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase tracking-widest text-foreground/50 font-bold">Seating</span>
                          <span className="text-xs font-black">{cafe.seating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {cafe.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-foreground/70 bg-foreground/5 px-2.5 py-1 rounded-md border border-foreground/10">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full mt-auto bg-transparent border-2 border-foreground/10 hover:border-accent text-foreground hover:text-accent font-black text-[10px] uppercase tracking-widest py-3 rounded-xl transition-colors">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
