/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// auth.tsx
// @ts-ignore
import React, { useEffect, useRef, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
// @ts-ignore
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Eye, EyeOff, Mail, UserPlus, LogIn, User } from 'lucide-react'
import { useAuth } from './AuthContext'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
// @ts-ignore
import { redirect, useNavigate } from 'react-router-dom'
// @ts-ignore
import { useTranslation } from 'react-i18next'

// Firebase is already initialized in AuthContext, but if you need to use it here, you can import auth and db
const auth = getAuth()
const db = getFirestore()
// const googleProvider = new GoogleAuthProvider()

const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false) 
  const navigate = useNavigate();
  // @ts-ignore
  const { currentUser } = useAuth()
  const { t} = useTranslation("auth");

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // Store username in Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: username,
          email: email
        })
      }
      // Handle successful login/register
      navigate("/")
      console.log('Success!')
    } catch (error) {
      setShowAlert(true)
      setError(t("errorSignInWithGoogle"))
      console.error(error)
      setTimeout(() => {
        setShowAlert(false)
      }, 2000);

    }
  }

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider)
  //     // Store username in Firestore (using email as username for Google sign-in)
  //     await setDoc(doc(db, "users", result.user.uid), {
  //       username: result.user.email?.split('@')[0],
  //       email: result.user.email
  //     })
  //     console.log('Google sign-in successful!')
  //   } catch (error) {
  //     setShowAlert(true)
  //     setError(t("errorSignInFailed"))
  //     console.error(error)
  //     setTimeout(() => {
  //       setShowAlert(false)
  //     }, 2000);
  //   }
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              {isLogin ? t("signIn") : t("createNewAccount")}
            </h2>
          </motion.div>
        </AnimatePresence>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <div>
                <label htmlFor="username" className="sr-only">
                {t("username")}
                </label>
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder={t("username")}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <User className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">
              {t("email")}
              </label>
              <div className="relative">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${isLogin ? 'rounded-t-md' : ''} focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
              {t("password")}
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={t("password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-red-500 text-sm mt-2"
            >
              {error}
            </motion.div>
          )} */}

          <div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLogin ? (
                  <LogIn className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                ) : (
                  <UserPlus className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                )}
              </span>
              {isLogin ? t("signInButton") : t("signUpButton")}
            </motion.button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              {/* <div className="w-full border-t border-gray-300"></div> */}
            </div>
            {/* <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-300">{t("orContinueWith")}</span>
            </div> */}
          </div>

          {/* <div className="mt-6">
            <motion.button
              onClick={handleGoogleSignIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {t("signInWithGoogle")}
            </motion.button>
          </div> */}
        </div>

        <div className="text-center mt-4">
          <motion.button
            onClick={() => setIsLogin(!isLogin)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {isLogin ? t("needAnAccount") : t("createNewAccount")}
          </motion.button>
        </div>
    <AnimatePresence>
    {showAlert && (
      <motion.div
      initial={{ opacity: 0, y: -10 }}  // Initial state (before entering)
      animate={{ opacity: 1, y: 0 }}   // Animate to (when entering)
      exit={{ opacity: 0, y: -10 }}     // Exit animation (when leaving)
      transition={{ duration: 0.3 }}    // Transition settings
        className="fixed bottom-5 right-5"
      >
        <Alert
          variant="destructive"

        >
          <AlertTitle>{t("error")}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </motion.div>
    )}
    </AnimatePresence>
    
      </motion.div>
    </div>
  )
}

export default LoginRegister
