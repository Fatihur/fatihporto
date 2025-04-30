import { type NextRequest, NextResponse } from "next/server"
import { loginUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    console.log("Login attempt for:", email)

    const result = await loginUser(email, password)

    if (!result.success) {
      console.log("Login failed:", result.message)
      return NextResponse.json({ success: false, message: result.message }, { status: 401 })
    }

    console.log("Login successful for:", email)
    return NextResponse.json({ success: true, user: result.user })
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: `An error occurred during login: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}
