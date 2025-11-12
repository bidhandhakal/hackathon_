import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 font-bold text-xl">
              <div className="w-6 h-6 bg-accent rounded-lg flex items-center justify-center text-secondary font-bold text-xs">
                Q
              </div>
              <span>QuickKaam</span>
            </div>
            <p className="text-sm opacity-80">
              Connect with skilled professionals and get your work done quickly and reliably.
            </p>
          </div>

          {/* For Customers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">For Customers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/explore" className="opacity-80 hover:opacity-100 transition-opacity">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="opacity-80 hover:opacity-100 transition-opacity">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="opacity-80 hover:opacity-100 transition-opacity">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/safety" className="opacity-80 hover:opacity-100 transition-opacity">
                  Safety Center
                </Link>
              </li>
            </ul>
          </div>

          {/* For Providers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">For Providers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/become-service-provider" className="opacity-80 hover:opacity-100 transition-opacity">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/provider-guide" className="opacity-80 hover:opacity-100 transition-opacity">
                  Provider Guide
                </Link>
              </li>
              <li>
                <Link to="/earnings" className="opacity-80 hover:opacity-100 transition-opacity">
                  Earnings
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-80 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="opacity-80 hover:opacity-100 transition-opacity">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="opacity-80 hover:opacity-100 transition-opacity">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent border-opacity-30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-70">
            <p>&copy; 2025 QuickKaam. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:opacity-100 transition-opacity">
                Twitter
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Facebook
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
