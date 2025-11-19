import React, { useState } from "react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("jobs");

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-6 py-20 bg-gradient-to-br from-gray-200 via-white to-gray-300">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Main headline */}
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              Find Work.
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              Find Talent.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-light">
            Connect with opportunities or discover skilled professionals—all in
            one minimal platform.
          </p>
        </div>

        {/* Minimal search section */}
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Toggle pills */}
          <div className="inline-flex items-center gap-1 bg-gray-50 rounded-full p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setSearchType("jobs")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                searchType === "jobs"
                  ? "bg-gradient-to-r from-blue-600 to-black text-black shadow-sm"
                  : "text-gray-600"
              }`}
            >
              Find Jobs
            </button>
            <button
              onClick={() => setSearchType("freelancers")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                searchType === "freelancers"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-black shadow-sm"
                  : "text-gray-600"
              }`}
            >
              Find Talent
            </button>
          </div>

          {/* Search input */}
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                searchType === "jobs"
                  ? "What are you looking for?"
                  : "Who are you looking for?"
              }
              className="w-full py-4 pl-6 pr-32 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-black transition-all bg-white shadow-sm hover:shadow-md placeholder:text-gray-400"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-black px-8 py-2.5 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
              Search
            </button>
          </div>

          {/* Quick stats or tags */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>10K+ Active Jobs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>5K+ Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>Trusted Platform</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
