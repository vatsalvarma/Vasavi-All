import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Filter, ArrowRight,
  Heart, Share2, Repeat, Eye, Star, BadgeCheck, Users, 
  Armchair, Coffee, TrendingUp, Wallet, SlidersHorizontal, ChevronDown, ChevronUp
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MOCK_CAFES = [
  {
    id: 1,
    name: "The Rustic Bean",
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    price: 4500000,
    priceStr: "₹45L",
    revenue: "₹12L/mo",
    revenueNum: 12,
    profit: "₹3.5L/mo",
    profitNum: 3.5,
    visitors: "4.2K",
    seating: "45",
    seatingNum: 45,
    cuisine: "Continental",
    rating: 4.8,
    reviews: 124,
    type: "Independent",
    verified: true,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
    tags: ["High Footfall", "Fully Furnished"]
  },
  {
    id: 2,
    name: "Urban Brew Co.",
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    price: 8500000,
    priceStr: "₹85L",
    revenue: "₹25L/mo",
    revenueNum: 25,
    profit: "₹8.2L/mo",
    profitNum: 8.2,
    visitors: "8.5K",
    seating: "80",
    seatingNum: 80,
    cuisine: "Artisan Coffee",
    rating: 4.9,
    reviews: 312,
    type: "Franchise",
    verified: true,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop",
    tags: ["Prime Location", "Established Brand"]
  },
  {
    id: 3,
    name: "Cloud Kitchen Central",
    location: "HSR Layout, Bangalore",
    city: "Bangalore",
    price: 2500000,
    priceStr: "₹25L",
    revenue: "₹8L/mo",
    revenueNum: 8,
    profit: "₹2.1L/mo",
    profitNum: 2.1,
    visitors: "N/A",
    seating: "0",
    seatingNum: 0,
    cuisine: "Multi-cuisine",
    rating: 4.2,
    reviews: 89,
    type: "Cloud Kitchen",
    verified: false,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
    tags: ["Delivery Only", "Low Overhead"]
  },
  {
    id: 4,
    name: "Cafe Mocha",
    location: "Connaught Place, Delhi",
    city: "Delhi",
    price: 12000000,
    priceStr: "₹1.2Cr",
    revenue: "₹35L/mo",
    revenueNum: 35,
    profit: "₹12L/mo",
    profitNum: 12,
    visitors: "12K",
    seating: "120",
    seatingNum: 120,
    cuisine: "Cafe & Desserts",
    rating: 4.7,
    reviews: 450,
    type: "Independent",
    verified: true,
    image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=600&auto=format&fit=crop",
    tags: ["Heritage Building", "Premium"]
  },
  {
    id: 5,
    name: "Sunset Roasters",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    price: 6000000,
    priceStr: "₹60L",
    revenue: "₹15L/mo",
    revenueNum: 15,
    profit: "₹4.5L/mo",
    profitNum: 4.5,
    visitors: "5.1K",
    seating: "60",
    seatingNum: 60,
    cuisine: "Specialty Coffee",
    rating: 4.6,
    reviews: 178,
    type: "Independent",
    verified: true,
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=600&auto=format&fit=crop",
    tags: ["Artisan", "Loyal Customer Base"]
  },
  {
    id: 6,
    name: "The Daily Grind",
    location: "Andheri West, Mumbai",
    city: "Mumbai",
    price: 5500000,
    priceStr: "₹55L",
    revenue: "₹14L/mo",
    revenueNum: 14,
    profit: "₹3.8L/mo",
    profitNum: 3.8,
    visitors: "6.2K",
    seating: "40",
    seatingNum: 40,
    cuisine: "Bistro",
    rating: 4.4,
    reviews: 205,
    type: "Franchise",
    verified: false,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop",
    tags: ["Turnkey", "High Visibility"]
  }
];

const CafeListingPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  
  // Advanced Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(20000000);
  const [minRevenue, setMinRevenue] = useState<number>(0);
  const [minProfit, setMinProfit] = useState<number>(0);
  const [minSeating, setMinSeating] = useState<number>(0);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Filtering Logic
  const filteredCafes = useMemo(() => {
    let result = MOCK_CAFES;

    if (searchTerm) {
      result = result.filter(cafe => 
        cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        cafe.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cafe.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== "All") {
      result = result.filter(cafe => cafe.type === selectedType);
    }

    if (selectedCity !== "All") {
      result = result.filter(cafe => cafe.city === selectedCity);
    }

    if (maxPrice < 20000000) {
      result = result.filter(cafe => cafe.price <= maxPrice);
    }

    if (minRevenue > 0) {
      result = result.filter(cafe => cafe.revenueNum >= minRevenue);
    }

    if (minProfit > 0) {
      result = result.filter(cafe => cafe.profitNum >= minProfit);
    }

    if (minSeating > 0) {
      result = result.filter(cafe => cafe.seatingNum >= minSeating);
    }

    return result;
  }, [searchTerm, selectedType, selectedCity, maxPrice, minRevenue, minProfit, minSeating]);

  return (
    <div className="min-h-screen bg-background pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground mb-4">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Premium Cafes</span>
          </h1>
          <p className="text-foreground/60 font-medium text-sm max-w-2xl mx-auto">
            Find the perfect culinary business to invest in. Filter by location, revenue, and type to discover your next venture.
          </p>
        </div>

        {/* Detailed Premium Search & Filter Bar */}
        <div className="bg-card border border-foreground/10 rounded-3xl mb-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Top Search Row */}
          <div className="p-4 flex flex-col md:flex-row gap-4 items-center">
            
            <div className="flex-1 w-full relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 opacity-0 group-focus-within:opacity-100 blur-md transition-opacity duration-500 rounded-xl"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-accent transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by name, location, or cuisine..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl py-4 pl-12 pr-4 text-sm font-bold text-foreground focus:outline-none focus:border-accent focus:bg-foreground/[0.08] transition-all uppercase tracking-wide placeholder:text-foreground/40"
                />
              </div>
            </div>

            <div className="w-full md:w-auto flex gap-4">
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="flex-1 md:w-44 bg-foreground/5 border border-foreground/10 rounded-xl py-4 px-4 text-xs font-bold uppercase tracking-widest text-foreground focus:outline-none focus:border-accent hover:bg-foreground/10 transition-colors appearance-none cursor-pointer"
              >
                <option value="All" className="bg-background">All Cities</option>
                <option value="Bangalore" className="bg-background">Bangalore</option>
                <option value="Mumbai" className="bg-background">Mumbai</option>
                <option value="Delhi" className="bg-background">Delhi</option>
              </select>

              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="flex-1 md:w-48 bg-foreground/5 border border-foreground/10 rounded-xl py-4 px-4 text-xs font-bold uppercase tracking-widest text-foreground focus:outline-none focus:border-accent hover:bg-foreground/10 transition-colors appearance-none cursor-pointer"
              >
                <option value="All" className="bg-background">All Types</option>
                <option value="Independent" className="bg-background">Independent</option>
                <option value="Franchise" className="bg-background">Franchise</option>
                <option value="Cloud Kitchen" className="bg-background">Cloud Kitchen</option>
              </select>

              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-4 rounded-xl border font-black uppercase tracking-widest text-xs transition-all ${
                  showFilters 
                    ? 'bg-accent text-background border-accent shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                    : 'bg-foreground/5 text-foreground border-foreground/10 hover:bg-foreground/10 hover:border-foreground/20'
                }`}
              >
                <SlidersHorizontal size={16} />
                Filters
                {showFilters ? <ChevronUp size={16} className="ml-1"/> : <ChevronDown size={16} className="ml-1"/>}
              </button>
            </div>
          </div>

          {/* Expandable Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="border-t border-foreground/10 bg-foreground/[0.02]"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  
                  {/* Slider: Max Price */}
                  <div className="flex flex-col relative group">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] text-foreground/50 font-black uppercase tracking-widest">Max Price</span>
                      <span className="text-sm font-black text-accent bg-accent/10 px-2 py-0.5 rounded-md">
                        {maxPrice >= 20000000 ? "Any Price" : `₹${(maxPrice / 100000).toFixed(0)}L`}
                      </span>
                    </div>
                    <div className="relative pt-2">
                      <input 
                        type="range" 
                        min="1000000" 
                        max="20000000" 
                        step="500000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent relative z-10"
                      />
                      <div className="absolute top-2 left-0 h-2 bg-accent rounded-l-lg pointer-events-none" style={{ width: `${((maxPrice - 1000000) / 19000000) * 100}%` }}></div>
                    </div>
                  </div>

                  {/* Slider: Min Revenue */}
                  <div className="flex flex-col relative group">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] text-foreground/50 font-black uppercase tracking-widest">Min Revenue / Mo</span>
                      <span className="text-sm font-black text-green-500 bg-green-500/10 px-2 py-0.5 rounded-md">
                        {minRevenue === 0 ? "Any" : `₹${minRevenue}L+`}
                      </span>
                    </div>
                    <div className="relative pt-2">
                      <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        step="1"
                        value={minRevenue}
                        onChange={(e) => setMinRevenue(Number(e.target.value))}
                        className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-green-500 relative z-10"
                      />
                      <div className="absolute top-2 left-0 h-2 bg-green-500 rounded-l-lg pointer-events-none" style={{ width: `${(minRevenue / 50) * 100}%` }}></div>
                    </div>
                  </div>

                  {/* Slider: Min Profit */}
                  <div className="flex flex-col relative group">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] text-foreground/50 font-black uppercase tracking-widest">Min Profit / Mo</span>
                      <span className="text-sm font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md">
                        {minProfit === 0 ? "Any" : `₹${minProfit}L+`}
                      </span>
                    </div>
                    <div className="relative pt-2">
                      <input 
                        type="range" 
                        min="0" 
                        max="20" 
                        step="0.5"
                        value={minProfit}
                        onChange={(e) => setMinProfit(Number(e.target.value))}
                        className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-blue-500 relative z-10"
                      />
                      <div className="absolute top-2 left-0 h-2 bg-blue-500 rounded-l-lg pointer-events-none" style={{ width: `${(minProfit / 20) * 100}%` }}></div>
                    </div>
                  </div>

                  {/* Slider: Min Seating */}
                  <div className="flex flex-col relative group">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] text-foreground/50 font-black uppercase tracking-widest">Min Seating Capacity</span>
                      <span className="text-sm font-black text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-md">
                        {minSeating === 0 ? "Any" : `${minSeating} Seats+`}
                      </span>
                    </div>
                    <div className="relative pt-2">
                      <input 
                        type="range" 
                        min="0" 
                        max="150" 
                        step="10"
                        value={minSeating}
                        onChange={(e) => setMinSeating(Number(e.target.value))}
                        className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-purple-500 relative z-10"
                      />
                      <div className="absolute top-2 left-0 h-2 bg-purple-500 rounded-l-lg pointer-events-none" style={{ width: `${(minSeating / 150) * 100}%` }}></div>
                    </div>
                  </div>

                </div>
                <div className="px-6 pb-6 flex justify-end">
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCity("All");
                      setSelectedType("All");
                      setMaxPrice(20000000);
                      setMinRevenue(0);
                      setMinProfit(0);
                      setMinSeating(0);
                    }}
                    className="text-xs font-bold uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Grid - Airbnb / Zillow Style Information Dense Cards */}
        {filteredCafes.length === 0 ? (
          <div className="text-center py-20 bg-card border border-foreground/10 rounded-3xl shadow-xl">
            <Filter className="mx-auto text-foreground/40 mb-4" size={48} />
            <h3 className="text-xl font-black uppercase tracking-widest text-foreground mb-2">No cafes found</h3>
            <p className="text-foreground/50 text-sm font-medium mb-6">Try adjusting your advanced filters or search term.</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCity("All");
                setSelectedType("All");
                setMaxPrice(20000000);
                setMinRevenue(0);
                setMinProfit(0);
                setMinSeating(0);
              }}
              className="px-8 py-3 bg-accent hover:bg-[#b5952f] shadow-[0_0_20px_rgba(212,175,55,0.3)] text-background rounded-xl font-black uppercase tracking-widest text-xs transition-all hover:-translate-y-0.5"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCafes.map((cafe, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={cafe.id}
                onMouseEnter={() => setHoveredCard(cafe.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-card rounded-3xl border border-foreground/10 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-foreground/20 transition-all duration-300 group flex flex-col h-full"
              >
                {/* Image & Badges Section */}
                <div className="relative h-56 overflow-hidden bg-black cursor-pointer">
                  <img 
                    src={cafe.image} 
                    alt={cafe.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  
                  {/* Top Left: Verified Badge */}
                  {cafe.verified && (
                    <div className="absolute top-3 left-3 bg-[#D4AF37]/90 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1.5 text-[9px] font-black text-black uppercase tracking-widest">
                      <BadgeCheck size={14} /> Verified
                    </div>
                  )}

                  {/* Top Right: Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300">
                    <button className="p-2 bg-black/40 hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-colors border border-white/10" title="Save to Favorites">
                      <Heart size={14} />
                    </button>
                    <AnimatePresence>
                      {hoveredCard === cafe.id && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex flex-col gap-2"
                        >
                          <button className="p-2 bg-black/40 hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-colors border border-white/10" title="Share">
                            <Share2 size={14} />
                          </button>
                          <button className="p-2 bg-black/40 hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-colors border border-white/10" title="Compare">
                            <Repeat size={14} />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Center Hover Action: Quick View */}
                  <AnimatePresence>
                    {hoveredCard === cafe.id && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
                      >
                        <button onClick={() => navigate(`/cafe/${cafe.id}`)} className="px-5 py-2.5 bg-background text-foreground rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-transform flex items-center gap-2 border border-foreground/10">
                          <Eye size={14} /> Quick View
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom Type Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/70 border border-white/10 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest text-white">
                    {cafe.type}
                  </div>
                  
                  {/* Image counter (mock) */}
                  <div className="absolute bottom-3 right-3 bg-black/70 border border-white/10 backdrop-blur-md px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest text-white flex items-center gap-1">
                    1/5
                  </div>
                </div>
                
                {/* Information Dense Body */}
                <div className="p-5 flex flex-col flex-1">
                  
                  {/* Title & Rating */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-black uppercase tracking-tight text-foreground group-hover:text-accent transition-colors truncate pr-2">{cafe.name}</h3>
                    <div className="flex items-center gap-1 bg-foreground/5 border border-foreground/5 px-2 py-1 rounded-md text-[10px] shrink-0">
                      <Star size={10} className="text-accent fill-accent" />
                      <span className="font-black text-foreground">{cafe.rating}</span>
                      <span className="text-foreground/50 font-bold">({cafe.reviews})</span>
                    </div>
                  </div>
                  
                  {/* Location & Cuisine */}
                  <div className="flex items-center gap-3 text-foreground/60 text-xs mb-5 font-medium">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin size={12} className="text-accent" />
                      <span className="truncate">{cafe.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Coffee size={12} className="text-accent" />
                      <span>{cafe.cuisine}</span>
                    </div>
                  </div>

                  {/* 4-Point Data Grid */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-3 mb-6 bg-foreground/[0.02] p-4 rounded-xl border border-foreground/5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-green-500/10 rounded-lg text-green-500 border border-green-500/20"><TrendingUp size={14} /></div>
                      <div>
                        <p className="text-[9px] text-foreground/50 uppercase tracking-widest font-bold leading-none">Revenue</p>
                        <p className="text-xs font-black text-foreground mt-1">{cafe.revenue}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500 border border-blue-500/20"><Wallet size={14} /></div>
                      <div>
                        <p className="text-[9px] text-foreground/50 uppercase tracking-widest font-bold leading-none">Profit</p>
                        <p className="text-xs font-black text-foreground mt-1">{cafe.profit}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-purple-500/10 rounded-lg text-purple-500 border border-purple-500/20"><Users size={14} /></div>
                      <div>
                        <p className="text-[9px] text-foreground/50 uppercase tracking-widest font-bold leading-none">Visitors</p>
                        <p className="text-xs font-black text-foreground mt-1">{cafe.visitors}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500 border border-orange-500/20"><Armchair size={14} /></div>
                      <div>
                        <p className="text-[9px] text-foreground/50 uppercase tracking-widest font-bold leading-none">Seats</p>
                        <p className="text-xs font-black text-foreground mt-1">{cafe.seating}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {cafe.tags.map(tag => (
                      <span key={tag} className="text-[9px] px-2.5 py-1 rounded-md bg-foreground/5 text-foreground/70 border border-foreground/10 uppercase tracking-widest font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price & Action */}
                  <div className="border-t border-foreground/10 pt-4 flex justify-between items-end mt-auto">
                    <div>
                      <p className="text-[10px] text-foreground/50 uppercase tracking-widest font-bold mb-1">Asking Price</p>
                      <p className="text-2xl font-black text-accent leading-none tracking-tighter">{cafe.priceStr}</p>
                    </div>
                    <button onClick={() => navigate(`/cafe/${cafe.id}`)} className="w-10 h-10 rounded-xl bg-accent hover:bg-[#b5952f] text-background flex items-center justify-center transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:-translate-y-0.5">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CafeListingPage;
