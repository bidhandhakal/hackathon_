"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Questionnaire() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    experience: null,
    goal: null,
    workPreference: [],
  });
  const [error, setError] = useState("");

  const steps = [
    {
      title: "A few quick questions: first, have you freelanced before?",
      description:
        "This lets us know how much help to give you along the way. We won't share your answer with anyone else, including potential clients.",
      type: "single",
      options: [
        {
          id: "brand-new",
          label: "I am brand new to this",
          icon: "🎓",
          emoji: "student",
        },
        {
          id: "some-experience",
          label: "I have some experience",
          icon: "💼",
          emoji: "professional",
        },
        {
          id: "expert",
          label: "I am an expert",
          icon: "⭐",
          emoji: "expert",
        },
      ],
      key: "experience",
      allowSkip: true,
    },
    {
      title: "Got it. What's your biggest goal for freelancing?",
      description:
        "Different people come to Upwork for various reasons. We want to highlight the opportunities that fit your goals best while still showing you all the possibilities.",
      type: "single",
      options: [
        {
          id: "main-income",
          label: "To earn my main income",
          icon: "💰",
          emoji: "money",
        },
        {
          id: "side-income",
          label: "To make money on the side",
          icon: "💵",
          emoji: "cash",
        },
        {
          id: "experience",
          label: "To get experience, for a full-time job",
          icon: "🏆",
          emoji: "trophy",
        },
        {
          id: "no-goal",
          label: "I don't have a goal in mind yet",
          icon: "🤔",
          emoji: "thinking",
        },
      ],
      key: "goal",
      allowSkip: true,
    },
    {
      title: "And how would you like to work?",
      description:
        "Everybody works in different ways, so we have different ways of helping you win work. You can select multiple preferences now and can always change it later!",
      type: "multiple",
      options: [
        {
          id: "find-opportunities",
          label: "I'd like to find opportunities myself",
          description:
            "Clients post jobs on our Talent Marketplace™: you can browse and bid for them, or get invited by a client.",
          icon: "🔍",
          emoji: "search",
        },
        {
          id: "package-work",
          label: "I'd like to package up my work for clients to buy",
          description:
            "Define your service with prices and timelines: we'll list it in our Project Catalog™ for clients to buy right away.",
          icon: "📦",
          emoji: "package",
        },
      ],
      key: "workPreference",
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
      setError("Field selection required");
      return;
    }

    setError("");

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Form completed with answers:", answers);
      navigate("/aftersignup/profilesetup");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError("");
    }
  };

  const handleSkip = () => {
    setError("");
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const isSelected = (optionId) => {
    if (currentQuestion.type === "single") {
      return currentAnswer === optionId;
    }
    return Array.isArray(currentAnswer) && currentAnswer.includes(optionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl animate-in fade-in-50 duration-700">
        {/* Progress Indicator */}
        <div className="mb-8 animate-in slide-in-from-top-5 duration-500">
          <div className="text-sm font-semibold text-slate-700 mb-3">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out rounded-full shadow-sm"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Title and Description */}
        <div className="mb-12 animate-in fade-in-50 slide-in-from-bottom-3 duration-700">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            {currentQuestion.title}
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-4xl">
            {currentQuestion.description}
          </p>
        </div>

        {/* Options Grid */}
        <div
          className={`grid gap-5 mb-10 ${
            currentQuestion.type === "single" &&
            currentQuestion.options.length === 3
              ? "grid-cols-1 md:grid-cols-3"
              : currentQuestion.type === "single" &&
                currentQuestion.options.length === 4
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          {currentQuestion.options.map((option, index) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 group animate-in fade-in-50 zoom-in-95 ${
                isSelected(option.id)
                  ? "border-primary bg-primary/5 shadow-xl"
                  : "border-slate-300 bg-white hover:border-primary/50 shadow-md hover:shadow-xl"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon/Emoji Display */}
              <div className="mb-5 h-24 w-24 flex items-center justify-center mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl shadow-inner group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                <span className="text-6xl" role="img" aria-label={option.emoji}>
                  {option.icon}
                </span>
              </div>

              {/* Selection Indicator */}
              <div
                className={`absolute top-5 right-5 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected(option.id)
                    ? "border-primary bg-primary scale-110 shadow-md"
                    : "border-slate-300 bg-white group-hover:border-primary/50"
                }`}
              >
                {currentQuestion.type === "single" && isSelected(option.id) && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
                {currentQuestion.type === "multiple" &&
                  isSelected(option.id) && (
                    <div className="text-white text-sm font-bold">✓</div>
                  )}
              </div>

              {/* Label */}
              <h3
                className={`font-bold mb-2 text-base md:text-lg text-center transition-colors ${
                  isSelected(option.id) ? "text-slate-900" : "text-slate-800"
                }`}
              >
                {option.label}
              </h3>

              {/* Description (for multiple choice) */}
              {option.description && (
                <p className="text-sm md:text-base text-slate-600 leading-relaxed text-center">
                  {option.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border-l-4 border-destructive rounded-lg text-destructive text-sm font-semibold animate-in shake">
            ⚠️ {error}
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 flex-wrap gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 border-2 rounded-xl font-semibold transition-all duration-300 ${
              currentStep === 0
                ? "border-slate-200 text-slate-400 cursor-not-allowed"
                : "border-primary text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg hover:scale-105"
            }`}
          >
            ← Back
          </button>

          <div className="flex gap-3 flex-wrap justify-end">
            {currentQuestion.allowSkip && (
              <button
                onClick={handleSkip}
                className="px-6 py-3 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                Skip for now
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {currentStep === steps.length - 1 ? "Create Profile →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
