import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import CretanFleur from './pages/CretanFleur'
import UrbanSuites from './pages/UrbanSuites'
import AthensView from './pages/AthensView'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Websites from './pages/Websites'
import Photography from './pages/Photography'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import NotFound from './pages/NotFound'
import Admin from './pages/admin/Admin'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Projects />} />
            <Route path="/projects" element={<Navigate to="/portfolio" replace />} />
            <Route path="/epikoinwnia" element={<Contact />} />
            <Route path="/cretan-fleur" element={<CretanFleur />} />
            <Route path="/urban-suites" element={<UrbanSuites />} />
            <Route path="/athens-view" element={<AthensView />} />
            <Route path="/ypiresies" element={<Websites />} />
            <Route path="/fotografia" element={<Photography />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  )
}
