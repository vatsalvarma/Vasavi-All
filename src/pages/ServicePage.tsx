import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, Settings, Snowflake, Droplet, MonitorSmartphone, 
  Thermometer, Flame, Zap, Droplets, Utensils, Check, Plus, Phone
} from 'lucide-react';

const CATEGORIES = [
  { id: 'espresso', name: 'Espresso Machines', icon: Coffee },
  { id: 'grinders', name: 'Grinders', icon: Settings },
  { id: 'refrigeration', name: 'Refrigeration', icon: Snowflake },
  { id: 'water', name: 'Water Filtration', icon: Droplet },
  { id: 'ice', name: 'Ice Machines', icon: Snowflake },
  { id: 'pos', name: 'POS / Billing', icon: MonitorSmartphone },
  { id: 'batch', name: 'Batch Brewers & Hot Water', icon: Thermometer },
  { id: 'ovens', name: 'Ovens & Bakery', icon: Flame },
  { id: 'blenders', name: 'Blenders', icon: Zap },
  { id: 'beverage', name: 'Beverage Prep', icon: Droplets },
  { id: 'kitchen', name: 'Kitchen Equipment', icon: Utensils },
  { id: 'dishwashing', name: 'Dishwashing', icon: Droplets },
  { id: 'tech', name: 'Tech & POS', icon: MonitorSmartphone },
];

const BRAND_DATA: Record<string, string[]> = {
  espresso: ['La Marzocco', 'Sanremo', 'Nuova Simonelli', 'Slayer', 'Victoria Arduino', 'Kees van der Westen', 'Synesso', 'Rocket', 'La Cimbali', 'Other / Not listed'],
  grinders: ['Mahlkönig', 'Victoria Arduino (Mythos)', 'Mazzer', 'Ditting', 'Fiorenzato', 'Anfim', 'Compak', 'Eureka', 'Weber Workshops', 'Other / Not listed'],
  refrigeration: ['True', 'Turbo Air', 'Hoshizaki', 'Polar', 'Williams', 'Other / Not listed'],
  water: ['BWT', 'Everpure', 'Brita', '3M', 'Other / Not listed'],
  ice: ['Hoshizaki', 'Scotsman', 'Manitowoc', 'Brema', 'Other / Not listed'],
  ovens: ['Unox', 'Rational', 'Merrychef', 'Turbochef', 'Other / Not listed'],
  blenders: ['Vitamix', 'Blendtec', 'Hamilton Beach', 'Other / Not listed'],
  pos: ['Square', 'Toast', 'Clover', 'Lightspeed', 'Other / Not listed'],
  default: ['Standard Brand', 'Premium Brand', 'Other / Not listed']
};

const MODEL_DATA: Record<string, any[]> = {
  'Mazzer': [
    { id: 'sj', name: 'Super Jolly V Pro', desc: 'Mid Tier', price: 699 },
    { id: 'rs', name: 'Robur S', desc: 'Premium Tier', price: 1299 },
    { id: 'mv', name: 'Major V', desc: 'Mid Tier', price: 699 },
  ],
  'Mahlkönig': [
    { id: 'ek43', name: 'EK43', desc: 'Premium Tier', price: 1299 },
    { id: 'ek43s', name: 'EK43S', desc: 'Premium Tier', price: 1299 },
    { id: 'e65s', name: 'E65S GbW', desc: 'Premium Tier', price: 1299 },
    { id: 'e80s', name: 'E80S GbW', desc: 'Premium Tier', price: 1299 },
    { id: 'e85s', name: 'E85S GbW', desc: 'Premium Tier', price: 1299 },
  ],
  'Victoria Arduino (Mythos)': [
    { id: 'va1', name: 'Mythos One', desc: 'Premium Tier', price: 1299 },
    { id: 'va2', name: 'Mythos 2', desc: 'Premium Tier', price: 1299 },
    { id: 'va3', name: 'Mythos MY75', desc: 'Premium Tier', price: 1299 },
    { id: 'va4', name: 'Mythos MY85', desc: 'Premium Tier', price: 1299 },
  ],
  'La Marzocco': [
    { id: 'lm1', name: 'Linea Classic S (2 Group)', desc: 'Premium Tier', price: 2999 },
    { id: 'lm2', name: 'KB90 (2 Group)', desc: 'Ultra Premium', price: 4499 },
  ],
  'Ditting': [
    { id: 'dit1', name: '807 Lab Sweet', desc: 'Premium Tier', price: 1299 },
    { id: 'dit2', name: 'KR804', desc: 'Mid Tier', price: 899 },
  ],
  'Fiorenzato': [
    { id: 'fio1', name: 'F64 Evo', desc: 'Mid Tier', price: 699 },
    { id: 'fio2', name: 'F83 E', desc: 'Premium Tier', price: 1099 },
  ],
  'Eureka': [
    { id: 'eur1', name: 'Atom 75', desc: 'Mid Tier', price: 699 },
    { id: 'eur2', name: 'Helios 80', desc: 'Premium Tier', price: 999 },
    { id: 'eur3', name: 'Prometheus', desc: 'Premium Tier', price: 1299 },
  ],
  'Anfim': [
    { id: 'anf1', name: 'SP II', desc: 'Premium Tier', price: 1299 },
    { id: 'anf2', name: 'Pratica', desc: 'Mid Tier', price: 699 },
    { id: 'anf3', name: 'Luna', desc: 'Premium Tier', price: 999 },
  ],
  'Compak': [
    { id: 'com1', name: 'E8', desc: 'Premium Tier', price: 999 },
    { id: 'com2', name: 'PK100', desc: 'Ultra Premium Tier', price: 1499 },
    { id: 'com3', name: 'F10', desc: 'Premium Tier', price: 1299 },
  ],
  'Weber Workshops': [
    { id: 'web1', name: 'EG-1', desc: 'Ultra Premium Tier', price: 1499 },
    { id: 'web2', name: 'KEY', desc: 'Premium Tier', price: 1299 },
  ],
  'default': [
    { id: 'def1', name: 'Standard Model', desc: 'Mid Tier', price: 599 },
    { id: 'def2', name: 'Pro Model', desc: 'Premium Tier', price: 999 },
  ]
};

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    desc: "Suitable for low-volume kiosks where downtime isn't immediately critical.",
    price: 699,
    features: [
      { text: 'Quarterly preventive visit', included: true },
      { text: 'Phone support', included: true },
      { text: 'Service report after each visit', included: true },
      { text: 'Priority response', included: false },
      { text: 'On-call technician', included: false },
      { text: 'Parts pre-stocked', included: false },
      { text: 'Monthly visits', included: false },
      { text: 'Emergency SOS priority', included: false },
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    popular: true,
    desc: 'The plan 74% of Vasavi cafe clients choose — the best balance of coverage and cost.',
    price: 1049,
    features: [
      { text: 'Monthly preventive visit', included: true },
      { text: 'Phone + WhatsApp support', included: true },
      { text: 'Service report after each visit', included: true },
      { text: 'Priority over Basic customers', included: true },
      { text: '10% off spare parts', included: true },
      { text: '2-hour emergency response', included: false },
      { text: 'Parts pre-stocked at your cafe', included: false },
      { text: 'Dedicated technician', included: false },
    ],
    alert: "Only a few Standard slots open in Hyderabad this month"
  },
  {
    id: 'priority',
    name: 'Priority',
    desc: 'For high-volume flagship cafes where every minute of downtime costs thousands.',
    price: 2499,
    features: [
      { text: 'Monthly preventive visit', included: true },
      { text: 'Phone + WhatsApp support', included: true },
      { text: 'Service report after each visit', included: true },
      { text: 'Priority over Basic customers', included: true },
      { text: '25% off spare parts', included: true },
      { text: '2-hour emergency response', included: true },
      { text: 'Parts pre-stocked at your cafe', included: true },
      { text: 'Dedicated technician', included: true },
    ]
  }
];

export default function ServicePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('grinders');
  const [selectedBrand, setSelectedBrand] = useState<string>('Mazzer');
  const [equipment, setEquipment] = useState<{id: string, name: string, price: number, uniqueId: string}[]>([]);
  const [revenue, setRevenue] = useState(15000);
  const [daysOffline, setDaysOffline] = useState(3);
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [customBrand, setCustomBrand] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [customTier, setCustomTier] = useState<{name: string, price: number} | null>(null);

  const activeBrands = BRAND_DATA[selectedCategory] || BRAND_DATA['default'];
  
  useEffect(() => {
    setSelectedBrand(activeBrands[0]);
  }, [selectedCategory, activeBrands]);

  const activeModels = MODEL_DATA[selectedBrand] || MODEL_DATA['default'];

  const handleAddCustomEquipment = () => {
    if (!customBrand || !customModel || !customTier) return;
    setEquipment([...equipment, { 
      id: 'custom-' + Date.now(), 
      name: `${customBrand} ${customModel}`, 
      price: customTier.price, 
      uniqueId: Date.now().toString() 
    }]);
    setCustomBrand('');
    setCustomModel('');
    setCustomTier(null);
  };

  const handleAddEquipment = (model: any) => {
    setEquipment([...equipment, { ...model, uniqueId: Date.now().toString() }]);
  };

  const removeEquipment = (uniqueId: string) => {
    setEquipment(equipment.filter(e => e.uniqueId !== uniqueId));
  };

  const totalBaseAMC = equipment.reduce((sum, item) => sum + item.price, 0);

  // Calculations for ROI
  const lossPerHour = Math.round(revenue / 24);
  const totalLossNoAmc = revenue * daysOffline;
  const standardLoss = Math.round(revenue * 1); // standard AMC usually fixes in 1 day
  const priorityLoss = Math.round(revenue * (2 / 24)); // priority fixes in 2 hours
  const netSaved = totalLossNoAmc - standardLoss;

  const noAmcPercent = 100;
  const standardPercent = Math.min(100, Math.round((standardLoss / totalLossNoAmc) * 100));
  const priorityPercent = Math.min(100, Math.max(2, Math.round((priorityLoss / totalLossNoAmc) * 100))); // at least 2% width for visibility

  // For styling the input ranges
  const revenuePercent = ((revenue - 2000) / (100000 - 2000)) * 100;
  const daysPercent = ((daysOffline - 1) / (14 - 1)) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground pb-24 pt-4">
      
      {/* Header */}
      <div className="px-6 max-w-7xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <Coffee className="w-6 h-6 text-accent" />
          <h1 className="text-xl font-bold">Vasavi Coffee — Equipment & AMC</h1>
        </div>
        <button className="flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full font-bold hover:bg-destructive/20 transition-colors">
          <Phone className="w-4 h-4" /> Emergency
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-bold mb-1">Browse by category</h2>
          <p className="text-muted-foreground text-sm mb-6">Tap a category, then pick your exact brand and model.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-3 px-4 rounded-xl border flex flex-row items-center gap-3 transition-all ${
                  selectedCategory === cat.id 
                    ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(var(--accent),0.1)]' 
                    : 'border-border/50 bg-card hover:bg-accent/5 hover:border-accent/30'
                }`}
              >
                <cat.icon className={`w-5 h-5 shrink-0 ${selectedCategory === cat.id ? 'text-accent' : 'text-muted-foreground'}`} />
                <span className="text-xs font-semibold text-left leading-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Brands & Models Section */}
        <AnimatePresence mode="wait">
          <motion.section 
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl border border-border bg-card"
          >
            <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-widest">Brand</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {activeBrands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${
                    selectedBrand === brand
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border bg-background text-foreground hover:bg-accent/10 hover:border-accent/50'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {selectedBrand === 'Other / Not listed' ? (
              <div className="bg-background border border-border rounded-2xl p-6">
                <h4 className="text-accent font-bold mb-4">Enter your equipment details</h4>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-2">Brand name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Conti, Astoria X, Brewlyn" 
                      value={customBrand}
                      onChange={(e) => setCustomBrand(e.target.value)}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:border-accent text-foreground" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-2">Model name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. X1, Pro 2, Classic" 
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:border-accent text-foreground" 
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-muted-foreground mb-2">Estimated tier (affects AMC price)</label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { name: 'Budget', price: 399 },
                      { name: 'Mid', price: 699 },
                      { name: 'Premium', price: 1299 }
                    ].map(tier => (
                      <button
                        key={tier.name}
                        onClick={() => setCustomTier(tier)}
                        className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${
                          customTier?.name === tier.name 
                            ? 'border-accent text-accent' 
                            : 'border-border text-foreground hover:border-accent/50'
                        }`}
                      >
                        {tier.name} · ₹{tier.price}/Mo
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleAddCustomEquipment}
                  disabled={!customBrand || !customModel || !customTier}
                  className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Plus className="w-4 h-4" /> Add to my equipment
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeModels.map(model => (
                  <div key={model.id} className="p-4 rounded-2xl bg-background border border-border flex items-center justify-between group hover:border-accent/50 transition-colors">
                    <div>
                      <h4 className="font-bold text-base">{model.name}</h4>
                      <p className="text-xs text-muted-foreground">{model.desc} · ₹{model.price}/Mo AMC Base</p>
                    </div>
                    <button 
                      onClick={() => handleAddEquipment(model)}
                      className="flex items-center gap-1 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform shrink-0"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        </AnimatePresence>

        {/* Your Equipment */}
        <section>
          <h2 className="text-2xl font-bold mb-1">Your equipment ({equipment.length})</h2>
          <p className="text-muted-foreground text-sm mb-6">This drives your AMC price below — add everything you want covered.</p>
          
          {equipment.length === 0 ? (
            <div className="p-8 rounded-3xl border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground">
              <Settings className="w-12 h-12 mb-4 opacity-50" />
              <p>No equipment added yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {equipment.map(item => (
                <div key={item.uniqueId} className="p-4 rounded-xl border border-border bg-card flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm text-accent">₹{item.price}/mo</p>
                  </div>
                  <button onClick={() => removeEquipment(item.uniqueId)} className="text-muted-foreground hover:text-destructive transition-colors">Remove</button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ROI Calculator */}
        <section>
          <h2 className="text-2xl font-bold mb-1">What downtime actually costs you</h2>
          <p className="text-muted-foreground text-sm mb-6">Drag the sliders — the math updates in real time.</p>
          
          <div className="p-6 rounded-3xl border border-border bg-card">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm font-bold text-foreground">Your average daily revenue</label>
                </div>
                <input 
                  type="range" min="2000" max="100000" step="1000"
                  value={revenue} onChange={(e) => setRevenue(Number(e.target.value))}
                  style={{ background: `linear-gradient(to right, rgb(245, 158, 11) ${revenuePercent}%, rgba(245, 158, 11, 0.2) ${revenuePercent}%)` }}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-accent outline-none"
                />
                <div className="flex justify-between mt-2 text-xs font-mono text-muted-foreground">
                  <span>₹2,000</span>
                  <span className="text-foreground">₹{revenue.toLocaleString()}/day</span>
                  <span>₹1,00,000</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm font-bold text-foreground">Days typically offline without AMC</label>
                </div>
                <input 
                  type="range" min="1" max="14" step="1"
                  value={daysOffline} onChange={(e) => setDaysOffline(Number(e.target.value))}
                  style={{ background: `linear-gradient(to right, rgb(245, 158, 11) ${daysPercent}%, rgba(245, 158, 11, 0.2) ${daysPercent}%)` }}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-accent outline-none"
                />
                <div className="flex justify-between mt-2 text-xs font-mono text-muted-foreground">
                  <span>1 day</span>
                  <span className="text-foreground">{daysOffline} days</span>
                  <span>14 days</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#FCA5A5] font-bold flex items-center gap-2"><span className="text-xl leading-none -mt-1">×</span> No AMC — breakdown wait</span>
                  <span className="font-mono text-[#FCA5A5]">₹{totalLossNoAmc.toLocaleString()} lost</span>
                </div>
                <div className="h-4 w-full bg-border rounded-full overflow-hidden relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white z-10">{noAmcPercent}%</div>
                  <div className="h-full bg-[#FCA5A5] transition-all duration-300" style={{ width: `${noAmcPercent}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground font-bold flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Standard AMC — 24hr response</span>
                  <span className="font-mono text-accent">₹{standardLoss.toLocaleString()} lost</span>
                </div>
                <div className="h-4 w-full bg-border rounded-full overflow-hidden relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-black z-10">{standardPercent}%</div>
                  <div className="h-full bg-accent transition-all duration-300" style={{ width: `${standardPercent}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground font-bold flex items-center gap-2"><Flame className="w-4 h-4 text-orange-500" /> Priority AMC — 2hr response</span>
                  <span className="font-mono text-emerald-500">₹{priorityLoss.toLocaleString()} lost</span>
                </div>
                <div className="h-4 w-full bg-border rounded-full overflow-hidden relative">
                  <div className="h-full bg-[#86EFAC] transition-all duration-300" style={{ width: `${priorityPercent}%` }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-2xl text-center border border-border">
                <p className="text-3xl font-mono text-foreground mb-1">₹{lossPerHour.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">lost per hour down</p>
              </div>
              <div className="p-4 bg-background rounded-2xl text-center border border-accent/40 shadow-[0_0_15px_rgba(var(--accent),0.1)]">
                <p className="text-3xl font-mono text-accent mb-1">₹{netSaved.toLocaleString()}</p>
                <p className="text-xs text-accent">net saved with Standard</p>
              </div>
              <div className="p-4 bg-background rounded-2xl text-center border border-border">
                <p className="text-3xl font-mono text-emerald-500 mb-1">Infinityx</p>
                <p className="text-xs text-muted-foreground">ROI on your AMC this incident</p>
              </div>
            </div>
            <p className="text-center text-xs mt-4 text-muted-foreground">Rough estimates — actual losses depend on how central the broken machine is to your menu.</p>
          </div>
        </section>

        {/* Protection Plans */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Choose your protection plan</h2>
            <p className="text-muted-foreground">Prices shown for {equipment.length || 1} mid-tier machine(s) — add your equipment above for a real quote.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map(plan => {
              const displayPrice = equipment.length > 0 ? (totalBaseAMC * (plan.price / 1049)).toFixed(0) : plan.price;
              const isSelected = selectedPlan === plan.id;
              
              return (
                <div 
                  key={plan.id}
                  className={`relative p-5 rounded-3xl border transition-all flex flex-col ${
                    isSelected ? 'border-accent bg-card shadow-[0_0_20px_rgba(var(--accent),0.15)] z-10' : 'border-border bg-card opacity-80 hover:opacity-100'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      Most popular
                    </div>
                  )}
                  
                  <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-tight min-h-[2.5rem]">{plan.desc}</p>
                  
                  <div className="mb-4 pb-4 border-b border-border">
                    <span className="text-3xl font-bold text-accent">₹{displayPrice}</span>
                    <span className="text-muted-foreground text-xs">/mo</span>
                    <p className="text-[10px] text-emerald-500 mt-1 font-bold">Just ₹{Math.round(Number(displayPrice)/30)} a day — less than a cup of coffee</p>
                  </div>
                  
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        {feat.included ? (
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <span className="w-4 h-4 text-muted-foreground shrink-0 text-center font-bold">×</span>
                        )}
                        <span className={feat.included ? 'text-foreground' : 'text-muted-foreground line-through'}>{feat.text}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.alert && (
                    <div className="mb-4 bg-accent/10 border border-accent/30 rounded-lg p-2 flex items-start gap-2 text-[10px] text-accent leading-tight">
                      <Zap className="w-3 h-3 shrink-0 mt-0.5" /> {plan.alert}
                    </div>
                  )}

                  <button 
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 text-sm rounded-xl font-bold transition-colors ${
                      isSelected 
                        ? 'bg-accent text-accent-foreground'
                        : 'border border-accent text-accent hover:bg-accent/10'
                    }`}
                  >
                    {isSelected ? '✓ Selected' : 'Select Plan'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Checkout Form */}
        <section className="pt-10">
          <div className="max-w-2xl mx-auto bg-card border border-border p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-2">Finalize your AMC</h2>
            <p className="text-muted-foreground text-sm mb-8">Enter your cafe details to generate your final contract.</p>
            
            {!formSubmitted ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">Cafe Name</label>
                    <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors text-foreground" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">Owner Name</label>
                    <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors text-foreground" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">Contact Number</label>
                    <input type="tel" className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors text-foreground" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">City</label>
                    <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors text-foreground" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">Full Address</label>
                  <textarea rows={3} className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors text-foreground resize-none"></textarea>
                </div>
                
                <button 
                  onClick={() => setFormSubmitted(true)}
                  className="w-full mt-6 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(var(--accent),0.2)]"
                >
                  Complete Registration
                </button>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Registration Complete</h3>
                <p className="text-muted-foreground">Our technical team will contact you shortly to schedule the first inspection and activate your {selectedPlan} AMC.</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
