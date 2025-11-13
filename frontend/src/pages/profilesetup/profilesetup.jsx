"use client"

import { useState, useRef } from "react"
import { Upload, Linkedin, FileText, ChevronLeft, ChevronRight, Check, Plus, X, DollarSign } from "lucide-react"

export default function ResumeImport({ onBack, onContinue }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSpecialties, setSelectedSpecialties] = useState([])
  const [experience, setExperience] = useState("")
  const [bio, setBio] = useState("")
  const [skills, setSkills] = useState([])
  const [currentSkill, setCurrentSkill] = useState("")
  const [education, setEducation] = useState([{ school: "", degree: "", year: "" }])
  const [certifications, setCertifications] = useState([{ name: "", year: "" }])
  const [hourlyRate, setHourlyRate] = useState("")
  const [languages, setLanguages] = useState([{ language: "", proficiency: "" }])
  const [availability, setAvailability] = useState("")
  const [profilePhoto, setProfilePhoto] = useState(null)
  const fileInputRef = useRef(null)
  const photoInputRef = useRef(null)

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
  ]

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
    "Moving & Hauling"
  ]

  const specialties = {
    "Painting": [
      "Interior Painting",
      "Exterior Painting",
      "Commercial Painting",
      "Residential Painting",
      "Cabinet Painting & Refinishing",
      "Other - Painting"
    ],
    "Carpentry": [
      "Custom Furniture",
      "Door & Window Installation",
      "Deck & Fence Building",
      "Kitchen Cabinets",
      "Trim & Molding",
      "Other - Carpentry"
    ],
    "Plumbing": [
      "Leak Repair",
      "Drain Cleaning",
      "Water Heater Installation",
      "Pipe Installation & Repair",
      "Bathroom Plumbing",
      "Other - Plumbing"
    ],
    "Electrical": [
      "Wiring & Rewiring",
      "Lighting Installation",
      "Electrical Panel Upgrades",
      "Outlet & Switch Installation",
      "Emergency Electrical Repair",
      "Other - Electrical"
    ],
    "Cleaning": [
      "House Cleaning",
      "Deep Cleaning",
      "Office Cleaning",
      "Move-in/Move-out Cleaning",
      "Carpet & Upholstery Cleaning",
      "Other - Cleaning"
    ],
    "HVAC": [
      "Air Conditioning Repair",
      "Heating System Repair",
      "AC Installation",
      "Furnace Installation",
      "Duct Cleaning",
      "Other - HVAC"
    ],
    "Landscaping & Gardening": [
      "Lawn Mowing & Maintenance",
      "Garden Design & Installation",
      "Tree Trimming & Removal",
      "Irrigation System Installation",
      "Hardscaping",
      "Other - Landscaping"
    ],
    "Roofing": [
      "Roof Repair",
      "Roof Replacement",
      "Gutter Installation & Repair",
      "Roof Inspection",
      "Emergency Roof Repair",
      "Other - Roofing"
    ],
    "Masonry & Concrete": [
      "Concrete Pouring & Repair",
      "Brick & Stone Work",
      "Driveway Installation",
      "Patio & Walkway Construction",
      "Foundation Repair",
      "Other - Masonry"
    ],
    "Flooring": [
      "Hardwood Floor Installation",
      "Tile Installation",
      "Carpet Installation",
      "Laminate & Vinyl Flooring",
      "Floor Refinishing",
      "Other - Flooring"
    ],
    "Home Renovation": [
      "Kitchen Remodeling",
      "Bathroom Remodeling",
      "Basement Finishing",
      "Home Additions",
      "General Contracting",
      "Other - Renovation"
    ],
    "Moving & Hauling": [
      "Residential Moving",
      "Commercial Moving",
      "Furniture Delivery",
      "Junk Removal",
      "Packing Services",
      "Other - Moving & Hauling"
    ]
  }

  const handleFileClick = () => {
    if (selectedOption === "resume") {
      fileInputRef.current?.click()
    }
  }

  const handleContinue = () => {
    if (selectedOption === "manual") {
      setCurrentStep(1)
    } else {
      onContinue?.()
    }
  }

  const handleSpecialtyToggle = (specialty) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty))
    } else if (selectedSpecialties.length < 3) {
      setSelectedSpecialties([...selectedSpecialties, specialty])
    }
  }

  const handleStepContinue = () => {
    if (currentStep === 1 && selectedCategory) {
      setCurrentStep(2)
    } else if (currentStep === 2 && selectedSpecialties.length >= 1 && selectedSpecialties.length <= 3) {
      setCurrentStep(3)
    } else if (currentStep === 3 && experience) {
      setCurrentStep(4)
    } else if (currentStep === 4 && bio.length >= 50) {
      setCurrentStep(5)
    } else if (currentStep === 5 && skills.length >= 3) {
      setCurrentStep(6)
    } else if (currentStep === 6) {
      setCurrentStep(7)
    } else if (currentStep === 7 && hourlyRate) {
      setCurrentStep(8)
    } else if (currentStep === 8) {
      setCurrentStep(9)
    } else if (currentStep === 9 && availability) {
      setCurrentStep(10)
    } else if (currentStep === 10) {
      onContinue?.()
    }
  }

  const handleStepBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0)
      setSelectedOption(null)
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack?.()
    }
  }

  const addSkill = () => {
    if (currentSkill.trim() && skills.length < 15) {
      setSkills([...skills, currentSkill.trim()])
      setCurrentSkill("")
    }
  }

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const addEducation = () => {
    setEducation([...education, { school: "", degree: "", year: "" }])
  }

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const updateEducation = (index, field, value) => {
    const updated = [...education]
    updated[index][field] = value
    setEducation(updated)
  }

  const addCertification = () => {
    setCertifications([...certifications, { name: "", year: "" }])
  }

  const removeCertification = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index))
  }

  const updateCertification = (index, field, value) => {
    const updated = [...certifications]
    updated[index][field] = value
    setCertifications(updated)
  }

  const addLanguage = () => {
    setLanguages([...languages, { language: "", proficiency: "" }])
  }

  const removeLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index))
  }

  const updateLanguage = (index, field, value) => {
    const updated = [...languages]
    updated[index][field] = value
    setLanguages(updated)
  }

  // Render step 1: Category selection
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-white">
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Create your profile</h2>
                <span className="text-lg text-gray-500 font-medium">1/10</span>
              </div>
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-8">Select 1 category</h1>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16">
              {categories.map((category) => {
                const categoryIcons = {
                  "Painting": "🎨",
                  "Carpentry": "🔨",
                  "Plumbing": "🔧",
                  "Electrical": "⚡",
                  "Cleaning": "🧹",
                  "HVAC": "❄️",
                  "Landscaping & Gardening": "🌿",
                  "Roofing": "🏠",
                  "Masonry & Concrete": "🧱",
                  "Flooring": "📐",
                  "Home Renovation": "🏗️",
                  "Moving & Hauling": "🚚"
                }
                return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-4 rounded-lg border-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                    selectedCategory === category
                      ? "border-primary bg-primary/10"
                      : "border-gray-300 bg-white hover:border-primary hover:bg-primary/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{categoryIcons[category]}</span>
                    <span className="font-semibold text-gray-900">{category}</span>
                  </div>
                </button>
                )
              })}
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-200">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-2 px-6 py-3 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                disabled={!selectedCategory}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  selectedCategory
                    ? "bg-primary text-white hover:bg-accent"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next: Select specialties
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Render step 2: Specialty selection
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-white">
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Create your profile</h2>
                <span className="text-lg text-gray-500 font-medium">2/10</span>
              </div>
              <div className="w-32 h-1 bg-primary rounded-full"></div>
            </div>

            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                {selectedCategory}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-8">Now, select 1 to 3 specialties</h1>

            {/* Specialties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16">
              {specialties[selectedCategory]?.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => handleSpecialtyToggle(specialty)}
                  disabled={!selectedSpecialties.includes(specialty) && selectedSpecialties.length >= 3}
                  className={`p-4 rounded-lg border-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary relative ${
                    selectedSpecialties.includes(specialty)
                      ? "border-primary bg-primary/10"
                      : selectedSpecialties.length >= 3
                      ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                      : "border-gray-300 bg-white hover:border-primary hover:bg-primary/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`font-semibold ${
                      selectedSpecialties.includes(specialty) ? "text-gray-900" : "text-gray-700"
                    }`}>
                      {specialty}
                    </span>
                    {selectedSpecialties.includes(specialty) && (
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-600 mb-8">
              Selected: {selectedSpecialties.length} of 3 maximum
            </p>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-200">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-2 px-6 py-3 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                disabled={selectedSpecialties.length < 1}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  selectedSpecialties.length >= 1
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
    )
  }

  // Render step 3: Experience level
  if (currentStep === 3) {
    const experienceLevels = [
      {
        id: "beginner",
        title: "Entry Level",
        description: "I'm new to this field and looking to gain experience",
        details: "Less than 1 year of experience"
      },
      {
        id: "intermediate",
        title: "Intermediate",
        description: "I have some experience and can work independently",
        details: "1-3 years of experience"
      },
      {
        id: "expert",
        title: "Expert",
        description: "I'm highly experienced and can handle complex projects",
        details: "3+ years of experience"
      }
    ]

    return (
      <div className="min-h-screen bg-white">
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Create your profile</h2>
                <span className="text-lg text-gray-500 font-medium">3/10</span>
              </div>
              <div className="w-48 h-1 bg-primary rounded-full"></div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">What is your level of experience?</h1>
            
            <div className="flex justify-center mb-8">
              <div className="w-full max-w-md h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center border border-primary/20">
                <div className="text-center">
                  <div className="text-6xl mb-2">📊</div>
                  <p className="text-sm text-gray-600 font-medium">Choose your experience level</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-16">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setExperience(level.id)}
                  className={`w-full p-6 rounded-lg border-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                    experience === level.id
                      ? "border-primary bg-primary/10"
                      : "border-gray-300 bg-white hover:border-primary hover:bg-primary/10"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{level.title}</h3>
                      <p className="text-gray-700 mb-2">{level.description}</p>
                      <p className="text-sm text-gray-500">{level.details}</p>
                    </div>
                    {experience === level.id && (
                      <Check className="w-6 h-6 text-primary flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-200">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-2 px-6 py-3 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                disabled={!experience}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  experience
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
    )
  }

  // Render step 4: Bio/Overview
  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-white">
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Create your profile</h2>
                <span className="text-lg text-gray-500 font-medium">4/10</span>
              </div>
              <div className="w-64 h-1 bg-primary rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Write a bio that stands out</h1>
                <p className="text-lg text-gray-600 mb-4">Tell clients about your experience, skills, and what makes you the best choice for their project.</p>
              </div>
              <div className="lg:col-span-1 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center border-4 border-primary/20">
                  <span className="text-5xl">✍️</span>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Describe your professional background, skills, and what services you offer. Highlight what makes you unique..."
                className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                maxLength={5000}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">Minimum 50 characters</p>
                <p className="text-sm text-gray-500">{bio.length}/5000</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-200">
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
    )
  }

  // Render step 5: Skills
  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-white">
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Create your profile</h2>
                <span className="text-lg text-gray-500 font-medium">5/10</span>
              </div>
              <div className="w-80 h-1 bg-primary rounded-full"></div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Add your key skills</h1>
                <p className="text-lg text-gray-600">Add at least 3 skills that showcase your expertise (max 15)</p>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center border-4 border-primary/20">
                  <span className="text-4xl">💡</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  placeholder="e.g., Interior Painting, Electrical Wiring, Plumbing Repair"
                  className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  maxLength={50}
                />
                <button
                  onClick={addSkill}
                  disabled={!currentSkill.trim() || skills.length >= 15}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    currentSkill.trim() && skills.length < 15
                      ? "bg-primary text-white hover:bg-accent"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mb-16">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(index)}
                      className="hover:text-accent"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">Added: {skills.length} skills</p>
            </div>

            <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-200">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-2 px-6 py-3 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                disabled={skills.length < 3}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  skills.length >= 3
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
    )
  }

  // Render step 6: Education & Certifications
  if (currentStep === 6) {
    return (
      <div className="min-h-screen bg-white">
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Create your profile</h2>
                <span className="text-lg text-gray-500 font-medium">6/10</span>
              </div>
              <div className="h-1 bg-primary rounded-full" style={{width: '60%'}}></div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Education & Certifications</h1>
                <p className="text-lg text-gray-600">Add your educational background and any relevant certifications (optional)</p>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center border-4 border-primary/20">
                  <span className="text-4xl">🎓</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Education</h3>
                <button
                  onClick={addEducation}
                  className="flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10"
                >
                  <Plus className="w-4 h-4" />
                  Add Education
                </button>
              </div>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="p-4 border-2 border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-gray-700">Entry {index + 1}</h4>
                      {education.length > 1 && (
                        <button
                          onClick={() => removeEducation(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => updateEducation(index, 'school', e.target.value)}
                        placeholder="School/Institution"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        placeholder="Degree/Certificate"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => updateEducation(index, 'year', e.target.value)}
                        placeholder="Year (e.g., 2020)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Certifications</h3>
                <button
                  onClick={addCertification}
                  className="flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10"
                >
                  <Plus className="w-4 h-4" />
                  Add Certification
                </button>
              </div>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="p-4 border-2 border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-gray-700">Certification {index + 1}</h4>
                      <button
                        onClick={() => removeCertification(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(index, 'name', e.target.value)}
                        placeholder="Certification Name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        value={cert.year}
                        onChange={(e) => updateCertification(index, 'year', e.target.value)}
                        placeholder="Year Obtained"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-200">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-2 px-6 py-3 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary bg-primary text-white hover:bg-accent"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Render step 7: Hourly Rate
  if (currentStep === 7) {
    return (
      <div className="min-h-screen bg-white">
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Create your profile</h2>
                <span className="text-lg text-gray-500 font-medium">7/10</span>
              </div>
              <div className="h-1 bg-primary rounded-full" style={{width: '70%'}}></div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Set your hourly rate</h1>
                <p className="text-lg text-gray-600">Clients will see this rate on your profile. You can adjust it anytime.</p>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center border-4 border-primary/20">
                  <span className="text-4xl">💰</span>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="w-6 h-6 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-12 pr-4 py-4 text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-xl text-gray-500">/hr</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">QuickKam service fee</h3>
                <p className="text-sm text-gray-600 mb-3">QuickKam charges a 10% service fee on your earnings</p>
                {hourlyRate && (
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Your rate:</span>
                      <span className="font-semibold">${parseFloat(hourlyRate).toFixed(2)}/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee (10%):</span>
                      <span className="font-semibold">-${(parseFloat(hourlyRate) * 0.1).toFixed(2)}/hr</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-blue-300">
                      <span className="text-gray-900 font-semibold">You'll receive:</span>
                      <span className="font-bold text-primary">${(parseFloat(hourlyRate) * 0.9).toFixed(2)}/hr</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-200">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-2 px-6 py-3 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                disabled={!hourlyRate || parseFloat(hourlyRate) <= 0}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  hourlyRate && parseFloat(hourlyRate) > 0
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
    )
  }

  // Render step 8: Languages
  if (currentStep === 8) {
    return (
      <div className="min-h-screen bg-white">
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Create your profile</h2>
                <span className="text-lg text-gray-500 font-medium">8/10</span>
              </div>
              <div className="h-1 bg-primary rounded-full" style={{width: '80%'}}></div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">What languages do you speak?</h1>
                <p className="text-lg text-gray-600">This helps clients know how to communicate with you</p>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center border-4 border-primary/20">
                  <span className="text-4xl">🌍</span>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Languages</h3>
                <button
                  onClick={addLanguage}
                  className="flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10"
                >
                  <Plus className="w-4 h-4" />
                  Add Language
                </button>
              </div>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index} className="p-4 border-2 border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-gray-700">Language {index + 1}</h4>
                      {languages.length > 1 && (
                        <button
                          onClick={() => removeLanguage(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={lang.language}
                        onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                        placeholder="Language (e.g., English)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <select
                        value={lang.proficiency}
                        onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select Proficiency</option>
                        <option value="basic">Basic</option>
                        <option value="conversational">Conversational</option>
                        <option value="fluent">Fluent</option>
                        <option value="native">Native/Bilingual</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-200">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-2 px-6 py-3 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary bg-primary text-white hover:bg-accent"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Render step 9: Availability
  if (currentStep === 9) {
    const availabilityOptions = [
      {
        id: "full-time",
        title: "More than 30 hrs/week",
        description: "Full-time availability"
      },
      {
        id: "part-time",
        title: "15-30 hrs/week",
        description: "Part-time availability"
      },
      {
        id: "occasional",
        title: "Less than 15 hrs/week",
        description: "Occasional/weekend work"
      }
    ]

    return (
      <div className="min-h-screen bg-white">
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Create your profile</h2>
                <span className="text-lg text-gray-500 font-medium">9/10</span>
              </div>
              <div className="h-1 bg-primary rounded-full" style={{width: '90%'}}></div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">How much time do you have available?</h1>
                <p className="text-lg text-gray-600">This helps clients understand your capacity for new projects</p>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center border-4 border-primary/20">
                  <span className="text-4xl">📅</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-16">
              {availabilityOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setAvailability(option.id)}
                  className={`w-full p-6 rounded-lg border-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                    availability === option.id
                      ? "border-primary bg-primary/10"
                      : "border-gray-300 bg-white hover:border-primary hover:bg-primary/10"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{option.title}</h3>
                      <p className="text-gray-600">{option.description}</p>
                    </div>
                    {availability === option.id && (
                      <Check className="w-6 h-6 text-primary flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-200">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-2 px-6 py-3 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                disabled={!availability}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  availability
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
    )
  }

  // Render step 10: Profile Photo
  if (currentStep === 10) {
    return (
      <div className="min-h-screen bg-white">
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Create your profile</h2>
                <span className="text-lg text-gray-500 font-medium">10/10</span>
              </div>
              <div className="w-full h-1 bg-primary rounded-full"></div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">Add a profile photo</h1>
            <p className="text-lg text-gray-600 mb-8">Profiles with photos get 3x more views. Show clients who they'll be working with!</p>

            <div className="mb-16">
              <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors">
                {profilePhoto ? (
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                      <img 
                        src={URL.createObjectURL(profilePhoto)} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-gray-700 font-semibold mb-2">{profilePhoto.name}</p>
                    <button
                      onClick={() => setProfilePhoto(null)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove photo
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-24 h-24 mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                      <Upload className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-700 font-semibold mb-2">Upload a professional photo</p>
                    <p className="text-sm text-gray-500 mb-4">JPG, PNG or GIF (max 5MB)</p>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setProfilePhoto(e.target.files[0])
                        }
                      }}
                    />
                    <button
                      onClick={() => photoInputRef.current?.click()}
                      className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors font-semibold"
                    >
                      Choose Photo
                    </button>
                  </>
                )}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Photo tips:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Use a clear, recent photo of yourself</li>
                  <li>• Make sure your face is clearly visible</li>
                  <li>• Use good lighting and a neutral background</li>
                  <li>• Dress professionally</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-200">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-2 px-6 py-3 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary bg-primary text-white hover:bg-accent"
              >
                Complete Profile
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Create your profile</h2>
              <span className="text-lg text-gray-500 font-medium">1/10</span>
            </div>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              <section>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">How would you like to tell us about yourself?</h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  We need to get a sense of your education, experience and skills. It's quickest to import your
                  information — you can edit it before your profile goes live.
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {options.map((option) => {
                    const Icon = option.icon
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelectedOption(option.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setSelectedOption(option.id)
                            e.preventDefault()
                          }
                        }}
                        aria-pressed={selectedOption === option.id}
                        className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                          selectedOption === option.id
                            ? "border-primary bg-primary/10"
                            : "border-primary bg-white hover:bg-primary/10"
                        }`}
                      >
                        <Icon className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                        <span className="font-semibold text-gray-900">{option.actionLabel}</span>
                      </button>
                    )
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
                      console.log("File selected:", e.target.files[0].name)
                    }
                  }}
                />
              </section>
            </div>

            {/* Right Column - Testimonial Card */}
            <aside className="lg:col-span-1 flex items-center">
              <article
                className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8 border border-primary/20 w-full shadow-sm"
                aria-label="QuickKam Pro Tip testimonial"
              >
                {/* Avatar */}
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                    QK
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-center mb-6">
                  <p className="text-gray-900 text-base leading-relaxed font-medium">
                    "Your QuickKam profile is how you stand out from the crowd. It's what you use to win work, so let's
                    make it a good one."
                  </p>
                </blockquote>

                {/* Source */}
                <footer className="text-center">
                  <cite className="text-sm font-semibold text-gray-700 not-italic">QuickKam Pro Tip</cite>
                </footer>
              </article>
            </aside>
          </div>

          {/* Footer Navigation */}
          <div className="flex items-center justify-between gap-4 mt-16 pt-8 border-t border-gray-200">
            <button
              onClick={handleStepBack}
              aria-label="Go back to previous step"
              className="flex items-center gap-2 px-6 py-3 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              Back
            </button>

            <button
              onClick={handleContinue}
              disabled={!selectedOption}
              aria-label={selectedOption ? "Continue to next step" : "Select an option to continue"}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                selectedOption
                  ? "bg-primary text-white hover:bg-accent"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Continue editing your profile
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}