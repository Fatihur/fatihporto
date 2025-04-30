import { ProjectForm } from "@/components/admin/project-form"
import { getProjectById } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function EditProjectPage(props: { params: { id: string } }) {
  const { params } = props;
  const id = Number.parseInt(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-gray-400">Update your portfolio project</p>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
