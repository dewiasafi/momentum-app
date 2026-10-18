import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { MainLayout } from "@/layouts/MainLayout";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-app-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-accent-forest border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-app-subtext">Memuat sesi...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default ProtectedRoute;
