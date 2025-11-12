import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/pages/auth/layout";
import DashboardLayout from "@/pages/dashboard/layout";
import AdminLayout from "@/pages/admin/layout";

// Auth Pages
import LoginPage from "@/pages/auth/login/page";
import SignupPage from "@/pages/auth/signup/page";
import ForgotPasswordPage from "@/pages/auth/forgot-password/page";
import VerifyEmailPage from "@/pages/auth/verify-email/page";

// Public Pages
import HomePage from "@/pages/page";
import ExplorePage from "@/pages/explore/page";
import ServiceDetailPage from "@/pages/service/[id]/page";
import BecomeProviderPage from "@/pages/become-service-provider/page";

// Dashboard Pages
import DashboardPage from "@/pages/dashboard/page";
import DashboardProfilePage from "@/pages/dashboard/profile/page";
import DashboardBookingsPage from "@/pages/dashboard/bookings/page";
import DashboardServicesPage from "@/pages/dashboard/services/page";
import DashboardMessagesPage from "@/pages/dashboard/messages/page";
import DashboardSettingsPage from "@/pages/dashboard/settings/page";

// Admin Pages
import AdminPage from "@/pages/admin/page";
import AdminUsersPage from "@/pages/admin/users/page";
import AdminServicesPage from "@/pages/admin/services/page";
import AdminReportsPage from "@/pages/admin/reports/page";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/service/:id" element={<ServiceDetailPage />} />
        <Route path="/become-service-provider" element={<BecomeProviderPage />} />
      </Route>

      {/* Auth Routes with Layout */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
      </Route>

      {/* Dashboard Routes with Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<DashboardProfilePage />} />
        <Route path="bookings" element={<DashboardBookingsPage />} />
        <Route path="services" element={<DashboardServicesPage />} />
        <Route path="messages" element={<DashboardMessagesPage />} />
        <Route path="settings" element={<DashboardSettingsPage />} />
      </Route>

      {/* Admin Routes with Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
            <a href="/" className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-secondary transition-colors">
              Go Home
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;
