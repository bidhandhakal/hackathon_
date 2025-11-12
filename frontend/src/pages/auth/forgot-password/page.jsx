

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitted(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="w-full max-w-md">
        <Card className="p-8 border border-border bg-card shadow-lg">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
              <Mail className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Check Your Email</h1>
            <p className="text-muted-foreground">
              We've sent password reset instructions to <span className="font-semibold text-foreground">{email}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              The link will expire in 24 hours. If you don't see the email, check your spam folder.
            </p>

            <div className="pt-4 space-y-3">
              <Link to="/auth/login" className="block">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-secondary">Back to Login</Button>
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-primary hover:text-secondary transition-colors"
              >
                Try another email
              </button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <Card className="p-8 border border-border bg-card shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
          <p className="text-muted-foreground text-sm mt-2">Enter your email to receive reset instructions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-muted border-input text-foreground"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-secondary"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <Link
          to="/auth/login"
          className="flex items-center justify-center gap-2 text-sm text-primary hover:text-secondary transition-colors mt-6"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </Card>
    </div>
  )
}

