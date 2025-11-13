import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, MapPin, Calendar, Users, CheckCircle, MessageSquare, Share2, Heart, Clock, Shield } from "lucide-react"
import BookingModal from "@/components/booking-modal"

const SERVICE_DETAILS = {
  1: {
    id: 1,
    title: "Professional House Cleaning",
    provider: "Clean Sweep Services",
    rating: 4.9,
    reviews: 256,
    price: 150,
    category: "Cleaning",
    location: "2.3 km away",
    address: "123 Main St, Downtown",
    image: "/house-cleaning.jpg",
    images: ["/house-cleaning.jpg", "/placeholder.svg?key=hu9wm", "/placeholder.svg?key=3k0q9"],
    availability: "Available today",
    verified: true,
    responseTime: "< 1 hour",
    completedJobs: 512,
    description:
      "Professional residential and commercial cleaning services. I pride myself on attention to detail and customer satisfaction. My service includes deep cleaning, regular maintenance, and specialized services.",
    services: [
      "Regular House Cleaning",
      "Deep Cleaning",
      "Move-in/Move-out Cleaning",
      "Window Cleaning",
      "Post-Construction Cleaning",
    ],
    about:
      "I've been in the cleaning business for 8 years with a perfect track record. My team is trained, insured, and equipped with eco-friendly products. We treat your home with the utmost care and respect.",
    highlights: [
      { icon: <CheckCircle size={20} />, text: "Background Verified" },
      { icon: <Shield size={20} />, text: "Insured & Bonded" },
      { icon: <Users size={20} />, text: "512 Completed Jobs" },
      { icon: <Clock size={20} />, text: "Quick Response" },
    ],
  },
}

export default function ServiceDetailPage() {
  const { id } = useParams()
  const [showBooking, setShowBooking] = useState(false)
  const [mainImage, setMainImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const service = SERVICE_DETAILS[id]

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Service not found</h1>
          <Link to="/explore">
            <Button className="bg-primary text-primary-foreground hover:bg-accent mt-4">Back to Services</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link to="/explore" className="hover:text-foreground">
            Services
          </Link>
          <span>/</span>
          <span className="text-foreground">{service.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-border overflow-hidden">
              <div className="aspect-square relative overflow-hidden bg-muted">
                <img
                  src={service.images[mainImage] || "/placeholder.svg"}
                  alt={service.title}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 p-3 bg-white/90 hover:bg-white rounded-full transition-colors z-10"
                >
                  <Heart
                    size={24}
                    className={isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"}
                  />
                </button>
              </div>

              <div className="flex gap-2 p-4 bg-card border-t border-border">
                {service.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      mainImage === idx ? "border-primary" : "border-border"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${service.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </Card>

            {/* Service Info */}
            <div className="space-y-4">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{service.title}</h1>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-border bg-transparent">
                      <Share2 size={16} />
                      Share
                    </Button>
                  </div>
                </div>
                <p className="text-lg text-primary font-semibold">${service.price}</p>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.floor(service.rating) ? "fill-accent text-accent" : "text-muted-foreground"}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-foreground">{service.rating}</span>
                  <span className="text-muted-foreground">({service.reviews} reviews)</span>
                </div>
              </div>

              {/* Provider Info */}
              <Card className="p-6 border border-border bg-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{service.provider}</h2>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                      <MapPin size={16} />
                      {service.address}
                    </div>
                  </div>
                  {service.verified && (
                    <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <CheckCircle size={14} />
                      Verified
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
                  {service.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="text-primary">{h.icon}</div>
                      <span className="text-sm text-foreground">{h.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-3">
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-accent">
                    <MessageSquare size={16} className="mr-2" />
                    Message
                  </Button>
                </div>
              </Card>

              {/* Description */}
              <Card className="p-6 border border-border bg-card space-y-4">
                <h3 className="text-xl font-bold text-foreground">About this Service</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </Card>

              {/* Services Offered */}
              <Card className="p-6 border border-border bg-card space-y-4">
                <h3 className="text-xl font-bold text-foreground">Services Included</h3>
                <ul className="space-y-2">
                  {service.services.map((svc, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-accent flex-shrink-0" />
                      <span className="text-foreground">{svc}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Provider Bio */}
              <Card className="p-6 border border-border bg-card space-y-4">
                <h3 className="text-xl font-bold text-foreground">About the Provider</h3>
                <p className="text-muted-foreground leading-relaxed">{service.about}</p>
              </Card>

              {/* Reviews Section */}
              <Card className="p-6 border border-border bg-card space-y-4">
                <h3 className="text-xl font-bold text-foreground">Recent Reviews</h3>
                <div className="space-y-4">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="border-b border-border pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">Customer {idx + 1}</p>
                            <p className="text-xs text-muted-foreground">2 weeks ago</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < 5 ? "fill-accent text-accent" : "text-muted-foreground"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">Great service, very professional and on time!</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 border border-border bg-card sticky top-24 space-y-4">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Price</p>
                <p className="text-4xl font-bold text-primary">${service.price}</p>
                <p className="text-xs text-muted-foreground mt-1">per job</p>
              </div>

              <Button
                onClick={() => setShowBooking(true)}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-accent h-12"
              >
                <Calendar size={18} className="mr-2" />
                Book Now
              </Button>

              <div className="space-y-3 py-4 border-y border-border">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Clock size={16} className="text-primary" />
                  <span>Response: {service.responseTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle size={16} className="text-accent" />
                  <span>Verified Seller</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Users size={16} className="text-primary" />
                  <span>{service.completedJobs} jobs completed</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Your payment is secure. We hold your money until you confirm the service is complete.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} service={service} />
    </div>
  )
}
