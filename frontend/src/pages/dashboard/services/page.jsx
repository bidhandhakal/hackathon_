

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, Edit, MoreVertical } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Professional House Cleaning",
      category: "Cleaning",
      price: "$150",
      rating: 4.9,
      reviews: 256,
      status: "active",
      bookings: 45,
      earnings: "$6,750",
    },
    {
      id: 2,
      title: "Deep Carpet Cleaning",
      category: "Cleaning",
      price: "$200",
      rating: 4.8,
      reviews: 142,
      status: "active",
      bookings: 32,
      earnings: "$6,400",
    },
    {
      id: 3,
      title: "Window & Gutter Cleaning",
      category: "Cleaning",
      price: "$120",
      rating: 4.7,
      reviews: 89,
      status: "inactive",
      bookings: 15,
      earnings: "$1,800",
    },
  ]

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Link to="/dashboard/services/new">
          <Button className="bg-primary text-primary-foreground hover:bg-accent">+ Add Service</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <Card key={service.id} className="p-6 border border-border bg-card">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Service Info */}
              <div className="md:col-span-2 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-foreground">{service.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      service.status === "active" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
                <p className="text-muted-foreground">{service.category}</p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-accent text-accent" />
                    <span className="font-semibold text-foreground">{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Bookings</p>
                  <p className="text-2xl font-bold text-foreground">{service.bookings}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Earnings</p>
                  <p className="text-lg font-bold text-primary">{service.earnings}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 justify-center">
                <Link to={`/dashboard/services/${service.id}/edit`}>
                  <Button variant="outline" size="sm" className="w-full border-border bg-transparent">
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="w-full border-border bg-transparent">
                  <MoreVertical size={16} className="mr-2" />
                  More
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

