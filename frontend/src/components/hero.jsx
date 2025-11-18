import React, { useState } from "react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("jobs");

  return (
    <div className="relative flex justify-center items-center bg-[#ffffff] p-0 md:p-8 overflow-hidden">
      <div className="max-w-6xl w-full">
        <div className="relative overflow-hidden rounded-none md:rounded-3xl">
          <img 
            src="/heroimage.jpg" 
            alt="Professional woman working on laptop"
            className="w-full h-auto max-h-[400px] md:max-h-[500px] object-cover"
          />
          
          {/* Search Bar - Inside image for desktop only */}
          <div className="hidden md:block absolute bottom-8 left-8 bg-white rounded-lg shadow-2xl p-4 w-96 z-10">
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setSearchType("jobs")}
                style={{
                  backgroundColor: searchType === "jobs" ? "#000000" : "#f3f4f6",
                  color: searchType === "jobs" ? "#ffffff" : "#374151"
                }}
                className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all hover:opacity-90"
              >
                Find Jobs
              </button>
              <button
                onClick={() => setSearchType("freelancers")}
                style={{
                  backgroundColor: searchType === "freelancers" ? "#000000" : "#f3f4f6",
                  color: searchType === "freelancers" ? "#ffffff" : "#374151"
                }}
                className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all hover:opacity-90"
              >
                Find Freelancers
              </button>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchType === "jobs" ? "Search for jobs..." : "Search for freelancers..."}
                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 bg-white"
              />
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search Bar - Under image for mobile */}
        <div className="md:hidden bg-white rounded-lg shadow-2xl p-4 mt-4 mx-4">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setSearchType("jobs")}
              style={{
                backgroundColor: searchType === "jobs" ? "#000000" : "#f3f4f6",
                color: searchType === "jobs" ? "#ffffff" : "#374151"
              }}
              className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all hover:opacity-90"
            >
              Find Jobs
            </button>
            <button
              onClick={() => setSearchType("freelancers")}
              style={{
                backgroundColor: searchType === "freelancers" ? "#000000" : "#f3f4f6",
                color: searchType === "freelancers" ? "#ffffff" : "#374151"
              }}
              className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all hover:opacity-90"
            >
              Find Freelancers
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchType === "jobs" ? "Search for jobs..." : "Search for freelancers..."}
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 bg-white"
            />
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
