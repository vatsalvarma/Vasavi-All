import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Mic, Image as ImageIcon, ScanLine, QrCode, Sparkles, 
  TrendingUp, Settings2, SlidersHorizontal, Coffee, Zap, RotateCcw, Share2, 
  BarChart3, Users, Truck, Map, Flame, History as HistoryIcon
} from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

const placeholders = [
  "Search Coffee, Machines, Accessories...",
  "Try 'Ethiopian Light Roast'...",
  "Ask AI: 'I like chocolate flavors'...",
]

export default function SmartSearch() {
  const [isFocused, setIsFocused] = useState(false)
  const [query, setQuery] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [placeholderText, setPlaceholderText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  // Interactive Filter States
  const [selectedCategory, setSelectedCategory] = useState('Beans')
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>(['🇪🇹 Ethiopia'])
  const [selectedRoast, setSelectedRoast] = useState<string>('Dark')
  const [aroma, setAroma] = useState(85)
  const [acidity, setAcidity] = useState(60)
  const [body, setBody] = useState(75)
  const [flavorPoints, setFlavorPoints] = useState("50,20 75,35 70,60 50,75 30,55 35,25")

  const randomizeSensoryProfile = () => {
    setFlavorPoints(`50,${Math.floor(Math.random()*25+10)} ${Math.floor(Math.random()*25+55)},${Math.floor(Math.random()*20+20)} ${Math.floor(Math.random()*25+55)},${Math.floor(Math.random()*20+60)} 50,${Math.floor(Math.random()*25+65)} ${Math.floor(Math.random()*25+20)},${Math.floor(Math.random()*20+60)} ${Math.floor(Math.random()*25+20)},${Math.floor(Math.random()*20+20)}`)
    setAroma(Math.floor(Math.random() * 40 + 60)) // 60-100
    setAcidity(Math.floor(Math.random() * 60 + 40)) // 40-100
    setBody(Math.floor(Math.random() * 50 + 50)) // 50-100
  }

  const toggleOrigin = (o: string) => {
    setSelectedOrigins(prev => prev.includes(o) ? prev.filter(x => x !== o) : [...prev, o])
    randomizeSensoryProfile()
  }

  // Typewriter effect
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const currentText = placeholders[placeholderIndex]
    
    if (isTyping && !isFocused) {
      if (placeholderText.length < currentText.length) {
        timeout = setTimeout(() => {
          setPlaceholderText(currentText.slice(0, placeholderText.length + 1))
        }, 40)
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000)
      }
    } else if (!isFocused) {
      if (placeholderText.length > 0) {
        timeout = setTimeout(() => {
          setPlaceholderText(currentText.slice(0, placeholderText.length - 1))
        }, 20)
      } else {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
        setIsTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [placeholderText, isTyping, placeholderIndex, isFocused])




  const CircularSlider = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) => (
    <div 
      className="flex flex-col items-center gap-1 group cursor-pointer"
      onClick={() => onChange(Math.min(100, value + 10 > 100 ? 10 : value + 10))}
    >
      <div className="relative w-8 h-8">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          <motion.path 
            initial={{ strokeDasharray: "0, 100" }}
            animate={{ strokeDasharray: `${value}, 100` }}
            transition={{ duration: 0.5 }}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
            fill="none" stroke="#FFD54F" strokeWidth="3" 
            className="drop-shadow-[0_0_4px_rgba(255,213,79,0.5)] group-hover:stroke-white transition-colors"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-foreground group-hover:scale-110 transition-transform">
          {value/10}
        </div>
      </div>
      <span className="text-[8px] text-foreground/50 font-medium uppercase tracking-wider group-hover:text-accent transition-colors select-none">{label}</span>
    </div>
  )

  return (
    <div className="w-full relative z-50 mx-auto max-w-[1600px]">
      
      {/* Active Filters Display (Top) */}
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 mb-2 px-2 overflow-x-auto hide-scrollbar"
          >
            <span className="text-[10px] text-foreground/40 uppercase tracking-widest mr-2 font-semibold">Active:</span>
            {selectedOrigins.map(o => (
              <span key={o} className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-medium backdrop-blur-md">
                {o} <button onClick={(e) => { e.stopPropagation(); toggleOrigin(o); }} className="hover:text-foreground transition-colors"><Settings2 className="w-2.5 h-2.5" /></button>
              </span>
            ))}
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-medium backdrop-blur-md">
              {selectedRoast} Roast <button className="hover:text-foreground transition-colors"><Settings2 className="w-2.5 h-2.5" /></button>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Search Container */}
      <motion.div 
        layout
        className={`relative bg-background/80 backdrop-blur-[40px] rounded-3xl border transition-all duration-500 shadow-2xl overflow-hidden ${
          isFocused ? 'border-accent/40 shadow-[0_0_80px_rgba(255,213,79,0.1)]' : 'border-foreground/10'
        }`}
      >
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Input Bar */}
        <div className="relative flex items-center px-4 md:px-6 py-2 md:py-3 bg-foreground/[0.02] border-b border-foreground/5">
          <Search className={`w-5 h-5 transition-colors duration-300 mr-3 ${isFocused ? 'text-accent' : 'text-foreground/40'}`} />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={isFocused ? 'Type to search or ask AI...' : placeholderText}
            className="flex-1 bg-transparent border-none text-foreground text-lg focus:outline-none placeholder:text-foreground/20 font-light"
          />
          
          {/* Quick Tools */}
          <div className="hidden md:flex items-center gap-1.5 mr-4 text-foreground/20">
            <kbd className="px-2 py-0.5 rounded-md bg-foreground/5 border border-foreground/10 text-[10px] font-mono">⌘K</kbd>
          </div>

          <div className="flex items-center gap-1.5">
            {[Mic, ImageIcon, ScanLine, QrCode].map((Icon, i) => (
              <motion.button key={i} whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }} className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center transition-colors text-foreground/50 hover:text-foreground">
                <Icon className="w-3.5 h-3.5" />
              </motion.button>
            ))}
            <div className="w-px h-6 bg-foreground/10 mx-1" />
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              className="h-8 px-4 rounded-full bg-gradient-to-r from-accent to-[#F57F17] text-background font-bold text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,213,79,0.3)]"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Search
            </motion.button>
          </div>
        </div>

        {/* Expanding Dashboard */}
        <AnimatePresence>
          {isFocused && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative border-t border-foreground/5"
            >
              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-foreground/5 max-h-[55vh] overflow-y-auto hide-scrollbar">
                
                {/* ---------------- LEFT PANEL (Live Trending & Suggestions) ---------------- */}
                <div className="lg:col-span-3 bg-background p-3 lg:p-4 space-y-4">
                  <div>
                    <h4 className="flex items-center text-[9px] font-bold uppercase tracking-widest text-accent mb-2">
                      <TrendingUp className="w-2.5 h-2.5 mr-2" /> Live Trending
                    </h4>
                    <div className="space-y-1.5">
                      {[
                        { flag: '🇪🇹', name: 'Ethiopia Yirgacheffe', trend: '+28%', price: '₹899' },
                        { flag: '🇨🇴', name: 'Colombia Supremo', trend: '+15%', price: '₹750' },
                        { flag: '🇰🇪', name: 'Kenya AA', trend: '+12%', price: '₹950' },
                      ].map((item, i) => (
                        <motion.div 
                          key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                          className="flex items-center justify-between p-1.5 rounded-lg bg-foreground/[0.03] border border-foreground/5 hover:border-accent/30 hover:bg-accent/5 cursor-pointer transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm bg-foreground/10 p-1 rounded-md">{item.flag}</span>
                            <div>
                              <div className="text-[10px] font-semibold text-foreground/90 group-hover:text-foreground">{item.name}</div>
                              <div className="text-[8px] text-green-400 font-medium">{item.trend} Trending</div>
                            </div>
                          </div>
                          <div className="text-[10px] font-bold text-foreground/50 group-hover:text-accent">{item.price}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="flex items-center text-[9px] font-bold uppercase tracking-widest text-foreground/40 mb-2">
                      <HistoryIcon className="w-2.5 h-2.5 mr-2" /> Recent Searches
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {['Dark Roast', 'Breville', 'Cold Brew', 'Decaf'].map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-foreground/[0.03] text-foreground/50 text-[9px] hover:bg-foreground/10 hover:text-foreground cursor-pointer border border-foreground/5 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ---------------- CENTER PANEL (Advanced Filters) ---------------- */}
                <div className="lg:col-span-6 bg-card p-3 lg:p-4 relative">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-light text-foreground flex items-center gap-2">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-accent" /> Coffee Discovery Center
                    </h3>
                  </div>

                  {/* Categories Grid */}
                  <div className="grid grid-cols-5 gap-1.5 mb-4">
                    {[
                      { icon: Coffee, label: 'Beans' },
                      { icon: Zap, label: 'Machines' },
                      { icon: Settings2, label: 'Accessories' },
                      { icon: Sparkles, label: 'Gifts' },
                      { icon: RotateCcw, label: 'Subs' },
                    ].map((Cat, i) => (
                      <button 
                        key={i} 
                        onClick={() => setSelectedCategory(Cat.label)}
                        className={`flex flex-col items-center justify-center p-1.5 rounded-lg border transition-all group ${
                          selectedCategory === Cat.label 
                            ? 'bg-accent/20 border-accent text-accent shadow-[0_0_10px_rgba(255,213,79,0.2)]'
                            : 'bg-foreground/[0.02] border-foreground/5 hover:border-accent/40 hover:bg-accent/10'
                        }`}
                      >
                        <Cat.icon className={`w-4 h-4 mb-1 transition-colors ${selectedCategory === Cat.label ? 'text-accent' : 'text-foreground/40 group-hover:text-accent'}`} />
                        <span className={`text-[8px] font-semibold uppercase tracking-wider ${selectedCategory === Cat.label ? 'text-accent' : 'text-foreground/60'}`}>{Cat.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {/* Roast Level & Origin */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[9px] font-semibold uppercase tracking-widest text-foreground/40 mb-2 flex items-center gap-1.5"><Map className="w-2.5 h-2.5"/> Origin Map</h4>
                        <div className="flex flex-wrap gap-1">
                          {['🇧🇷 Brazil', '🇨🇴 Colombia', '🇪🇹 Ethiopia', '🇮🇳 India', '🇻🇳 Vietnam'].map(o => (
                            <button 
                              key={o} 
                              onClick={() => toggleOrigin(o)}
                              className={`px-2 py-0.5 rounded text-[9px] font-medium cursor-pointer transition-colors border ${
                                selectedOrigins.includes(o)
                                  ? 'bg-accent text-background border-accent shadow-[0_0_8px_rgba(255,213,79,0.3)]'
                                  : 'bg-foreground/5 text-foreground/70 border-foreground/10 hover:bg-foreground/10 hover:text-foreground'
                              }`}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[9px] font-semibold uppercase tracking-widest text-foreground/40 mb-2 flex items-center gap-1.5"><Flame className="w-2.5 h-2.5"/> Roast Level</h4>
                        <div className="flex gap-2">
                          {[
                            { name: 'Light', color: '#D4A373' },
                            { name: 'Medium', color: '#A0522D' },
                            { name: 'Dark', color: '#5C4033' },
                            { name: 'Espresso', color: '#1A120E' }
                          ].map((r) => (
                            <button 
                              key={r.name} 
                              onClick={() => {
                                setSelectedRoast(r.name)
                                randomizeSensoryProfile()
                              }}
                              className="flex flex-col items-center gap-1 group cursor-pointer bg-transparent border-none p-0 outline-none"
                            >
                              <div 
                                className={`w-6 h-8 rounded-full border-2 transition-all shadow-lg flex items-center justify-center ${
                                  selectedRoast === r.name ? 'border-accent scale-110 shadow-[0_0_10px_rgba(255,213,79,0.4)]' : 'border-foreground/10 group-hover:border-foreground/30'
                                }`}
                                style={{ backgroundColor: r.color }}
                              >
                                <div className="w-px h-5 bg-background/20 rounded-full" />
                              </div>
                              <span className={`text-[8px] transition-colors ${selectedRoast === r.name ? 'text-accent font-bold' : 'text-foreground/50 group-hover:text-foreground'}`}>{r.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[9px] font-semibold uppercase tracking-widest text-foreground/40 mb-2">Price Range</h4>
                        <Slider defaultValue={[500, 2500]} max={5000} step={100} className="w-full" />
                        <div className="flex justify-between mt-1.5 text-[9px] text-accent font-mono">
                          <span>₹500</span>
                          <span>₹2,500</span>
                        </div>
                      </div>
                    </div>

                    {/* Flavor Profile & Circular Stats */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[9px] font-semibold uppercase tracking-widest text-foreground/40 mb-1 text-center">Flavor Profile</h4>
                        <div 
                          className="relative w-full aspect-square max-w-[130px] mx-auto opacity-90 hover:opacity-100 transition-opacity cursor-pointer group mt-1"
                          onClick={() => setFlavorPoints(`50,${Math.floor(Math.random()*25+10)} ${Math.floor(Math.random()*25+55)},${Math.floor(Math.random()*20+20)} ${Math.floor(Math.random()*25+55)},${Math.floor(Math.random()*20+60)} 50,${Math.floor(Math.random()*25+65)} ${Math.floor(Math.random()*25+20)},${Math.floor(Math.random()*20+60)} ${Math.floor(Math.random()*25+20)},${Math.floor(Math.random()*20+20)}`)}
                        >
                          <div className="absolute inset-0 bg-foreground/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible relative z-10">
                            {[10, 20, 30, 40].map(r => (
                              <polygon 
                                key={r}
                                points={`50,${50-r} ${50+r*0.866},${50-r*0.5} ${50+r*0.866},${50+r*0.5} 50,${50+r} ${50-r*0.866},${50+r*0.5} ${50-r*0.866},${50-r*0.5}`}
                                fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"
                              />
                            ))}
                            {[0, 60, 120, 180, 240, 300].map(deg => (
                              <line 
                                key={deg}
                                x1="50" y1="50" 
                                x2={50 + 40 * Math.sin(deg * Math.PI / 180)} 
                                y2={50 - 40 * Math.cos(deg * Math.PI / 180)} 
                                stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"
                              />
                            ))}
                            <motion.polygon 
                              animate={{ points: flavorPoints }}
                              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                              fill="rgba(255, 213, 79, 0.2)"
                              stroke="#FFD54F"
                              strokeWidth="1.5"
                              className="drop-shadow-[0_0_8px_rgba(255,213,79,0.5)]"
                            />
                            <text x="50" y="6" fill="rgba(255,255,255,0.7)" fontSize="5" textAnchor="middle" fontWeight="500">Chocolate</text>
                            <text x="90" y="28" fill="rgba(255,255,255,0.7)" fontSize="5" textAnchor="start" fontWeight="500">Nutty</text>
                            <text x="90" y="74" fill="rgba(255,255,255,0.7)" fontSize="5" textAnchor="start" fontWeight="500">Berry</text>
                            <text x="50" y="98" fill="rgba(255,255,255,0.7)" fontSize="5" textAnchor="middle" fontWeight="500">Floral</text>
                            <text x="10" y="74" fill="rgba(255,255,255,0.7)" fontSize="5" textAnchor="end" fontWeight="500">Citrus</text>
                            <text x="10" y="28" fill="rgba(255,255,255,0.7)" fontSize="5" textAnchor="end" fontWeight="500">Caramel</text>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex justify-center gap-3">
                        <CircularSlider label="Aroma" value={aroma} onChange={setAroma} />
                        <CircularSlider label="Acidity" value={acidity} onChange={setAcidity} />
                        <CircularSlider label="Body" value={body} onChange={setBody} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- RIGHT PANEL (AI Insights & Analytics) ---------------- */}
                <div className="lg:col-span-3 bg-background p-3 lg:p-4 flex flex-col gap-3">
                  
                  {/* AI Assistant Chat Card */}
                  <div className="rounded-lg bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 p-3 relative overflow-hidden group hover:border-accent/40 transition-colors">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-accent/20 rounded-full blur-[30px]" />
                    <div className="flex items-center gap-2 mb-2 relative z-10">
                      <div className="w-5 h-5 rounded-full bg-accent text-background flex items-center justify-center">
                        <Sparkles className="w-2.5 h-2.5" />
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-accent">AI Sommelier</div>
                        <div className="text-[8px] text-foreground/50">Online</div>
                      </div>
                    </div>
                    <p className="text-[10px] text-foreground/80 leading-relaxed mb-2 relative z-10">
                      "Based on your preference for <span className="text-accent">Chocolate</span>, I recommend our <strong>Brazilian Santos</strong>."
                    </p>
                    <button className="w-full py-1 rounded bg-foreground/5 border border-foreground/10 text-[9px] font-semibold hover:bg-foreground/10 transition-colors relative z-10">
                      View Recommendation
                    </button>
                  </div>

                  {/* Market Insights */}
                  <div className="rounded-lg bg-foreground/[0.02] border border-foreground/5 p-3">
                    <h4 className="text-[8px] font-bold uppercase tracking-widest text-foreground/40 mb-2 flex items-center gap-1.5">
                      <BarChart3 className="w-2.5 h-2.5" /> Live Market
                    </h4>
                    <div className="space-y-2.5">
                      <div className="cursor-pointer group" onClick={() => {}}>
                        <div className="flex justify-between text-[9px] mb-1">
                          <span className="text-foreground/70">Arabica Index</span>
                          <span className="text-green-400 group-hover:text-foreground transition-colors">+2.4%</span>
                        </div>
                        <div className="h-0.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                          <motion.div animate={{ width: `${70 + Math.random() * 20}%` }} className="h-full bg-gradient-to-r from-green-500 to-accent" />
                        </div>
                      </div>
                      <div className="cursor-pointer group" onClick={() => {}}>
                        <div className="flex justify-between text-[9px] mb-1">
                          <span className="text-foreground/70">Robusta Demand</span>
                          <span className="text-orange-400 group-hover:text-foreground transition-colors">-1.2%</span>
                        </div>
                        <div className="h-0.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                          <motion.div animate={{ width: `${30 + Math.random() * 20}%` }} className="h-full bg-gradient-to-r from-orange-500 to-red-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <div className="p-1.5 rounded-lg bg-foreground/[0.02] border border-foreground/5 flex flex-col items-center justify-center text-center">
                      <Users className="w-2.5 h-2.5 text-foreground/40 mb-1" />
                      <div className="text-xs font-bold text-foreground">1,204</div>
                      <div className="text-[7px] text-foreground/40 uppercase">Viewing</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-foreground/[0.02] border border-foreground/5 flex flex-col items-center justify-center text-center">
                      <Truck className="w-2.5 h-2.5 text-foreground/40 mb-1" />
                      <div className="text-xs font-bold text-foreground">24h</div>
                      <div className="text-[7px] text-foreground/40 uppercase">Avg Delivery</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Actions */}
              <div className="flex flex-wrap items-center justify-between p-4 bg-background/40 border-t border-foreground/10 backdrop-blur-md">
                <div className="flex gap-2">
                  <Button variant="ghost" className="text-foreground/50 hover:text-foreground h-8 text-xs">Reset Filters</Button>
                  <Button variant="ghost" className="text-foreground/50 hover:text-foreground h-8 text-xs"><Share2 className="w-3 h-3 mr-2" /> Share</Button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-foreground/40 font-mono">142 Results Found</span>
                  <Button className="bg-accent text-background hover:bg-foreground h-8 text-xs font-bold px-6 shadow-[0_0_15px_rgba(255,213,79,0.3)]">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Click outside overlay to close (optional, but good UX) */}
      {isFocused && (
        <div 
          className="fixed inset-0 z-[-1] bg-background/20 backdrop-blur-sm"
          onClick={() => setIsFocused(false)}
        />
      )}
    </div>
  )
}
