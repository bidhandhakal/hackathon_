

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle, MessageSquare } from "lucide-react"

export default function AdminReportsPage() {
  const [filter, setFilter] = useState("open")

  const reports = [
    {
      id: 1,
      reportedBy: "John Doe",
      reportedUser: "Provider ABC",
      category: "Unprofessional Behavior",
      description: "Provider did not show up for the scheduled appointment",
      status: "open",
      priority: "high",
      createdAt: "1 hour ago",
    },
    {
      id: 2,
      reportedBy: "Jane Smith",
      reportedUser: "Service XYZ",
      category: "Quality Issues",
      description: "Service did not meet the expected quality standards",
      status: "investigating",
      priority: "medium",
      createdAt: "3 hours ago",
    },
    {
      id: 3,
      reportedBy: "Mike Johnson",
      reportedUser: "Customer Profile",
      category: "Inappropriate Content",
      description: "User profile contains inappropriate photos",
      status: "resolved",
      priority: "high",
      createdAt: "Yesterday",
    },
    {
      id: 4,
      reportedBy: "Sarah Williams",
      reportedUser: "Provider DEF",
      category: "Payment Issues",
      description: "Provider requesting off-platform payment",
      status: "open",
      priority: "critical",
      createdAt: "2 hours ago",
    },
  ]

  const filteredReports = reports.filter((r) => {
    if (filter === "all") return true
    return r.status === filter
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-destructive/10 text-destructive"
      case "high":
        return "bg-orange-100/50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
      case "medium":
        return "bg-yellow-100/50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-red-100/50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "investigating":
        return "bg-yellow-100/50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "resolved":
        return "bg-accent/10 text-accent"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Reports</h1>
        <p className="text-muted-foreground">Manage complaints and reports from users</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {["all", "open", "investigating", "resolved"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg transition-colors capitalize ${
              filter === status
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-muted"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card
            key={report.id}
            className="p-6 border border-border bg-card hover:shadow-lg transition-shadow space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle size={20} className="text-destructive flex-shrink-0" />
                  <h3 className="font-bold text-lg text-foreground">{report.category}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getPriorityColor(report.priority)}`}
                  >
                    {report.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  <span className="font-semibold text-foreground">{report.reportedBy}</span> reported{" "}
                  <span className="font-semibold text-foreground">{report.reportedUser}</span>
                </p>
                <p className="text-foreground mb-3">{report.description}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold capitalize whitespace-nowrap ${getStatusColor(report.status)}`}
              >
                {report.status}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground">{report.createdAt}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-border bg-transparent">
                  <MessageSquare size={14} className="mr-1" />
                  Review
                </Button>
                {report.status === "open" && (
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-accent">
                    <CheckCircle size={14} className="mr-1" />
                    Investigate
                  </Button>
                )}
                {report.status === "investigating" && (
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Resolve
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

