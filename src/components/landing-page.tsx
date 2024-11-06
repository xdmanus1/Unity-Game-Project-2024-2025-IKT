/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Link } from "react-router-dom"
import { ChevronRight, Download, Star, Zap, Shield, Play } from "lucide-react"
import { useTranslation } from 'react-i18next'

const MotionImage = motion.img
// @ts-ignore
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
// @ts-ignore
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

    const { t, i18n } = useTranslation("landingPage");
  
      const toggleLanguage = () => {
          const newLang = i18n.language === 'en' ? 'hu' : 'en';
          i18n.changeLanguage(newLang);
        };
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const features = [
    { 
      icon: Zap, 
      title: t('features.action.title'),
      description: t('features.action.description')
    },
    { 
      icon: Shield, 
      title: t('features.strategy.title'),
      description: t('features.strategy.description')
    },
    { 
      icon: Download, 
      title: t('features.updates.title'),
      description: t('features.updates.description')
    },
    { 
      icon: Star, 
      title: t('features.powerups.title'),
      description: t('features.powerups.description')
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('./src/assets/placeholder.svg?height=600&width=600vv')`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70 z-10" />

      <main className="flex-1 relative z-20">
        <section id="game" className="relative w-full py-20 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <AnimatedSection className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    {t('hero.title')}
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                    {t('hero.description')}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 duration-200">
                    {t('hero.playButton')}
                    <ChevronRight className="ml-2 h-4 w-4 inline" />
                  </Button>
                  <Button className="text-blue-400 border border-blue-400 hover:bg-blue-400 duration-300 hover:text-gray-900">
                    <Play className="mr-2 h-4 w-4 inline" />
                    {t('hero.trailerButton')}
                  </Button>
                </div>
              </AnimatedSection>
              <AnimatedSection className="flex items-center justify-center">
                <MotionImage
                  alt={t('images.gameplay')}
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
        <section id="features" className="w-full py-20 md:py-24 lg:py-32 bg-gray-800 bg-opacity-80">
          <div className="container px-4 md:px-6">
            <AnimatedSection>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                {t('features.title')}
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
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
        <section id="about" className="w-full py-20 md:py-24 lg:py-32 bg-gray-900 bg-opacity-80">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <AnimatedSection className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  {t('about.title')}
                </h2>
                <p className="max-w-[600px] text-gray-400 md:text-xl">
                  {t('about.description')}
                </p>
                <ul className="grid gap-2 py-4">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-300">{t(`about.features.${item}`)}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
              <AnimatedSection className="flex items-center justify-center">
                <MotionImage
                  alt={t('images.screenshot')}
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
      </main>
      <footer className="w-full py-6 bg-gray-900 border-t border-gray-800 relative z-20">
        <div className="container flex flex-col gap-2 sm:flex-row items-center px-4 md:px-6">
          <p className="text-xs text-gray-400">{t('footer.copyright')}</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link to="/terms" className="text-xs text-gray-400 hover:text-blue-400 transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-blue-400 transition-colors">
              {t('footer.privacy')}
            </Link>
            <button
            onClick={toggleLanguage}
            className="text-xs text-gray-400 hover:text-blue-400 transition-colors"
          >
            {i18n.language === 'en' ? 'Magyar' : 'English'}
          </button>
          </nav>
        </div>
      </footer>
    </div>
  )
}