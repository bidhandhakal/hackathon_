"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Star, Briefcase } from "lucide-react"

export default function ProfileCarousel() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(true)

  // Sample profile data - 4 top-rated professionals
  const profiles = [
    {
      id: 1,
      name: "Sasheen M.",
      role: "Customer Experience Consultant",
      image: "/professional-woman-customer-experience.jpg",
      rating: 5.0,
      hourlyRate: "$65.00/hr",
      jobs: "14 jobs",
      testimonial:
        '"Upwork has enabled me to increase my rates. I know what I\'m bringing to the table and love the feeling of being able to help a variety of clients."',
      isTopRated: true,
    },
    {
      id: 2,
      name: "Alex Johnson",
      role: "Senior Full Stack Developer",
      image: "/professional-man-developer.jpg",
      rating: 4.9,
      hourlyRate: "$85.00/hr",
      jobs: "28 jobs",
      testimonial:
        '"The platform provides excellent opportunities to connect with quality clients and expand my professional network globally."',
      isTopRated: true,
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "UI/UX Designer",
      image: "/professional-woman-designer.jpg",
      rating: 4.95,
      hourlyRate: "$75.00/hr",
      jobs: "22 jobs",
      testimonial:
        '"Working through Upwork has transformed my career. I now have the freedom to choose projects that align with my vision."',
      isTopRated: true,
    },
    {
      id: 4,
      name: "Marcus Chen",
      role: "Data Scientist & ML Engineer",
      image: "/professional-man-data-scientist.jpg",
      rating: 4.98,
      hourlyRate: "$95.00/hr",
      jobs: "35 jobs",
      testimonial:
        '"The quality of clients and projects available on this platform is unmatched. I\'ve grown my business significantly."',
      isTopRated: true,
    },
  ]

  // Simulate fetching the name from the backend
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Simulate backend request, e.g. an API call
        const response = await fetch('/api/get-username') // Replace with your actual API endpoint
        if (response.ok) {
          const data = await response.json()
          setUserName(data.name) // Assuming the backend returns a { name: string } object
        } else {
          setUserName('User') // Fallback if backend fails
        }
      } catch (error) {
        setUserName('User') // Fallback if an error occurs
      } finally {
        setLoading(false) // Set loading to false once data is fetched
      }
    }

    fetchUserName()
  }, [])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? profiles.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === profiles.length - 1 ? 0 : prev + 1))
  }

  const displayName = loading ? 'Loading...' : userName || "User"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-12 max-w-7xl mx-auto items-center">
        {/* Left Side - Welcome Section */}
        <div className="flex flex-col justify-center space-y-6 animate-in fade-in-50 slide-in-from-left-5 duration-700">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Hey <span className="text-primary">{displayName}</span>. Ready for your next big opportunity?
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Connect with top-rated professionals and explore endless possibilities.
            </p>
          </div>

          {/* Action Items */}
          <div className="space-y-4">
            {/* Same Action Items */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-100 animate-in fade-in-50 slide-in-from-left-5" style={{animationDelay: '200ms'}}>
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-100">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Answer a few questions</h3>
                <p className="text-sm text-slate-600">Start building your professional profile</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-100 animate-in fade-in-50 slide-in-from-left-5" style={{animationDelay: '300ms'}}>
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-100">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Discover opportunities</h3>
                <p className="text-sm text-slate-600">Browse and apply for exciting projects</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-100 animate-in fade-in-50 slide-in-from-left-5" style={{animationDelay: '400ms'}}>
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-amber-100">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Build your reputation</h3>
                <p className="text-sm text-slate-600">Get paid safely and grow your business</p>
              </div>
            </div>
          </div>

          {/* New Section: Get Started Button and Text */}
          <div className="flex flex-col items-start space-y-4 pt-4 animate-in fade-in-50 slide-in-from-left-5" style={{animationDelay: '500ms'}}>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              It only takes 5-10 minutes and you can edit it later. We'll save as you go.
            </p>
            <button 
              onClick={() => navigate('/aftersignup/questions')}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold text-base"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Right Side - Profile Carousel */}
        <div className="flex flex-col justify-center animate-in fade-in-50 slide-in-from-right-5 duration-700">
          <div className="relative">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 transition-all duration-500 border border-slate-100 hover:shadow-3xl">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Profile Image with Badge */}
                <div className="relative">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-green-100 shadow-lg">
                    <img
                      src={profiles[currentIndex].image}
                      alt={profiles[currentIndex].name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profiles[currentIndex].name) + '&size=160&background=random';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {profiles[currentIndex].isTopRated && (
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-green-500 to-green-600 rounded-full p-2.5 shadow-xl animate-in zoom-in-50 duration-500">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{profiles[currentIndex].name}</h2>
                  <p className="text-slate-600 font-medium text-base md:text-lg">{profiles[currentIndex].role}</p>

                  {/* Rating and Stats */}
                  <div className="flex items-center justify-center gap-6 text-sm md:text-base pt-2">
                    <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-semibold text-slate-900">{profiles[currentIndex].rating}</span>
                    </div>
                    <span className="text-slate-700 font-semibold">{profiles[currentIndex].hourlyRate}</span>
                    <span className="text-slate-600">{profiles[currentIndex].jobs}</span>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-primary">
                  <p className="text-slate-700 italic leading-relaxed text-base">{profiles[currentIndex].testimonial}</p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute -left-6 top-1/2 -translate-y-1/2 lg:-left-16 bg-white hover:bg-slate-50 text-slate-700 rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-slate-200"
              aria-label="Previous profile"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute -right-6 top-1/2 -translate-y-1/2 lg:-right-16 bg-white hover:bg-slate-50 text-slate-700 rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-slate-200"
              aria-label="Next profile"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {profiles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${
                  index === currentIndex ? "bg-gradient-to-r from-primary to-accent w-10" : "bg-slate-300 w-2.5 hover:bg-slate-400 hover:w-4"
                }`}
                aria-label={`Go to profile ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}