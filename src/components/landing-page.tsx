/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronRight, Download, Star, Zap, Shield } from "lucide-react"
import { useTranslation } from 'react-i18next'
import gameplay1 from './assets/gameplay1.png'
import gameplay2 from './assets/gameplay2.png'
import { useNavigate } from 'react-router-dom';
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'


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

interface Feature {
  icon: React.ElementType; // Adjust if you're using a different icon library
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  React.useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
        <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <feature.icon/>
            </div>
            <CardTitle className="text-xl font-semibold text-center text-white">
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-center">{feature.description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}


export default function LandingPage() {

  const navigate = useNavigate(); 

  const navigateToAbout = () => {
    navigate('/download#top');
  };
  // const openYouTubeVideo = () => {
  //   // Open the YouTube video in a new tab
  //   window.open('https://www.youtube.com/watch?v=yourVideoId', '_blank');
  // };
  const { t } = useTranslation("landingPage");
  
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
          backgroundImage: gameplay1,
          transform: `translateY(${scrollY * 0.0000001}px)`,
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
                <Button
      className="bg-blue-600 text-white hover:bg-blue-700 duration-200"
      onClick={navigateToAbout}
    >
      {t('hero.playButton')}
      <ChevronRight className="ml-2 h-4 w-4 inline" />
    </Button>
                  {/* <Button className="text-blue-400 border border-blue-400 hover:bg-blue-400 duration-300 hover:text-gray-900" onClick={openYouTubeVideo}>
                    <Play className="mr-2 h-4 w-4 inline" />
                    {t('hero.trailerButton')}
                  </Button> */}
                </div>
              </AnimatedSection>
              <AnimatedSection className="flex items-center justify-center">
                <MotionImage
                  alt={t('images.gameplay')}
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg shadow-blue-500/20"
                  height="400"
                  src={gameplay1}
                  width="600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatedSection>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-20 md:py-24 lg:py-32 bg-gray-800 bg-opacity-80">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.h2 
          className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('features.title')}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
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
                  src={gameplay2}
                  width="600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}