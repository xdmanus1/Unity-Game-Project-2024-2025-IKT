import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Gamepad, Zap, Crosshair, ChevronDown, Github, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const AboutPage: React.FC = () => {
  const { t } = useTranslation("aboutPage")
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const scrollToTeam = () => {
    const teamSection = document.getElementById('team')
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="./src/assets/placeholder.svg?height=400&width=600vv"
            alt="Quantum Vendetta Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50" />
        </motion.div>
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-6xl font-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
              {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={scrollToTeam}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.meetTeam')}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronDown className="ml-2" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            {...fadeInUp}
          >
            {t('team.title')}
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {[
              { 
                name: t('team.members.józsef.name'), 
                role: t('team.members.józsef.role'), 
                image: "./src/assets/placeholder.svg?height=400&width=600vv",
                description: t('team.members.józsef.description'),
                icon: <Gamepad className="w-8 h-8 text-blue-400" />
              },
              { 
                name: t('team.members.hunor.name'), 
                role: t('team.members.hunor.role'), 
                image: "./src/assets/placeholder.svg?height=400&width=600vv",
                description: t('team.members.hunor.description'),
                icon: <Code className="w-8 h-8 text-blue-400" />
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 rounded-lg overflow-hidden shadow-lg"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {member.icon}
                    <h3 className="text-2xl font-semibold ml-2">{member.name}</h3>
                  </div>
                  <p className="text-blue-400 text-lg mb-4">{member.role}</p>
                  <p className="text-gray-300 mb-4">{member.description}</p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Github className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Game Overview Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-12"
              {...fadeInUp}
            >
              {t("overview.title")}
            </motion.h2>
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.div className="md:w-1/2 mb-8 md:mb-0" variants={fadeInUp}>
                <img
                  src="./src/assets/placeholder.svg?height=400&width=600vv"
                  alt="Quantum Vendetta Gameplay"
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>
              <motion.div className="md:w-1/2 md:pl-8" variants={fadeInUp}>
                <p className="text-lg mb-4">
                {t("overview.p1")}
                </p>
                <p className="text-lg">
                {t("overview.p2")}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Concept Art Carousel */}
      <AnimatedSection>
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-12"
              {...fadeInUp}
            >
                            {t("conceptArt.title")}
            </motion.h2>
            <ConceptArtCarousel />
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-12"
              {...fadeInUp}
            >
                                          {t("features.title")}
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {[
                { icon: <Crosshair size={40} />, title: t("feature.items.action.title"), description: "Fast-paced, top-down shooter gameplay with precise controls" },
                { icon: <Zap size={40} />, title: "Sci-Fi Meets Fantasy", description: "Unique blend of futuristic technology and magical abilities" },
                { icon: <Code size={40} />, title: "Seamless Experience", description: "Integrated website, launcher, and game for a smooth player journey" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-700 p-6 rounded-lg shadow-lg text-center"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-blue-500 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection>
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-4xl font-bold mb-8"
              {...fadeInUp}
            >
                                          {t("cta.title")}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                                          {t("cta.button")}
                                          </motion.a>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

const ConceptArtCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = [
    "./src/assets/placeholder.svg?height=400&width=600vv",
    "./src/assets/placeholder.svg?height=400&width=600vv",
    "./src/assets/placeholder.svg?height=400&width=600vv",
    "./src/assets/placeholder.svg?height=400&width=600vv",
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <motion.div
        className="overflow-hidden rounded-lg shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Concept Art ${currentIndex + 1}`}
          className="w-full h-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
      <motion.button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={prevSlide}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft size={24} />
      </motion.button>
      <motion.button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={nextSlide}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight size={24} />
      </motion.button>
    </div>
  )
}

export default AboutPage