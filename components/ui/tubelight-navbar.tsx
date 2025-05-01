"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Tentukan tab aktif berdasarkan path URL
  const activeTab = items.find(item => pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url)))?.name || items[0].name

  if (!mounted) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-2 md:gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg pointer-events-auto min-w-[200px]">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              role="button"
              aria-label={item.name}
              className={cn(
                "relative cursor-pointer text-sm font-semibold transition-all duration-300",
                "flex items-center justify-center",
                "px-4 md:px-6 py-2",
                "rounded-full min-w-[40px] md:min-w-[80px]",
                "text-foreground/80 hover:text-primary hover:bg-primary/5",
                isActive && "bg-muted text-primary",
                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="hidden md:inline whitespace-nowrap">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={20} strokeWidth={2} />
                </span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 25
                  }}
                >
                  <motion.div 
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-primary rounded-t-full"
                    layoutId="lamp-line"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 25
                    }}
                  >
                    <div className="absolute w-10 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-6 h-6 bg-primary/20 rounded-full blur-md -top-1 left-0" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-1" />
                  </motion.div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
} 