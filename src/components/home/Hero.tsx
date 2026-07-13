import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { Star, Coffee, Leaf, MapPin, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import SmartSearch from '@/components/search/SmartSearch'

const beans = [
  { top: '5%', left: '10%', delay: 0 },
  { top: '15%', left: '85%', delay: 0.3 },
  { top: '25%', left: '25%', delay: 1 },
  { top: '35%', left: '70%', delay: 0.6 },
  { top: '45%', left: '15%', delay: 1.5 },
  { top: '55%', left: '90%', delay: 0.2 },
  { top: '65%', left: '30%', delay: 1.8 },
  { top: '75%', left: '80%', delay: 0.9 },
  { top: '85%', left: '12%', delay: 2.1 },
  { top: '95%', left: '65%', delay: 0.4 },
  { top: '10%', left: '50%', delay: 1.2 },
  { top: '20%', left: '40%', delay: 2.5 },
  { top: '40%', left: '5%', delay: 0.7 },
  { top: '60%', left: '55%', delay: 1.9 },
  { top: '80%', left: '45%', delay: 0.1 },
  { top: '90%', left: '88%', delay: 1.4 },
  { top: '30%', left: '95%', delay: 2.2 },
  { top: '50%', left: '75%', delay: 0.8 },
  { top: '70%', left: '20%', delay: 2.6 },
  { top: '12%', left: '72%', delay: 1.1 }
]

const floatingCards = [
  { id: 1, title: '🇧🇷 Brazil', subtitle: 'Medium Roast • Chocolate Notes', price: '₹799', top: '15%', left: '-5%' },
  { id: 2, title: '🇪🇹 Ethiopia', subtitle: 'Light Roast • Floral Notes', price: '₹899', top: '65%', left: '5%' },
  { id: 3, title: '☕ Coffee Grinder', subtitle: 'Burr Grinder • ★★★★★', price: 'Premium', top: '20%', right: '0%' },
  { id: 4, title: 'Espresso Machine', subtitle: '15 Bar Pressure • Pro Series', price: '₹14,999', top: '55%', right: '-5%' },
]

const brands = ['Nespresso', 'Breville', 'Fellow', 'Timemore', 'Hario', 'Comandante', 'Blue Tokai', 'Lavazza', 'Starbucks Reserve']

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])

  // Mouse spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // GSAP Word Reveal Animation
  useEffect(() => {
    if (!headlineRef.current) return
    const words = headlineRef.current.querySelectorAll('.word')
    gsap.fromTo(words, 
      { y: 100, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
    )
  }, [])

  // Magnetic Button Effect
  const handleMagnetic = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' })
  }
  
  const resetMagnetic = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
  }

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col pt-16 overflow-hidden bg-[#050505]">
      {/* ---------------- BACKGROUND EFFECTS ---------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated organic gradient blobs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-orange-900/10 blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-amber-900/10 blur-[150px]"
        />
        <motion.div 
          animate={{ y: [0, -50, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-stone-800/20 blur-[100px]"
        />
        
        {/* Mouse Spotlight */}
        <div 
          className="absolute inset-0 z-10 transition-opacity duration-300 opacity-50"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,213,79,0.05), transparent 40%)`
          }}
        />

        {/* Noise Texture & Steam */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Floating Coffee Beans */}
        {beans.map((bean, i) => (
          <motion.div
            key={i}
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
              y: [-100, 100, -100], 
              rotate: [0, 180, 360],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              y: { duration: 10 + (i % 5) * 3, repeat: Infinity, ease: "easeInOut", delay: bean.delay },
              rotate: { duration: 20 + (i % 3) * 5, repeat: Infinity, ease: "linear" },
              opacity: { duration: 6 + (i % 4), repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute z-10 rounded-full shadow-lg"
            style={{ 
              top: bean.top, 
              left: bean.left, 
              width: 30 + (i % 4) * 10 + 'px',
              height: 30 + (i % 4) * 10 + 'px',
              background: 'url("https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=100") center/cover',
              filter: `blur(${i % 3}px)` // Only blur some of them for depth
            }}
          />
        ))}
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-8 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-8 items-center pt-4">
        
        {/* ---------------- LEFT SIDE (55%) ---------------- */}
        <div className="w-full lg:w-[55%] flex flex-col items-start z-30">
          
          {/* Top Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,213,79,0.05)]"
          >
            <Coffee className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold tracking-widest text-white/90 uppercase">EST. 1998 • Specialty Coffee Marketplace</span>
          </motion.div>

          {/* Main Heading */}
          <h1 ref={headlineRef} className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05] mb-8 [perspective:1000px]">
            <div className="overflow-hidden inline-block"><span className="word inline-block origin-bottom text-white">Experience</span></div>{' '}
            <div className="overflow-hidden inline-block"><span className="word inline-block origin-bottom text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-700">Coffee</span></div><br/>
            <div className="overflow-hidden inline-block"><span className="word inline-block origin-bottom text-white">Beyond</span></div>{' '}
            <div className="overflow-hidden inline-block"><span className="word inline-block origin-bottom text-white">Ordinary.</span></div>
          </h1>

          {/* Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col gap-4 mb-10 border-l-2 border-accent/40 pl-6"
          >
            <p className="text-lg md:text-xl text-white/70 font-light max-w-xl leading-relaxed">
              Curated single-origin beans, professional brewing equipment, and artisanal accessories. Sourced globally, delivered fresh.
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-white/60">
              <span className="flex items-center gap-1.5"><Leaf className="w-4 h-4 text-accent" /> Fresh Roasted</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-accent" /> Direct Import</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-accent" /> Pro Equipment</span>
            </div>
          </motion.div>



          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="/shop/beans">
              <button 
                onMouseMove={handleMagnetic}
                onMouseLeave={resetMagnetic}
                className="relative overflow-hidden group bg-white text-black px-8 py-4 rounded-full font-semibold flex items-center gap-2"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                Shop Coffee Beans <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/shop/machines">
              <button 
                onMouseMove={handleMagnetic}
                onMouseLeave={resetMagnetic}
                className="relative group bg-white/5 border border-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Explore Machines
              </button>
            </Link>
          </motion.div>

          {/* Live Statistics & Trust */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="w-full flex flex-wrap gap-8 md:gap-12 mt-16 pt-8 border-t border-white/10"
          >
            <div>
              <div className="text-3xl font-bold text-white mb-1">120+</div>
              <div className="text-sm text-white/50">Coffee Farms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">60+</div>
              <div className="text-sm text-white/50">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">20K+</div>
              <div className="text-sm text-white/50">Happy Customers</div>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
              </div>
              <div className="text-sm font-medium text-white/80">4.9/5 Rating</div>
              <div className="text-xs text-white/40">From 10K+ Reviews</div>
            </div>
          </motion.div>

        </div>

        {/* ---------------- RIGHT SIDE (45%) - 3D SHOWCASE ---------------- */}
        <div className="w-full lg:w-[45%] h-[500px] lg:h-[600px] relative z-20 mt-8 lg:-mt-56 xl:-mt-72 perspective-1000">
          <motion.div 
            style={{ y }} 
            className="absolute inset-0 flex items-center justify-center transform-style-3d"
          >
            {/* Glowing Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[350px] bg-accent/20 blur-[100px] rounded-full" />
            
            {/* Central Product Showcase (Simulated 3D Coffee Bag) */}
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                rotateY: [-5, 5, -5],
                rotateX: [2, -2, 2]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-30 w-[240px] h-[360px] md:w-[300px] md:h-[450px]"
            >
              {/* Using a high-quality coffee bag image from unsplash as placeholder */}
              <img 
                src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800" 
                alt="Premium Coffee Bag" 
                className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-black/50 border border-white/10"
              />
              {/* Glass overlay for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-2xl border border-white/20 mix-blend-overlay"></div>
              
              {/* Live Purchase Feed floating attached to product */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8], y: [10, 0, 0, -10] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                className="absolute -bottom-4 -right-8 lg:-right-12 bg-white/10 backdrop-blur-xl border border-white/20 px-3 py-2 rounded-2xl shadow-2xl flex items-center gap-3 z-50"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <p className="text-xs text-white/90 font-medium">Just purchased</p>
                  <p className="text-xs text-white/50">Ethiopian Yirgacheffe</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Orbiting Beans behind & in front */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-100px] z-10 pointer-events-none"
            >
              <div className="absolute top-10 left-10 w-6 h-6 bg-[url('https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=100')] bg-cover rounded-full" />
              <div className="absolute bottom-20 right-10 w-8 h-8 bg-[url('https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=100')] bg-cover rounded-full blur-[1px]" />
            </motion.div>

            {/* Floating Cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [-10, 10, -10] }}
                transition={{ 
                  opacity: { duration: 1, delay: 1.5 + i * 0.2 },
                  scale: { duration: 1, delay: 1.5 + i * 0.2 },
                  y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i }
                }}
                className={`absolute z-40 bg-black/40 backdrop-blur-2xl border border-white/15 p-4 rounded-2xl shadow-2xl w-48 hover:bg-white/10 transition-colors cursor-pointer group`}
                style={{ top: card.top, left: card.left, right: card.right }}
              >
                <div className="text-sm font-bold text-white mb-1 group-hover:text-accent transition-colors">{card.title}</div>
                <div className="text-xs text-white/60 mb-3">{card.subtitle}</div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-accent">{card.price}</div>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ---------------- BELOW HERO SECTIONS ---------------- */}
      <div className="relative z-20 w-full bg-gradient-to-b from-transparent via-[#0A0A0A] to-[#0A0A0A] pt-32 pb-20 mt-20">
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center opacity-50"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/50 mb-2" />
          <div className="text-[10px] tracking-widest uppercase text-white/50">Scroll</div>
        </motion.div>

        {/* Marquee Brands */}
        <div className="w-full border-y border-white/5 py-8 overflow-hidden bg-black/20 backdrop-blur-md mb-24">
          <div className="flex w-[200%] relative">
            <motion.div 
              className="flex whitespace-nowrap items-center justify-around w-[100%]"
              animate={{ x: [0, "-100%"] }}
              transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            >
              {brands.map((brand, i) => (
                <div key={i} className="mx-8 opacity-40 hover:opacity-100 transition-opacity duration-300 text-xl font-bold tracking-widest text-white/80">
                  {brand.toUpperCase()}
                </div>
              ))}
              {brands.map((brand, i) => (
                <div key={`${i}-dup`} className="mx-8 opacity-40 hover:opacity-100 transition-opacity duration-300 text-xl font-bold tracking-widest text-white/80">
                  {brand.toUpperCase()}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Smart Search Panel */}
        <div className="container mx-auto px-4 md:px-8 mb-24">
          <SmartSearch />
        </div>
        
        {/* Why Choose Us */}
        <div className="container mx-auto px-4 md:px-8 mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10 pt-12 gap-8">
            {[
              { t: 'Freshly Roasted', d: 'Roasted to order for peak flavor.' },
              { t: 'Delivered in 48 Hours', d: 'Express shipping globally.' },
              { t: 'Single Origin', d: 'Traceable directly to the farm.' },
              { t: 'Expert Support', d: '24/7 barista assistance.' }
            ].map((feature, i) => (
              <div key={i}>
                <CheckCircle2 className="w-5 h-5 text-accent mb-3" />
                <h4 className="text-white font-medium mb-1">{feature.t}</h4>
                <p className="text-sm text-white/50">{feature.d}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
