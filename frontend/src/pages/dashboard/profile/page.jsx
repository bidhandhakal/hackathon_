import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Star, MapPin, Upload } from "lucide-react";
import { api } from "@/lib/api";
import { IKContext, IKUpload } from "imagekitio-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    category: "",
    specialties: [],
    availability: "",
    profilePhoto: "",
    profilePhotoFileId: "",
    rating: 0,
    reviews: 0,
    completedJobs: 0,
    verified: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const data = await api.auth.getProfile();
      setProfile(data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert(error.response?.data?.message || "Failed to fetch profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      console.log("Updating profile with data:", {
        fullname: profile.fullname,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
      });

      const data = await api.auth.updateProfile({
        fullname: profile.fullname,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
      });

      console.log("Profile updated successfully:", data);
      setProfile(data.user);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(
        `An error occurred while updating your profile: ${
          error.response?.data?.message || error.message
        }`
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
      throw error;
    }
  };

  // ImageKit upload callbacks
  const onPhotoUploadStart = () => {
    setIsUploadingPhoto(true);
  };

  const onPhotoUploadSuccess = async (res) => {
    console.log("Photo upload successful:", res);
    try {
      const data = await api.auth.updateProfile({
        profilePhoto: res.url,
        profilePhotoFileId: res.fileId,
      });

      setProfile(data.user);
      alert("Profile photo updated successfully!");
    } catch (error) {
      console.error("Error updating profile photo:", error);
      alert("Photo uploaded but failed to save. Please try again.");
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const onPhotoUploadError = (err) => {
    console.error("Photo upload error:", err);
    alert(`Photo upload failed: ${err.message || "Unknown error"}`);
    setIsUploadingPhoto(false);
  };

  const getInitials = () => {
    const names = profile.fullname.split(" ");
    if (names.length >= 2) {
      return names[0].charAt(0) + names[1].charAt(0);
    }
    return profile.fullname.charAt(0) || "?";
  };

  if (isLoading) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        {isEditing ? (
          <div className="flex gap-2">
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary text-primary-foreground hover:bg-accent"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-primary text-primary-foreground hover:bg-accent"
          >
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 border border-border bg-card space-y-4 text-center">
            <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center text-4xl font-bold text-primary overflow-hidden">
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials()
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {profile.fullname || "User Name"}
              </h2>
              {profile.verified && (
                <span className="inline-block mt-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-bold">
                  Verified Provider
                </span>
              )}
            </div>
            <div className="flex items-center justify-center gap-1 text-center">
              <Star size={16} className="fill-accent text-accent" />
              <span className="font-bold text-foreground">
                {profile.rating || 0}
              </span>
              <span className="text-muted-foreground">
                ({profile.reviews || 0} reviews)
              </span>
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Completed Jobs</p>
                <p className="font-bold text-foreground">
                  {profile.completedJobs || 0}
                </p>
              </div>
              {profile.category && (
                <div className="mt-2">
                  <p className="text-muted-foreground">Category</p>
                  <p className="font-bold text-foreground">
                    {profile.category}
                  </p>
                </div>
              )}
              {profile.specialties && profile.specialties.length > 0 && (
                <div className="mt-2">
                  <p className="text-muted-foreground mb-1">Specialties</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {profile.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6 border border-border bg-card">
            <Label className="text-foreground font-semibold mb-4 block">
              Profile Photo
            </Label>
            <IKContext
              publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
              urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
              authenticator={authenticator}
            >
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                {isUploadingPhoto ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                    <p className="text-sm text-muted-foreground">
                      Uploading...
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      {profile.profilePhoto
                        ? "Change photo"
                        : "Upload profile photo"}
                    </p>
                    <IKUpload
                      fileName="profile-photo.jpg"
                      folder="/user-profiles"
                      tags={["profile", "user"]}
                      onError={onPhotoUploadError}
                      onSuccess={onPhotoUploadSuccess}
                      onUploadStart={onPhotoUploadStart}
                      style={{ display: "none" }}
                      id="profile-photo-upload"
                      useUniqueFileName={true}
                      isPrivateFile={false}
                    />
                    <label
                      htmlFor="profile-photo-upload"
                      className="cursor-pointer inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-accent transition-colors text-sm"
                    >
                      Choose File
                    </label>
                  </>
                )}
              </div>
            </IKContext>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="p-8 border border-border bg-card space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-foreground">
                Full Name
              </Label>
              <Input
                id="fullname"
                value={profile.fullname}
                onChange={(e) =>
                  setProfile({ ...profile, fullname: e.target.value })
                }
                disabled={!isEditing}
                className="bg-muted border-border text-foreground disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                disabled={true}
                className="bg-muted border-border text-foreground disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                disabled={!isEditing}
                placeholder="Enter your phone number"
                className="bg-muted border-border text-foreground disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-foreground">
                Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Enter your location"
                  className="pl-10 bg-muted border-border text-foreground disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-foreground">
                Bio
              </Label>
              <textarea
                id="bio"
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                disabled={!isEditing}
                rows={4}
                placeholder="Tell clients about yourself..."
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>

            {profile.availability && (
              <div className="space-y-2">
                <Label className="text-foreground">Availability</Label>
                <div className="p-3 bg-muted rounded-lg border border-border">
                  <p className="text-foreground">
                    {profile.availability === "full-time" &&
                      "More than 30 hrs/week"}
                    {profile.availability === "part-time" && "15-30 hrs/week"}
                    {profile.availability === "occasional" &&
                      "Less than 15 hrs/week"}
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
