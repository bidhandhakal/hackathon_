"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Users, ArrowRight, CheckCircle } from "lucide-react";

export default function UserTypeSelection() {
  const navigate = useNavigate();

  const handleFreelancerClick = () => {
    // TODO: Store user type in localStorage or backend
    localStorage.setItem("userType", "freelancer");
    navigate("/aftersignup");
  };

  const handleClientClick = () => {
    // TODO: Store user type in localStorage or backend
    localStorage.setItem("userType", "client");
    // Redirect to client-specific questions
    navigate("/aftersignup/client-questions");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-in fade-in-50 slide-in-from-top-5 duration-700">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
            Join as a client or freelancer
          </h1>
          <p className="text-base md:text-lg text-slate-600">
            Choose how you want to use our platform
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Client Card */}
          <div
            onClick={handleClientClick}
            className="group relative bg-white rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-slate-200 hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-2xl animate-in fade-in-50 slide-in-from-left-5 duration-700"
          >
            {/* Radio-like indicator */}
            <div className="absolute top-6 right-6 w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-primary transition-colors duration-300 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-transparent group-hover:bg-primary transition-colors duration-300"></div>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              {/* Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300 flex items-center justify-center">
                <Users className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              </div>

              {/* Title */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  I'm a client, hiring
                  <br />
                  for a project
                </h2>
              </div>

              {/* Features */}
              <div className="space-y-3 w-full">
                <div className="flex items-start gap-2 text-left">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-slate-600">
                    Post projects and get proposals
                  </p>
                </div>
                <div className="flex items-start gap-2 text-left">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-slate-600">
                    Browse and hire top talent
                  </p>
                </div>
                <div className="flex items-start gap-2 text-left">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-slate-600">
                    Manage projects with ease
                  </p>
                </div>
              </div>

              {/* Button */}
              <button className="w-full mt-4 px-6 py-3 bg-white border-2 border-slate-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white text-slate-700 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                Get Started as Client
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Freelancer Card */}
          <div
            onClick={handleFreelancerClick}
            className="group relative bg-white rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-slate-200 hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-2xl animate-in fade-in-50 slide-in-from-right-5 duration-700"
          >
            {/* Radio-like indicator */}
            <div className="absolute top-6 right-6 w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-primary transition-colors duration-300 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-transparent group-hover:bg-primary transition-colors duration-300"></div>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              {/* Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors duration-300 flex items-center justify-center">
                <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />
              </div>

              {/* Title */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  I'm a freelancer,
                  <br />
                  looking for work
                </h2>
              </div>

              {/* Features */}
              <div className="space-y-3 w-full">
                <div className="flex items-start gap-2 text-left">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-slate-600">
                    Create your professional profile
                  </p>
                </div>
                <div className="flex items-start gap-2 text-left">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-slate-600">
                    Find projects that match your skills
                  </p>
                </div>
                <div className="flex items-start gap-2 text-left">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-slate-600">
                    Get paid securely and on time
                  </p>
                </div>
              </div>

              {/* Button */}
              <button className="w-full mt-4 px-6 py-3 bg-white border-2 border-slate-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white text-slate-700 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                Get Started as Freelancer
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center text-sm text-slate-500 animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
          <p>You can always switch your account type later in settings</p>
        </div>
      </div>
    </div>
  );
}
