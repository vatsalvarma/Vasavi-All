import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const products = [
  { id: 1, name: 'Sony WH-1000XM5', category: 'Electronics', price: 398, oldPrice: 450, rating: 4.9, reviews: 124, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop', badges: ['Best Seller'] },
  { id: 2, name: 'Minimalist Ceramic Vase', category: 'Home Decor', price: 85, oldPrice: 120, rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1612152605347-f93296cb657d?q=80&w=800&auto=format&fit=crop', badges: ['New'] },
  { id: 3, name: 'Leather Crossbody Bag', category: 'Fashion', price: 245, oldPrice: null, rating: 4.8, reviews: 210, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop', badges: [] },
  { id: 4, name: 'Mechanical Keyboard Pro', category: 'Gaming', price: 189, oldPrice: 220, rating: 4.9, reviews: 432, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop', badges: ['Sale'] },
]

const FeaturedProducts = () => {
  return (
    <section className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Trending <span className="text-gradient-accent">Now</span></h2>
          <p className="text-muted-foreground max-w-xl">Our most coveted pieces, updated daily based on global trends.</p>
        </div>
        <Button variant="outline" className="border-border/50 hover:bg-foreground hover:text-background rounded-full px-6 transition-colors">
          View All Products
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative flex flex-col rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-foreground/20 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-black/50"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-foreground/5">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badges.map(badge => (
                  <span key={badge} className="px-3 py-1 text-xs font-semibold rounded-full bg-accent text-accent-foreground shadow-sm">
                    {badge}
                  </span>
                ))}
              </div>

              {/* Hover Actions */}
              <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <button className="h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border/50 flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border/50 flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
              </div>

              {/* Quick Add Button */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <Button className="w-full bg-foreground/90 text-background hover:bg-foreground backdrop-blur font-medium rounded-xl gap-2 shadow-xl">
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </Button>
              </div>
              
              {/* Image Gradient Overlay for Button readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow bg-card z-10 relative">
              <div className="text-xs text-muted-foreground mb-2">{product.category}</div>
              <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-accent transition-colors truncate">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-1 mb-4">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-none opacity-30'}`} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
              </div>

              <div className="mt-auto flex items-center gap-3">
                <span className="text-xl font-bold">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="text-sm text-muted-foreground line-through">₹{product.oldPrice}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts
