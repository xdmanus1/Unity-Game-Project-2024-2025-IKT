
'use client'

import { Link } from "react-router-dom"
import { Gamepad2} from "lucide-react"


export function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center fixed w-full bg-gray-900 bg-opacity-90 backdrop-blur-md z-50 border-b border-gray-800">
      <Link className="flex items-center justify-center" to="#">
        <Gamepad2 className="h-6 w-6 text-blue-500" />
        <span className="ml-2 text-lg font-bold text-white">Quantum Vendetta</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors" to="#game">
          Game
        </Link>
        <Link className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors" to="#features">
          Features
        </Link>
        <Link className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors" to="#about">
          About
        </Link>
      </nav>
    </header>
  )
}