"use client"

import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'
import { Monitor, Gamepad, Cog, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import GitHubReleaseDownloader from './download'

interface AnimatedSectionProps {
  children: React.ReactNode; // Accepts any valid React child (elements, strings, etc.)
  delay?: number; // Optional, defaults to 0
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0 }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  React.useEffect(() => {
    if (inView) {
      controls.start("visible")
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
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}
interface TutorialStepProps {
  icon: React.ElementType; // The type for the icon component
  title: string; // The title must be a string
  description: string; // The description must be a string
}

const TutorialStep: React.FC<TutorialStepProps> = ({ icon: Icon, title, description }) => (
  <Card className="bg-gray-800 border-none shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300">
    <CardHeader>
      <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center text-white">
        <Icon size={32} />
      </div>
      <CardTitle className="text-xl font-semibold text-center text-white">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-300 text-center">{description}</p>
    </CardContent>
  </Card>
)

export function DownloadsPageComponent() {
  const { t } = useTranslation("download")

  const tutorialSteps = [
    { icon: Download, title: t('tutorial.step1.title'), description: t('tutorial.step1.description') },
    { icon: Monitor, title: t('tutorial.step2.title'), description: t('tutorial.step2.description') },
    { icon: Gamepad, title: t('tutorial.step3.title'), description: t('tutorial.step3.description') },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-16">
        <AnimatedSection>
          <h1 id="top" className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            {t('title')}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-none shadow-lg mb-16">
            <CardContent className="flex flex-col items-center p-12">
              <h2 className="text-gray-300 text-3xl font-bold mb-4">{t('launcher.title')}</h2>
              <p className="text-gray-300 text-center mb-8 max-w-2xl">{t('launcher.description')}</p>
              <GitHubReleaseDownloader />
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <h2 className="text-4xl font-bold text-center mb-12">{t('tutorial.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tutorialSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
              >
                <TutorialStep {...step} />
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.8}>
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-none shadow-lg mt-16">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-300">
                <Cog className="mr-4 text-blue-500" size={32} />
                {t('systemRequirements.title')}
              </h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 text-lg">
                <li>{t('systemRequirements.os')}</li>
                <li>{t('systemRequirements.processor')}</li>
                <li>{t('systemRequirements.memory')}</li>
                <li>{t('systemRequirements.graphics')}</li>
                <li>{t('systemRequirements.storage')}</li>
              </ul>
            </CardContent>
          </Card>
        </AnimatedSection>
      </main>
    </div>
  )
}

export default DownloadsPageComponent

