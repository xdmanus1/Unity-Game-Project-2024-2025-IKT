import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthProvider } from './components/AuthContext'
import Navbar from './components/navbar'
import LandingPage from './components/landing-page'
import LoginRegister from './components/login-register'
import Dashboard from './components/dashboard'
import AboutPage from './components/about-page'
import Download from './components/downloads-page'
import ToTop from './components/scrolltop'

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
        <AuthProvider>
          <ToTop />
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
                  path="/download" 
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Download />
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

