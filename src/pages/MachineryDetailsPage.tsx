import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Zap, Info, ChevronRight, ShoppingCart, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock expanded data for the detailed view
const MACHINES_DATA = [
  { 
    id: 1, 
    name: 'Astoria Sabrina', 
    brand: 'Astoria', 
    category: 'Espresso Machines', 
    price: '₹4,50,000',
    originalPrice: '₹5,10,000',
    discount: '11% off',
    rating: 4.8,
    reviews: 124,
    description: 'The Astoria Sabrina is a premium vintage-inspired espresso machine blending classic 1960s aesthetic with modern precision brewing technology. It features volumetric dosing, illuminated touch pads, and raised groups to accommodate larger cups.',
    features: [
      'Vintage 1960s inspired design with modern features',
      'Volumetric programmable dosing',
      'Illuminated touch pads and cup warmer',
      'Raised groups for tall cups',
      'Multi-boiler technology for precise temperature control'
    ],
    specs: {
      'Boiler Capacity': '10.5 Liters',
      'Power': '3900 W',
      'Voltage': '220-240 V',
      'Weight': '82 kg',
      'Dimensions (WxDxH)': '835 x 582 x 582 mm'
    },
    images: [
      './images/machines/machine1.png',
      './images/machines/machine2.png',
      './images/machines/machine3.png',
      './images/machines/machine4.png'
    ]
  },
  { 
    id: 2, 
    name: 'Mazzer Super Jolly Electronic', 
    brand: 'Mazzer', 
    category: 'Coffee Grinders', 
    price: '₹1,20,000',
    originalPrice: '₹1,35,000',
    discount: '11% off',
    rating: 4.9,
    reviews: 89,
    description: 'The Mazzer Super Jolly Electronic is an industry-standard commercial grinder. Featuring flat 64mm burrs and stepless micrometrical grinding adjustment, it offers precise, consistent grinds for medium to high volume cafes.',
    features: [
      'Stepless micrometrical grinding adjustment',
      'On-demand grinding with electronic dose adjustment',
      'Single and double dose with independent adjustment',
      'Digital display with shot counter',
      '64mm flat steel burrs'
    ],
    specs: {
      'Burr Size': '64mm Flat',
      'Hopper Capacity': '1.2 kg',
      'Motor Power': '350 W',
      'Grinding Speed': '1400 RPM',
      'Weight': '14 kg'
    },
    images: [
      './images/machines/machine2.png',
      './images/machines/machine1.png',
      './images/machines/machine4.png',
      './images/machines/machine3.png'
    ]
  },
  { 
    id: 3, 
    name: 'La Cimbali M39', 
    brand: 'LA Cimbali', 
    category: 'Espresso Machines', 
    price: '₹6,80,000',
    originalPrice: '₹7,50,000',
    discount: '9% off',
    rating: 4.7,
    reviews: 56,
    description: 'The La Cimbali M39 is designed to offer the ultimate barista experience. Engineered with advanced thermal stability, it allows for flawless extraction. Perfect for high-demand environments where quality cannot be compromised.',
    features: ['Thermal stability system', 'Smart boiler technology', 'Ergonomic steam wands', 'WiFi connectivity'],
    specs: { 'Boiler Capacity': '10 Liters', 'Power': '4200 W', 'Weight': '86 kg' },
    images: ['./images/machines/machine4.png']
  },
  { 
    id: 4, 
    name: 'Rocket Espresso R58', 
    brand: 'Rocket', 
    category: 'Espresso Machines', 
    price: '₹2,50,000',
    originalPrice: '₹2,80,000',
    discount: '10% off',
    rating: 4.9,
    reviews: 210,
    description: 'A dual boiler espresso machine featuring PID temperature control, a commercial rotary pump, and the classic E61 grouphead. This is the pinnacle of prosumer home or light commercial espresso.',
    features: ['Dual Boiler', 'PID Temperature Control', 'Rotary Pump', 'E61 Grouphead'],
    specs: { 'Brew Boiler': '0.58 Liters', 'Steam Boiler': '1.8 Liters', 'Power': '1400 W' },
    images: ['./images/machines/machine3.png']
  }
];

// Fallback machine if id not found
const FALLBACK_MACHINE = MACHINES_DATA[0];

export default function MachineryDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [machine, setMachine] = useState(FALLBACK_MACHINE);
  const [activeImage, setActiveImage] = useState(0);
  
  // Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const found = MACHINES_DATA.find(m => m.id === parseInt(id));
      if (found) setMachine(found);
    }
  }, [id]);

  return (
    <div className="w-full bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/machinery" className="hover:text-accent transition-colors">Machinery</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{machine.brand}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* LEFT SIDE: Image Gallery & Actions */}
          <div className="w-full lg:w-[45%] flex flex-col gap-6 shrink-0 lg:sticky lg:top-24 h-max">
            
            {/* Bento Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="w-full aspect-square bg-white rounded-2xl border border-border flex items-center justify-center p-8 overflow-hidden group">
                <img 
                  src={machine.images[activeImage]} 
                  alt={machine.name} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {machine.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square bg-white rounded-xl border-2 flex items-center justify-center overflow-hidden transition-all ${
                      activeImage === idx ? 'border-accent p-1' : 'border-border/50 p-2 hover:border-accent/50'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons (Flipkart/Amazon style) */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <button className="flex items-center justify-center gap-2 bg-[#ff9f00] hover:bg-[#e08e00] text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-colors shadow-lg">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button 
                onClick={() => setIsOrderModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-[#fb641b] hover:bg-[#e05615] text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-colors shadow-lg"
              >
                <Zap className="w-5 h-5" />
                Order Now
              </button>
            </div>
            
          </div>

          {/* RIGHT SIDE: Product Details */}
          <div className="w-full lg:w-[55%] flex flex-col pt-2">
            
            {/* Header: Brand, Title, Rating */}
            <div className="mb-6 border-b border-border pb-6">
              <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-2">{machine.brand}</p>
              <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">{machine.name}</h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                  {machine.rating} <Star className="w-3 h-3 fill-current" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">{machine.reviews} Ratings & Reviews</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-8">
              <div className="flex items-end gap-4 mb-2">
                <span className="text-4xl font-black text-foreground">{machine.price}</span>
                <span className="text-lg text-muted-foreground line-through mb-1">{machine.originalPrice}</span>
                <span className="text-green-500 font-bold text-lg mb-1">{machine.discount}</span>
              </div>
              <p className="text-sm text-muted-foreground">Inclusive of all taxes. Free shipping applied.</p>
            </div>

            {/* Delivery & Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 bg-card border border-border p-4 rounded-xl">
                <Truck className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-sm mb-1">Free Delivery</h4>
                  <p className="text-xs text-muted-foreground">Usually delivered in 5-7 business days.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-card border border-border p-4 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-sm mb-1">1 Year Warranty</h4>
                  <p className="text-xs text-muted-foreground">Comprehensive manufacturer warranty included.</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-accent" /> Description
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {machine.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {machine.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications Table */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 border-b border-border pb-2">Technical Specifications</h3>
              <div className="flex flex-col border border-border rounded-xl overflow-hidden">
                {Object.entries(machine.specs).map(([key, value], idx) => (
                  <div key={key} className={`flex flex-col sm:flex-row border-b border-border last:border-b-0 ${idx % 2 === 0 ? 'bg-card' : 'bg-background'}`}>
                    <div className="w-full sm:w-1/3 p-3 font-medium text-sm text-muted-foreground border-r-0 sm:border-r border-border">
                      {key}
                    </div>
                    <div className="w-full sm:w-2/3 p-3 text-sm font-bold text-foreground">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
        
        {/* Recommended for You Section */}
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-2xl font-black text-foreground mb-8">Recommended for You</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {MACHINES_DATA.filter(m => m.id !== machine.id).slice(0, 4).map((item) => (
              <Link to={`/machinery/${item.id}`} key={item.id} className="bg-card border border-border rounded-xl overflow-hidden group hover:border-accent/50 transition-colors flex flex-col h-full">
                <div className="aspect-square bg-white relative overflow-hidden flex items-center justify-center p-6">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">{item.brand}</p>
                  <h3 className="text-sm font-bold text-foreground mb-2 line-clamp-2 leading-tight">{item.name}</h3>
                  <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold w-max mb-3">
                    {item.rating} <Star className="w-2.5 h-2.5 fill-current" />
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-end gap-2">
                      <span className="text-lg font-black text-foreground">{item.price}</span>
                      <span className="text-xs text-muted-foreground line-through mb-0.5">{item.originalPrice}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
      </div>

      {/* Order Modal Overlay */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border shadow-2xl rounded-xl w-full max-w-sm overflow-hidden relative"
            >
              {/* close button */}
              {orderStatus !== 'success' && (
                <button 
                  onClick={() => setIsOrderModalOpen(false)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className="p-5">
                {orderStatus === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                    >
                      <Check className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-black mb-1 text-foreground">Order Placed!</h3>
                    <p className="text-muted-foreground mb-6 text-xs px-2">
                      Your order for <span className="font-bold text-foreground">{machine.name}</span> has been successfully placed. We will contact you shortly.
                    </p>
                    <button 
                      onClick={() => { setIsOrderModalOpen(false); setOrderStatus('idle'); }}
                      className="w-full bg-accent hover:bg-accent/90 text-primary-foreground font-bold py-2.5 text-sm rounded-lg transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-black mb-1 text-foreground">Complete Your Order</h3>
                    <p className="text-xs text-muted-foreground mb-4">Enter your details for delivery.</p>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setOrderStatus('submitting');
                      setTimeout(() => setOrderStatus('success'), 1500);
                    }} className="flex flex-col gap-3">
                      
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                        <input required type="text" className="bg-background border border-border rounded-md p-2.5 text-sm focus:outline-none focus:border-accent text-foreground transition-colors" placeholder="John Doe" />
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                        <input required type="tel" className="bg-background border border-border rounded-md p-2.5 text-sm focus:outline-none focus:border-accent text-foreground transition-colors" placeholder="+91 98765 43210" />
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Delivery Address</label>
                        <textarea required className="bg-background border border-border rounded-md p-2.5 text-sm focus:outline-none focus:border-accent text-foreground min-h-[60px] resize-none transition-colors" placeholder="123 Coffee Lane, City..." />
                      </div>

                      <div className="mt-2 flex items-center justify-between border-t border-border pt-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Payable</span>
                          <span className="text-lg font-black text-foreground">{machine.price}</span>
                        </div>
                        <button 
                          type="submit" 
                          disabled={orderStatus === 'submitting'}
                          className="bg-[#fb641b] hover:bg-[#e05615] text-white font-bold py-2.5 px-6 text-sm rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                          {orderStatus === 'submitting' ? 'Processing...' : 'Place Order'}
                        </button>
                      </div>

                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
