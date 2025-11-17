"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { IKContext, IKUpload } from "imagekitio-react";
import { Upload, ChevronLeft, ChevronRight } from "lucide-react";

export default function ClientProfileSetup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [profilePhotoFileId, setProfilePhotoFileId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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
    setProfilePhotoUrl(res.url);
    setProfilePhotoFileId(res.fileId);
    setProfilePhoto(res);
    setIsUploading(false);
  };

  const onUploadError = (err) => {
    console.error("Upload error:", err);
    alert(`Image upload failed: ${err.message || "Unknown error"}`);
    setIsUploading(false);
  };

  const handleStepContinue = () => {
    if (currentStep === 0 && bio.length >= 30) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      handleSaveProfile();
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      const profileData = {
        companyName: companyName,
        bio: bio,
        profilePhoto: profilePhotoUrl,
        profilePhotoFileId: profilePhotoFileId,
        userType: "client",
      };

      const data = await api.auth.updateProfile(profileData);

      console.log("Client profile saved successfully:", data);
      navigate("/explore");
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

  const handleStepBack = () => {
    if (currentStep === 0) {
      navigate("/aftersignup/client-questions");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step 0: Bio/About
  if (currentStep === 0) {
    return (
      <div className="h-screen overflow-hidden bg-white flex flex-col">
        <main className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-6 py-6 lg:py-8">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div className="mb-6 lg:mb-8 flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-base lg:text-lg font-semibold text-gray-900">
                  Complete your profile
                </h2>
                <span className="text-base lg:text-lg text-gray-500 font-medium">1/2</span>
              </div>
              <div className="w-48 lg:w-64 h-1 bg-primary rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8 flex-shrink-0">
              <div className="lg:col-span-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                  Tell us about yourself
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-gray-600">
                  Share information about your company or project needs. This helps
                  freelancers understand what you're looking for.
                </p>
              </div>
              <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center border-4 border-primary/20">
                  <span className="text-4xl lg:text-5xl">💼</span>
                </div>
              </div>
            </div>

            {/* Company Name (Optional) */}
            <div className="mb-4 lg:mb-6 flex-shrink-0">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Company Name (Optional)
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your company or organization name"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base"
                maxLength={100}
              />
            </div>

            {/* Bio */}
            <div className="flex-1 flex flex-col mb-6 lg:mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                About You
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell freelancers about your business, what types of projects you typically need help with, and what you're looking for..."
                className="w-full flex-1 min-h-[200px] p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none text-base"
                maxLength={2000}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">Minimum 30 characters</p>
                <p className="text-sm text-gray-500">{bio.length}/2000</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-6 lg:pt-8 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-2 px-6 py-3 text-primary font-semibold border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-md hover:shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleStepContinue}
                disabled={bio.length < 30}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  bio.length >= 30
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

  // Step 1: Profile Photo
  if (currentStep === 1) {
    return (
      <div className="h-screen overflow-hidden bg-white flex flex-col">
        <main className="flex-1 overflow-y-auto px-3 md:px-4 lg:px-6 py-4 lg:py-6">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div className="mb-3 lg:mb-4 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-sm lg:text-base font-semibold text-gray-900">
                  Complete your profile
                </h2>
                <span className="text-sm lg:text-base text-gray-500 font-medium">2/2</span>
              </div>
              <div className="w-full h-1 bg-primary rounded-full"></div>
            </div>

            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 flex-shrink-0">
              Add a profile photo
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-4 lg:mb-6 flex-shrink-0">
              A professional photo helps freelancers recognize you and builds trust.
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
                          fileName="client-profile-photo.jpg"
                          folder="/client-profiles"
                          tags={["profile", "client"]}
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
                  <li>• Use a clear, recent photo</li>
                  <li>• Make sure your face is clearly visible</li>
                  <li>• Use good lighting and a neutral background</li>
                  <li>• Dress professionally</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 lg:pt-4 mt-3 lg:mt-4 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={handleStepBack}
                className="flex items-center gap-1.5 px-4 py-2 lg:px-5 lg:py-2.5 text-primary font-semibold border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] text-xs lg:text-sm"
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

  return null;
}
