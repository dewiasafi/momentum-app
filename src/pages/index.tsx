import { MainLayout } from "@/layouts/MainLayout";
import { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

const DasboardPages = lazy(() => import("./dashboard"))
const ActivityPages = lazy(() => import("./activities"))
const FoundationPage = lazy(() => import("./foundation"))

const PageLoader = () => (
     <div className="flex items-center justify-center h-full w-full min-h-75">
          <span className="text-sm font-medium text-text-sub animate-pulse">Memuat...</span>
     </div>
)

const AppLayout = () => (
     <MainLayout>
          <Outlet />
     </MainLayout>
)

const AppRoutes = () => {
     return (
          <Suspense fallback={<PageLoader />}>
               <Routes>
                    <Route element={<AppLayout />}>
                         <Route path="/dashboard" element={<DasboardPages />} />
                         <Route path="/activities" element={<ActivityPages />} />
                         <Route path="/activities/reports/weekly" element={<ActivityPages />} />
                    </Route>
                    <Route path="/" element={<FoundationPage/>}/>
               </Routes>
          </Suspense>
     )
}

export default AppRoutes