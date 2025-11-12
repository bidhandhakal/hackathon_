

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Shield, XCircle } from "lucide-react"

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      type: "Provider",
      status: "active",
      joined: "3 months ago",
      bookings: 45,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      type: "Customer",
      status: "active",
      joined: "2 months ago",
      bookings: 12,
      rating: 0,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      type: "Provider",
      status: "suspended",
      joined: "5 months ago",
      bookings: 28,
      rating: 3.2,
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      type: "Customer",
      status: "active",
      joined: "1 month ago",
      bookings: 5,
      rating: 0,
    },
  ]

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground">View and manage platform users</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-muted border-border text-foreground"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-semibold text-foreground">User</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Type</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
              <th className="text-center py-4 px-4 font-semibold text-foreground">Joined</th>
              <th className="text-center py-4 px-4 font-semibold text-foreground">Bookings</th>
              <th className="text-right py-4 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="py-4 px-4">
                  <div>
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                    {user.type}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.status === "active" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-center text-foreground">{user.joined}</td>
                <td className="py-4 px-4 text-center text-foreground">{user.bookings}</td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" className="border-border bg-transparent">
                      <Eye size={14} />
                    </Button>
                    {user.status === "active" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                      >
                        <XCircle size={14} />
                      </Button>
                    )}
                    {user.status === "suspended" && (
                      <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Shield size={14} />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

