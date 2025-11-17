import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-xl font-bold text-[#181818]">
              QUICKKAAM
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
            {/* Hire freelancers dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('hire')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span>Hire freelancers</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'hire' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                  <Link to="/hire/post-job" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Post a job
                  </Link>
                  <Link to="/hire/browse-talent" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Browse talent
                  </Link>
                  <Link to="/hire/agencies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Hire agencies
                  </Link>
                </div>
              )}
            </div>

            {/* Find work dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('work')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span>Find work</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'work' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                  <Link to="/work/browse-jobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Browse jobs
                  </Link>
                  <Link to="/work/saved-jobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Saved jobs
                  </Link>
                  <Link to="/work/proposals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My proposals
                  </Link>
                </div>
              )}
            </div>

            {/* Why Upwork dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('why')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span>Why QUICKKAAM</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'why' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                  <Link to="/why/success-stories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Success stories
                  </Link>
                  <Link to="/why/how-it-works" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    How it works
                  </Link>
                  <Link to="/why/reviews" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Reviews
                  </Link>
                </div>
              )}
            </div>

            {/* What's new dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('new')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span>What's new</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'new' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                  <Link to="/new/features" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    New features
                  </Link>
                  <Link to="/new/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Blog
                  </Link>
                </div>
              )}
            </div>

            {/* Pricing */}
            <Link to="/pricing" className="text-gray-700 hover:text-gray-900 transition-colors">
              Pricing
            </Link>

            {/* For enterprise */}
            <Link to="/enterprise" className="text-gray-700 hover:text-gray-900 transition-colors">
              For enterprise
            </Link>
            </div>
          </div>

          {/* Right Side: Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/auth/login"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Log in
            </Link>
            <Link
              to="/auth/signup"
              className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar