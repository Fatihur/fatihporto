import { neon } from "@neondatabase/serverless"
import { cache } from 'react'

// Gunakan satu instance koneksi
let db: any
export function getDbConnection() {
  if (!db) {
    db = neon(process.env.DATABASE_URL!)
  }
  return db
}

export type Project = {
  id: number
  title: string
  description: string
  image_url: string
  category: string
  tags: string[]
  demo_link: string
  github_link: string
  content?: string
  created_at: string
  updated_at: string
}

export const getProjects = cache(async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit
  try {
    const projects = await getDbConnection()`
      SELECT id, title, description, image_url, category, tags, demo_link, github_link
      FROM projects 
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    return projects as Project[]
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
})

export const getProjectsByCategory = cache(async (category: string, page = 1, limit = 10) => {
  const offset = (page - 1) * limit
  try {
    if (category === "all") {
      return getProjects(page, limit)
    }

    const projects = await getDbConnection()`
      SELECT id, title, description, image_url, category, tags, demo_link, github_link
      FROM projects 
      WHERE category = ${category} 
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    return projects as Project[]
  } catch (error) {
    console.error("Error fetching projects by category:", error)
    return []
  }
})

export const getProjectById = cache(async (id: number) => {
  try {
    const projects = await getDbConnection()`
      SELECT id, title, description, image_url, category, tags, demo_link, github_link, content
      FROM projects 
      WHERE id = ${id}
    `
    return projects[0] as Project | undefined
  } catch (error) {
    console.error("Error fetching project by id:", error)
    return undefined
  }
})

export async function createProject(project: Omit<Project, "id" | "created_at" | "updated_at">) {
  try {
    const result = await getDbConnection()`
      INSERT INTO projects (
        title, description, image_url, category, tags, demo_link, github_link, content
      ) VALUES (
        ${project.title}, 
        ${project.description}, 
        ${project.image_url}, 
        ${project.category}, 
        ${project.tags}, 
        ${project.demo_link}, 
        ${project.github_link}, 
        ${project.content || ""}
      ) RETURNING *
    `
    return { success: true, project: result[0] as Project }
  } catch (error) {
    console.error("Error creating project:", error)
    return { success: false, message: "Failed to create project" }
  }
}

export async function updateProject(id: number, project: Partial<Omit<Project, "id" | "created_at" | "updated_at">>) {
  try {
    // Build the SET part of the query dynamically based on provided fields
    const updates: any[] = []
    let setClause = ""

    if (project.title !== undefined) updates.push(`title = '${project.title}'`)
    if (project.description !== undefined) updates.push(`description = '${project.description}'`)
    if (project.image_url !== undefined) updates.push(`image_url = '${project.image_url}'`)
    if (project.category !== undefined) updates.push(`category = '${project.category}'`)
    if (project.tags !== undefined) updates.push(`tags = ARRAY[${project.tags.map((t) => `'${t}'`).join(", ")}]`)
    if (project.demo_link !== undefined) updates.push(`demo_link = '${project.demo_link}'`)
    if (project.github_link !== undefined) updates.push(`github_link = '${project.github_link}'`)
    if (project.content !== undefined) updates.push(`content = '${project.content}'`)

    updates.push(`updated_at = CURRENT_TIMESTAMP`)

    if (updates.length > 0) {
      setClause = `SET ${updates.join(", ")}`
    }

    const query = `
      UPDATE projects
      ${setClause}
      WHERE id = ${id}
      RETURNING *
    `

    const result = await getDbConnection().query(query)
    return { success: true, project: result.rows[0] as Project }
  } catch (error) {
    console.error("Error updating project:", error)
    return { success: false, message: "Failed to update project" }
  }
}

export async function deleteProject(id: number) {
  try {
    await getDbConnection()`
      DELETE FROM projects WHERE id = ${id}
    `
    return { success: true }
  } catch (error) {
    console.error("Error deleting project:", error)
    return { success: false, message: "Failed to delete project" }
  }
}
