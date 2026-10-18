import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import AuthLayout from "@/layouts/AuthLayout";

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-app-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-accent-forest border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-app-subtext">Memeriksa sesi...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default PublicRoute;
