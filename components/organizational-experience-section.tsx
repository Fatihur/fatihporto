"use client"

import { motion } from "framer-motion"
import { Users, Calendar, Award } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function OrganizationalExperienceSection() {
  const organizationalExperience = [
    {
      role: "Anggota & Ketua Departemen Media",
      organization: "Himpunan Mahasiswa Informatika",
      period: "2021 - Present",
      description:
        "Anggota departemen media. Ketua departemen media. Ketua divisi media pada ospek jurusan informatika 2021. Mentor program kerja kelas pemrograman. Teknisi program kerja Bengkel IT.",
    },
    {
      role: "Kepala Departemen Media",
      organization: "UKM Tapak Suci",
      period: "2022 - Present",
      description: "Mengelola konten media sosial dan dokumentasi kegiatan UKM Tapak Suci.",
    },
    {
      role: "Asisten Dosen",
      organization: "Mata Kuliah Pemrograman Dasar",
      period: "2022 - 2023",
      description:
        "Membantu mahasiswa dalam memahami konsep dasar pemrograman dan menyelesaikan tugas-tugas praktikum.",
    },
    {
      role: "Penanggung Jawab Desain",
      organization: "Hibah Indonesiana",
      period: "2023 - 2024",
      description: "Bertanggung jawab atas desain visual untuk proyek Hibah Indonesiana.",
    },
    {
      role: "Tim Pendamping",
      organization: "App Competition MXGP",
      period: "2023",
      description: "Mendampingi peserta dalam kompetisi pengembangan aplikasi MXGP.",
    },
  ]

  return (
    <section id="organizational-experience" className="py-20 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl font-bold inline-flex items-center gap-2">
          <Users className="h-8 w-8 text-purple-400" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-orange-500">
            Organizational Experience
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">My involvement in communities and organizations</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
        {organizationalExperience.map((org, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{org.role}</h3>
                    <div className="flex items-center text-purple-300">
                      <Award className="h-4 w-4 mr-2" />
                      {org.organization}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    {org.period}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-full"></CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
