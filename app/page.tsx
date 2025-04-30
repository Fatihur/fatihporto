"use client"
import { NavBarDemo } from "@/components/ui/tubelight-navbar-demo"
import { HeroSection } from "@/components/hero-section"
import { EducationTimeline } from "@/components/education-timeline"
import { WorkExperienceSection } from "@/components/work-experience-section"
import { OrganizationalExperienceSection } from "@/components/organizational-experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <NavBarDemo />
      <div className="container mx-auto px-4 py-8">
        <HeroSection />
        <EducationTimeline />
        <WorkExperienceSection />
        <OrganizationalExperienceSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </main>
  )
}
