import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from '../assets/world.json';

// cx, cy are the projected coordinates from d3.
// path is the exact polyline from the dot to the label.
// lx, ly is the starting position of the text label.
const COFFEE_REGIONS = [
  // Americas
  { id: 'el_salvador', code: 'SV', group: 'americas', name: 'EL SALVADOR', cx: 321, cy: 316, 
    path: "M321 316 L321 130 L140 130", lx: 140, ly: 125, align: 'right',
    notes: ['MILD ACIDITY', 'VANILLA, HAZELNUT, CHOCOLATE', 'PEAR'] },
  
  { id: 'guatemala', code: 'GT', group: 'americas', name: 'GUATEMALA', cx: 317, cy: 310, 
    path: "M317 310 L317 90 L280 90", lx: 280, ly: 85, align: 'right',
    notes: ['SPICY, SMOKY, EARTHY', 'DELICATE FLORAL, SWEET'] },
    
  { id: 'honduras', code: 'HN', group: 'americas', name: 'HONDURAS', cx: 329, cy: 312, 
    path: "M329 312 L329 200 L400 200", lx: 400, ly: 195, align: 'left',
    notes: ['CRISP', 'LIGHT-BODIED', 'NUTTY AND SPICY'] },
    
  { id: 'costa_rica', code: 'CR', group: 'americas', name: 'COSTA RICA', cx: 337, cy: 329, 
    path: "M337 329 L250 329 L250 270 L140 270", lx: 140, ly: 265, align: 'right',
    notes: ['MEDIUM BODY', 'CITRUS', 'NUTTY'] },
    
  { id: 'panama', code: 'PA', group: 'americas', name: 'PANAMA', cx: 346, cy: 333, 
    path: "M346 333 L240 333 L240 330", lx: 240, ly: 325, align: 'right',
    notes: ['ZESTY AND LIVELY', 'SPICY AND HERBAL', 'LEMONGRASS'] },
    
  { id: 'hawaii', code: 'HI', group: 'americas', name: 'HAWAII', cx: 111, cy: 297, 
    path: "M111 297 L111 380 L120 380", lx: 120, ly: 375, align: 'right',
    notes: ['MEDIUM BODY', 'LOW ACIDITY', 'VANILLA', 'BROWN SUGAR'] },
    
  { id: 'peru', code: 'PE', group: 'americas', name: 'PERU', cx: 364, cy: 389, 
    path: "M364 389 L330 460 L310 460", lx: 310, ly: 455, align: 'right',
    notes: ['MEDIUM BODY / ACIDITY', 'SPICY & NUTTY', 'CHOCOLATE', 'EARTHY'] },
    
  { id: 'colombia', code: 'CO', group: 'americas', name: 'COLOMBIA', cx: 368, cy: 346, 
    path: "M368 346 L368 370 L430 370", lx: 430, ly: 365, align: 'left',
    notes: ['MEDIUM BODY', 'MEDIUM ACIDITY', 'FRUITY & NUTTY'] },
    
  { id: 'brazil', code: 'BR', group: 'americas', name: 'BRAZIL', cx: 437, cy: 405, 
    path: "M437 405 L437 460 L430 460", lx: 430, ly: 455, align: 'left',
    notes: ['MEDIUM BODY', 'CARAMEL & CHOCOLATE', 'RICH & FRUITY'] },

  // Africa
  { id: 'rwanda', code: 'RW', group: 'africa', name: 'RWANDA', cx: 694, cy: 366, 
    path: "M694 366 L694 150 L550 150", lx: 550, ly: 145, align: 'right',
    notes: ['MEDIUM BODY', 'CHOCOLATE', 'FLORAL & NUTTY'] },
    
  { id: 'uganda', code: 'UG', group: 'africa', name: 'UGANDA', cx: 701, cy: 356, 
    path: "M701 356 L701 420 L550 420", lx: 550, ly: 415, align: 'right',
    notes: ['FULL BODY', 'CHOCOLATE', 'CREAMY', 'VANILLA'] },
    
  { id: 'ethiopia', code: 'ET', group: 'africa', name: 'ETHIOPIA', cx: 725, cy: 331, 
    path: "M725 331 L725 350 L760 350", lx: 760, ly: 345, align: 'left',
    notes: ['MEDIUM TO FULL BODY', 'CHOCOLATE & BLUEBERRY', 'FLORAL & HERBAL'] },
    
  { id: 'kenya', code: 'KE', group: 'africa', name: 'KENYA', cx: 719, cy: 360, 
    path: "M719 360 L719 460 L650 460", lx: 650, ly: 455, align: 'right',
    notes: ['FULL BODY', 'ZESTY & FLORAL', 'CITRUS & HERBAL'] },

  // Asia
  { id: 'yemen', code: 'YE', group: 'asia', name: 'YEMEN', cx: 752, cy: 311, 
    path: "M752 311 L752 110 L650 110", lx: 650, ly: 105, align: 'right',
    notes: ['FULL BODY', 'CHOCOLATE', 'WINE'] },
    
  { id: 'india', code: 'IN', group: 'asia', name: 'INDIA', cx: 848, cy: 294, 
    path: "M848 294 L848 70 L780 70", lx: 780, ly: 65, align: 'right',
    notes: ['FULL BODY', 'SPICY WITH MILD ACIDITY', 'TROPICAL FRUIT', 'ROASTED PEANUTS'] },
    
  { id: 'china', code: 'CN', group: 'asia', name: 'CHINA (YUNNAN)', cx: 918, cy: 281, 
    path: "M918 281 L918 220 L1050 220", lx: 1050, ly: 215, align: 'left',
    notes: ['MEDIUM BODY', 'CHOCOLATE', 'SMOOTH'] },
    
  { id: 'papua', code: 'PG', group: 'asia', name: 'PAPUA NEW GUINEA', cx: 1052, cy: 380, 
    path: "M1052 380 L1052 340 L1100 340", lx: 1100, ly: 335, align: 'left',
    notes: ['FULL BODY', 'MEDIUM ACIDITY', 'FRUITY & NUTTY'] },
    
  { id: 'sumatra', code: 'ID', group: 'asia', name: 'SUMATRA', cx: 918, cy: 362, 
    path: "M918 362 L918 420 L810 420", lx: 810, ly: 415, align: 'right',
    notes: ['FULL BODY', 'INTENSE', 'EARTHY & WOODY', 'LOW ACIDITY'] },
    
  { id: 'java', code: 'JV', group: 'asia', name: 'JAVA', cx: 946, cy: 382, 
    path: "M946 382 L946 460 L920 460", lx: 920, ly: 455, align: 'right',
    notes: ['FULL BODY / LOW ACIDITY', 'CHOCOLATE', 'NUTTY & CREAMY'] },
    
  { id: 'australia', code: 'AU', group: 'asia', name: 'AUSTRALIA', cx: 1020, cy: 442, 
    path: "M1020 442 L1020 460 L1050 460", lx: 1050, ly: 455, align: 'left',
    notes: ['MEDIUM BODY & ACIDITY', 'MILD', 'JUICY & SYRUPY'] },
];

import { Check, Plus, X } from 'lucide-react';

const TARGET_COUNTRIES = {
  americas: ['Brazil', 'Colombia', 'Peru', 'Costa Rica', 'Panama', 'Guatemala', 'Honduras', 'El Salvador', 'Mexico'],
  africa: ['Ethiopia', 'Kenya', 'Uganda', 'Rwanda', 'Burundi', 'United Republic of Tanzania', 'Tanzania'],
  asia: ['India', 'Yemen', 'China', 'Indonesia', 'Papua New Guinea', 'Vietnam', 'Australia']
};

export default function CoffeeMap({ onPickCoffee }: { onPickCoffee?: (name: string) => void }) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getColor = (group: string) => {
    switch(group) {
      case 'americas': return '#3EC7FF';
      case 'africa': return '#FF5A66';
      case 'asia': return '#FFC642';
      default: return '#D9D9D9';
    }
  };

  const { geometries, pathGenerator } = useMemo(() => {
    const geojson = feature(worldData as any, (worldData as any).objects.countries);
    const proj = geoMercator().scale(180).translate([600, 360]); 
    const gen = geoPath().projection(proj);
    return { geometries: geojson.features, pathGenerator: gen };
  }, []);

  return (
    <section className="relative w-full h-[100vh] min-h-[900px] bg-gradient-to-b from-[#061320] via-[#071A2E] to-[#10253D] overflow-hidden flex flex-col items-center py-12 font-sans select-none">
      
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(62,199,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
        className="relative z-20 text-center px-4 shrink-0 mt-8"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[0.15em] mb-4 uppercase">
          COFFEE REGIONAL FLAVOR PROFILES
        </h2>
      </motion.div>

      {/* Map Container */}
      <motion.div 
        className="relative w-full max-w-[1200px] flex-1 my-2 flex items-center justify-center pointer-events-none"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <svg viewBox="0 0 1200 600" className="w-full h-full drop-shadow-2xl overflow-visible pointer-events-none">
          
          {/* Base Countries */}
          <g className="pointer-events-auto">
            {geometries.map((geo: any, i: number) => {
              const name = geo.properties.name;
              let group = null;
              if (TARGET_COUNTRIES.americas.includes(name)) group = 'americas';
              else if (TARGET_COUNTRIES.africa.includes(name)) group = 'africa';
              else if (TARGET_COUNTRIES.asia.includes(name)) group = 'asia';

              const fill = group ? getColor(group) : '#C0C0C0';
              const activeRegion = hoveredRegion || selectedRegion;
              const isMatch = group && activeRegion && COFFEE_REGIONS.find(r => r.id === activeRegion)?.group === group;
              const isOtherSelected = selectedRegion && !isMatch;
              
              let opacity = 0.3;
              if (group) {
                if (activeRegion) {
                  opacity = isMatch ? 1 : 0.1;
                } else {
                  opacity = 0.9;
                }
              } else {
                opacity = selectedRegion ? 0.05 : 0.2;
              }

              return (
                <motion.path 
                  key={i} 
                  d={pathGenerator(geo) || ""} 
                  fill={fill} 
                  stroke={group ? "rgba(255,255,255,0.4)" : "none"}
                  strokeWidth="0.5"
                  className="transition-all duration-500 outline-none"
                  style={{ 
                    filter: isOtherSelected || (!group && selectedRegion) ? 'blur(2px)' : 'none',
                    opacity: opacity 
                  }}
                  onMouseEnter={() => {
                    if(group) {
                      const match = COFFEE_REGIONS.find(r => r.name.toLowerCase() === name.toLowerCase());
                      if(match) setHoveredRegion(match.id);
                    }
                  }}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => {
                    if(group) {
                      const match = COFFEE_REGIONS.find(r => r.name.toLowerCase() === name.toLowerCase());
                      if(match) setSelectedRegion(match.id);
                    }
                  }}
                />
              );
            })}
          </g>

          {/* Connection Lines & Pins */}
          {COFFEE_REGIONS.map((region) => {
            const activeRegionId = hoveredRegion || selectedRegion;
            const activeRegionObj = activeRegionId ? COFFEE_REGIONS.find(r => r.id === activeRegionId) : null;
            const isHovered = activeRegionObj ? activeRegionObj.group === region.group : false;
            
            return (
              <g 
                key={`line-${region.id}`} 
                className="pointer-events-none"
              >
                {/* Connecting Polyline */}
                <motion.path
                  d={region.path}
                  fill="none"
                  stroke={getColor(region.group)}
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: isHovered ? 1 : 0, opacity: isHovered ? 0.8 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />

                {/* Underline for the text */}
                <motion.line
                  x1={region.lx} y1={region.ly + 5}
                  x2={region.align === 'left' ? region.lx + 100 : region.lx - 100} y2={region.ly + 5}
                  stroke={getColor(region.group)}
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: isHovered ? 1 : 0, opacity: isHovered ? 0.8 : 0 }}
                  transition={{ duration: 0.4, delay: isHovered ? 0.6 : 0, ease: "easeInOut" }}
                />
                
                {/* Wave Animations (Ping) */}
                <motion.circle
                  cx={region.cx} cy={region.cy}
                  fill="none"
                  stroke={getColor(region.group)}
                  strokeWidth="2"
                  initial={{ r: 4, opacity: 0 }}
                  animate={isHovered ? {
                    r: [4, 14],
                    opacity: [0.8, 0],
                  } : { r: 4, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                <motion.circle
                  cx={region.cx} cy={region.cy}
                  fill="none"
                  stroke={getColor(region.group)}
                  strokeWidth="1"
                  initial={{ r: 4, opacity: 0 }}
                  animate={isHovered ? {
                    r: [4, 18],
                    opacity: [0.4, 0],
                  } : { r: 4, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.75,
                    ease: "easeOut"
                  }}
                />

                {/* Dot */}
                <motion.circle 
                  cx={region.cx} cy={region.cy} 
                  initial={{ r: 3.5, opacity: 0 }}
                  animate={{ r: isHovered ? 4.5 : 3.5, opacity: isHovered ? 1 : 0 }}
                  fill="#EFECE5" 
                  stroke="#0a1b2d" strokeWidth="2.5"
                  className="drop-shadow-[0_0_8px_currentColor]" 
                />
              </g>
            );
          })}

          {/* Pure SVG Text Labels for perfect scaling */}
          {COFFEE_REGIONS.map((region) => {
            const activeRegionId = hoveredRegion || selectedRegion;
            const activeRegionObj = activeRegionId ? COFFEE_REGIONS.find(r => r.id === activeRegionId) : null;
            const isHovered = activeRegionObj ? activeRegionObj.group === region.group : false;

            return (
              <g 
                key={`text-${region.id}`} 
                className="pointer-events-auto cursor-pointer transition-all duration-500"
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => setSelectedRegion(region.id)}
                style={{
                  opacity: isHovered ? 1 : 0,
                  visibility: isHovered ? 'visible' : 'hidden'
                }}
              >
                <text 
                  x={region.align === 'left' ? region.lx + 5 : region.lx - 5} 
                  y={region.ly - 2} 
                  fill="white" 
                  fontSize="13" 
                  fontWeight="bold"
                  textAnchor={region.align === 'left' ? 'start' : 'end'}
                  className="tracking-widest drop-shadow-md transition-all duration-300"
                  style={{ opacity: isHovered ? 1 : 0.7, fill: isHovered ? getColor(region.group) : 'white' }}
                >
                  {region.name}
                </text>
                
                {region.notes.map((note, idx) => (
                  <text 
                    key={idx}
                    x={region.align === 'left' ? region.lx + 5 : region.lx - 5} 
                    y={region.ly + 18 + (idx * 11)} 
                    fill="white" 
                    fontSize="9" 
                    fontWeight="bold"
                    textAnchor={region.align === 'left' ? 'start' : 'end'}
                    className="uppercase tracking-widest transition-opacity duration-300"
                    style={{ opacity: isHovered ? 1 : 0.4 }}
                  >
                    {note}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>


      </motion.div>

      {/* Centered Modal Card */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[90%] max-w-[220px] pointer-events-auto"
          >
            {(() => {
              const r = COFFEE_REGIONS.find(reg => reg.id === selectedRegion);
              if (!r) return null;
              const color = getColor(r.group);
              return (
                <div 
                  className="p-4 rounded-2xl bg-[#0a1b2d]/95 backdrop-blur-3xl border shadow-[0_30px_60px_rgba(0,0,0,0.8)] text-center relative overflow-hidden flex flex-col items-center" 
                  style={{ borderColor: `${color}50` }}
                >
                  <button 
                    onClick={() => setSelectedRegion(null)} 
                    className="absolute top-2.5 right-2.5 text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at top, ${color}, transparent)` }}></div>
                  
                  <h4 className="text-lg font-black text-white tracking-[0.1em] mb-1" style={{ color }}>{r.name}</h4>
                  <p className="text-white/50 text-[8px] uppercase tracking-[0.2em] font-bold mb-3">{r.group}</p>
                  
                  <div className="flex flex-wrap justify-center gap-1 mb-4">
                    {r.notes.map(n => (
                      <span key={n} className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded-sm text-[7px] uppercase tracking-wider font-bold text-white/90">
                        {n}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => {
                      if (onPickCoffee) onPickCoffee(r.name);
                      setSelectedRegion(null);
                    }}
                    className="w-full py-2 bg-white text-black font-black text-[9px] tracking-widest uppercase rounded-md hover:bg-[#EFECE5] transition-colors shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  >
                    Pick This Coffee
                  </button>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>


    </section>
  );
}
