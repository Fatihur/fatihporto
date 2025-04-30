import { ProjectForm } from "@/components/admin/project-form"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Project</h1>
        <p className="text-gray-400">Create a new project for your portfolio</p>
      </div>

      <ProjectForm />
    </div>
  )
}
