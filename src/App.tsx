import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import ShopPage from '@/pages/ShopPage'
import ProductDetailsPage from '@/pages/ProductDetailsPage'
import TrackOrderPage from '@/pages/TrackOrderPage'
import AccountDashboard from '@/pages/AccountDashboard'
import AdminDashboard from '@/pages/AdminDashboard'
import CollectionShowcasePage from '@/pages/CollectionShowcasePage'
import CafeListingPage from '@/pages/CafeListingPage'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { useEffect } from 'react'
import Lenis from 'lenis'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="shop/:category" element={<ShopPage />} />
            <Route path="showcase/:id?" element={<CollectionShowcasePage />} />
            <Route path="product/:id" element={<ProductDetailsPage />} />
            <Route path="track-order" element={<TrackOrderPage />} />
            <Route path="account" element={<AccountDashboard />} />
            <Route path="cafe" element={<CafeListingPage />} />
            {/* Add more routes here like Cart, Checkout, Profile */}
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
