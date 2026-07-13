import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const categories = [
  { title: 'Electronics', span: 'col-span-12 md:col-span-8 row-span-2', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2000&auto=format&fit=crop' },
  { title: 'Luxury Watches', span: 'col-span-12 md:col-span-4 row-span-1', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop' },
  { title: 'Fashion', span: 'col-span-12 md:col-span-4 row-span-1', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop' },
  { title: 'Gaming', span: 'col-span-12 md:col-span-4 row-span-1', image: 'https://images.unsplash.com/photo-1606144042871-297eb09de489?q=80&w=1000&auto=format&fit=crop' },
  { title: 'Home Decor', span: 'col-span-12 md:col-span-8 row-span-1', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop' },
]

const CategoryBento = () => {
  return (
    <section className="container mx-auto px-4 md:px-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Shop by <span className="text-gradient-accent">Category</span></h2>
          <p className="text-muted-foreground max-w-xl">Explore our diverse range of premium collections tailored for your lifestyle.</p>
        </div>
      </div>

      <div className="grid grid-cols-12 auto-rows-[240px] md:auto-rows-[300px] gap-4 md:gap-6">
        {categories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`${category.span} group relative rounded-3xl overflow-hidden cursor-pointer`}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
            <img 
              src={category.image} 
              alt={category.title} 
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            />
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white tracking-tight">{category.title}</h3>
                <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight className="text-white h-5 w-5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default CategoryBento
