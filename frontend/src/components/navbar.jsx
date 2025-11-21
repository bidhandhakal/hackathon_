import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 font-[latina]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-16 lg:h-14">
          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo-main.svg"
                alt="QUICKKAAM"
                className="h-8 sm:h-8 lg:h-7"
              />
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 lg:ml-6 xl:ml-6">
              {/* Explore Services */}
              <Link
                to="/explore"
                className="text-xs xl:text-sm text-gray-900 hover:text-black transition-colors whitespace-nowrap"
                style={{ fontWeight: 550 }}
              >
                Explore Services
              </Link>

              {/* Become a Provider */}
              <Link
                to="/become-service-provider"
                className="text-xs xl:text-sm text-gray-900 hover:text-black transition-colors whitespace-nowrap"
                style={{ fontWeight: 550 }}
              >
                Become a Provider
              </Link>

              {/* Dashboard dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("dashboard")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center space-x-1 text-xs xl:text-sm text-black hover:text-gray-700 transition-colors whitespace-nowrap py-2"
                  style={{ fontWeight: 550 }}
                >
                  <span>Dashboard</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "dashboard" && (
                  <div className="absolute top-full left-0 pt-2 pb-2">
                    <div className="w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Overview
                      </Link>
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/dashboard/bookings"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Bookings
                      </Link>
                      <Link
                        to="/dashboard/services"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        My Services
                      </Link>
                      <Link
                        to="/dashboard/messages"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Messages
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Auth Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-2 md:space-x-3">
            <Link
              to="/auth/login"
              className="hidden sm:block text-xs md:text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Log in
            </Link>
            <Link
              to="/auth/signup"
              className="hidden sm:block bg-[#141111] text-white px-3 sm:px-4 md:px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium text-xs md:text-sm whitespace-nowrap shadow-[0_4px_16px_rgba(255,255,255,0.4)]"
            >
              Sign up
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Explore Services */}
              <Link
                to="/explore"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore Services
              </Link>

              {/* Mobile Become a Provider */}
              <Link
                to="/become-service-provider"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Become a Provider
              </Link>

              {/* Mobile Dashboard */}
              <div className="space-y-2">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "dashboard" ? null : "dashboard")
                  }
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-gray-900 font-medium"
                >
                  <span>Dashboard</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === "dashboard" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "dashboard" && (
                  <div className="pl-4 space-y-3">
                    <Link
                      to="/dashboard"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Overview
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/dashboard/bookings"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Bookings
                    </Link>
                    <Link
                      to="/dashboard/services"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Services
                    </Link>
                    <Link
                      to="/dashboard/messages"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Messages
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link
                  to="/auth/login"
                  className="block text-center text-gray-700 hover:text-gray-900 transition-colors font-medium py-2 border border-black rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/auth/signup"
                  className="block text-center bg-[#141111] text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-[0_4px_16px_rgba(255,255,255,0.4)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
