import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { Menu, X, Home, Briefcase, Calendar, MessageSquare, Settings, LogOut, Heart } from "lucide-react"

const DASHBOARD_LINKS = [
  { href: "/dashboard", icon: <Home size={20} />, label: "Overview" },
  { href: "/dashboard/profile", icon: <Home size={20} />, label: "My Profile" },
  { href: "/dashboard/bookings", icon: <Calendar size={20} />, label: "My Bookings" },
  { href: "/dashboard/services", icon: <Briefcase size={20} />, label: "My Services" },
  { href: "/dashboard/messages", icon: <MessageSquare size={20} />, label: "Messages" },
  { href: "/dashboard/favorites", icon: <Heart size={20} />, label: "Favorites" },
  { href: "/dashboard/settings", icon: <Settings size={20} />, label: "Settings" },
]

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-full">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-20 left-4 z-40 p-2 bg-card border border-border rounded-lg"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed md:relative w-64 h-[calc(100vh-64px)] bg-card border-r border-border overflow-y-auto transition-all ${
            sidebarOpen ? "left-0" : "-left-full md:left-0"
          } z-30`}
        >
          <div className="p-6 space-y-2">
            {DASHBOARD_LINKS.map((link) => (
              <Link key={link.href} to={link.href}>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  {link.icon}
                  {link.label}
                </button>
              </Link>
            ))}

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors mt-6">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-0 pt-20 md:pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

