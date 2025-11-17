"use client";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { IKContext, IKUpload } from "imagekitio-react";
import {
  Upload,
  Linkedin,
  FileText,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  X,
  DollarSign,
} from "lucide-react";

export default function ResumeImport({ onBack, onContinue }) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [bio, setBio] = useState("");
  const [availability, setAvailability] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [profilePhotoFileId, setProfilePhotoFileId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const options = [
    {
      id: "linkedin",
      title: "Import from LinkedIn",
      description: "Quickly pull your LinkedIn profile information",
      icon: Linkedin,
      actionLabel: "Connect LinkedIn",
    },
    {
      id: "resume",
      title: "Upload your resume",
      description: "Upload a PDF or document file",
      icon: Upload,
      actionLabel: "Select file",
    },
    {
      id: "manual",
      title: "Fill out manually (15 min)",
      description: "Enter your information step by step",
      icon: FileText,
      actionLabel: "Start manually",
    },
  ];

  const categories = [
    "Painting",
    "Carpentry",
    "Plumbing",
    "Electrical",
    "Cleaning",
    "HVAC",
    "Landscaping & Gardening",
    "Roofing",
    "Masonry & Concrete",
    "Flooring",
    "Home Renovation",
    "Moving & Hauling",
  ];

  const specialties = {
    Painting: [
      "Interior Painting",
      "Exterior Painting",
      "Commercial Painting",
      "Residential Painting",
      "Cabinet Painting & Refinishing",
      "Other - Painting",
    ],
    Carpentry: [
      "Custom Furniture",
      "Door & Window Installation",
      "Deck & Fence Building",
      "Kitchen Cabinets",
      "Trim & Molding",
      "Other - Carpentry",
    ],
    Plumbing: [
      "Leak Repair",
      "Drain Cleaning",
      "Water Heater Installation",
      "Pipe Installation & Repair",
      "Bathroom Plumbing",
      "Other - Plumbing",
    ],
    Electrical: [
      "Wiring & Rewiring",
      "Lighting Installation",
      "Electrical Panel Upgrades",
      "Outlet & Switch Installation",
      "Emergency Electrical Repair",
      "Other - Electrical",
    ],
    Cleaning: [
      "House Cleaning",
      "Deep Cleaning",
      "Office Cleaning",
      "Move-in/Move-out Cleaning",
      "Carpet & Upholstery Cleaning",
      "Other - Cleaning",
    ],
    HVAC: [
      "Air Conditioning Repair",
      "Heating System Repair",
      "AC Installation",
      "Furnace Installation",
      "Duct Cleaning",
      "Other - HVAC",
    ],
    "Landscaping & Gardening": [
      "Lawn Mowing & Maintenance",
      "Garden Design & Installation",
      "Tree Trimming & Removal",
      "Irrigation System Installation",
      "Hardscaping",
      "Other - Landscaping",
    ],
    Roofing: [
      "Roof Repair",
      "Roof Replacement",
      "Gutter Installation & Repair",
      "Roof Inspection",
      "Emergency Roof Repair",
      "Other - Roofing",
    ],
    "Masonry & Concrete": [
      "Concrete Pouring & Repair",
      "Brick & Stone Work",
      "Driveway Installation",
      "Patio & Walkway Construction",
      "Foundation Repair",
      "Other - Masonry",
    ],
    Flooring: [
      "Hardwood Floor Installation",
      "Tile Installation",
      "Carpet Installation",
      "Laminate & Vinyl Flooring",
      "Floor Refinishing",
      "Other - Flooring",
    ],
    "Home Renovation": [
      "Kitchen Remodeling",
      "Bathroom Remodeling",
      "Basement Finishing",
      "Home Additions",
      "General Contracting",
      "Other - Renovation",
    ],
    "Moving & Hauling": [
      "Residential Moving",
      "Commercial Moving",
      "Furniture Delivery",
      "Junk Removal",
      "Packing Services",
      "Other - Moving & Hauling",
    ],
  };

  const handleFileClick = () => {
    if (selectedOption === "resume") {
      fileInputRef.current?.click();
    }
  };

  const handleContinue = () => {
    if (selectedOption === "manual") {
      setCurrentStep(1);
    } else {
      onContinue?.();
    }
  };

  const handleSpecialtyToggle = (specialty) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(
        selectedSpecialties.filter((s) => s !== specialty)
      );
    } else if (selectedSpecialties.length < 3) {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const handleCategoryHover = (category) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredCategory(category);
    setSelectedCategory(category);
  };

  const handleCategoryLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 300);
  };

  const handleSpecialtyPanelEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleSpecialtyPanelLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 300);
  };

  const handleStepContinue = () => {
    if (
      currentStep === 1 &&
      selectedCategory &&
      selectedSpecialties.length >= 1
    ) {
      setCurrentStep(2);
    } else if (currentStep === 2 && bio.length >= 50) {
      setCurrentStep(3);
    } else if (currentStep === 3 && availability) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      handleSaveProfile();
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      const profileData = {
        category: selectedCategory,
        specialties: selectedSpecialties,
        bio: bio,
        availability: availability,
        profilePhoto: profilePhotoUrl,
        profilePhotoFileId: profilePhotoFileId,
      };

      const data = await api.auth.updateProfile(profileData);

      console.log("Profile saved successfully:", data);
      // Navigate to dashboard or call onContinue
      if (onContinue) {
        onContinue();
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while saving your profile."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // ImageKit authenticator
  const authenticator = async () => {
    try {
      const data = await api.auth.getImageKitAuth();
      const { token, expire, signature } = data;
      return { token, expire, signature };
    } catch (error) {
      console.error("ImageKit auth error:", error);
      alert("Authentication failed. Please make sure you're logged in.");
      throw error;
    }
  };

  // ImageKit upload callbacks
  const onUploadStart = () => {
    console.log("Upload started...");
    setIsUploading(true);
  };

  const onUploadSuccess = (res) => {
    console.log("Upload successful:", res);
    console.log("Image URL:", res.url);
    console.log("File ID:", res.fileId);
    setProfilePhotoUrl(res.url);
    setProfilePhotoFileId(res.fileId);
    setProfilePhoto(res);
    setIsUploading(false);
  };

  const onUploadError = (err) => {
    console.error("Upload error:", err);
    console.error("Error details:", JSON.stringify(err, null, 2));
    alert(`Image upload failed: ${err.message || "Unknown error"}`);
    setIsUploading(false);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleStepBack = () => {
    if (currentStep === 1) {
      // Go back to questions page
      navigate("/aftersignup/questions");
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 0) {
      // Go back to questions page from first step
      navigate("/aftersignup/questions");
    } else {
      onBack?.();
    }
  };

  // Render step 1: Category and Specialty selection (merged)
  if (currentStep === 1) {
    const categoryIcons = {
      Painting: "🎨",
      Carpentry: "🔨",
      Plumbing: "🔧",
      Electrical: "⚡",
      Cleaning: "🧹",
      HVAC: "❄️",
      "Landscaping & Gardening": "🌿",
      Roofing: "🏠",
      "Masonry & Concrete": "🧱",
      Flooring: "📐",
      "Home Renovation": "🏗️",
      "Moving & Hauling": "🚚",
    };

    return (
      <div className="h-screen overflow-hidden bg-white flex flex-col">
        <main className="flex-1 overflow-y-auto px-3 md:px-4 lg:px-6 py-2 lg:py-3">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            {/* Progress Section */}
            <div className="mb-2 lg:mb-3 flex-shrink-0">
              <div className="flex items-center gap-2 mb-1.5">
                <h2 className="text-sm lg:text-sm font-semibold text-gray-900">
                  Create your profile
                </h2>
                <span className="text-sm lg:text-sm text-gray-500 font-medium">1/5</span>
              </div>
              <div className="w-20 lg:w-32 h-1 bg-primary rounded-full"></div>
            </div>

            <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3 flex-shrink-0">
              Select 1 category & 1-3 specialties
            </h1>

            {/* Content - Scrollable on mobile, fit on PC */}
            <div className="flex-1 overflow-y-auto lg:overflow-visible pr-2 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 pb-4">
                {/* Categories - Mobile: Click to show dropdown below */}
                <div className="space-y-1.5 lg:space-y-1">
                  {categories.map((category) => (
                    <div key={category} className="relative">
                      {/* Desktop: Hover | Mobile: Click */}
                      <button
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            // Mobile: Click to toggle
                            setSelectedCategory(
                              selectedCategory === category ? "" : category
                            );
                            setHoveredCategory(
                              selectedCategory === category ? null : category
                            );
                          }
                        }}
                        onMouseEnter={() => {
                          if (window.innerWidth >= 1024) {
                            handleCategoryHover(category);
                          }
                        }}
                        onMouseLeave={() => {
                          if (window.innerWidth >= 1024) {
                            handleCategoryLeave();
                          }
                        }}
                        className={`w-full p-2.5 lg:p-2 rounded-lg border-2 transition-all text-left ${
                          selectedCategory === category
                            ? "border-primary bg-primary/10"
                            : "border-gray-300 bg-white hover:border-primary hover:bg-primary/10"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg lg:text-base">
                              {categoryIcons[category]}
                            </span>
                            <span className="font-semibold text-sm lg:text-sm text-gray-900">
                              {category}
                            </span>
                          </div>
                          {/* Mobile indicator */}
                          <ChevronRight
                            className={`w-4 h-4 lg:hidden transition-transform ${
                              selectedCategory === category ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {/* Mobile: Dropdown below the category */}
                      {selectedCategory === category && window.innerWidth < 1024 && (
                        <div className="mt-2 bg-white rounded-lg border-2 border-primary shadow-lg p-3 animate-in fade-in slide-in-from-top-2 duration-200 lg:hidden">
                          <h3 className="text-sm font-bold text-gray-900 mb-2">
                            Select 1 to 3 specialties
                          </h3>
                          <div className="space-y-1.5 max-h-48 overflow-y-auto">
                            {specialties[category]?.map((specialty) => (
                              <button
                                key={specialty}
                                onClick={() => handleSpecialtyToggle(specialty)}
                                disabled={
                                  !selectedSpecialties.includes(specialty) &&
                                  selectedSpecialties.length >= 3
                                }
                                className={`w-full p-2 rounded-lg border-2 transition-all text-left text-xs ${
                                  selectedSpecialties.includes(specialty)
                                    ? "border-primary bg-primary/10"
                                    : selectedSpecialties.length >= 3
                                    ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                                    : "border-gray-300 bg-white hover:border-primary hover:bg-primary/10"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={`font-medium ${
                                      selectedSpecialties.includes(specialty)
                                        ? "text-gray-900"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {specialty}
                                  </span>
                                  {selectedSpecialties.includes(specialty) && (
                                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                          <p className="text-xs text-gray-600 mt-2">
                            Selected: {selectedSpecialties.length} of 3
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Desktop: Specialty Panel (right side - hover) */}
                <div className="hidden lg:block relative">
                  <div
                    className="sticky top-2"
                    onMouseEnter={handleSpecialtyPanelEnter}
                    onMouseLeave={handleSpecialtyPanelLeave}
                  >
                    {hoveredCategory && (
                      <div className="bg-white rounded-lg border-2 border-primary shadow-lg p-3 animate-in fade-in slide-in-from-right-5 duration-200">
                        <div className="mb-2">
                          <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {hoveredCategory}
                          </span>
                        </div>
                        <h2 className="text-sm font-bold text-gray-900 mb-2">
                          Select 1 to 3 specialties
                        </h2>
                        <div className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar">
                          {specialties[hoveredCategory]?.map((specialty) => (
                            <button
                              key={specialty}
                              onClick={() => handleSpecialtyToggle(specialty)}
                              disabled={
                                !selectedSpecialties.includes(specialty) &&
                                selectedSpecialties.length >= 3
                              }
                              className={`w-full p-2 rounded-lg border-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                                selectedSpecialties.includes(specialty)
                                  ? "border-primary bg-primary/10"
                                  : selectedSpecialties.length >= 3
                                  ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                                  : "border-gray-300 bg-white hover:border-primary hover:bg-primary/10"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span
                                  className={`font-medium text-xs ${
                                    selectedSpecialties.includes(specialty)
                                      ? "text-gray-900"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {specialty}
                                </span>
                                {selectedSpecialties.includes(specialty) && (
                                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 mt-3">
                          Selected: {selectedSpecialties.length} of 3 maximum
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Selected Specialties Display */}
              {selectedSpecialties.length > 0 && (
                <div className="mt-3 p-3 bg-white rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                    Selected Specialties:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpecialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 text-xs"
                      >
                        {specialty}
                        <button
                          onClick={() => handleSpecialtyToggle(specialty)}
                          className="hover:text-accent"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between gap-3 pt-3 lg:pt-4 mt-3 lg:mt-4 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-1.5 px-4 py-2 lg:px-5 lg:py-2.5 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors text-xs lg:text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                disabled={!selectedCategory || selectedSpecialties.length < 1}
                className={`flex items-center gap-1.5 px-5 py-2 lg:px-6 lg:py-2.5 rounded-lg font-semibold transition-colors text-xs lg:text-sm ${
                  selectedCategory && selectedSpecialties.length >= 1
                    ? "bg-primary text-white hover:bg-accent"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>

        {/* Custom scrollbar styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}</style>
      </div>
    );
  }

  // Render step 2: Bio/Overview
  if (currentStep === 2) {
    return (
      <div className="h-screen overflow-hidden bg-white flex flex-col">
        <main className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-6 py-6 lg:py-8">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div className="mb-6 lg:mb-8 flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-base lg:text-lg font-semibold text-gray-900">
                  Create your profile
                </h2>
                <span className="text-base lg:text-lg text-gray-500 font-medium">2/5</span>
              </div>
              <div className="w-48 lg:w-64 h-1 bg-primary rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8 flex-shrink-0">
              <div className="lg:col-span-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                  Write a bio that stands out
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-gray-600">
                  Tell clients about your experience, skills, and what makes you
                  the best choice for their project.
                </p>
              </div>
              <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center border-4 border-primary/20">
                  <span className="text-4xl lg:text-5xl">✍️</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col mb-6 lg:mb-8">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Describe your professional background, skills, and what services you offer. Highlight what makes you unique..."
                className="w-full flex-1 min-h-[200px] p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none text-base"
                maxLength={5000}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">Minimum 50 characters</p>
                <p className="text-sm text-gray-500">{bio.length}/5000</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-6 lg:pt-8 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-2 px-6 py-3 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                disabled={bio.length < 50}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  bio.length >= 50
                    ? "bg-primary text-white hover:bg-accent"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Render step 3: Availability
  if (currentStep === 3) {
    const availabilityOptions = [
      {
        id: "full-time",
        title: "More than 30 hrs/week",
        description: "Full-time availability",
      },
      {
        id: "part-time",
        title: "15-30 hrs/week",
        description: "Part-time availability",
      },
      {
        id: "occasional",
        title: "Less than 15 hrs/week",
        description: "Occasional/weekend work",
      },
    ];

    return (
      <div className="h-screen overflow-hidden bg-white flex flex-col">
        <main className="flex-1 overflow-y-auto px-3 md:px-4 lg:px-6 py-3 lg:py-6">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div className="mb-2 lg:mb-4 flex-shrink-0">
              <div className="flex items-center gap-2 mb-1.5">
                <h2 className="text-sm lg:text-base font-semibold text-gray-900">
                  Create your profile
                </h2>
                <span className="text-sm lg:text-base text-gray-500 font-medium">3/5</span>
              </div>
              <div
                className="h-1 bg-primary rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>

            <div className="flex items-center justify-between mb-4 lg:mb-6 flex-shrink-0">
              <div>
                <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">
                  How much time do you have available?
                </h1>
                <p className="text-xs md:text-sm lg:text-base text-gray-600">
                  This helps clients understand your capacity for new projects
                </p>
              </div>
              <div>
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center border-4 border-primary/20">
                  <span className="text-2xl lg:text-3xl">📅</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 lg:space-y-3">
              {availabilityOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setAvailability(option.id)}
                  className={`w-full p-3 lg:p-4 rounded-lg border-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                    availability === option.id
                      ? "border-primary bg-primary/10"
                      : "border-gray-300 bg-white hover:border-primary hover:bg-primary/10"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-sm lg:text-base text-gray-900 mb-0.5 lg:mb-1">
                        {option.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-600">{option.description}</p>
                    </div>
                    {availability === option.id && (
                      <Check className="w-5 h-5 lg:w-6 lg:h-6 text-primary flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 lg:pt-4 mt-3 lg:mt-4 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-1.5 px-4 py-2 lg:px-5 lg:py-2.5 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors text-xs lg:text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                disabled={!availability}
                className={`flex items-center gap-1.5 px-5 py-2 lg:px-6 lg:py-2.5 rounded-lg font-semibold transition-colors text-xs lg:text-sm ${
                  availability
                    ? "bg-primary text-white hover:bg-accent"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Render step 4: Profile Photo
  if (currentStep === 4) {
    return (
      <div className="h-screen overflow-hidden bg-white flex flex-col">
        <main className="flex-1 overflow-y-auto px-3 md:px-4 lg:px-6 py-4 lg:py-6">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div className="mb-3 lg:mb-4 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-sm lg:text-base font-semibold text-gray-900">
                  Create your profile
                </h2>
                <span className="text-sm lg:text-base text-gray-500 font-medium">4/5</span>
              </div>
              <div className="w-full h-1 bg-primary rounded-full"></div>
            </div>

            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 flex-shrink-0">
              Add a profile photo
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-4 lg:mb-6 flex-shrink-0">
              Profiles with photos get 3x more views. Show clients who they'll
              be working with!
            </p>

            <div className="flex-1 flex flex-col justify-center">
              <IKContext
                publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
                urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
                authenticator={authenticator}
              >
                <div className="flex flex-col items-center justify-center p-6 lg:p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors mb-4">
                  {profilePhotoUrl ? (
                    <div className="text-center">
                      <div className="w-24 h-24 lg:w-28 lg:h-28 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                        <img
                          src={profilePhotoUrl}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-gray-700 font-semibold mb-2 text-sm lg:text-base">
                        Photo uploaded successfully!
                      </p>
                      <button
                        onClick={() => {
                          setProfilePhoto(null);
                          setProfilePhotoUrl("");
                          setProfilePhotoFileId("");
                        }}
                        className="text-red-500 hover:text-red-700 text-xs lg:text-sm"
                      >
                        Remove photo
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 lg:w-20 lg:h-20 mb-3 rounded-full bg-gray-200 flex items-center justify-center">
                        {isUploading ? (
                          <div className="animate-spin rounded-full h-8 w-8 lg:h-10 lg:w-10 border-b-2 border-primary"></div>
                        ) : (
                          <Upload className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
                        )}
                      </div>
                      <p className="text-gray-700 font-semibold mb-2 text-sm lg:text-base">
                        {isUploading
                          ? "Uploading..."
                          : "Upload a professional photo"}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-500 mb-3">
                        JPG, PNG or GIF (max 10MB)
                      </p>
                      <div className="relative">
                        <IKUpload
                          fileName="profile-photo.jpg"
                          folder="/user-profiles"
                          tags={["profile", "user"]}
                          onError={onUploadError}
                          onSuccess={onUploadSuccess}
                          onUploadStart={onUploadStart}
                          style={{ display: "none" }}
                          id="file-upload"
                          useUniqueFileName={true}
                          isPrivateFile={false}
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer inline-block px-5 py-2 lg:px-6 lg:py-2.5 bg-primary text-white rounded-lg hover:bg-accent transition-colors font-semibold disabled:opacity-50 text-xs lg:text-sm"
                        >
                          {isUploading ? "Uploading..." : "Choose Photo"}
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </IKContext>

              <div className="p-3 lg:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">
                  Photo tips:
                </h3>
                <ul className="text-xs lg:text-sm text-gray-600 space-y-0.5 lg:space-y-1">
                  <li>• Use a clear, recent photo of yourself</li>
                  <li>• Make sure your face is clearly visible</li>
                  <li>• Use good lighting and a neutral background</li>
                  <li>• Dress professionally</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 lg:pt-4 mt-3 lg:mt-4 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-1.5 px-4 py-2 lg:px-5 lg:py-2.5 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors text-xs lg:text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-5 py-2 lg:px-6 lg:py-2.5 rounded-lg font-semibold transition-colors bg-primary text-white hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-xs lg:text-sm"
              >
                {isSaving ? "Saving..." : "Complete Profile"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-3 md:px-4 lg:px-6 py-4 lg:py-6">
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          {/* Progress Section */}
          <div className="mb-3 lg:mb-4 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-sm lg:text-base font-semibold text-gray-900">
                Create your profile
              </h2>
              <span className="text-sm lg:text-base text-gray-500 font-medium">1/5</span>
            </div>
            <div className="w-12 lg:w-16 h-1 bg-primary rounded-full"></div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 flex-1">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 flex flex-col">
              <section className="flex-1 flex flex-col">
                <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 lg:mb-3">
                  How would you like to tell us about yourself?
                </h1>
                <p className="text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed mb-4 lg:mb-6">
                  We need to get a sense of your education, experience and
                  skills. It's quickest to import your information — you can
                  edit it before your profile goes live.
                </p>

                {/* Options */}
                <div className="space-y-2 lg:space-y-3">
                  {options.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelectedOption(option.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setSelectedOption(option.id);
                            e.preventDefault();
                          }
                        }}
                        aria-pressed={selectedOption === option.id}
                        className={`w-full p-3 lg:p-4 rounded-lg border-2 transition-all flex items-center gap-2 lg:gap-3 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                          selectedOption === option.id
                            ? "border-primary bg-primary/10"
                            : "border-primary bg-white hover:bg-primary/10"
                        }`}
                      >
                        <Icon
                          className="w-4 h-4 lg:w-5 lg:h-5 text-primary flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-semibold text-gray-900 text-sm lg:text-base">
                          {option.actionLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  aria-label="Upload resume file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      console.log("File selected:", e.target.files[0].name);
                    }
                  }}
                />
              </section>
            </div>

            {/* Right Column - Testimonial Card */}
            <aside className="lg:col-span-1 hidden lg:flex items-center">
              <article
                className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-4 lg:p-6 border border-primary/20 w-full shadow-sm"
                aria-label="QuickKam Pro Tip testimonial"
              >
                {/* Avatar */}
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg font-bold border-4 border-white shadow-lg">
                    QK
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-center mb-4">
                  <p className="text-gray-900 text-sm leading-relaxed font-medium">
                    "Your QuickKam profile is how you stand out from the crowd.
                    It's what you use to win work, so let's make it a good one."
                  </p>
                </blockquote>

                {/* Source */}
                <footer className="text-center">
                  <cite className="text-xs font-semibold text-gray-700 not-italic">
                    QuickKam Pro Tip
                  </cite>
                </footer>
              </article>
            </aside>
          </div>

          {/* Footer Navigation */}
          <div className="flex items-center justify-between gap-3 mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={handleStepBack}
              aria-label="Go back to previous step"
              className="flex items-center gap-1.5 px-4 py-2 lg:px-5 lg:py-2.5 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors text-xs lg:text-sm"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              Back
            </button>

            <button
              onClick={handleContinue}
              disabled={!selectedOption}
              aria-label={
                selectedOption
                  ? "Continue to next step"
                  : "Select an option to continue"
              }
              className={`flex items-center gap-1.5 px-5 py-2 lg:px-6 lg:py-2.5 rounded-lg font-semibold transition-colors text-xs lg:text-sm ${
                selectedOption
                  ? "bg-primary text-white hover:bg-accent"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Continue editing
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
