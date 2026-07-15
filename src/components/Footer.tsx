const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border/50 pt-20 pb-10 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tighter flex items-center gap-2">
              <span className="text-gradient">Lumina</span>
            </h3>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Crafting premium experiences and curating luxury products for the modern individual. Awwwards winning aesthetic.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Collections</h4>
            <ul className="space-y-3">
              {['New Arrivals', 'Best Sellers', 'Electronics', 'Apparel', 'Accessories'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Sustainability', 'Careers', 'Service', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe for exclusive offers and early access.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-background/50 border border-border/50 rounded-md px-4 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all"
              />
              <button className="bg-foreground text-background px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Lumina. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
