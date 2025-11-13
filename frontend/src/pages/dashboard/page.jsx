import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, TrendingUp, AlertCircle, Clock, CheckCircle, Calendar } from "lucide-react"

export default function DashboardOverview() {
  const stats = [
    {
      label: "Total Bookings",
      value: "24",
      icon: <Calendar size={24} />,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Total Earned",
      value: "$2,480",
      icon: <TrendingUp size={24} />,
      color: "bg-accent/10 text-accent",
    },
    {
      label: "Rating",
      value: "4.9",
      icon: <Star size={24} />,
      color: "bg-accent/10 text-accent",
    },
    {
      label: "Completion Rate",
      value: "98%",
      icon: <CheckCircle size={24} />,
      color: "bg-primary/10 text-primary",
    },
  ]

  const upcomingBookings = [
    {
      id: 1,
      service: "House Cleaning",
      customer: "John Doe",
      date: "Today, 2:00 PM",
      status: "confirmed",
      price: "$150",
    },
    {
      id: 2,
      service: "Deep Cleaning",
      customer: "Jane Smith",
      date: "Tomorrow, 10:00 AM",
      status: "pending",
      price: "$250",
    },
  ]

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground">Here's what's happening with your account today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 border border-border bg-card space-y-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <Card className="p-6 border border-amber-200/50 bg-amber-50 dark:bg-amber-950/20 space-y-3">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <p className="font-semibold text-amber-900 dark:text-amber-100">Profile Update Recommended</p>
        </div>
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Add a profile photo to increase your booking rate by 30%
        </p>
        <Link to="/dashboard/profile">
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
            Update Profile
          </Button>
        </Link>
      </Card>

      {/* Upcoming Bookings */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Upcoming Bookings</h2>
          <Link to="/dashboard/bookings">
            <Button variant="outline" className="border-border bg-transparent">
              View All
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {upcomingBookings.map((booking) => (
            <Card key={booking.id} className="p-4 border border-border bg-card hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{booking.service}</h3>
                  <p className="text-sm text-muted-foreground">Customer: {booking.customer}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Clock size={14} />
                    {booking.date}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <p className="font-bold text-primary">{booking.price}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/dashboard/services/new">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-accent h-12">
            + Add New Service
          </Button>
        </Link>
        <Link to="/dashboard/messages">
          <Button variant="outline" className="w-full border-border h-12 bg-transparent">
            View Messages (3)
          </Button>
        </Link>
        <Link to="/dashboard/profile">
          <Button variant="outline" className="w-full border-border h-12 bg-transparent">
            Edit Profile
          </Button>
        </Link>
      </div>
    </div>
  )
}

