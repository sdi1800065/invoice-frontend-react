import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import CretanFleur from './pages/CretanFleur'
import UrbanSuites from './pages/UrbanSuites'
import AthensView from './pages/AthensView'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Websites from './pages/Websites'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/epikoinwnia" element={<Contact />} />
          <Route path="/cretan-fleur" element={<CretanFleur />} />
          <Route path="/urban-suites" element={<UrbanSuites />} />
          <Route path="/athens-view" element={<AthensView />} />
          <Route path="/websites" element={<Websites />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
