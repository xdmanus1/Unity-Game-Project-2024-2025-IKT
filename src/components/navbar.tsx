import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, LogIn, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from './AuthContext'
import { useTranslation } from 'react-i18next'

const NavLinks: React.FC<{ 
  currentUser: any; 
  logout: () => void; 
  onClick?: () => void;
  variants?: any;
}> = ({ currentUser, logout, onClick, variants }) => {
  const location = useLocation();
  const { t } = useTranslation("navbar");

  const baseLinkClass = "w-full md:w-auto px-1 py-2 md:py-0 text-center relative text-lg font-medium transition-colors before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2 before:top-3 before:h-2 before:w-0 before:rounded-full before:bg-blue-500 before:blur-md before:transition-all before:duration-300 hover:text-blue-500 hover:before:w-5 hover:before:h-5 hover:before:bg-purple-500";
  const activeLinkClass = "text-blue-500 before:w-5 before:h-5 before:bg-purple-500";
  const inactiveLinkClass = "text-gray-300";

  const getLinkClass = (path: string) => {
    return `${baseLinkClass} ${location.pathname === path ? activeLinkClass : inactiveLinkClass}`;
  };

  return (
    <>
      {[
        { to: "/", text: t("home") },
        { to: "/about", text: t("about") },
        { to: "/download", text: t("download") },
        ...(currentUser ? [{ to: "/dashboard", text: t("dashboard") }] : []),
      ].map((link) => (
        <motion.div key={link.to} variants={variants}>
          <Link 
            to={link.to} 
            className={getLinkClass(link.to)} 
            onClick={onClick}
          >
            {link.text}
          </Link>
        </motion.div>
      ))}
      <motion.div variants={variants}>
        <motion.div
          className="w-full md:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/auth" className={`${getLinkClass("/auth")} before:top-2 flex items-center justify-center gap-2`} onClick={onClick}>
            {currentUser ? (
              <>
                <span className="md:hidden" onClick={(e) => { e.preventDefault(); logout(); }}>{t("logout")}</span>
                <LogOut className="h-6 w-6 text-gray-300" onClick={(e) => { e.preventDefault(); logout(); }} />
              </>
            ) : (
              <>
                <span className="md:hidden">{t("login")}</span>
                <LogIn className="h-6 w-6 text-gray-300" />
              </>
            )}
          </Link>
        </motion.div>
      </motion.div>
    </>
  )
}

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
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }}
            exit={{ 
              opacity: 0,
              y: -10,
              transition: {
                duration: 0.3,
                ease: "easeIn"
              }
            }}
            className="absolute top-16 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 md:hidden overflow-hidden"
          >
            <motion.nav 
              className="flex flex-col items-center py-4"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              <NavLinks 
                currentUser={currentUser} 
                logout={logout} 
                onClick={toggleMenu}
                variants={{
                  open: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.3, ease: "easeOut" }
                  },
                  closed: { 
                    opacity: 0, 
                    y: -10,
                    transition: { duration: 0.3, ease: "easeIn" }
                  }
                }}
              />
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar

