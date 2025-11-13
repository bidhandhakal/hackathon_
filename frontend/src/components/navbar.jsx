import { Link } from "react-router-dom"
import { useState } from "react"
import { Menu, X, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import NotificationCenter from "@/components/notification-center"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 font-bold text-2xl text-primary">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                Q
              </div>
              <span>QuickKaam</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/explore" className="text-foreground hover:text-primary transition-colors">
                Find Services
              </Link>
              <Link to="/become-service-provider" className="text-foreground hover:text-primary transition-colors">
                Become Provider
              </Link>
            </div>

            {/* Right side actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsNotificationOpen(true)}
                className="relative p-2 text-foreground hover:text-primary transition-colors"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                    U
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg">
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted first:rounded-t-lg"
                    >
                      My Profile
                    </Link>
                    <Link to="/dashboard/bookings" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                      My Bookings
                    </Link>
                    <Link to="/dashboard/messages" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                      Messages
                    </Link>
                    <button className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted last:rounded-b-lg">
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <Link to="/auth/login">
                <Button className="bg-primary text-primary-foreground hover:bg-accent">Sign In</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <Link
                to="/explore"
                className="block px-4 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Find Services
              </Link>
              <Link
                to="/become-service-provider"
                className="block px-4 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Become Provider
              </Link>
              <Link to="/auth/login" className="block" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground">Sign In</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Notification Center */}
      <NotificationCenter isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
    </>
  )
}
