import ProtectedRoute from "@/components/common/ProtectedRoute";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PublicRoute from "@/components/common/PublicRoute";

const DashboardPages = lazy(() => import("./dashboard"))
const ActivityPages = lazy(() => import("./activities"))
const FoundationPage = lazy(() => import("./foundation"))

const LoginPage = lazy(() => import("./auth/LoginPage"))
const RegisterPage = lazy(() => import("./auth/RegisterPage"))
const ForgotPasswordPage = lazy(() => import("./auth/ForgotPasswordPage"))

const PageLoader = () => (
     <div className="flex items-center justify-center h-full w-full min-h-75">
          <span className="text-sm font-medium text-app-subtext animate-pulse">Memuat...</span>
     </div>
)


const AppRoutes = () => {
     return (
          <Suspense fallback={<PageLoader />}>
               <Routes>
                    <Route element={<PublicRoute />}>
                         <Route path="/login" element={<LoginPage />} />
                         <Route path="/register" element={<RegisterPage />} />
                         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    </Route>


                    <Route element={<ProtectedRoute />}>
                         <Route path="/dashboard" element={<DashboardPages />} />
                         <Route path="/activities" element={<ActivityPages />} />
                         <Route path="/activities/reports/weekly" element={<ActivityPages />} />
                    </Route>

                    <Route path="/foundations-app" element={<FoundationPage />} />
               </Routes>
          </Suspense>
     )
}

export default AppRoutes