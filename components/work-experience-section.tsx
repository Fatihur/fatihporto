"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, Calendar, Building, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function WorkExperienceSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const workExperience = [
    {
      position: "Content Development",
      company: "PT. Amman Mineral Nusa Tenggara",
      period: "Internship",
      description: [
        "Membuat konten untuk pelatihan karyawan dan pengembangan sumber daya manusia",
        "Mendesain materi serta kebutuhan visual untuk Training Department",
        "Melakukan fotografi untuk mendukung dokumentasi pelatihan dan kegiatan internal perusahaan"
      ],
    },
    {
      position: "Teknisi",
      company: "PT. Telkom Indonesia Datel Sumbawa",
      period: "Internship",
      description: [
        "Melakukan instalasi dan konfigurasi jaringan telekomunikasi",
        "Melakukan troubleshooting jaringan untuk memastikan konektivitas yang optimal",
        "Mendukung pemeliharaan dan perbaikan infrastruktur jaringan"
      ],
    },
    {
      position: "Operator",
      company: "RR Digital",
      period: "Full-time",
      description: [
        "Melayani konsumen dengan memberikan informasi terkait layanan percetakan",
        "Menjalankan dan merawat peralatan percetakan agar tetap berfungsi dengan baik",
        "Mengorganisir dan mengarsipkan file digital untuk keperluan cetak"
      ],
    },
  ]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      }
    })
  }

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % workExperience.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + workExperience.length) % workExperience.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  return (
    <section id="work-experience" className="py-20 relative">
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl font-bold inline-flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-purple-400" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-green-500">
            Work Experience
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">My professional journey across various roles and industries</p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-4">
        <div className="overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">{workExperience[currentIndex].position}</h3>
                      <div className="flex items-center text-purple-300">
                        <Building className="h-4 w-4 mr-2" />
                        {workExperience[currentIndex].company}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      {workExperience[currentIndex].period}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    {workExperience[currentIndex].description.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-purple-500/30 bg-black/50 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex gap-2">
            {workExperience.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-purple-400 w-6" : "bg-purple-400/30 hover:bg-purple-400/50"
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-purple-500/30 bg-black/50 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
