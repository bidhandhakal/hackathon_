

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, CheckCircle, AlertCircle, MessageSquare } from "lucide-react"

export default function BookingsPage() {
  const [filter, setFilter] = useState("all")

  const bookings = [
    {
      id: 1,
      service: "House Cleaning",
      customer: "John Doe",
      date: "Nov 15, 2025 - 2:00 PM",
      status: "completed",
      price: "$150",
      rating: 5,
      review: "Excellent service, very professional!",
    },
    {
      id: 2,
      service: "Deep Cleaning",
      customer: "Jane Smith",
      date: "Nov 18, 2025 - 10:00 AM",
      status: "confirmed",
      price: "$250",
    },
    {
      id: 3,
      service: "Window Cleaning",
      customer: "Mike Johnson",
      date: "Nov 20, 2025 - 3:00 PM",
      status: "pending",
      price: "$100",
    },
    {
      id: 4,
      service: "Post-Construction",
      customer: "Sarah Williams",
      date: "Nov 22, 2025 - 9:00 AM",
      status: "confirmed",
      price: "$350",
    },
  ]

  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true
    return b.status === filter
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={20} className="text-accent" />
      case "confirmed":
        return <Clock size={20} className="text-primary" />
      case "pending":
        return <AlertCircle size={20} className="text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-accent/10 text-accent"
      case "confirmed":
        return "bg-primary/10 text-primary"
      case "pending":
        return "bg-yellow-100/50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
        <p className="text-muted-foreground">View and manage your service bookings</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {["all", "pending", "confirmed", "completed"].map((status) => (
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

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card
            key={booking.id}
            className="p-6 border border-border bg-card hover:shadow-lg transition-shadow space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(booking.status)}
                  <h3 className="font-bold text-lg text-foreground">{booking.service}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(booking.status)}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className="text-muted-foreground">Customer: {booking.customer}</p>
                <p className="text-muted-foreground text-sm mt-1">📅 {booking.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary text-lg">{booking.price}</p>
              </div>
            </div>

            {booking.status === "completed" && booking.review && (
              <div className="bg-muted rounded-lg p-4 border border-border">
                <div className="flex gap-1 mb-2">
                  {[...Array(booking.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">{booking.review}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2 border-t border-border">
              <Button variant="outline" size="sm" className="border-border bg-transparent">
                <MessageSquare size={16} className="mr-2" />
                Message
              </Button>
              {booking.status === "pending" && (
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Accept
                </Button>
              )}
              {booking.status === "confirmed" && (
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-accent">
                  Mark Complete
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

