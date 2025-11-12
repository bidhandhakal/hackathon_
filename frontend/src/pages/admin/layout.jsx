import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { Menu, X, BarChart3, Users, AlertCircle, Settings, FileText, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const adminLinks = [
    { href: "/admin", icon: <BarChart3 size={20} />, label: "Dashboard" },
    { href: "/admin/services", icon: <FileText size={20} />, label: "Services" },
    { href: "/admin/users", icon: <Users size={20} />, label: "Users" },
    { href: "/admin/reports", icon: <AlertCircle size={20} />, label: "Reports" },
    { href: "/admin/settings", icon: <Settings size={20} />, label: "Settings" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Navbar */}
      <nav className="bg-muted text-foreground border-b border-border sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-muted-foreground/10 rounded-lg">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-bold">QuickKaam Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                A
              </div>
              <span className="text-sm font-semibold">Admin User</span>
            </div>
            <Button
              variant="outline"
              className="border-border hover:bg-muted-foreground/10"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <aside
          className={`fixed md:relative w-64 h-full bg-card border-r border-border overflow-y-auto transition-all ${
            sidebarOpen ? "left-0" : "-left-full md:left-0"
          } z-40`}
        >
          <div className="p-4 space-y-2">
            {adminLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 transition-colors hover:text-primary"
                >
                  {link.icon}
                  {link.label}
                </button>
              </Link>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

