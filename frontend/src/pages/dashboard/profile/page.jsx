

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Star, MapPin, Upload } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 000-0000",
    location: "123 Main St, City, State",
    bio: "Experienced service provider with 8 years in the industry",
    rating: 4.9,
    reviews: 256,
    completedJobs: 512,
    verified: true,
  })

  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className={
            isEditing
              ? "bg-secondary text-secondary-foreground hover:bg-primary"
              : "bg-primary text-primary-foreground hover:bg-accent"
          }
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 border border-border bg-card space-y-4 text-center">
            <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center text-4xl font-bold text-primary">
              {profile.firstName.charAt(0)}
              {profile.lastName.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {profile.firstName} {profile.lastName}
              </h2>
              {profile.verified && (
                <span className="inline-block mt-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-bold">
                  Verified Provider
                </span>
              )}
            </div>
            <div className="flex items-center justify-center gap-1 text-center">
              <Star size={16} className="fill-accent text-accent" />
              <span className="font-bold text-foreground">{profile.rating}</span>
              <span className="text-muted-foreground">({profile.reviews} reviews)</span>
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Completed Jobs</p>
                <p className="font-bold text-foreground">{profile.completedJobs}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-border bg-card">
            <Label className="text-foreground font-semibold mb-4 block">Profile Photo</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="p-8 border border-border bg-card space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  disabled={!isEditing}
                  className="bg-muted border-border text-foreground disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  disabled={!isEditing}
                  className="bg-muted border-border text-foreground disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
                className="bg-muted border-border text-foreground disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                disabled={!isEditing}
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
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  disabled={!isEditing}
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
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                disabled={!isEditing}
                rows={4}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>

            {isEditing && (
              <div className="flex gap-3">
                <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-accent">
                  Save Changes
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

