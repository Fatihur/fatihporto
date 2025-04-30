import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getProjects } from "@/lib/db"
import { FolderKanban, Users } from "lucide-react"

export default async function AdminDashboard() {
  const projects = await getProjects()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400">Welcome to your portfolio admin panel</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Total Projects</CardTitle>
              <CardDescription>Number of projects in your portfolio</CardDescription>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-full">
              <FolderKanban className="h-6 w-6 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Users</CardTitle>
              <CardDescription>Number of admin users</CardDescription>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-full">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Your most recently added projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="flex items-center justify-between border-b border-gray-800 pb-2">
                <div>
                  <div className="font-medium">{project.title}</div>
                  <div className="text-sm text-gray-400">{project.category}</div>
                </div>
                <div className="text-sm text-gray-400">{new Date(project.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
