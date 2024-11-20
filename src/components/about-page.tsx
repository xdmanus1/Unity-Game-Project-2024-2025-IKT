import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Gamepad, Zap, Crosshair, ChevronDown,  ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import hpfp from "./assets/hpfp.png"
import jpfp from "./assets/jpfp.jpg"
import cart1 from "./assets/cart1.jpg"
import gameplay from "./assets/gameplay.png"
import placeholder from "./assets/placeholder.svg"
import GitHubReleaseDownloader from './download';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDiscord } from "@fortawesome/free-brands-svg-icons"
import {faEnvelope} from "@fortawesome/free-solid-svg-icons"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface Member {
  name: string;
  role: string;
  image: string;
  description: string;
  icon: JSX.Element;
  email: string;
  discordUsername: string;
}

const TeamMemberCard = ({ member, index }: { member: Member; index: number }) => {

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
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-gray-700 rounded-lg overflow-hidden shadow-lg"
      whileHover={{ 
        scale: 1.05, 
        transition: { duration: 0.3 } 
      }}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {member.icon}
            <h3 className="text-2xl font-semibold ml-2 text-white">{member.name}</h3>
          </div>
          <Badge variant="secondary" className="text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
            {member.role}
          </Badge>
        </div>
        <p className="text-gray-300 mb-6">{member.description}</p>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 bg-gray-600 rounded-full py-2 px-4 transition-colors duration-300 hover:bg-gray-500">
            <FontAwesomeIcon icon={faDiscord} className="w-5 h-5 text-blue-400" />
            <span className="text-white text-sm">{member.discordUsername}</span>
          </div>
          <a 
            href={`mailto:${member.email}`}
            className="flex items-center space-x-3 bg-gray-600 rounded-full py-2 px-4 transition-colors duration-300 hover:bg-gray-500"
          >
            <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-blue-400" />
            <span className="text-white text-sm">{member.email}</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
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
      <motion.div
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      >
        <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <motion.div 
              className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center text-white"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {feature.icon}
            </motion.div>
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
  const teamMembers = [
    { 
      name: t('team.members.józsef.name'), 
      role: t('team.members.józsef.role'), 
      image: jpfp,
      description: t('team.members.józsef.description'),
      icon: <Gamepad className="w-8 h-8 text-blue-400" />,
      email: "baloghjozsefvendel@gmail.com",
      discordUsername: "zsirafkutya"
    },
    { 
      name: t('team.members.hunor.name'), 
      role: t('team.members.hunor.role'), 
      image: hpfp,
      description: t('team.members.hunor.description'),
      icon: <Code className="w-8 h-8 text-blue-400" />,
      email: "xdmanus.dev@gmail.com",
      discordUsername: "xdmanus"
    },
  ] as const;
  
  const features = [
    { icon: <Crosshair size={40} />, title: t("features.items.action.title"), description: t("features.items.action.description") },
    { icon: <Zap size={40} />, title: t("features.items.blend.title"), description: t("features.items.blend.description") },
    { icon: <Code size={40} />, title: t("features.items.experience.title"), description: t("features.items.experience.description") },
  ]

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
            src={placeholder + "?height=400&width=600vv"}
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
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('team.title')}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
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
                  src={gameplay}
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
      <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("features.title")}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
      {/* Call to Action */}
      <AnimatedSection>
        <section className="py-20 bg-gray-800" id="download">
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
                          <GitHubReleaseDownloader/>
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
    cart1,
    placeholder + "?height=400&width=600vv",
    placeholder + "?height=400&width=600vv",
    placeholder + "?height=400&width=600vv",
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