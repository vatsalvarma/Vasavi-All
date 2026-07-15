import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import SmartSearch from '@/components/search/SmartSearch'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-[50px] left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled ? 'bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-[#050505]/50 backdrop-blur-md py-5 border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 items-center">
            
            {/* Left Side: Navigation Links & Mobile Toggle */}
            <div className="flex items-center justify-start gap-6">
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white hover:bg-white/10">
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                {[
                  { name: 'Cafe', path: '/cafe' },
                  { name: 'Blender', path: '/blend' },
                  { name: 'Machinery', path: '/machinery' },
                  { name: 'Service', path: '/service' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-accent transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center">
              <Link to="/" className="text-xl md:text-2xl font-black tracking-[0.2em] uppercase flex items-center gap-2 relative group text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/60 group-hover:from-accent group-hover:to-white transition-all duration-500">
                  E-Commerce
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-0.5 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(255,213,79,0.5)]"></span>
              </Link>
            </div>

            {/* Right Side: Icons */}
            <div className="flex items-center justify-end space-x-2 md:space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)}
                className="text-white/80 hover:text-accent hover:bg-white/5 rounded-full transition-all"
              >
                <Search className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex text-white/80 hover:text-accent hover:bg-white/5 rounded-full transition-all">
                <User className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex text-white/80 hover:text-accent hover:bg-white/5 rounded-full transition-all">
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-accent hover:bg-white/5 rounded-full transition-all relative">
                <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-accent text-black text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(255,213,79,0.5)]">
                  2
                </span>
              </Button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-3xl border-t border-border/50 overflow-hidden"
            >
              <div className="p-6 flex flex-col space-y-6">
                {[
                  { name: 'Cafe', path: '/cafe' },
                  { name: 'Blender', path: '/blend' },
                  { name: 'Machinery', path: '/machinery' },
                  { name: 'Service', path: '/service' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-2xl font-medium tracking-tight hover:text-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-6 border-t border-border flex gap-4">
                  <Button className="w-full bg-white text-black hover:bg-gray-200">Sign In</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Smart Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex justify-center items-start pt-[10vh] px-4"
          >
            <div className="absolute inset-0" onClick={() => setIsSearchOpen(false)}></div>
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="relative w-full max-w-4xl z-10"
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute -top-12 right-0 text-white/50 hover:text-white"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>
              <SmartSearch />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
