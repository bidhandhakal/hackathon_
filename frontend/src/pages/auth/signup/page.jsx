import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Mail, Lock, User, Eye, EyeOff, Check } from "lucide-react";
import api from "@/lib/api";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "customer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    return pwd.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      const data = await api.auth.register(
        formData.fullName,
        formData.email,
        formData.password
      );

      // Redirect to login page after successful registration
      navigate("/auth/login");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to create account"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength =
    formData.password.length >= 8
      ? "strong"
      : formData.password.length >= 4
      ? "medium"
      : "weak";

  return (
    <div className="w-full max-w-md animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
      <Card className="p-8 border border-border bg-card shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 font-bold text-2xl text-primary mb-4 animate-in zoom-in-50 duration-500">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-lg">
              Q
            </div>
            <span>QuickKaam</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Join our community of service providers and customers
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {["customer", "provider"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, userType: type })}
                className={`py-2 px-3 rounded-lg border transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg ${
                  formData.userType === type
                    ? "bg-primary text-primary-foreground border-primary scale-105"
                    : "bg-muted border-border text-foreground hover:bg-muted/80 hover:scale-105"
                }`}
              >
                {type === "customer" ? "Customer" : "Provider"}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-foreground">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
                className="pl-10 bg-muted border-input text-foreground"
              />
            </div>
          </div>

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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="pl-10 bg-muted border-input text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="pl-10 pr-10 bg-muted border-input text-foreground"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="flex gap-1 mt-2">
              {["weak", "medium", "strong"].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    passwordStrength === level ||
                    (level === "weak" && formData.password.length > 0)
                      ? "bg-accent"
                      : level === "medium" &&
                        (passwordStrength === "medium" ||
                          passwordStrength === "strong")
                      ? "bg-accent"
                      : level === "strong" && passwordStrength === "strong"
                      ? "bg-accent"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
                className="pl-10 pr-10 bg-muted border-input text-foreground"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="text-xs font-medium text-foreground">
              Password requirements:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-center">
                <Check
                  size={14}
                  className={
                    formData.password.length >= 8
                      ? "text-accent mr-2"
                      : "text-muted-foreground mr-2"
                  }
                />
                At least 8 characters
              </li>
            </ul>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-accent h-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-card text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-border bg-transparent flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
          By signing up, you agree to our{" "}
          <Link
            to="/terms"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Privacy Policy
          </Link>
        </p>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
