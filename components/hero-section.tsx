"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("education")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center relative py-20 px-4 md:px-8">
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-sm font-medium text-purple-300">
            Welcome to my portfolio
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="block">Hi, I'm</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Fatihurroyyan
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-lg">
            A passionate IT graduate with expertise in data analysis, graphic design, networking, and programming.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
              Download Resume
            </Button>
            <Button variant="outline" className="border-purple-500/50 text-white hover:bg-purple-500/10">
              View Projects
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500/80 to-pink-500/80 blur-md"></div>
            <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-purple-500/50 backdrop-blur-sm">
              <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-white/50">Profile</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              NFT
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
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
