import { useState } from 'react'
import SmartSearch from '@/components/search/SmartSearch'
import StorefrontBanner from '@/components/home/StorefrontBanner'
import StorefrontProducts from '@/components/home/StorefrontProducts'
import TrustedBrands from '@/components/home/TrustedBrands'
import { Sparkles } from 'lucide-react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'coffee' | 'machines'>('coffee')

  return (
    <main className="flex flex-col min-h-screen bg-background pt-8 pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-accent/5 via-accent/2 to-transparent pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. Smart Filter Search (Centerpiece) */}
      <div className="container mx-auto px-4 md:px-8 mb-12 relative z-20">
        <SmartSearch />
      </div>

      {/* 2. Changing Banners (E-commerce Carousel) */}
      <div className="container mx-auto px-4 md:px-8 mb-20 relative z-20">
        <StorefrontBanner />
      </div>

      {/* 3. Category Tabs (Coffee / Machineries) */}
      <div className="container mx-auto px-4 md:px-8 mb-12 flex justify-center relative z-20">
        <div className="inline-flex items-center p-1.5 bg-foreground/5 backdrop-blur-md rounded-full border border-foreground/10 shadow-xl">
          <button 
            onClick={() => setActiveTab('coffee')}
            className={`px-8 py-3.5 rounded-full font-bold transition-all duration-300 ${
              activeTab === 'coffee' 
                ? 'bg-accent text-background shadow-[0_0_20px_rgba(255,213,79,0.3)]' 
                : 'bg-transparent text-foreground/70 hover:text-foreground'
            }`}
          >
            Premium Beans
          </button>
          <button 
            onClick={() => setActiveTab('machines')}
            className={`px-8 py-3.5 rounded-full font-bold transition-all duration-300 ${
              activeTab === 'machines' 
                ? 'bg-accent text-background shadow-[0_0_20px_rgba(255,213,79,0.3)]' 
                : 'bg-transparent text-foreground/70 hover:text-foreground'
            }`}
          >
            Machineries
          </button>
        </div>
      </div>

      {/* 4. Filtered Products Grid */}
      <div className="container mx-auto px-4 md:px-8 mb-24 relative z-20">
        <StorefrontProducts category={activeTab} />
      </div>

      <div className="relative z-20">
        <TrustedBrands />
      </div>
    </main>
  )
}
