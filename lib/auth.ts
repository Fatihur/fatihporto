import { neon } from "@neondatabase/serverless"
import { compare, hash } from "bcryptjs"
import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const db = neon(process.env.DATABASE_URL!)

export async function loginUser(email: string, password: string) {
  try {
    const result = await db`
      SELECT id, email, password, name FROM users WHERE email = ${email}
    `
    if (!result || result.length === 0) {
      return { success: false, message: "Invalid email or password" }
    }
    const user = result[0]
    // Bandingkan password secara langsung (plain text)
    if (password !== user.password) {
      return { success: false, message: "Invalid email or password" }
    }
    // Buat JWT token
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      name: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET || "default_secret"))
    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    })
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An error occurred during login" }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token")
  return { success: true }
}

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value
    if (!token) {
      return null
    }
    const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || "default_secret"))
    return verified.payload as { id: number; email: string; name: string }
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}

export async function registerUser(email: string, password: string, name: string) {
  try {
    const hashedPassword = await hash(password, 10)
    const result = await db`
      INSERT INTO users (email, password, name)
      VALUES (${email}, ${hashedPassword}, ${name})
      RETURNING id, email, name
    `
    return { success: true, user: result[0] }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "An error occurred during registration" }
  }
}
