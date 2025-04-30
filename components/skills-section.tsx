"use client"

import { motion } from "framer-motion"
import { Code, Database, Network, Palette } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export function SkillsSection() {
  const skillCategories = [
    {
      category: "Programming",
      icon: <Code className="h-6 w-6" />,
      color: "from-purple-500 to-blue-500",
      skills: ["Python", "PHP", "C++", "JavaScript", "React", "Node.js", "Web Development"],
    },
    {
      category: "Data",
      icon: <Database className="h-6 w-6" />,
      color: "from-green-500 to-teal-500",
      skills: ["Data Analysis", "Microsoft Office", "Word", "Excel", "PowerPoint", "Data Entry", "Data Management"],
    },
    {
      category: "Networking",
      icon: <Network className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      skills: ["Network Troubleshooting", "Hardware & Software", "System Administration", "IT Support", "Helpdesk"],
    },
    {
      category: "Design",
      icon: <Palette className="h-6 w-6" />,
      color: "from-pink-500 to-red-500",
      skills: ["Graphic Design", "UI/UX Design", "Visual Documentation", "Presentation Design"],
    },
  ]

  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-500">
          Skills & Expertise
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">My technical skills and areas of expertise</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative bg-black/40 border border-purple-500/20 backdrop-blur-sm rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white`}>{category.icon}</div>
                <h3 className="text-xl font-bold text-white">{category.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-white/5 border border-purple-500/20 rounded-full text-sm text-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              <GlowingEffect
                variant="default"
                glow={true}
                disabled={false}
                className="rounded-xl"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
