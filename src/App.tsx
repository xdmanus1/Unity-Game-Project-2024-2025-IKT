/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, LogIn, LogOut, Menu, X } from 'lucide-react'
import LandingPage from './components/landing-page'
import LoginRegister from './components/login-register'
import { AuthProvider, useAuth } from './components/AuthContext'
import Dashboard from './components/dashboard'
import AboutPage from './components/about-page'
import GameDemo from './components/game-demo'
import { useTranslation } from 'react-i18next'

// Navbar component
const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center fixed w-full bg-gray-900 bg-opacity-90 backdrop-blur-md z-50 border-b border-gray-800">
      <Link to="/" className="flex items-center justify-center">
        <Gamepad2 className="h-6 w-6 text-blue-500" />
        <span className="ml-2 text-lg font-bold text-white">Quantum Vendetta</span>
      </Link>
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        <NavLinks currentUser={currentUser} logout={logout} />
      </nav>
      <motion.button 
        onClick={toggleMenu} 
        className="ml-auto md:hidden text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-16 left-0 right-0 bg-gray-900 border-b border-gray-800 md:hidden overflow-hidden"
          >
            <nav className="flex flex-col items-center py-4">
              <NavLinks currentUser={currentUser} logout={logout} onClick={toggleMenu} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// NavLinks component
// @ts-ignore
const NavLinks: React.FC<{ currentUser: any; logout: () => void; onClick?: () => void }> = ({ currentUser, logout, onClick }) => {
  const location = useLocation();
  const baseLinkClass = "w-full md:w-auto px-1 py-2 md:py-0 text-center relative text-lg font-medium transition-colors before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2 before:top-3 before:h-2 before:w-0 before:rounded-full before:bg-blue-500 before:blur-md before:transition-all before:duration-300 hover:text-blue-500 hover:before:w-5 hover:before:h-5 hover:before:bg-purple-500";
  const activeLinkClass = "text-blue-500 before:w-5 before:h-5 before:bg-purple-500";
  const inactiveLinkClass = "text-gray-300";

  const getLinkClass = (path: string) => {
    return `${baseLinkClass} ${location.pathname === path ? activeLinkClass : inactiveLinkClass}`;
  };
  const { t} = useTranslation("navbar");
  return (
    <>
      <Link to="/" className={getLinkClass("/")} onClick={onClick}>
        {t("home")}
        
      </Link>
      <Link to="/about" className={getLinkClass("/about")} onClick={onClick}>
        
        {t("about")}
      </Link>
      {currentUser && (
        <Link to="/dashboard" className={getLinkClass("/dashboard")} onClick={onClick}>
          
          {t("dashboard")}
        </Link>
      )}
      <motion.div
        className="w-full md:w-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/auth" className={`${getLinkClass("/auth")} before:top-2 flex items-center justify-center gap-2`} onClick={onClick}>
          {currentUser ? (
            <>
              <span className="md:hidden" onClick={(e) => { e.preventDefault(); logout(); }}>Sign Out</span>
              <LogOut className="h-6 w-6 text-gray-300" onClick={(e) => { e.preventDefault(); logout(); }} />
            </>
          ) : (
            <>
              <span className="md:hidden">Sign In</span>
              <LogIn className="h-6 w-6 text-gray-300" />
            </>
          )}
        </Link>
      </motion.div>
    </>
  )
}

// Main App component
const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-16">
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
                <Route 
                  path="/auth" 
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <LoginRegister />
                    </motion.div>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Dashboard />
                    </motion.div>
                  } 
                />
                <Route 
                  path="/about" 
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <AboutPage />
                    </motion.div>
                  } 
                />
                <Route 
                  path="/demo" 
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <GameDemo />
                    </motion.div>
                  } 
                />
              </Routes>
            </AnimatePresence>
          </main>
        </AuthProvider>
      </div>
    </Router>
  )
}

export default App