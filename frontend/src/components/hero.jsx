import React, { useState } from "react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("jobs");

  return (
    <div className="relative flex justify-center items-center p-0 md:p-8 overflow-hidden">
      <div className="max-w-7xl w-full">
        <div className="relative overflow-hidden rounded-none md:rounded-3xl">
          <img
            src="/heroimage.jpg"
            alt="Professional woman working on laptop"
            className="w-full h-auto max-h-[500px] md:max-h-[600px] object-cover "
          />

          {/* Search Bar - Inside image for desktop only */}
          <div className="hidden md:block absolute bottom-8 left-8 backdrop-blur-lg bg-black/40 rounded-2xl shadow-2xl p-5 w-96 z-10 border border-white/30">
            <div className="flex gap-2 mb-4 bg-black/20 p-1.5 rounded-lg">
              <button
                onClick={() => setSearchType("jobs")}
                style={{
                  backgroundColor:
                    searchType === "jobs" ? "#ffffff" : "transparent",
                  color: searchType === "jobs" ? "#000000" : "#ffffff",
                }}
                className="flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:bg-white/90 "
              >
                Find Jobs
              </button>
              <button
                onClick={() => setSearchType("freelancers")}
                style={{
                  backgroundColor:
                    searchType === "freelancers" ? "#ffffff" : "transparent",
                  color: searchType === "freelancers" ? "#000000" : "#ffffff",
                }}
                className="flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:bg-white/90"
              >
                Find Freelancers
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchType === "jobs"
                    ? "Search for jobs..."
                    : "Search for freelancers..."
                }
                className="w-full py-2.5 pl-10 pr-4 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 text-white bg-white/10 backdrop-blur-sm placeholder:text-white/70"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Search
         Bar - Under image
         for mobile */}

        <div className="md:hidden backdrop-blur-lg bg-white/90 shadow-2xl p-5 mt-0 border border-gray-200 ">
          <div className="flex gap-2 mb-4 bg-gray-100 p-1.5 rounded-lg">
            <button
              onClick={() => setSearchType("jobs")}
              style={{
                backgroundColor:
                  searchType === "jobs" ? "#000000" : "transparent",
                color: searchType === "jobs" ? "#ffffff" : "#374151",
              }}
              className="flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:bg-gray-800"
            >
              Find Jobs
            </button>
            <button
              onClick={() => setSearchType("freelancers")}
              style={{
                backgroundColor:
                  searchType === "freelancers" ? "#000000" : "transparent",
                color: searchType === "freelancers" ? "#ffffff" : "#374151",
              }}
              className="flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:bg-gray-800"
            >
              Find Freelancers
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                searchType === "jobs"
                  ? "Search for jobs..."
                  : "Search for freelancers..."
              }
              className="w-full py-2.5 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 text-gray-900 bg-white placeholder:text-gray-500"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
