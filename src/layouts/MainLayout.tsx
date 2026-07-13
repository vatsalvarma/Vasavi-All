import { Outlet, useLocation } from 'react-router-dom'
import Footer from '@/components/Footer'
import TopUtilityBar from '@/components/TopUtilityBar'

const MainLayout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden pt-[90px]">
      {/* Animated noise texture background overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[var(--noise-opacity)]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      <TopUtilityBar />
      <main className="flex-grow flex flex-col w-full h-full">
        <Outlet />
      </main>
      {!location.pathname.startsWith('/product') && !location.pathname.startsWith('/track-order') && !location.pathname.startsWith('/account') && <Footer />}
    </div>
  )
}

export default MainLayout
