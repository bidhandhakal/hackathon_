import { useState, useEffect } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { 
  Menu, 
  X, 
  Home, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut, 
  User,
  Bell,
  Search,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const DASHBOARD_LINKS = [
  { href: "/dashboard", icon: <Home size={20} />, label: "Overview" },
  { href: "/dashboard/profile", icon: <User size={20} />, label: "My Profile" },
  { href: "/dashboard/bookings", icon: <Calendar size={20} />, label: "Bookings" },
  { href: "/dashboard/services", icon: <Briefcase size={20} />, label: "My Services" },
  { href: "/dashboard/messages", icon: <MessageSquare size={20} />, label: "Messages" },
  { href: "/dashboard/settings", icon: <Settings size={20} />, label: "Settings" },
]

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate("/auth/login")
  }

  const getInitials = (name) => {
    if (!name) return "U"
    const names = name.split(" ")
    if (names.length >= 2) {
      return names[0].charAt(0) + names[1].charAt(0)
    }
    return name.charAt(0)
  }

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left Side - Logo & Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center text-background">
                <span className="font-bold text-sm">Q</span>
              </div>
              <span className="font-bold text-lg hidden sm:block">QuickKaam</span>
            </Link>
          </div>

          {/* Right Side - Search, Notifications, Profile */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-muted rounded-lg px-3 py-2 w-64">
              <Search size={16} className="text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.profilePhoto} />
                  <AvatarFallback className="bg-foreground text-background text-xs">
                    {getInitials(user?.fullname)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium">
                  {user?.fullname || "User"}
                </span>
                <ChevronDown size={16} className="hidden sm:block" />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      My Profile
                    </div>
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Settings size={16} />
                      Settings
                    </div>
                  </Link>
                  <hr className="my-2 border-border" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut size={16} />
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-card border-r border-border overflow-y-auto transition-transform duration-300 z-40 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Dashboard
              </h3>
            </div>
            
            {DASHBOARD_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive(link.href)
                    ? "bg-foreground text-background font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.icon}
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}

            <hr className="my-4 border-border" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden top-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

