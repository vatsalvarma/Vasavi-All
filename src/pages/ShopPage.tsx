import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import SmartSearch from '@/components/search/SmartSearch'

export default function ShopPage() {
  const { category } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [category])

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight capitalize">
            Shop {category === 'machines' ? 'Pro Machines' : 'Premium Beans'}
          </h1>
          <p className="text-lg text-foreground/60">
            {category === 'machines' 
              ? 'Discover world-class espresso machines and brewing equipment.'
              : 'Explore our curated selection of single-origin beans roasted to perfection.'}
          </p>
        </motion.div>

        {/* Reusing the Smart Filter Search here to allow full searching capability */}
        <SmartSearch />

        {/* Placeholder for Product Grid (which we'll build next if asked) */}
        <div className="mt-24 text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto opacity-50 mb-6"></div>
          <p className="text-foreground/40">Loading premium collection...</p>
        </div>
      </div>
    </div>
  )
}
