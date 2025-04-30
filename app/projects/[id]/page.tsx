import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { NavBarDemo } from "@/components/ui/tubelight-navbar-demo"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, ExternalLink, Github } from "lucide-react"
import { getProjectById } from "@/lib/db"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    return {
      title: "Project Not Found",
    }
  }

  const project = await getProjectById(id)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage(props: ProjectPageProps) {
  const { params } = props
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    notFound()
  }

  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <NavBarDemo />

      <div className="container mx-auto px-4 py-16">
        <Link href="/projects" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-purple-500/30 bg-purple-500/10">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center text-gray-400 mb-6">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(project.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="bg-black/40 border border-purple-500/20 backdrop-blur-sm rounded-lg p-6">
              <div className="prose prose-invert max-w-none">
                {project.content ? (
                  <div dangerouslySetInnerHTML={{ __html: project.content.replace(/\n/g, "<br />") }} />
                ) : (
                  <p>{project.description}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-black/40 border border-purple-500/20 backdrop-blur-sm rounded-lg overflow-hidden">
              <Image
                src={project.image_url}
                alt={project.title}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>

            <div className="bg-black/40 border border-purple-500/20 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-bold">Project Links</h3>

              <div className="space-y-3">
                {project.demo_link && (
                  <Link href={project.demo_link} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Demo
                    </Button>
                  </Link>
                )}

                {project.github_link && (
                  <Link href={project.github_link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full border-purple-500/20 hover:bg-purple-500/10">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
