import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NavBarDemo } from "@/components/ui/tubelight-navbar-demo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fatih - Porto",
  description: "A futuristic portfolio website with NFT-inspired design",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <NavBarDemo />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
