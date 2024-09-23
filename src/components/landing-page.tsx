import { useEffect } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Link } from "react-router-dom"
import { ChevronRight, Download, Star, Zap, Shield, Play, Gamepad2 } from "lucide-react"
import React from 'react'


const MotionImage = motion.img

function AnimatedSection({ children, className = "" }) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <main className="flex-1">
        <section id="game" className="relative w-full py-20 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0"
          >
            <img
              src="/placeholder.svg?height=1080&width=1920"
              alt="Game Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-70" />
          </motion.div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <AnimatedSection className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    PixelBlast: Top-Down 2D Shooter
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                    Dive into a world of intense action and strategy. Blast through waves of enemies in this thrilling top-down 2D shooter.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 duration-200">
                    Play Now
                    <ChevronRight className="ml-2 h-4 w-4 inline" />
                  </Button>
                  <Button className="text-blue-400 border border-blue-400 hover:bg-blue-400 duration-300 hover:text-gray-900">
                    <Play className="mr-2 h-4 w-4 inline" />
                    Watch Trailer
                  </Button>
                </div>
              </AnimatedSection>
              <AnimatedSection className="flex items-center justify-center">
                <MotionImage
                  alt="PixelBlast Gameplay"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg shadow-blue-500/20"
                  height="400"
                  src="./src/assets/placeholder.svg?height=400&width=600vv"
                  width="600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatedSection>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-20 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <AnimatedSection>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Game Features</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Zap, title: "Fast-paced Action", description: "Experience non-stop excitement with rapid-fire gameplay." },
                { icon: Shield, title: "Strategic Depth", description: "Plan your moves and outsmart your enemies to survive." },
                { icon: Download, title: "Regular Updates", description: "New content and features added frequently to keep the game fresh." },
                { icon: Star, title: "Power-ups", description: "Collect and use various power-ups to enhance your abilities." },
              ].map((feature, index) => (
                <AnimatedSection key={index}>
                  <motion.div
                    className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-shadow transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="h-12 w-12 mb-4 text-blue-500" />
                    <h3 className="text-xl font-bold mb-2 text-blue-400">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-20 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <AnimatedSection className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">About PixelBlast</h2>
                <p className="max-w-[600px] text-gray-400 md:text-xl">
                  PixelBlast is a thrilling top-down 2D shooter that combines fast-paced action with strategic gameplay. 
                  Developed by a passionate team of indie game developers, our mission is to deliver an unforgettable 
                  gaming experience that keeps you coming back for more.
                </p>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-300">Intuitive controls for smooth gameplay</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-300">Diverse enemy types and challenging bosses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-300">Leaderboards and achievements</span>
                  </li>
                </ul>
              </AnimatedSection>
              <AnimatedSection className="flex items-center justify-center">
                <MotionImage
                  alt="PixelBlast Screenshot"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg shadow-blue-500/20"
                  height="400"
                  src="/src/assets/placeholder.svg?height=400&width=600"
                  width="600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-900 border-t border-gray-800">
        <div className="container flex flex-col gap-2 sm:flex-row items-center px-4 md:px-6">
          <p className="text-xs text-gray-400">© 2024 PixelBlast. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link to="/terms" className="text-xs text-gray-400 hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}