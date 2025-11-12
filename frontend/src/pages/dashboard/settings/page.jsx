

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bell, Lock, Eye, LogOut, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    twoFactor: true,
  })

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>

      {/* Notifications */}
      <Card className="p-6 border border-border bg-card space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Bell size={24} className="text-primary" />
          <h2 className="text-xl font-bold text-foreground">Notifications</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              key: "emailNotifications",
              label: "Email Notifications",
              description: "Receive email updates about bookings",
            },
            { key: "pushNotifications", label: "Push Notifications", description: "Get browser push notifications" },
            { key: "marketingEmails", label: "Marketing Emails", description: "Receive tips and promotional updates" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <input
                type="checkbox"
                checked={settings[item.key]}
                onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                className="w-5 h-5"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6 border border-border bg-card space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Lock size={24} className="text-primary" />
          <h2 className="text-xl font-bold text-foreground">Security</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <input
              type="checkbox"
              checked={settings.twoFactor}
              onChange={(e) => setSettings({ ...settings, twoFactor: e.target.checked })}
              className="w-5 h-5"
            />
          </div>

          <Button variant="outline" className="w-full border-border justify-start bg-transparent">
            <Eye size={18} className="mr-2" />
            Change Password
          </Button>
        </div>
      </Card>

      {/* Account Actions */}
      <Card className="p-6 border border-border bg-card space-y-4">
        <h2 className="text-xl font-bold text-foreground pb-4 border-b border-border">Account</h2>

        <Button variant="outline" className="w-full border-border justify-start bg-transparent">
          <LogOut size={18} className="mr-2" />
          Logout All Devices
        </Button>

        <Button
          variant="outline"
          className="w-full border-destructive text-destructive justify-start hover:bg-destructive/10 bg-transparent"
        >
          <Trash2 size={18} className="mr-2" />
          Delete Account
        </Button>
      </Card>

      {/* Save */}
      <div className="flex gap-3">
        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-accent">Save Changes</Button>
      </div>
    </div>
  )
}

