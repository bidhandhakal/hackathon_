

import { Card } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, AlertCircle, TrendingUp, FileText } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Users",
      value: "2,450",
      icon: <Users size={24} />,
      color: "bg-primary/10 text-primary",
      change: "+12%",
    },
    {
      label: "Active Services",
      value: "1,280",
      icon: <FileText size={24} />,
      color: "bg-accent/10 text-accent",
      change: "+8%",
    },
    {
      label: "Pending Reports",
      value: "23",
      icon: <AlertCircle size={24} />,
      color: "bg-yellow-100/50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      change: "+5",
    },
    {
      label: "Revenue (This Month)",
      value: "$45,230",
      icon: <TrendingUp size={24} />,
      color: "bg-green-100/50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      change: "+23%",
    },
  ]

  const chartData = [
    { date: "Mon", bookings: 120, revenue: 2400 },
    { date: "Tue", bookings: 150, revenue: 2800 },
    { date: "Wed", bookings: 180, revenue: 3200 },
    { date: "Thu", bookings: 165, revenue: 3100 },
    { date: "Fri", bookings: 210, revenue: 3800 },
    { date: "Sat", bookings: 240, revenue: 4200 },
    { date: "Sun", bookings: 190, revenue: 3600 },
  ]

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 border border-border bg-card space-y-4">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>{stat.icon}</div>
              <span className="text-sm font-bold text-accent">{stat.change}</span>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Chart */}
        <Card className="p-6 border border-border bg-card">
          <h3 className="text-lg font-bold text-foreground mb-4">Weekly Bookings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
              />
              <Line type="monotone" dataKey="bookings" stroke="var(--color-primary)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Chart */}
        <Card className="p-6 border border-border bg-card">
          <h3 className="text-lg font-bold text-foreground mb-4">Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
              />
              <Bar dataKey="revenue" fill="var(--color-accent)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 border border-border bg-card space-y-4">
        <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: "New user registered", time: "2 min ago", user: "John Doe" },
            { action: "Service flagged for review", time: "15 min ago", user: "Professional Cleaning" },
            { action: "Provider verification approved", time: "1 hour ago", user: "Jane Smith" },
            { action: "Dispute reported", time: "2 hours ago", user: "Booking #1245" },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="font-semibold text-foreground">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.user}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

