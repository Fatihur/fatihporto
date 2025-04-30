import type { ReactNode } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-6">{children}</main>
      </div>
    </div>
  )
}
