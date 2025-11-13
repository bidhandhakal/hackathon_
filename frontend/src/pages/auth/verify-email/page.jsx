

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"

export default function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [verified, setVerified] = useState(false)

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (code.some((c) => !c)) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setVerified(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (verified) {
    return (
      <div className="w-full max-w-md">
        <Card className="p-8 border border-border bg-card shadow-lg">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Email Verified</h1>
            <p className="text-muted-foreground">
              Your email has been successfully verified. You can now access all QuickKaam features.
            </p>

            <div className="pt-4">
              <Link to="/dashboard">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-accent">
                  Go to Dashboard
                </Button>
              </Link>
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
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Verify Email</h1>
          <p className="text-muted-foreground text-sm mt-2">Enter the 6-digit code we sent to your email</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength={1}
                className="w-12 h-12 text-center text-2xl font-bold border-2 border-border rounded-lg focus:border-primary focus:outline-none bg-muted text-foreground"
              />
            ))}
          </div>

          <Button
            type="submit"
            disabled={isLoading || code.some((c) => !c)}
            className="w-full bg-primary text-primary-foreground hover:bg-accent"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Didn't receive code?{" "}
            <button className="text-primary hover:text-secondary font-semibold transition-colors">Resend</button>
          </p>
        </form>
      </Card>
    </div>
  )
}

