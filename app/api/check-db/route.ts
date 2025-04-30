import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  try {
    const db = neon(process.env.DATABASE_URL!)

    // Test the database connection
    const result = await db`SELECT NOW() as time`

    // Check if users table exists and has data
    const users = await db`SELECT COUNT(*) as count FROM users`

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      time: result[0].time,
      usersCount: users[0].count,
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        success: false,
        message: `Database connection failed: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}
