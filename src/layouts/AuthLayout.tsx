import type { ReactNode } from "react";
import bgImage from "@/assets/image.jpg";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative min-h-screen bg-app-bg flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="relative w-full max-w-md lg:max-w-5xl bg-white rounded-3xl lg:rounded-4xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-auto lg:min-h-160">

        <div className="relative w-full lg:w-1/2 min-h-55 sm:min-h-65 lg:min-h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 text-white overflow-hidden shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />

          <div className="absolute inset-0 bg-linear-to-b lg:bg-linear-to-t from-app-forest/90 via-app-forest/35 to-app-forest/15 z-0" />

          <div className="hidden lg:block absolute top-0 bottom-0 -right-1 w-24 z-10 pointer-events-none text-white fill-current">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 800"
              preserveAspectRatio="none"
            >
              <path d="M100,0 C30,150 80,350 10,500 C-30,650 60,750 100,800 L100,0 Z" />
            </svg>
          </div>

          <div className="block lg:hidden absolute -bottom-1 left-0 right-0 h-12 z-10 pointer-events-none text-white fill-current">
            <svg
              className="h-full w-full"
              viewBox="0 0 800 100"
              preserveAspectRatio="none"
            >
              <path d="M0,100 C150,30 350,80 500,10 C650,-30 750,60 800,100 L0,100 Z" />
            </svg>
          </div>

          <div className="relative z-20 flex items-center justify-start gap-3">
            <span className="font-serif text-xl sm:text-3xl font-semibold tracking-[0.25em] uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
              Momentum
            </span>
          </div>
        </div>

        <div className="relative w-full lg:w-1/2 bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-center z-20">
          <div className="w-full max-w-md mx-auto">
            {children}
          </div>
        </div>

      </div>

      <footer className="mt-6 sm:mt-0 sm:absolute sm:bottom-4 sm:right-6 text-xs text-[#64748B] text-center sm:text-right">
        © 2026 Momentum App
      </footer>
    </div>
  );
};

export default AuthLayout;