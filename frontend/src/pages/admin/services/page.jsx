

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Flag, CheckCircle } from "lucide-react"

export default function AdminServicesPage() {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const services = [
    {
      id: 1,
      title: "Professional House Cleaning",
      provider: "Clean Sweep Services",
      category: "Cleaning",
      status: "approved",
      reports: 0,
      bookings: 45,
      rating: 4.9,
    },
    {
      id: 2,
      title: "Plumbing Repair Services",
      provider: "PlumberPro",
      category: "Plumbing",
      status: "pending",
      reports: 0,
      bookings: 0,
      rating: 0,
    },
    {
      id: 3,
      title: "Electrical Installation",
      provider: "ElectroFix",
      category: "Electrical",
      status: "flagged",
      reports: 2,
      bookings: 32,
      rating: 4.8,
    },
    {
      id: 4,
      title: "Interior Painting",
      provider: "ColorWorks",
      category: "Painting",
      status: "approved",
      reports: 0,
      bookings: 28,
      rating: 4.7,
    },
  ]

  const filteredServices = services.filter((s) => {
    if (filter !== "all" && s.status !== filter) return false
    if (searchTerm && !s.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-accent/10 text-accent"
      case "pending":
        return "bg-yellow-100/50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "flagged":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Service Moderation</h1>
        <p className="text-muted-foreground">Review and manage services on the platform</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by service or provider..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted border-border text-foreground"
          />
        </div>
        <div className="flex gap-2">
          {["all", "pending", "approved", "flagged"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize text-sm ${
                filter === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-semibold text-foreground">Service</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Provider</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
              <th className="text-center py-4 px-4 font-semibold text-foreground">Reports</th>
              <th className="text-center py-4 px-4 font-semibold text-foreground">Bookings</th>
              <th className="text-right py-4 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service) => (
              <tr key={service.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="py-4 px-4">
                  <div>
                    <p className="font-semibold text-foreground">{service.title}</p>
                    <p className="text-xs text-muted-foreground">{service.category}</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-foreground">{service.provider}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(service.status)}`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  {service.reports > 0 && (
                    <span className="inline-flex items-center gap-1 text-destructive font-bold">
                      <Flag size={14} />
                      {service.reports}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 text-center text-foreground">{service.bookings}</td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" className="border-border bg-transparent">
                      <Eye size={14} />
                    </Button>
                    {service.status !== "approved" && (
                      <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <CheckCircle size={14} />
                      </Button>
                    )}
                    {service.status !== "flagged" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                      >
                        <Flag size={14} />
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

