'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Code, Gamepad2, Mail, Github } from 'lucide-react'

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-12">About Our Project</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-300">
            We're on a mission to create an immersive and exciting gaming experience that pushes the boundaries of web-based gameplay. Our project combines cutting-edge web technologies with innovative game design to deliver a unique and engaging player experience.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <Code className="mr-2" /> Website/Launcher Developer
              </h3>
              <p className="text-gray-300 mb-4">
                Our website and launcher developer is passionate about creating seamless user experiences and robust web applications. With expertise in React, Java, and Firebase, they ensure our platform is fast, responsive, and user-friendly.
              </p>
              <div className="flex items-center text-blue-400">
                <Mail className="mr-2" />
                <a href="mailto:xdmanus.dev@gmail.com" className="hover:underline">xdmanus.dev@gmail.com</a>
              </div>
              <div className="flex items-center text-blue-400 mt-2">
                <Github className="mr-2" />
                <a href="https://github.com/xdmanus1" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub Profile</a>
              </div>vvv
            </motion.div>

            <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <Gamepad2 className="mr-2" /> Game Developer
              </h3>
              <p className="text-gray-300 mb-4">
                Our game developer brings creativity and technical skill to the table, crafting engaging gameplay mechanics and stunning visuals. With a background in Unity and WebGL, they're pushing the limits of what's possible in browser-based gaming.
              </p>
              <div className="flex items-center text-blue-400">
                <Mail className="mr-2" />
                <a href="mailto:game-dev@example.com" className="hover:underline">game-dev@example.com</a>
              </div>
              <div className="flex items-center text-blue-400 mt-2">
                <Github className="mr-2" />
                <a href="https://github.com/game-dev-username" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub Profile</a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Project</h2>
          <p className="text-gray-300 mb-4">
            Our project is an ambitious online multiplayer game that combines fast-paced action with strategic elements. Built using cutting-edge web technologies, it offers:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
            <li>Seamless multiplayer experience</li>
            <li>Cross-platform play</li>
            <li>Stunning graphics powered by WebGL</li>
            <li>Innovative gameplay mechanics</li>
            <li>Regular updates and new content</li>
          </ul>
          <p className="text-gray-300">
            We're constantly working to improve and expand our game, with a focus on community feedback and emerging technologies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
          <p className="text-gray-300 mb-4">
            We love hearing from our community! Whether you're a player with feedback, a fellow developer with questions, or someone interested in collaborating, don't hesitate to reach out.
          </p>
          <div className="flex items-center justify-center">
            <motion.a
              href="mailto:contact@example.com"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="mr-2" />
              Contact Us
            </motion.a>
          </div>
        </section>
      </motion.div>
    </div>
  )
}

export default AboutPage