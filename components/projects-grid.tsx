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
import { Skeleton } from "@/components/ui/skeleton"

const ImageWithFallback = ({ src, alt, category, demoLink, githubLink, onDemoClick, onGithubClick }: { 
  src: string; 
  alt: string; 
  category: string;
  demoLink?: string;
  githubLink?: string;
  onDemoClick?: (e: React.MouseEvent) => void;
  onGithubClick?: (e: React.MouseEvent) => void;
}) => {
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden group">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="flex gap-2 w-full">
          {demoLink && (
            <Button 
              size="sm" 
              className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
              onClick={onDemoClick}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Demo
            </Button>
          )}
          {githubLink && (
            <Button 
              size="sm" 
              className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
              onClick={onGithubClick}
            >
              <Github className="h-3 w-3 mr-1" />
              Code
            </Button>
          )}
        </div>
      </div>
      <div className="absolute top-3 right-3">
        <Badge className={`bg-gradient-to-r ${
          category === "design" ? "from-pink-600 to-purple-600" :
          category === "networking" ? "from-blue-600 to-cyan-600" :
          category === "data" ? "from-green-600 to-teal-600" :
          "from-purple-600 to-pink-600"
        } text-white border-0 text-xs`}>
          {category}
        </Badge>
      </div>
    </div>
  )
}

export function ProjectsGrid() {
  const searchParams = useSearchParams()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const limit = 6

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      try {
        const categoryParam = searchParams.get("category")
        const url = categoryParam 
          ? `/api/projects?category=${categoryParam}&page=${page}&limit=${limit}`
          : `/api/projects?page=${page}&limit=${limit}`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        if (data.success) {
          if (page === 1) {
            setProjects(data.projects)
          } else {
            setProjects(prev => [...prev, ...data.projects])
          }
          setHasMore(data.projects.length === limit)
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
  }, [searchParams, page])

  // Reset page when filter changes
  useEffect(() => {
    setPage(1)
  }, [searchParams])

  const loadMore = () => {
    setPage(prev => prev + 1)
  }

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

  const handleDemoClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleGithubClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (loading && projects.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-6 lg:px-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-black/40 border border-purple-500/20 backdrop-blur-sm">
            <Skeleton className="aspect-[4/3] w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/projects/${project.id}`}>
              <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-colors cursor-pointer">
                <ImageWithFallback
                  src={project.image_url}
                  alt={project.title}
                  category={project.category}
                  demoLink={project.demo_link}
                  githubLink={project.github_link}
                  onDemoClick={project.demo_link ? (e) => handleDemoClick(e, project.demo_link!) : undefined}
                  onGithubClick={project.github_link ? (e) => handleGithubClick(e, project.github_link!) : undefined}
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-1">{project.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mt-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="outline" className="border-purple-500/30 bg-purple-500/10 text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10 text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={loadMore}
            variant="outline"
            className="border-purple-500/30 hover:border-purple-500/50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  )
}
