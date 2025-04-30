"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formData)
    alert("Thank you for your message! I'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black/40 border border-purple-500/20 backdrop-blur-sm rounded-xl p-6 md:p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Anda</Label>
            <Input
              id="name"
              name="name"
              placeholder="Fatihur Royyan"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-black/50 border-purple-500/20 focus:border-purple-500/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Anda</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="fatihur17@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-black/50 border-purple-500/20 focus:border-purple-500/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subjek</Label>
          <Input
            id="subject"
            name="subject"
            placeholder="Contoh: Kolaborasi Project"
            value={formData.subject}
            onChange={handleChange}
            required
            className="bg-black/50 border-purple-500/20 focus:border-purple-500/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Pesan</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tulis pesan Anda di sini..."
            value={formData.message}
            onChange={handleChange}
            required
            className="min-h-[150px] bg-black/50 border-purple-500/20 focus:border-purple-500/50"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
        >
          <Send className="h-4 w-4 mr-2" />
          Send Message
        </Button>
      </form>
    </motion.div>
  )
}
