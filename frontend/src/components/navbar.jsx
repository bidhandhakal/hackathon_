import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 font-[latina]">
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
              {/* Hire freelancers dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("hire")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center space-x-1 text-xs xl:text-sm text-black hover:text-gray-700 transition-colors whitespace-nowrap py-2"
                  style={{ fontWeight: 550 }}
                >
                  <span>Hire freelancers</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "hire" && (
                  <div className="absolute top-full left-0 pt-2 pb-2">
                    <div className="w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      <Link
                        to="/hire/post-job"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Post a job
                      </Link>
                      <Link
                        to="/hire/browse-talent"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Browse talent
                      </Link>
                      <Link
                        to="/hire/agencies"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Hire agencies
                      </Link>
                      <Link
                        to="/hire/project-catalog"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Project catalog
                      </Link>
                      <Link
                        to="/hire/talent-marketplace"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Talent marketplace
                      </Link>
                      <Link
                        to="/hire/hire-by-skill"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Hire by skill
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Find work dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("work")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center space-x-1 text-xs xl:text-sm text-gray-900 hover:text-black transition-colors whitespace-nowrap py-2"
                  style={{ fontWeight: 550 }}
                >
                  <span>Find work</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "work" && (
                  <div className="absolute top-full left-0 pt-2 pb-2">
                    <div className="w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      <Link
                        to="/work/browse-jobs"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Browse jobs
                      </Link>
                      <Link
                        to="/work/saved-jobs"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Saved jobs
                      </Link>
                      <Link
                        to="/work/proposals"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        My proposals
                      </Link>
                      <Link
                        to="/work/profile"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/work/my-stats"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        My stats
                      </Link>
                      <Link
                        to="/work/earnings"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Earnings
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Why Upwork dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("why")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center space-x-1 text-xs xl:text-sm text-gray-900 hover:text-black transition-colors whitespace-nowrap py-2"
                  style={{ fontWeight: 550 }}
                >
                  <span>Why QuickKaam</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "why" && (
                  <div className="absolute top-full left-0 pt-2 pb-2">
                    <div className="w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      <Link
                        to="/why/success-stories"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Success stories
                      </Link>
                      <Link
                        to="/why/how-it-works"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        How it works
                      </Link>
                      <Link
                        to="/why/reviews"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Reviews
                      </Link>
                      <Link
                        to="/why/trust-safety"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Trust & safety
                      </Link>
                      <Link
                        to="/why/comparison"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Why choose us
                      </Link>
                      <Link
                        to="/why/resources"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Resources
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* What's new dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("new")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center space-x-1 text-xs xl:text-sm text-gray-900 hover:text-black transition-colors whitespace-nowrap py-2"
                  style={{ fontWeight: 550 }}
                >
                  <span>What's new</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "new" && (
                  <div className="absolute top-full left-0 pt-2 pb-2">
                    <div className="w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      <Link
                        to="/new/features"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        New features
                      </Link>
                      <Link
                        to="/new/blog"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Blog
                      </Link>
                      <Link
                        to="/new/updates"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Platform updates
                      </Link>
                      <Link
                        to="/new/announcements"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Announcements
                      </Link>
                      <Link
                        to="/new/events"
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        Events
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <Link
                to="/pricing"
                className="text-xs xl:text-sm text-gray-900 hover:text-black transition-colors whitespace-nowrap"
                style={{ fontWeight: 550 }}
              >
                Pricing
              </Link>

              {/* For enterprise */}
              <Link
                to="/enterprise"
                className="text-xs xl:text-sm text-gray-900 hover:text-black transition-colors whitespace-nowrap"
                style={{ fontWeight: 550 }}
              >
                For enterprise
              </Link>
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
              className="hidden sm:block bg-black text-white px-3 sm:px-4 md:px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium text-xs md:text-sm whitespace-nowrap"
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
                <X className="w-10 h-10" />
              ) : (
                <Menu className="w-10 h-10" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Hire freelancers */}
              <div className="space-y-2">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "hire" ? null : "hire")
                  }
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-gray-900 font-medium"
                >
                  <span>Hire freelancers</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === "hire" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "hire" && (
                  <div className="pl-4 space-y-3">
                    <Link
                      to="/hire/post-job"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Post a job
                    </Link>
                    <Link
                      to="/hire/browse-talent"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Browse talent
                    </Link>
                    <Link
                      to="/hire/agencies"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Hire agencies
                    </Link>
                    <Link
                      to="/hire/project-catalog"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Project catalog
                    </Link>
                    <Link
                      to="/hire/talent-marketplace"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Talent marketplace
                    </Link>
                    <Link
                      to="/hire/hire-by-skill"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Hire by skill
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Find work */}
              <div className="space-y-2">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "work" ? null : "work")
                  }
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-gray-900 font-medium"
                >
                  <span>Find work</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === "work" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "work" && (
                  <div className="pl-4 space-y-3">
                    <Link
                      to="/work/browse-jobs"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Browse jobs
                    </Link>
                    <Link
                      to="/work/saved-jobs"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Saved jobs
                    </Link>
                    <Link
                      to="/work/proposals"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My proposals
                    </Link>
                    <Link
                      to="/work/profile"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/work/my-stats"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My stats
                    </Link>
                    <Link
                      to="/work/earnings"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Earnings
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Why QUICKKAAM */}
              <div className="space-y-2">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "why" ? null : "why")
                  }
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-gray-900 font-medium"
                >
                  <span>Why QuickKaam</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === "why" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "why" && (
                  <div className="pl-4 space-y-3">
                    <Link
                      to="/why/success-stories"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Success stories
                    </Link>
                    <Link
                      to="/why/how-it-works"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      How it works
                    </Link>
                    <Link
                      to="/why/reviews"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Reviews
                    </Link>
                    <Link
                      to="/why/trust-safety"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Trust & safety
                    </Link>
                    <Link
                      to="/why/comparison"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Why choose us
                    </Link>
                    <Link
                      to="/why/resources"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Resources
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile What's new */}
              <div className="space-y-2">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "new" ? null : "new")
                  }
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-gray-900 font-medium"
                >
                  <span>What's new</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === "new" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "new" && (
                  <div className="pl-4 space-y-3">
                    <Link
                      to="/new/features"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      New features
                    </Link>
                    <Link
                      to="/new/blog"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Blog
                    </Link>
                    <Link
                      to="/new/updates"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Platform updates
                    </Link>
                    <Link
                      to="/new/announcements"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Announcements
                    </Link>
                    <Link
                      to="/new/events"
                      className="block text-base py-1 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Events
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Pricing */}
              <Link
                to="/pricing"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>

              {/* Mobile For enterprise */}
              <Link
                to="/enterprise"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                For enterprise
              </Link>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link
                  to="/auth/login"
                  className="block text-center text-gray-700 hover:text-gray-900 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/auth/signup"
                  className="block text-center bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
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
