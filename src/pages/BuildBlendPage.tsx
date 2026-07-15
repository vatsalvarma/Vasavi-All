import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, 
  Sparkles, 
  X, 
  ChevronRight, 
  Check, 
  ShoppingBag,
  Sun,
  CloudSun,
  Cloud,
  Moon
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { useTheme } from '@/components/theme/ThemeProvider';
import CoffeeMap from '@/components/CoffeeMap';

// --- DATA ---
const COFFEES = [
  // Americas
  { id: 'SV', code: 'SV', name: 'El Salvador', desc: 'Mild Acidity, Vanilla, Hazelnut', type: 'Arabica', color: '#3EC7FF', region: 'americas' },
  { id: 'GT', code: 'GT', name: 'Guatemala Antigua', desc: 'Rich, chocolatey & spiced', type: 'Arabica', color: '#3EC7FF', region: 'americas' },
  { id: 'HN', code: 'HN', name: 'Honduras', desc: 'Crisp, Nutty & Spicy', type: 'Arabica', color: '#3EC7FF', region: 'americas' },
  { id: 'CR', code: 'CR', name: 'Costa Rica', desc: 'Citrus & Nutty', type: 'Arabica', color: '#3EC7FF', region: 'americas' },
  { id: 'PA', code: 'PA', name: 'Panama Geisha', desc: 'Zesty & Lively, Lemongrass', type: 'Arabica', badge: 'Premium', color: '#3EC7FF', region: 'americas' },
  { id: 'HI', code: 'HI', name: 'Hawaii Kona', desc: 'Low Acidity, Vanilla, Brown Sugar', type: 'Arabica', badge: 'Premium', color: '#3EC7FF', region: 'americas' },
  { id: 'PE', code: 'PE', name: 'Peru', desc: 'Spicy, Nutty & Earthy', type: 'Arabica', color: '#3EC7FF', region: 'americas' },
  { id: 'CO', code: 'CO', name: 'Colombia Huila', desc: 'Sweet & balanced', type: 'Arabica', color: '#3EC7FF', region: 'americas' },
  { id: 'BR', code: 'BR', name: 'Brazil Cerrado', desc: 'Nutty & chocolatey', type: 'Arabica', color: '#3EC7FF', region: 'americas' },
  
  // Africa
  { id: 'RW', code: 'RW', name: 'Rwanda', desc: 'Chocolate, Floral & Nutty', type: 'Arabica', color: '#FF5A66', region: 'africa' },
  { id: 'UG', code: 'UG', name: 'Uganda', desc: 'Full Body, Creamy Vanilla', type: 'Robusta', color: '#FF5A66', region: 'africa' },
  { id: 'ET', code: 'ET', name: 'Ethiopia Yirgacheffe', desc: 'Bright, fruity & flowery', type: 'Arabica', color: '#FF5A66', region: 'africa' },
  { id: 'KE', code: 'KE', name: 'Kenya Nyeri', desc: 'Bold & berry-tangy', type: 'Arabica', color: '#FF5A66', region: 'africa' },
  
  // Asia
  { id: 'YE', code: 'YE', name: 'Yemen Mocha', desc: 'Wine-y & spiced', type: 'Arabica', badge: 'Premium', color: '#FFC642', region: 'asia' },
  { id: 'IN', code: 'IN', name: 'Chikmagalur Robusta', desc: 'Strong, earthy & heavy', type: 'Robusta', badge: 'AA grade', color: '#FFC642', region: 'asia' },
  { id: 'CN', code: 'CN', name: 'China Yunnan', desc: 'Chocolate & Smooth', type: 'Arabica', color: '#FFC642', region: 'asia' },
  { id: 'PG', code: 'PG', name: 'Papua New Guinea', desc: 'Fruity & Nutty', type: 'Arabica', color: '#FFC642', region: 'asia' },
  { id: 'ID', code: 'ID', name: 'Sumatra Mandheling', desc: 'Intense, Earthy & Woody', type: 'Arabica', color: '#FFC642', region: 'asia' },
  { id: 'JV', code: 'JV', name: 'Java', desc: 'Nutty & Creamy', type: 'Arabica', color: '#FFC642', region: 'asia' },
  { id: 'AU', code: 'AU', name: 'Australia Skybury', desc: 'Mild, Juicy & Syrupy', type: 'Arabica', badge: 'Premium', color: '#FFC642', region: 'asia' },
];

const ROASTS = [
  { id: 'light', name: 'Light', desc: 'Bright & zingy', icon: Sun, color: '#fef3c7' },
  { id: 'medium', name: 'Medium', desc: 'Smooth & balanced — most popular', icon: CloudSun, color: '#f59e0b' },
  { id: 'medium_dark', name: 'Medium-Dark', desc: 'Rich & full', icon: Cloud, color: '#d97706' },
  { id: 'dark', name: 'Dark', desc: 'Bold & smoky', icon: Moon, color: '#a855f7' },
];

export default function BuildBlendPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mixes, setMixes] = useState<{id: string, percent: number}[]>([]);
  const [roast, setRoast] = useState<string>('medium');
  const [blendName, setBlendName] = useState('Monsoon Sunrise');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionStep, setSuggestionStep] = useState(0);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const { theme } = useTheme();

  // When selected coffees change, initialize equal splits
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleToggleCoffee = (id: string) => {
    if (selectedIds.includes(id)) {
      const newIds = selectedIds.filter(x => x !== id);
      setSelectedIds(newIds);
      rebalanceMixes(newIds);
    } else {
      if (selectedIds.length >= 4) return;
      const newIds = [...selectedIds, id];
      setSelectedIds(newIds);
      rebalanceMixes(newIds);
    }
  };

  const rebalanceMixes = (ids: string[]) => {
    if (ids.length === 0) {
      setMixes([]);
      return;
    }
    const percent = 100 / ids.length;
    setMixes(ids.map(id => ({ id, percent })));
  };

  const handleSliderChange = (id: string, newValue: number) => {
    if (mixes.length <= 1) return;
    
    // We want integers
    let targetValue = Math.round(newValue);
    if (targetValue < 0) targetValue = 0;
    if (targetValue > 100) targetValue = 100;

    const oldMixes = [...mixes];
    const index = oldMixes.findIndex(m => m.id === id);
    const oldVal = oldMixes[index].percent;
    let diff = targetValue - oldVal;

    const otherMixes = oldMixes.filter(m => m.id !== id);
    const totalOther = otherMixes.reduce((sum, m) => sum + m.percent, 0);

    if (diff > totalOther) {
      diff = totalOther;
      targetValue = oldVal + diff;
    }

    const newMixes = oldMixes.map(m => {
      if (m.id === id) return { ...m, percent: targetValue };
      let adj = totalOther > 0 ? diff * (m.percent / totalOther) : diff / otherMixes.length;
      return { ...m, percent: Math.max(0, m.percent - adj) };
    });

    // Fix rounding errors
    const sum = newMixes.reduce((s, m) => s + Math.round(m.percent), 0);
    if (sum !== 100) {
      const highest = newMixes.reduce((prev, curr) => (curr.percent > prev.percent ? curr : prev));
      highest.percent += (100 - sum);
    }

    setMixes(newMixes.map(m => ({ ...m, percent: Math.round(m.percent) })));
  };

  // Generate dynamic radar data based on selection, mix, and roast
  const radarData = useMemo(() => {
    // Base attributes
    let profile = { Fruity: 20, Flowery: 20, Sweet: 30, Nutty: 30, Spicy: 20, Tangy: 20, Strong: 30 };
    
    mixes.forEach(mix => {
      const coffee = COFFEES.find(c => c.id === mix.id);
      const ratio = mix.percent / 100;
      if (!coffee) return;
      if (coffee.id === 'ET') { profile.Fruity += 50 * ratio; profile.Flowery += 60 * ratio; profile.Tangy += 30 * ratio; }
      else if (coffee.id === 'CO') { profile.Sweet += 60 * ratio; profile.Nutty += 20 * ratio; profile.Fruity += 20 * ratio; }
      else if (coffee.id === 'BR') { profile.Nutty += 70 * ratio; profile.Sweet += 40 * ratio; }
      else if (coffee.id === 'KE') { profile.Tangy += 60 * ratio; profile.Fruity += 40 * ratio; profile.Strong += 30 * ratio; }
      else if (coffee.id === 'GT') { profile.Spicy += 50 * ratio; profile.Sweet += 30 * ratio; profile.Nutty += 30 * ratio; }
      else if (coffee.id === 'YE') { profile.Spicy += 60 * ratio; profile.Fruity += 30 * ratio; }
      else if (coffee.id === 'IN') { profile.Strong += 80 * ratio; profile.Nutty += 30 * ratio; profile.Spicy += 20 * ratio; }
      else {
        // generic fallback based on region
        if (coffee.region === 'americas') { profile.Sweet += 40 * ratio; profile.Nutty += 40 * ratio; profile.Fruity += 10 * ratio; }
        else if (coffee.region === 'africa') { profile.Fruity += 40 * ratio; profile.Flowery += 40 * ratio; profile.Tangy += 10 * ratio; }
        else { profile.Strong += 40 * ratio; profile.Spicy += 40 * ratio; profile.Nutty += 10 * ratio; }
      }
    });

    // Roast modifiers
    if (roast === 'light') { profile.Fruity += 20; profile.Tangy += 20; profile.Strong -= 10; }
    if (roast === 'medium') { profile.Sweet += 10; profile.Nutty += 10; }
    if (roast === 'medium_dark') { profile.Strong += 20; profile.Spicy += 10; profile.Sweet -= 10; }
    if (roast === 'dark') { profile.Strong += 40; profile.Fruity -= 30; profile.Flowery -= 20; }

    return [
      { subject: 'Fruity', A: profile.Fruity, fullMark: 100 },
      { subject: 'Flowery', A: profile.Flowery, fullMark: 100 },
      { subject: 'Sweet', A: profile.Sweet, fullMark: 100 },
      { subject: 'Nutty', A: profile.Nutty, fullMark: 100 },
      { subject: 'Spicy', A: profile.Spicy, fullMark: 100 },
      { subject: 'Tangy', A: profile.Tangy, fullMark: 100 },
      { subject: 'Strong', A: profile.Strong, fullMark: 100 },
    ];
  }, [mixes, roast]);

  // Handle Suggestion Flow
  const openSuggestion = () => {
    setSuggestionStep(0);
    setShowSuggestion(true);
  };

  const handleAnswer = () => {
    if (suggestionStep < 2) {
      setSuggestionStep(prev => prev + 1);
    } else if (suggestionStep === 2) {
      setSuggestionStep(3); // loading
      setTimeout(() => setSuggestionStep(4), 1500); // show result
    }
  };

  const applySuggestion = () => {
    setSelectedIds(['CO', 'GT', 'IN']);
    setMixes([
      { id: 'CO', percent: 40 },
      { id: 'GT', percent: 40 },
      { id: 'IN', percent: 20 },
    ]);
    setRoast('medium_dark');
    setShowSuggestion(false);
  };

  const handleOrder = () => {
    setShowOrderForm(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* Top Map Infographic Section */}
      <CoffeeMap 
        onPickCoffee={(name) => {
          setBlendName(name);
          setShowOrderForm(true);
        }} 
      />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        
        {/* Page Title */}
        <div className="flex items-center gap-2 mb-10">
          <Coffee className="w-5 h-5 text-accent" />
          <h1 className="text-sm font-bold text-foreground tracking-wide">Vasavi Coffee — Build Your Blend</h1>
        </div>
        
        {/* Helper Box */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl border border-border bg-card flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16"
        >
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Not sure where to start?</h3>
            <p className="text-sm text-muted-foreground">Answer 4 quick questions about your cafe and we'll suggest a blend for you.</p>
          </div>
          <button 
            onClick={openSuggestion}
            className="shrink-0 px-6 py-2.5 bg-accent hover:bg-accent/90 text-primary-foreground font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Get a suggestion
          </button>
        </motion.div>

        {/* --- STEP 1 --- */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-1">Step 1 — Pick your coffees</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Tap up to 4 coffees. ({selectedIds.length}/4 picked) <br/>
            Arabica — smoother & more delicate. Robusta — stronger & bolder, with more crema. "AA" just means extra-large, top-grade beans.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {COFFEES.map((coffee) => {
              const isSelected = selectedIds.includes(coffee.id);
              const isDisabled = !isSelected && selectedIds.length >= 4;
              return (
                <div 
                  key={coffee.id}
                  onClick={() => !isDisabled && handleToggleCoffee(coffee.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group
                    ${isSelected 
                      ? 'border-accent bg-accent/[0.03]' 
                      : isDisabled 
                        ? 'border-border bg-card opacity-50 cursor-not-allowed'
                        : 'border-border bg-card hover:border-border hover:bg-muted'
                    }
                  `}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-lg font-black text-foreground">{coffee.code}</span>
                    {isSelected ? (
                      <Check className="w-4 h-4 text-accent" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground/50 rotate-45 group-hover:text-muted-foreground transition-colors" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{coffee.name}</h3>
                  <p className="text-xs text-muted-foreground mb-6">{coffee.desc}</p>
                  
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-muted text-foreground rounded text-[10px] font-bold">{coffee.type}</span>
                    {coffee.badge && (
                      <span className={`px-2 py-1 rounded text-[10px] font-bold border ${
                        coffee.badge.toLowerCase() === 'premium' 
                          ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' 
                          : 'bg-accent/20 text-accent border-accent/30'
                      }`}>
                        {coffee.badge}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- STEP 2 --- */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              className="mb-16 overflow-hidden"
            >
              <h2 className="text-2xl font-bold text-foreground mb-1">Step 2 — Mix the amounts</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Slide to change how much of each coffee you use — the rest will adjust so it always adds up to 100%.
              </p>
              
              <div className="p-6 rounded-2xl border border-border bg-card">
                
                {/* Visual Ratio Bar */}
                <div className="h-6 rounded-full bg-muted mb-6 flex overflow-hidden">
                  {mixes.map(mix => {
                    const coffee = COFFEES.find(c => c.id === mix.id);
                    return (
                      <div 
                        key={`bar-${mix.id}`} 
                        className="h-full transition-all duration-300" 
                        style={{ width: `${mix.percent}%`, backgroundColor: coffee?.color }} 
                      />
                    );
                  })}
                </div>

                {/* Ratio Legend */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {mixes.map(mix => {
                    const coffee = COFFEES.find(c => c.id === mix.id);
                    return (
                      <div key={`leg-${mix.id}`} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: coffee?.color }}></div>
                        <span>{coffee?.name}</span>
                        <span className="font-bold text-accent">{mix.percent}%</span>
                      </div>
                    );
                  })}
                </div>

                {/* Sliders */}
                <div className="space-y-6">
                  {mixes.map(mix => {
                    const coffee = COFFEES.find(c => c.id === mix.id);
                    return (
                      <div key={`slider-${mix.id}`} className="group relative">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-foreground flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground uppercase">{coffee?.code}</span>
                            {coffee?.name}
                          </span>
                          <button 
                            onClick={() => handleToggleCoffee(mix.id)} 
                            className="text-muted-foreground/50 hover:text-foreground/80 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <input 
                          type="range" 
                          min="0" max="100" 
                          value={mix.percent}
                          onChange={(e) => handleSliderChange(mix.id, parseInt(e.target.value))}
                          className="w-full h-2 bg-muted rounded-full appearance-none outline-none cursor-pointer accent-accent"
                          style={{
                            background: `linear-gradient(to right, ${coffee?.color} 0%, ${coffee?.color} ${mix.percent}%, rgba(255,255,255,0.1) ${mix.percent}%, rgba(255,255,255,0.1) 100%)`
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* --- STEP 3 --- */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-1">Step 3 — Choose a roast</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Roasting longer makes coffee taste bolder and smokier, but less fruity.
          </p>
          
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-[#fef3c7] via-[#d97706] to-[#451a03] mb-6"></div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ROASTS.map((r) => {
              const Icon = r.icon;
              const isSelected = roast === r.id;
              return (
                <div 
                  key={r.id}
                  onClick={() => setRoast(r.id)}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2
                    ${isSelected 
                      ? 'border-accent bg-accent/[0.05] shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                      : 'border-border bg-card hover:border-border hover:bg-muted'
                    }
                  `}
                >
                  <Icon className="w-6 h-6 mb-1" style={{ color: r.color }} />
                  <h3 className="text-sm font-bold text-foreground">{r.name}</h3>
                  <p className="text-[10px] text-muted-foreground">{r.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4 font-mono">Roasting this blend takes about 10 minutes.</p>
        </section>

        {/* --- TASTE & NAME --- */}
        <section className="space-y-6">
          {/* Radar Chart */}
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="text-xl font-bold text-foreground mb-1 border-b-2 border-accent inline-block pb-1">What it tastes like</h3>
            <p className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/30"></span> Updates live as you mix and roast
            </p>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Taste Profile" dataKey="A" stroke="#d4af37" strokeWidth={2} fill="#d4af37" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Name & Submit */}
          <div className="p-6 rounded-2xl border border-border bg-card flex flex-col md:flex-row items-end gap-6">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Name your blend</label>
              <input 
                type="text" 
                value={blendName}
                onChange={(e) => setBlendName(e.target.value)}
                className="w-full bg-transparent border-b-2 border-border text-3xl font-bold text-foreground py-2 outline-none focus:border-accent transition-colors"
                placeholder="e.g. Morning Magic"
              />
            </div>
            <button 
              onClick={handleOrder}
              className="w-full md:w-auto px-8 py-4 bg-accent hover:bg-accent/90 text-primary-foreground font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" /> Order a sample
            </button>
          </div>
        </section>

      </div>

      {/* Suggestion Modal overlay */}
      <AnimatePresence>
        {showSuggestion && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-card border border-border rounded-2xl p-8 relative overflow-hidden"
            >
              <button onClick={() => setShowSuggestion(false)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground bg-muted rounded-full">
                <X className="w-4 h-4" />
              </button>
              
              {suggestionStep < 3 && (
                <motion.div key="question" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full justify-center">
                  <div className="flex gap-2 justify-center mb-8">
                    {[0,1,2].map(step => (
                      <div key={step} className={`h-1.5 w-12 rounded-full transition-colors ${step <= suggestionStep ? 'bg-accent' : 'bg-muted'}`} />
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                    {suggestionStep === 0 && "What's your primary target audience?"}
                    {suggestionStep === 1 && "Which flavor profile do they prefer?"}
                    {suggestionStep === 2 && "What is your target budget per kg?"}
                  </h2>
                  <div className="space-y-3">
                    {(suggestionStep === 0 ? ["Local Daily Commuters", "Premium Fine Dining", "Quick Service / Students"] :
                      suggestionStep === 1 ? ["Strong & Milky (Traditional)", "Black & Fruity (Modern)", "Balanced & Chocolatey"] :
                      ["Economy (< ₹800)", "Premium (₹800 - ₹1200)", "Luxury (> ₹1200)"]).map((option, idx) => (
                      <button 
                        key={idx}
                        onClick={handleAnswer}
                        className="w-full p-4 rounded-xl border border-border bg-card hover:bg-muted-foreground/20 hover:border-accent/50 text-foreground font-bold transition-all text-left"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {suggestionStep === 3 && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 border-4 border-border border-t-accent rounded-full animate-spin mb-6"></div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Our AI is crafting your recipe...</h2>
                  <p className="text-sm text-muted-foreground">Analyzing flavor profiles and margins</p>
                </motion.div>
              )}

              {suggestionStep === 4 && (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Let's find your perfect blend</h2>
                  <p className="text-center text-muted-foreground mb-8 text-sm">Our AI roaster has curated a recipe tailored for robust, spiced Indian-style cafes.</p>
                  
                  <div className="bg-muted rounded-xl p-4 mb-6 border border-accent/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
                    <h3 className="text-sm font-bold text-accent mb-1 uppercase tracking-widest">Recommended Recipe</h3>
                    <h4 className="text-xl font-bold text-foreground mb-4">"The Heritage Kick"</h4>
                    
                    <div className="space-y-2 text-sm text-foreground/80">
                      <div className="flex justify-between"><span>Colombia Huila</span> <span>40%</span></div>
                      <div className="flex justify-between"><span>Guatemala Antigua</span> <span>40%</span></div>
                      <div className="flex justify-between font-bold text-accent"><span>Chikmagalur Robusta</span> <span>20%</span></div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
                      <span className="text-muted-foreground">Roast Profile</span>
                      <span className="font-bold text-foreground flex items-center gap-1"><Cloud className="w-4 h-4 text-[#d97706]" /> Medium-Dark</span>
                    </div>
                  </div>

                  <button 
                    onClick={applySuggestion}
                    className="w-full py-4 bg-foreground hover:bg-foreground/90 text-background font-black uppercase tracking-widest rounded-xl transition-all"
                  >
                    Apply this recipe
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Form Modal */}
      <AnimatePresence>
        {showOrderForm && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 relative overflow-hidden"
            >
              <button onClick={() => setShowOrderForm(false)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground bg-muted rounded-full transition-colors">
                <X className="w-4 h-4" />
              </button>
              
              <h2 className="text-xl font-bold text-foreground mb-1 mt-1 pr-8">Order a sample of "{blendName}"</h2>
              <p className="text-muted-foreground text-xs mb-5">
                Just a few details so we can send it your way.
              </p>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground mb-1">Your cafe's name</label>
                  <input type="text" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground mb-1">Email</label>
                  <input type="email" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent transition-colors" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-muted-foreground mb-1">City</label>
                    <input type="text" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-muted-foreground mb-1">How much? (g)</label>
                    <input type="text" defaultValue="250" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground mb-1">Anything else? (optional)</label>
                  <textarea rows={2} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent transition-colors resize-none"></textarea>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setShowOrderForm(false);
                  setShowOrderSuccess(true);
                }}
                className="w-full mt-6 py-2.5 bg-accent hover:bg-accent/90 text-primary-foreground font-black text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                Send my request
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Success Modal */}
      <AnimatePresence>
        {showOrderSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-card border border-accent/20 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-accent" />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-2">Sample Ordered!</h2>
              <p className="text-muted-foreground text-sm mb-8">
                Your custom blend <span className="text-accent font-bold">"{blendName}"</span> is being prepared. We'll ship your 250g sample within 24 hours.
              </p>
              
              <button 
                onClick={() => setShowOrderSuccess(false)}
                className="w-full py-3.5 bg-accent hover:bg-accent/90 text-primary-foreground font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                Back to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
