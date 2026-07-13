import { motion } from 'framer-motion'

const brands = ['APPLE', 'NIKE', 'SONY', 'SAMSUNG', 'ADIDAS', 'PUMA', 'GUCCI', 'PRADA', 'ROLEX']

const TrustedBrands = () => {
  return (
    <section className="w-full py-12 overflow-hidden border-y border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="flex w-[200%] overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
        
        <motion.div 
          className="flex whitespace-nowrap items-center justify-around w-[100%]"
          animate={{ x: [0, "-100%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {brands.map((brand, i) => (
            <div key={`${brand}-${i}`} className="mx-12 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer text-2xl md:text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
              {brand}
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {brands.map((brand, i) => (
            <div key={`${brand}-dup-${i}`} className="mx-12 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer text-2xl md:text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TrustedBrands
