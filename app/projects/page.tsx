import { Suspense } from "react"
import { NavBarDemo } from "@/components/ui/tubelight-navbar-demo"
import { ProjectsGrid } from "@/components/projects-grid"
import { ProjectFilter } from "@/components/project-filter"

export default function Projects() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <NavBarDemo />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my portfolio of work across different categories
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-4">Loading filters...</div>}>
          <ProjectFilter />
        </Suspense>

        <Suspense fallback={<div className="text-center py-8">Loading projects...</div>}>
          <ProjectsGrid />
        </Suspense>
      </div>
    </main>
  )
}
