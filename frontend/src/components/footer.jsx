import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-muted text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 font-bold text-xl">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs">
                Q
              </div>
              <span className="text-foreground">QuickKaam</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connect with skilled professionals and get your work done quickly and reliably.
            </p>
          </div>

          {/* For Customers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base text-foreground">For Customers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-muted-foreground hover:text-primary transition-colors">
                  Safety Center
                </Link>
              </li>
            </ul>
          </div>

          {/* For Providers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base text-foreground">For Providers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/become-service-provider" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/provider-guide" className="text-muted-foreground hover:text-primary transition-colors">
                  Provider Guide
                </Link>
              </li>
              <li>
                <Link to="/earnings" className="text-muted-foreground hover:text-primary transition-colors">
                  Earnings
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base text-foreground">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 QuickKaam. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
