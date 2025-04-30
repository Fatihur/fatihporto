import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { hash } from "bcryptjs" // Changed from bcrypt to bcryptjs

export async function GET() {
  try {
    const db = neon(process.env.DATABASE_URL!)

    // Hash the password "Admin123!"
    const hashedPassword = await hash("Admin123!", 10)

    // Update the admin user's password
    const result = await db`
      UPDATE users 
      SET password = ${hashedPassword} 
      WHERE email = 'admin@example.com' 
      RETURNING id, email, name
    `

    if (result.length === 0) {
      // If no user was updated, create the admin user
      const insertResult = await db`
        INSERT INTO users (email, password, name)
        VALUES ('admin@example.com', ${hashedPassword}, 'Admin')
        RETURNING id, email, name
      `

      return NextResponse.json({
        success: true,
        message: "Admin user created successfully",
        user: insertResult[0],
      })
    }

    return NextResponse.json({
      success: true,
      message: "Admin password reset successfully",
      user: result[0],
    })
  } catch (error) {
    console.error("Admin reset error:", error)
    return NextResponse.json(
      {
        success: false,
        message: `Failed to reset admin password: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}
