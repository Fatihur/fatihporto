"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function EducationSection() {
  const educationItems = [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of Technology",
      year: "2018 - 2020",
      description:
        "Specialized in Artificial Intelligence and Machine Learning with a focus on neural networks and deep learning algorithms.",
    },
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "State University",
      year: "2014 - 2018",
      description: "Graduated with honors. Focused on software development, database management, and network security.",
    },
  ]

  return (
    <section id="education" className="py-20 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl font-bold inline-flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-purple-400" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">Education</span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          My academic journey that has shaped my knowledge and expertise
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {educationItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
              <CardHeader className="pb-2">
                <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                <p className="text-purple-300">{item.institution}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  {item.year}
                </div>
                <p className="text-gray-300">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
