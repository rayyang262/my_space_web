import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NavHeader from './components/ui/NavHeader'
import WarpPageTransition from './components/ui/warp-page-transition'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <WarpPageTransition locationKey={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </WarpPageTransition>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/my_space_web">
      <NavHeader />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
