import { motion } from 'framer-motion';
import { Sun, Moon, Cloud, Stars } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button 
      onClick={toggleTheme}
      className="relative flex items-center p-1 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.4)] w-[72px] h-9 overflow-hidden group hover:scale-105 transition-transform duration-300 mx-2 cursor-pointer"
      aria-label="Toggle Luxury Theme"
    >
      {/* Animated Slider Background */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 bottom-1 w-8 rounded-full shadow-lg flex items-center justify-center z-10"
        initial={false}
        animate={{
          left: isDark ? 'calc(100% - 36px)' : '4px',
          backgroundColor: isDark ? '#D4AF37' : '#FFFFFF',
        }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0.8 : 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-black" fill="currentColor" />
          ) : (
            <Sun className="w-4 h-4 text-[#8B5E3C]" fill="currentColor" />
          )}
        </motion.div>
      </motion.div>

      {/* Decorative Elements - Light Mode */}
      <motion.div 
        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/50"
        animate={{ opacity: isDark ? 0 : 1, x: isDark ? -10 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <Cloud className="w-3.5 h-3.5 text-white/70" />
      </motion.div>

      {/* Decorative Elements - Dark Mode */}
      <motion.div 
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50"
        animate={{ opacity: isDark ? 1 : 0, x: isDark ? 0 : 10 }}
        transition={{ duration: 0.4 }}
      >
        <Stars className="w-3.5 h-3.5 text-white/40" />
      </motion.div>
    </button>
  );
}
