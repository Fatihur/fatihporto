"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [currentSkill, setCurrentSkill] = useState(0)
  const skills = ["Graphic Design", "Data Analysis", "Networking", "Programming"]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("education")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-[calc(100vh-4.4rem)] flex flex-col items-center justify-center relative pt-2 md:pt-20 pb-12 md:pb-10 px-4 md:px-4">
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 md:space-y-6 text-center max-w-4xl mb-4 md:mb-0"
      >
        <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-sm font-medium text-purple-300">
          Welcome to my portfolio
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="block">Hi, I'm</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Fatihurroyyan
          </span>
        </h1>
        <div className="text-lg md:text-xl text-gray-300 space-y-2">
          <p>I'm passionate in</p>
          <div className="h-8 flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSkill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
              >
                {skills[currentSkill]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
            Download Resume
          </Button>
          <Button variant="outline" className="border-purple-500/50 text-white hover:bg-purple-500/10">
            View Projects
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-14 md:bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-purple-500/30 bg-black/50 text-purple-300 animate-bounce"
          onClick={scrollToNextSection}
        >
          <ArrowDown className="h-5 w-5" />
        </Button>
      </motion.div>
    </section>
  )
}
