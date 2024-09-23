// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

// Firebase configuration (ensure this matches your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBKzP_Gzj9vKl0SeNGvwqyPNTjyJFP1cNg",
  authDomain: "blissful-acumen-403110.firebaseapp.com",
  projectId: "blissful-acumen-403110",
  storageBucket: "blissful-acumen-403110.appspot.com",
  messagingSenderId: "906620326246",
  appId: "1:906620326246:web:ae4df89c2b39b2230578a7"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// Define the shape of your context
interface AuthContextType {
  currentUser: User | null
  logout: () => Promise<void>
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // Function to log out the user
  const logout = () => {
    return signOut(auth)
  }

  // While checking auth state, you can show a loader or null
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
