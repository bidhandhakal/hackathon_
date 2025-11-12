"use client"

import { useState } from "react"
import { X, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotificationCenter({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "booking",
      title: "Booking Confirmed",
      message: "Your booking with John Doe has been confirmed for tomorrow at 2 PM",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      type: "message",
      title: "New Message",
      message: "Sarah sent you a message about your service",
      time: "4 hours ago",
      unread: true,
    },
    {
      id: 3,
      type: "rating",
      title: "New Review",
      message: "You received a 5-star review from Alex M.",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 4,
      type: "alert",
      title: "Special Offer",
      message: "Get 20% off on your next booking!",
      time: "2 days ago",
      unread: false,
    },
  ])

  const handleMarkRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case "booking":
        return "bg-accent/10 border-accent/30"
      case "message":
        return "bg-primary/10 border-primary/30"
      case "rating":
        return "bg-green-100 dark:bg-green-900/30 border-green-300/30"
      default:
        return "bg-muted border-border"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}>
      <div
        className="fixed right-0 top-0 h-screen w-full max-w-sm bg-card border-l border-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {notifications.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${getNotificationColor(notification.type)} ${
                  notification.unread ? "ring-1 ring-accent" : ""
                }`}
                onClick={() => handleMarkRead(notification.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{notification.title}</h3>
                      {notification.unread && <span className="w-2 h-2 bg-accent rounded-full"></span>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <span className="text-xs text-muted-foreground mt-2 block">{notification.time}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(notification.id)
                    }}
                    className="p-1 hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="border-t border-border p-4">
            <Button
              onClick={() => setNotifications([])}
              variant="outline"
              className="w-full border-border text-foreground"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
