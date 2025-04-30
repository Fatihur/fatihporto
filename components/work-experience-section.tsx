"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, Building } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function WorkExperienceSection() {
  const workExperience = [
    {
      position: "Content Development",
      company: "PT. Amman Mineral Nusa Tenggara",
      period: "Internship",
      description:
        "Membuat konten untuk pelatihan karyawan dan pengembangan sumber daya manusia. Mendesain materi serta kebutuhan visual untuk Training Department. Melakukan fotografi untuk mendukung dokumentasi pelatihan dan kegiatan internal perusahaan.",
    },
    {
      position: "Teknisi",
      company: "PT. Telkom Indonesia Datel Sumbawa",
      period: "Internship",
      description:
        "Melakukan instalasi dan konfigurasi jaringan telekomunikasi. Melakukan troubleshooting jaringan untuk memastikan konektivitas yang optimal. Mendukung pemeliharaan dan perbaikan infrastruktur jaringan.",
    },
    {
      position: "Operator",
      company: "RR Digital",
      period: "Full-time",
      description:
        "Melayani konsumen dengan memberikan informasi terkait layanan percetakan. Menjalankan dan merawat peralatan percetakan agar tetap berfungsi dengan baik. Mengorganisir dan mengarsipkan file digital untuk keperluan cetak.",
    },
  ]

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

      <div className="space-y-6 max-w-4xl mx-auto">
        {workExperience.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{job.position}</h3>
                    <div className="flex items-center text-purple-300">
                      <Building className="h-4 w-4 mr-2" />
                      {job.company}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    {job.period}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{job.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
