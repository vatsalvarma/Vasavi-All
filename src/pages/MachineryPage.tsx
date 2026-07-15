import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const BRANDS = ['Astoria', 'CIME', 'LA Cimbali', 'Macap', 'Mazzer', 'My Espressino', 'NECTA', 'Rocket'];
const CATEGORIES = ['A Series', 'Bakery', 'Barista Accessories', 'Blenders', 'Coffee Grinders', 'Espresso Machines'];

const MACHINES = [
  { id: 1, name: 'Astoria Sabrina', brand: 'Astoria', category: 'Espresso Machines', image: './images/machines/machine1.png', price: '₹4,50,000' },
  { id: 2, name: 'Mazzer Super Jolly Electronic', brand: 'Mazzer', category: 'Coffee Grinders', image: './images/machines/machine2.png', price: '₹1,20,000' },
  { id: 3, name: 'Super Jolly V Up', brand: 'Mazzer', category: 'Coffee Grinders', image: './images/machines/machine3.png', price: '₹1,45,000' },
  { id: 4, name: 'La Cimbali M39', brand: 'LA Cimbali', category: 'Espresso Machines', image: './images/machines/machine4.png', price: '₹6,80,000' },
  { id: 5, name: 'Rocket Espresso R58', brand: 'Rocket', category: 'Espresso Machines', image: './images/machines/machine3.png', price: '₹2,50,000' },
  { id: 6, name: 'Macap M42', brand: 'Macap', category: 'Coffee Grinders', image: './images/machines/machine2.png', price: '₹85,000' },
];

export default function MachineryPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredMachines = MACHINES.filter(m => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(m.brand)) return false;
    if (selectedCategory && m.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="w-full bg-background text-foreground font-sans">
      
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Side Filters */}
          <div className="w-full md:w-64 shrink-0">
            <h2 className="text-xl font-bold text-accent mb-6">Filter by category</h2>
            
            <div className="space-y-6">
              <div>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`text-sm font-medium mb-4 transition-colors ${!selectedCategory ? 'text-accent' : 'text-foreground hover:text-accent'}`}
                >
                  All categories
                </button>
                <div className="space-y-3 pl-4 border-l border-border/50">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block text-sm text-left transition-colors ${selectedCategory === cat ? 'text-accent font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-widest">Brands</h3>
                <div className="space-y-3 pl-4 border-l border-border/50">
                  {BRANDS.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        selectedBrands.includes(brand) ? 'bg-accent border-accent text-primary-foreground' : 'border-muted-foreground group-hover:border-accent'
                      }`}>
                        {selectedBrands.includes(brand) && <Check className="w-3 h-3" />}
                      </div>
                      <span className={`text-sm transition-colors ${
                        selectedBrands.includes(brand) ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'
                      }`}>
                        {brand}
                      </span>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side Products */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
              <p className="text-sm text-muted-foreground">Showing 1–{filteredMachines.length} of {filteredMachines.length} results</p>
              <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
                Default sorting <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMachines.map(machine => (
                <motion.div 
                  key={machine.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden group hover:border-accent/50 transition-colors flex flex-col"
                >
                  <div className="aspect-square bg-white relative overflow-hidden flex items-center justify-center p-8 group/image">
                    <img src={machine.image} alt={machine.name} className="w-full h-full object-cover mix-blend-multiply group-hover/image:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
                      <Link 
                        to={`/machinery/${machine.id}`}
                        className="pointer-events-auto px-6 py-3 bg-background text-foreground rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 hover:bg-accent hover:text-background transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">{machine.brand}</p>
                    <h3 className="text-lg font-bold text-foreground mb-4 line-clamp-1">{machine.name}</h3>
                    <div className="mt-auto flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">{machine.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {filteredMachines.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-muted-foreground">No machines found matching your filters.</p>
                  <button 
                    onClick={() => { setSelectedBrands([]); setSelectedCategory(null); }}
                    className="mt-4 text-accent hover:underline text-sm font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
