"use client"

import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <section className="min-h-[calc(100vh-4.4rem)] flex flex-col items-center justify-center relative py-20 px-4">
      {/* Background effects */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 max-w-2xl"
      >
        <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-sm font-medium text-purple-300 mb-4">
          Get in touch
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Contact Me
          </span>
        </h1>
        <p className="text-gray-300">
          Have a question or want to work together? Feel free to reach out!
        </p>
      </motion.div>

      {/* Contact Form */}
      <div className="w-full max-w-2xl">
        <ContactForm />
      </div>
    </section>
  )
}
