"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { X, Calendar, Clock, MapPin } from "lucide-react"

export default function BookingModal({ isOpen, onClose, service }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    address: "",
    notes: "",
    firstName: "",
    lastName: "",
    phone: "",
  })

  if (!isOpen) return null

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Booking submitted:", formData)
    alert("Booking confirmed! The provider will contact you soon.")
    onClose()
  }

  const subtotal = service.price
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + tax

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <Card className="bg-card border border-border w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Book Service</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Step Indicator */}
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1">
                <div className={`h-2 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`} />
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Date & Time */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">When do you need this service?</h3>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-foreground">
                    Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="pl-10 bg-muted border-border text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-foreground">
                    Time
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                      className="pl-10 bg-muted border-border text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location & Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Service Location & Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground">
                    Service Address
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      placeholder="Enter the address where service will be performed"
                      className="pl-10 w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-foreground">
                    Additional Notes (Optional)
                  </Label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell the provider any special requirements..."
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Contact & Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Your Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="bg-muted border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="bg-muted border-border text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="+1 (555) 000-0000"
                    className="bg-muted border-border text-foreground"
                  />
                </div>

                {/* Price Breakdown */}
                <Card className="p-4 bg-muted border border-border space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span className="text-foreground font-semibold">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="text-foreground font-semibold">${tax}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary text-lg">${total}</span>
                  </div>
                </Card>

                <p className="text-xs text-muted-foreground text-center">
                  By booking, you agree to our Terms of Service. Payment is secure and held until service completion.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={handlePrevious}
                  variant="outline"
                  className="flex-1 border-border bg-transparent"
                >
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-accent"
                >
                  Continue
                </Button>
              ) : (
                <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-accent">
                  Confirm Booking
                </Button>
              )}
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
