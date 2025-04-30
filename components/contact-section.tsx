"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section className="py-20 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Get In Touch
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Feel free to reach out for collaborations or just a friendly hello
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20">
                <Mail className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Email</h3>
                <p className="text-gray-300">fatihur17@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20">
                <Phone className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">WhatsApp</h3>
                <p className="text-gray-300">087758962661</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20">
                <MapPin className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Location</h3>
                <p className="text-gray-300">Sumbawa, Nusa Tenggara Barat</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Link
                href="https://instagram.com/fatihur.r"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
              >
                <Instagram className="h-6 w-6 text-purple-400" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/fatihurroyyan/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
              >
                <Linkedin className="h-6 w-6 text-purple-400" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-black/40 border border-purple-500/20 backdrop-blur-sm rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Send Me a Message</h3>
            <p className="text-gray-300 mb-6">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <Link href="/contact">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                Contact Me
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
