import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getProjects } from "@/lib/db"
import { ProjectsTable } from "@/components/admin/projects-table"
import { Plus } from "lucide-react"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <Link href="/admin/projects/new" passHref legacyBehavior>
          <a>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </a>
        </Link>
      </div>

      <ProjectsTable projects={projects} />
    </div>
  )
}
