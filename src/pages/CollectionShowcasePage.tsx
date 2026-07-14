import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

const packs = [
  {
    id: 101,
    name: 'Mocha Late',
    number: '9',
    tagline: 'Be Active',
    title: 'Barnsley Brew Coffee',
    description: 'Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species. When coffee berries turn from green to bright red in color – indicating ripeness – they are picked, processed, and dried.',
    price: '69.99',
    image: './images/coffee-packet.png',
    color: 'from-zinc-900 to-black',
    textColor: 'text-zinc-900'
  },
  {
    id: 102,
    name: 'Iced Coffee',
    number: '8',
    tagline: 'Stay Cool',
    title: 'Havana Chill Blend',
    description: 'A refreshing iced coffee blend made from 100% Arabica beans, cold-brewed for 24 hours to extract the smoothest flavor profile possible without any bitterness.',
    price: '49.99',
    image: './images/coffee-packet.png',
    color: 'from-[#C4A484] to-[#8B5A2B]',
    textColor: 'text-[#8B5A2B]'
  },
  {
    id: 103,
    name: 'Caramel Frappe',
    number: '7',
    tagline: 'Sweet Indulgence',
    title: 'Milano Caramel Roast',
    description: 'Infused with natural caramel extracts during the roasting process, this coffee delivers a rich, dessert-like experience in every cup.',
    price: '55.00',
    image: './images/coffee-packet.png',
    color: 'from-[#A9B0B9] to-[#717983]',
    textColor: 'text-[#717983]'
  },
  {
    id: 104,
    name: 'Mocha Late',
    number: '6',
    tagline: 'Classic Richness',
    title: 'Vienna Dark Mocha',
    description: 'A dark roasted blend of premium beans combined with artisanal cocoa notes. Perfectly balanced for a rich, satisfying morning cup.',
    price: '65.99',
    image: './images/coffee-packet.png',
    color: 'from-[#5D4037] to-[#3E2723]',
    textColor: 'text-[#3E2723]'
  },
  {
    id: 105,
    name: 'Double Espresso',
    number: '5',
    tagline: 'Pure Energy',
    title: 'Napoli High Voltage',
    description: 'Intense, bold, and unapologetically strong. This double espresso blend is designed to kickstart your day with maximum flavor and energy.',
    price: '72.50',
    image: './images/coffee-packet.png',
    color: 'from-[#2F4F4F] to-[#1A3636]',
    textColor: 'text-[#1A3636]'
  }
];

export default function CollectionShowcasePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Default to the first pack if ID not found, otherwise find the passed ID
  const initialPack = packs.find(p => p.id === parseInt(id || '101')) || packs[0];
  const [activePack, setActivePack] = useState(initialPack);

  return (
    <div className="min-h-[calc(100vh-90px)] bg-[#F8F9FA] dark:bg-background text-foreground overflow-hidden relative font-sans flex items-center">
      
      {/* Decorative Jute Bag & Beans Bottom Right */}
      <img 
        src="https://freepngimg.com/thumb/coffee/3-2-coffee-png-pic.png" 
        alt="Coffee Beans"
        className="absolute -bottom-20 -right-20 w-[600px] opacity-90 drop-shadow-2xl z-0 mix-blend-multiply dark:mix-blend-normal pointer-events-none"
      />

      <div className="container mx-auto px-4 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end min-h-[600px]">
          
          {/* LEFT: Large Highlighted Product (Columns 1-4) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-start h-full pt-10">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activePack.id}
                onClick={() => navigate(`/product/${activePack.id}`)}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="w-full relative flex flex-col items-center cursor-pointer group/big-card"
              >
                {/* Huge Floating Bag */}
                <div className="relative z-20 w-[80%] -mb-28 pointer-events-none group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_30px_30px_rgba(0,0,0,0.4)]">
                  {/* The Base Image */}
                  <img src={activePack.image} alt={activePack.name} className="w-full h-auto relative z-10 grayscale brightness-[1.3] contrast-[1.1]" />
                  
                  {/* The Color Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${activePack.color} mix-blend-multiply z-20`} style={{ WebkitMaskImage: `url(${activePack.image})`, WebkitMaskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat' }} />
                  
                  {/* Huge Number Overlay inside the bag */}
                  <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center text-white opacity-95 pointer-events-none">
                     <div className="flex flex-col items-end mr-3 text-[16px] font-black tracking-widest uppercase leading-[0.9] transform -rotate-90 origin-bottom-right">
                       <span>{activePack.name.split(' ')[0]}</span>
                       <span>{activePack.name.split(' ')[1] || ''}</span>
                     </div>
                     <span className="text-[140px] font-black leading-none -ml-2 tracking-tighter drop-shadow-lg">{activePack.number}</span>
                  </div>
                </div>

                {/* White Base Card */}
                <div className="w-full bg-white dark:bg-card rounded-[30px] p-8 pt-24 pb-10 shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex flex-col items-center text-center relative z-10">
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">{activePack.name}</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                    {activePack.description}
                  </p>
                  <div className="flex items-center justify-between w-full font-black mt-auto">
                    <span className="text-sm text-zinc-800 dark:text-zinc-200">1 Bag</span>
                    <span className="text-xl text-zinc-900 dark:text-white">₹{activePack.price}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Text Info & Horizontal List (Columns 5-12) */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full pb-10">
            
            {/* Top Text Details */}
            <div className="max-w-2xl pt-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePack.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={`text-sm font-bold uppercase tracking-widest mb-3 ${activePack.textColor} opacity-80`}>
                    {activePack.tagline}
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tight leading-[1.1] mb-6 whitespace-nowrap">
                    {activePack.title}
                  </h1>
                  <p className="text-sm lg:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl font-medium">
                    {activePack.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Horizontal List ("Top Packs") */}
            <div className="mt-10">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4 pl-4">Top Packs</h3>
              
              <div className="flex items-end gap-6 overflow-x-auto pb-8 pt-40 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {packs.slice(1).map((pack) => (
                  <motion.div 
                    key={pack.id}
                    onHoverStart={() => setActivePack(pack)}
                    onClick={() => navigate(`/product/${pack.id}`)}
                    className="relative shrink-0 w-[180px] cursor-pointer group"
                  >
                    {/* Popping Small Bag */}
                    <motion.div 
                      className="absolute -top-28 left-1/2 -translate-x-1/2 w-[130px] z-20 pointer-events-none drop-shadow-xl"
                      animate={{ y: activePack.id === pack.id ? -10 : 0, scale: activePack.id === pack.id ? 1.05 : 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {/* The Base Image */}
                      <img src={pack.image} alt={pack.name} className="w-full h-auto relative z-10 grayscale brightness-[1.3] contrast-[1.1]" />
                      
                      {/* The Color Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${pack.color} mix-blend-multiply z-20`} style={{ WebkitMaskImage: `url(${pack.image})`, WebkitMaskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat' }} />
                      
                      {/* Bag Number */}
                      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center text-white opacity-95">
                         <div className="flex flex-col items-end mr-2 text-[8px] font-black tracking-widest uppercase leading-[0.9] transform -rotate-90 origin-bottom-right">
                           <span>{pack.name.split(' ')[0]}</span>
                           <span>{pack.name.split(' ')[1] || ''}</span>
                         </div>
                         <span className="text-[60px] font-black leading-none -ml-1 tracking-tighter drop-shadow-md">{pack.number}</span>
                      </div>
                    </motion.div>

                    {/* Small White Base Card */}
                    <div className={`w-full bg-white dark:bg-card rounded-[20px] p-4 pt-16 shadow-[0_15px_30px_rgba(0,0,0,0.06)] flex flex-col items-center text-center transition-all duration-300 ${activePack.id === pack.id ? 'shadow-[0_20px_40px_rgba(0,0,0,0.12)] -translate-y-2' : ''}`}>
                      <h4 className="text-sm font-black text-zinc-900 dark:text-white mb-1">{pack.name}</h4>
                      <p className="text-[8px] text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-3 leading-snug">
                        {pack.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
