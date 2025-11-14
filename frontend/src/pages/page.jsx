import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, CheckCircle, Users, TrendingUp, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-left-10 duration-700">
              <h1 className="text-4xl md:text-5xl font-bold text-balance text-foreground">
                Get Work Done <span className="text-primary">Today</span>
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Connect with thousands of skilled professionals. Hiring has
                never been this easy. From home repairs to freelance services,
                QuickKaam connects you with trustworthy experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/explore">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-accent w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Find Services <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/become-service-provider">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-border hover:bg-muted shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Become a Provider
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center animate-in fade-in-50 slide-in-from-right-10 duration-700">
              <div className="w-full h-80 bg-gradient-to-br from-primary/10 to-accent/5 rounded-3xl flex items-center justify-center border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-xl font-semibold text-primary">
                    Connect & Get Work Done
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose QuickKaam?
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for trustworthy service connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle className="w-8 h-8 text-primary" />,
                title: "Verified Professionals",
                description:
                  "All service providers are verified and background checked for your peace of mind.",
              },
              {
                icon: <Star className="w-8 h-8 text-accent" />,
                title: "Quality Assured",
                description:
                  "Read genuine reviews from real customers and make informed decisions.",
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-primary" />,
                title: "Instant Bookings",
                description:
                  "Book services instantly with real-time availability and instant confirmation.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-5"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore thousands of services available
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Plumbing",
              "Electrical",
              "Cleaning",
              "Landscaping",
              "Carpentry",
              "Painting",
              "HVAC",
              "Tutoring",
            ].map((category, idx) => (
              <Link
                key={idx}
                to={`/explore?category=${category.toLowerCase()}`}
              >
                <div
                  className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 text-center hover:shadow-lg hover:from-primary/10 hover:to-accent/10 transition-all duration-300 cursor-pointer border border-border hover:scale-105 animate-in fade-in-50 zoom-in-50"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                    <span className="text-xl">📦</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
