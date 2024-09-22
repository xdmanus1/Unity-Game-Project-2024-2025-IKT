import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2 } from 'lucide-react'
import LandingPage from './components/landing-page'

// Navbar component
const Navbar: React.FC = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center fixed w-full bg-gray-900 bg-opacity-90 backdrop-blur-md z-50 border-b border-gray-800">
      <Link to="/" className="flex items-center justify-center">
        <Gamepad2 className="h-6 w-6 text-blue-500" />
        <span className="ml-2 text-lg font-bold text-white">PixelBlast</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 ">
        <Link to="/#game" className="w-min-content relative text-sm font-medium text-gray-300 transition-colors before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2 before:top-3 before:h-2 before:w-0 before:rounded-full before:bg-blue-500 before:blur-md before:transition-all before:duration-300 hover:text-blue-500 hover:before:w-5 hover:before:h-5 hover:before:bg-purple-500">
          Game
        </Link>
        <Link to="/#features" className="w-min-content relative text-sm font-medium text-gray-300 transition-colors before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2 before:top-3 before:h-2 before:w-0 before:rounded-full before:bg-blue-500 before:blur-md before:transition-all before:duration-300 hover:text-blue-500 hover:before:w-5 hover:before:h-5 hover:before:bg-purple-500">
          Features
        </Link>
        <Link to="/#about" className="w-min-content relative text-sm font-medium text-gray-300 transition-colors before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2 before:top-3 before:h-2 before:w-0 before:rounded-full before:bg-blue-500 before:blur-md before:transition-all before:duration-300 hover:text-blue-500 hover:before:w-5 hover:before:h-5 hover:before:bg-purple-500">
          About
        </Link>
      </nav>
    </header>
  )
}

// Main App component
const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <LandingPage />
                </motion.div>
              } 
            />
            {/* Add more routes here as needed */}
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

export default App