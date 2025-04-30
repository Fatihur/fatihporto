import { type NextRequest, NextResponse } from "next/server"
import { getProjects, getProjectsByCategory, createProject } from "@/lib/db"
import { getUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "6")

    let projects
    if (category) {
      projects = await getProjectsByCategory(category, page, limit)
    } else {
      projects = await getProjects(page, limit)
    }

    return NextResponse.json({ success: true, projects })
  } catch (error) {
    console.error("Get projects API error:", error)
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const projectData = await request.json()

    // Validate required fields
    if (!projectData.title || !projectData.description || !projectData.category) {
      return NextResponse.json(
        { success: false, message: "Title, description, and category are required" },
        { status: 400 },
      )
    }

    const result = await createProject(projectData)

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, project: result.project })
  } catch (error) {
    console.error("Create project API error:", error)
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 })
  }
}
