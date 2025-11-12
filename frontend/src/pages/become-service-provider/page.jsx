

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Users, TrendingUp, Clock, Award, Shield } from "lucide-react"

export default function BecomeServiceProviderPage() {
  const [activeTab, setActiveTab] = useState("benefits")

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: "Earn Extra Income",
      description: "Set your own rates and work on your schedule",
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Connect with Customers",
      description: "Build your clientele and grow your business",
    },
    {
      icon: <Clock className="w-8 h-8 text-accent" />,
      title: "Flexible Schedule",
      description: "Work whenever you want, as much as you want",
    },
    {
      icon: <Award className="w-8 h-8 text-accent" />,
      title: "Build Your Reputation",
      description: "Get reviews and ratings to establish credibility",
    },
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: "Secure Payments",
      description: "Get paid safely through our secure platform",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-accent" />,
      title: "Easy to Start",
      description: "Quick verification process to get you started",
    },
  ]

  const requirements = [
    "Be at least 18 years old",
    "Have a valid government ID",
    "Pass a background check",
    "Have insurance for your service (if applicable)",
    "Accept our terms and conditions",
  ]

  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your QuickKaam provider account",
    },
    {
      number: "2",
      title: "Verify Identity",
      description: "Complete ID verification and background check",
    },
    {
      number: "3",
      title: "Complete Profile",
      description: "Add your skills, experience, and service offerings",
    },
    {
      number: "4",
      title: "Start Earning",
      description: "Accept bookings and start providing services",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Become a Service Provider</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Turn your skills into income. Join thousands of professionals earning on QuickKaam
            </p>
            <Link to="/auth/signup?type=provider">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Start Your Journey Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {["benefits", "requirements", "process"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "benefits" && "Benefits"}
                {tab === "requirements" && "Requirements"}
                {tab === "process" && "How It Works"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "benefits" && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Join QuickKaam?</h2>
                <p className="text-lg text-muted-foreground">
                  Everything you need to build a successful service business
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, idx) => (
                  <Card key={idx} className="p-6 border border-border bg-card hover:shadow-lg transition-shadow">
                    <div className="mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </Card>
                ))}
              </div>

              <div className="bg-accent/10 border border-accent/30 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Average Earnings</h3>
                <p className="text-accent text-4xl font-bold mb-2">$500 - $2000/month</p>
                <p className="text-muted-foreground">Based on 2024 QuickKaam provider data</p>
              </div>
            </div>
          )}

          {activeTab === "requirements" && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Provider Requirements</h2>
                <p className="text-lg text-muted-foreground">What you need to get started</p>
              </div>

              <div className="max-w-2xl mx-auto space-y-4">
                {requirements.map((req, idx) => (
                  <Card key={idx} className="p-6 border border-border bg-card flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <p className="text-foreground text-lg">{req}</p>
                  </Card>
                ))}
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">Background Check</h3>
                <p className="text-muted-foreground mb-4">
                  All providers go through a thorough background check to ensure customer safety. This typically takes
                  1-3 business days.
                </p>
                <p className="text-muted-foreground">
                  We verify your identity, criminal history, and professional credentials (if applicable).
                </p>
              </div>
            </div>
          )}

          {activeTab === "process" && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How to Get Started</h2>
                <p className="text-lg text-muted-foreground">Four simple steps to start earning</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>

                    {idx < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-6 left-16 w-20 h-1 bg-primary/20"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center pt-8">
                <Link to="/auth/signup?type=provider">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-secondary">
                    Sign Up as Service Provider
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join our community of service providers and start building your business today
          </p>
          <Link to="/auth/signup?type=provider">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Apply Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

