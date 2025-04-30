"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Code, Database, Network, Palette } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import type { Project } from "@/lib/db"

export function ProjectsGrid() {
  const searchParams = useSearchParams()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      try {
        const categoryParam = searchParams.get("category")
        const url = categoryParam ? `/api/projects?category=${categoryParam}` : "/api/projects"

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        if (data.success) {
          setProjects(data.projects)
        } else {
          console.error("Error fetching projects:", data.message)
          setProjects([])
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [searchParams])

  const getIcon = (category: string) => {
    switch (category) {
      case "design":
        return <Palette className="w-4 h-4" />
      case "networking":
        return <Network className="w-4 h-4" />
      case "data":
        return <Database className="w-4 h-4" />
      case "programming":
        return <Code className="w-4 h-4" />
      default:
        return <Code className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold mb-2">No projects found</h3>
        <p className="text-gray-400">No projects match the selected category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <Card className="overflow-hidden bg-black/40 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
            <div className="relative overflow-hidden">
              <Image
                src={project.image_url}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "";
                  target.parentElement?.classList.add("bg-gradient-to-br", "from-purple-500/20", "to-pink-500/20");
                  target.parentElement?.classList.add("flex", "items-center", "justify-center");
                  const fallbackText = document.createElement("div");
                  fallbackText.className = "text-white/50 font-medium";
                  fallbackText.textContent = project.title;
                  target.parentElement?.appendChild(fallbackText);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex gap-2">
                  {project.demo_link && (
                    <Link href={project.demo_link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="secondary" className="bg-white/10 backdrop-blur-sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Demo
                      </Button>
                    </Link>
                  )}
                  {project.github_link && (
                    <Link href={project.github_link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="secondary" className="bg-white/10 backdrop-blur-sm">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-purple-500/30">
                {getIcon(project.category)}
              </div>
            </div>
            <CardContent className="p-4">
              <Link href={`/projects/${project.id}`}>
                <h3 className="text-xl font-bold mb-2 hover:text-purple-400 transition-colors">{project.title}</h3>
              </Link>
              <p className="text-gray-300 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline" className="border-purple-500/30 bg-purple-500/10">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10">
                    +{project.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
