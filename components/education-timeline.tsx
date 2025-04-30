"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar } from "lucide-react"

export function EducationTimeline() {
  const educationItems = [
    {
      degree: "Informatika",
      institution: "Universitas Teknologi Sumbawa",
      year: "2021 - 2025",
      description: "IPK 3.78 / 4.00",
    },
    {
      degree: "Teknik Komputer Jaringan",
      institution: "SMK Negeri 1 Sumbawa",
      year: "2017 - 2020",
      description: "",
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

      <div className="max-w-4xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>

        {/* Timeline items */}
        <div className="space-y-12">
          {educationItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-1/2 px-6 flex flex-col justify-center ${index % 2 === 1 ? "text-right items-end" : "text-left items-start"}`}>
                <div className="flex items-center text-sm text-gray-400 mt-2 gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{item.year}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                <p className="text-purple-300">{item.institution}</p>
                <p className="text-gray-300 mt-2">{item.description}</p>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-purple-500 z-10"></div>

              <div className="w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
