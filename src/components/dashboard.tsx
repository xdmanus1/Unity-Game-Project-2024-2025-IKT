'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Crosshair, Trophy, Zap, Clock, Target, Star, Award } from 'lucide-react'

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date | null;
}

interface UserStats {
  score: number;
  kills: number;
  accuracy: number;
  timePlayed: number;
  highestStreak: number;
  level: number;
  achievements: Achievement[];
}

const StatCard: React.FC<{ title: string; value: number | string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-gray-300">{title}</h3>
      <div className="text-blue-500">{icon}</div>
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
  </motion.div>
)

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => (
  <motion.div
    className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-4"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="text-blue-500">
      <Award size={24} />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-300">{achievement.name}</h3>
      <p className="text-sm text-gray-400">{achievement.description}</p>
      {achievement.unlockedAt && (
        <p className="text-xs text-gray-500 mt-1">
          Unlocked: {achievement.unlockedAt.toLocaleDateString()}
        </p>
      )}
    </div>
  </motion.div>
)

const Dashboard: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserStats = async () => {
      const auth = getAuth()
      const db = getFirestore()

      if (!auth.currentUser) {
        setError("No user logged in")
        setLoading(false)
        return
      }

      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserStats
          // Ensure achievements array exists
          if (!userData.achievements) {
            userData.achievements = []
            await updateDoc(userDocRef, { achievements: [] })
          }
          setUserStats(userData)
        } else {
          setError("User data not found")
        }
      } catch (err) {
        setError("Failed to fetch user data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserStats()
  }, [])

  // const updateAchievements = async () => {
  //   if (!userStats || !getAuth().currentUser) return;

  //   const newAchievements: Achievement[] = [];

  //   if (userStats.kills > 0 && !userStats.achievements.some(a => a.id === 'first_kill')) {
  //     newAchievements.push({
  //       id: 'first_kill',
  //       name: 'First Blood',
  //       description: 'Get your first kill',
  //       icon: 'crosshair',
  //       unlockedAt: new Date()
  //     });
  //   }

  //   if (userStats.accuracy >= 90 && !userStats.achievements.some(a => a.id === 'sharpshooter')) {
  //     newAchievements.push({
  //       id: 'sharpshooter',
  //       name: 'Sharpshooter',
  //       description: 'Achieve 90% accuracy in a game',
  //       icon: 'target',
  //       unlockedAt: new Date()
  //     });
  //   }

  //   if (userStats.timePlayed >= 100 && !userStats.achievements.some(a => a.id === 'veteran')) {
  //     newAchievements.push({
  //       id: 'veteran',
  //       name: 'Veteran',
  //       description: 'Play for 100 hours',
  //       icon: 'clock',
  //       unlockedAt: new Date()
  //     });
  //   }

  //   if (newAchievements.length > 0) {
  //     const updatedAchievements = [...userStats.achievements, ...newAchievements];
  //     const db = getFirestore();
  //     const userDocRef = doc(db, "users", getAuth().currentUser.uid);
  //     await updateDoc(userDocRef, { achievements: updatedAchievements });
  //     setUserStats({ ...userStats, achievements: updatedAchievements });
  //   }
  // }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center text-white mb-12">Player Dashboard</h1>
      </motion.div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Score" value={userStats?.score || 0} icon={<Trophy size={24} />} />
          <StatCard title="Kills" value={userStats?.kills || 0} icon={<Crosshair size={24} />} />
          <StatCard title="Accuracy" value={`${userStats?.accuracy || 0}%`} icon={<Target size={24} />} />
          <StatCard title="Time Played" value={`${userStats?.timePlayed || 0} hrs`} icon={<Clock size={24} />} />
          <StatCard title="Highest Streak" value={userStats?.highestStreak || 0} icon={<Zap size={24} />} />
          <StatCard title="Level" value={userStats?.level || 1} icon={<Star size={24} />} />
        </div>
      </div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-white mb-4">Achievements</h2>
        {userStats?.achievements.length === 0 ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-400 text-lg">No achievements unlocked yet. Keep playing to earn achievements!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userStats?.achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Dashboard