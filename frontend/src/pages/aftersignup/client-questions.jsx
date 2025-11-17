"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientQuestionnaire() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    hiringExperience: null,
    projectSize: null,
    hiringGoal: null,
    projectType: [],
  });
  const [error, setError] = useState("");

  const steps = [
    {
      title: "First, have you hired or managed freelancers before?",
      description:
        "This helps us understand how much guidance to provide. We won't share your answer with freelancers.",
      type: "single",
      options: [
        {
          id: "first-time",
          label: "I'm new to hiring",
          icon: "🎯",
          emoji: "target",
        },
        {
          id: "some-experience",
          label: "I have some experience",
          icon: "💼",
          emoji: "briefcase",
        },
        {
          id: "experienced",
          label: "I'm experienced at hiring",
          icon: "⭐",
          emoji: "star",
        },
      ],
      key: "hiringExperience",
      allowSkip: true,
    },
    {
      title: "What kind of work are you looking to get done?",
      description:
        "Select all that apply. This helps us recommend the right freelancers for your needs.",
      type: "multiple",
      options: [
        {
          id: "painting",
          label: "Painting",
          icon: "🎨",
          emoji: "art",
        },
        {
          id: "carpentry",
          label: "Carpentry",
          icon: "🔨",
          emoji: "hammer",
        },
        {
          id: "plumbing",
          label: "Plumbing",
          icon: "🔧",
          emoji: "wrench",
        },
        {
          id: "electrical",
          label: "Electrical",
          icon: "⚡",
          emoji: "lightning",
        },
        {
          id: "cleaning",
          label: "Cleaning",
          icon: "🧹",
          emoji: "broom",
        },
        {
          id: "hvac",
          label: "HVAC",
          icon: "❄️",
          emoji: "snowflake",
        },
        {
          id: "landscaping",
          label: "Landscaping & Gardening",
          icon: "🌿",
          emoji: "plant",
        },
        {
          id: "roofing",
          label: "Roofing",
          icon: "🏠",
          emoji: "house",
        },
        {
          id: "masonry",
          label: "Masonry & Concrete",
          icon: "🧱",
          emoji: "brick",
        },
        {
          id: "flooring",
          label: "Flooring",
          icon: "📐",
          emoji: "ruler",
        },
        {
          id: "renovation",
          label: "Home Renovation",
          icon: "🏗️",
          emoji: "construction",
        },
        {
          id: "moving",
          label: "Moving & Hauling",
          icon: "🚚",
          emoji: "truck",
        },
      ],
      key: "projectType",
      allowSkip: true,
    },
    {
      title: "What's the size of your project?",
      description:
        "This helps us match you with freelancers who are the best fit for your project scope.",
      type: "single",
      options: [
        {
          id: "small",
          label: "Small",
          description: "Quick and straightforward tasks",
          icon: "📋",
          emoji: "clipboard",
        },
        {
          id: "medium",
          label: "Medium",
          description: "Well-defined projects with clear scope",
          icon: "📦",
          emoji: "package",
        },
        {
          id: "large",
          label: "Large",
          description: "Longer-term or complex initiatives",
          icon: "🏢",
          emoji: "building",
        },
      ],
      key: "projectSize",
      allowSkip: true,
    },
    {
      title: "What's your goal for hiring?",
      description:
        "Understanding your objectives helps us provide better recommendations and support throughout your hiring journey.",
      type: "single",
      options: [
        {
          id: "fill-skill-gap",
          label: "Fill a skill gap on my team",
          icon: "🎯",
          emoji: "target",
        },
        {
          id: "supplement-team",
          label: "Supplement my team's bandwidth",
          icon: "⚡",
          emoji: "lightning",
        },
        {
          id: "build-team",
          label: "Build a team for a new initiative",
          icon: "👥",
          emoji: "people",
        },
        {
          id: "one-time-project",
          label: "Complete a one-time project",
          icon: "✅",
          emoji: "check",
        },
      ],
      key: "hiringGoal",
      allowSkip: true,
    },
  ];

  const currentQuestion = steps[currentStep];
  const currentAnswer = answers[currentQuestion.key];

  const handleSelect = (optionId) => {
    if (currentQuestion.type === "single") {
      setAnswers({ ...answers, [currentQuestion.key]: optionId });
      setError("");
    } else {
      setAnswers({
        ...answers,
        [currentQuestion.key]: Array.isArray(currentAnswer)
          ? currentAnswer.includes(optionId)
            ? currentAnswer.filter((id) => id !== optionId)
            : [...currentAnswer, optionId]
          : [optionId],
      });
      setError("");
    }
  };

  const handleNext = () => {
    if (currentQuestion.type === "single" && !currentAnswer) {
      setError("Field selection required");
      return;
    }

    if (
      currentQuestion.type === "multiple" &&
      (!Array.isArray(currentAnswer) || currentAnswer.length === 0)
    ) {
      setError("Please select at least one option");
      return;
    }

    setError("");

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Client form completed with answers:", answers);
      // Navigate to client profile setup
      navigate("/aftersignup/client-profile-setup");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError("");
    } else {
      // If on first step, go back to user type selection
      navigate("/aftersignup/usertype");
    }
  };

  const handleSkip = () => {
    setError("");
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // If on last step and skipping, go to profile setup
      console.log("Client form skipped with answers:", answers);
      navigate("/aftersignup/client-profile-setup");
    }
  };

  const isSelected = (optionId) => {
    if (currentQuestion.type === "single") {
      return currentAnswer === optionId;
    }
    return Array.isArray(currentAnswer) && currentAnswer.includes(optionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 flex lg:items-center p-3 md:p-4 lg:p-6">
      <div className="w-full max-w-6xl flex flex-col animate-in fade-in-50 duration-700 py-4 lg:py-8">
        {/* Progress Indicator */}
        <div className="mb-3 lg:mb-5 animate-in slide-in-from-top-5 duration-500 flex-shrink-0">
          <div className="text-xs lg:text-sm font-semibold text-slate-700 mb-2">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="h-1.5 lg:h-2 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out rounded-full shadow-sm"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Title and Description */}
        <div className="mb-3 lg:mb-5 animate-in fade-in-50 slide-in-from-bottom-3 duration-700 flex-shrink-0">
          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-slate-900 mb-2 leading-tight">
            {currentQuestion.title}
          </h1>
          <p className="text-xs md:text-sm lg:text-base text-slate-600 leading-relaxed max-w-4xl">
            {currentQuestion.description}
          </p>
        </div>

        {/* Options Grid */}
        <div className="mb-3 lg:mb-5 flex-shrink-0">
          <div
            className={`grid gap-3 lg:gap-4 ${
              currentQuestion.type === "single" &&
              currentQuestion.options.length === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : currentQuestion.type === "single" &&
                  currentQuestion.options.length === 4
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
                : currentQuestion.type === "multiple" &&
                  currentQuestion.options.length === 12
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {currentQuestion.options.map((option, index) => (
              <div
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`relative p-3 lg:p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] group animate-in fade-in-50 zoom-in-95 ${
                  isSelected(option.id)
                    ? "border-primary bg-primary/5 shadow-xl"
                    : "border-slate-300 bg-white hover:border-primary/50 shadow-md hover:shadow-xl"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon/Emoji Display */}
                <div className="mb-2 lg:mb-3 h-12 w-12 lg:h-16 lg:w-16 flex items-center justify-center mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl shadow-inner group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                  <span className="text-3xl lg:text-4xl" role="img" aria-label={option.emoji}>
                    {option.icon}
                  </span>
                </div>

                {/* Selection Indicator */}
                <div
                  className={`absolute top-3 right-3 w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected(option.id)
                      ? "border-primary bg-primary scale-110 shadow-md"
                      : "border-slate-300 bg-white group-hover:border-primary/50"
                  }`}
                >
                  {currentQuestion.type === "single" && isSelected(option.id) && (
                    <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-white" />
                  )}
                  {currentQuestion.type === "multiple" &&
                    isSelected(option.id) && (
                      <div className="text-white text-xs lg:text-sm font-bold">✓</div>
                    )}
                </div>

                {/* Label */}
                <h3
                  className={`font-bold mb-1 text-xs md:text-sm lg:text-base text-center transition-colors ${
                    isSelected(option.id) ? "text-slate-900" : "text-slate-800"
                  }`}
                >
                  {option.label}
                </h3>

                {/* Description (for options with descriptions) */}
                {option.description && (
                  <p className="text-xs lg:text-sm text-slate-600 leading-snug text-center">
                    {option.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 p-2 lg:p-3 bg-destructive/10 border-l-4 border-destructive rounded-lg text-destructive text-xs lg:text-sm font-semibold animate-in shake flex-shrink-0">
            ⚠️ {error}
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-slate-200 flex-wrap gap-2 flex-shrink-0">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 lg:gap-2 px-4 py-2 lg:px-5 lg:py-2.5 border-2 rounded-lg lg:rounded-xl font-semibold transition-all duration-300 text-xs lg:text-sm border-primary text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            ← Back
          </button>

          <div className="flex gap-2 flex-wrap justify-end">
            {currentQuestion.allowSkip && (
              <button
                onClick={handleSkip}
                className="px-4 py-2 lg:px-5 lg:py-2.5 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg lg:rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] text-xs lg:text-sm"
              >
                Skip
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-5 py-2 lg:px-6 lg:py-2.5 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-lg lg:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] text-xs lg:text-sm"
            >
              {currentStep === steps.length - 1 ? "Start Hiring →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
