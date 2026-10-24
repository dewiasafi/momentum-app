import ProtectedRoute from "@/components/common/ProtectedRoute";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "@/components/common/PublicRoute";

const DashboardPages = lazy(() => import("./dashboard"));
const ActivityPages = lazy(() => import("./activities"));
const FoundationPage = lazy(() => import("./foundation"));

const LoginPage = lazy(() => import("./auth/LoginPage"));
const RegisterPage = lazy(() => import("./auth/RegisterPage"));
const VerifyNoticePage = lazy(() => import("./auth/VerifyNoticePage"));
const VerifyEmailPage = lazy(() => import("./auth/VerifyEmailPage"));
const ResendVerificationPage = lazy(() => import("./auth/ResendVerificationPage"));
const ForgotPasswordPage = lazy(() => import("./auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./auth/ResetPasswordPage"));

const PageLoader = () => (
  <div className="flex items-center justify-center h-full w-full min-h-75">
    <span className="text-sm font-medium text-app-subtext animate-pulse">Memuat...</span>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Rute Publik (Auth & Verifikasi Email) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-notice" element={<VerifyNoticePage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/resend-verification" element={<ResendVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Rute Terproteksi (Wajib Login & Email Terverifikasi) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPages />} />
          <Route path="/activities" element={<ActivityPages />} />
          <Route path="/activities/reports/weekly" element={<ActivityPages />} />
        </Route>

        {/* Halaman Design System / Fondasi UI */}
        <Route path="/foundations-app" element={<FoundationPage />} />

        {/* Fallback ke login jika rute tidak ditemukan */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;