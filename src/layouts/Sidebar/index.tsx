import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen, Sparkles, X } from "lucide-react";
import { MENU_NAVBAR } from "@/utils/constant/mock_data";
import { SidebarNavItem } from "./SidebarItem";

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const content = (
    <div className="flex flex-col h-full justify-between select-none">
      <div className="flex flex-col gap-5 overflow-y-auto no-scrollbar pr-1">
        {/* Brand Header */}
        <div
          className={`flex items-center pt-2 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed && (
            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 text-white overflow-hidden group"
            >
              <div className="w-8 h-8 rounded-xl bg-app-sunshine/20 border border-app-sunshine/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-app-sunshine" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-app-sunshine transition-colors leading-tight">
                  Momentum
                </span>
                <span className="text-[10px] text-white/50 font-medium">
                  Self-Development
                </span>
              </div>
            </Link>
          )}

          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isCollapsed ? "Perluas Sidebar" : "Perkecil Sidebar"}
              aria-label={isCollapsed ? "Perluas Sidebar" : "Perkecil Sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>

            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Tutup Sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

       <div className="flex flex-col gap-4">
        {MENU_NAVBAR.map((group) => (
          <div key={group.groupLabel || "group"} className="flex flex-col gap-2">
            {!isCollapsed && group.groupLabel && (
              <span className="text-[10px] font-bold tracking-wider text-white/40 uppercase px-2 mb-1">
                {group.groupLabel}
              </span>
            )}

            {group.items.map((item) => (
              <SidebarNavItem
                key={item.id}
                item={item}
                isCollapsed={isCollapsed}
                onCloseMobile={onCloseMobile}
              />
            ))}
          </div>
        ))}
      </div>
      </div>

      {/* Footer Streak */}
      {!isCollapsed && (
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-app-sunshine/20 text-app-sunshine font-bold text-sm flex items-center justify-center shrink-0">
              🔥
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">
                Streak 5 Hari
              </span>
              <span className="text-[10px] text-app-mint truncate">
                Fokus Menuju Goals
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <aside
        className={`hidden lg:flex flex-col h-screen shrink-0 bg-app-forest text-white transition-all duration-300 py-4 z-20 ${
          isCollapsed ? "w-20 px-2.5" : "w-60 px-4"
        }`}
      >
        {content}
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={onCloseMobile}
          />
          <aside className="relative flex flex-col h-full w-64 max-w-[80vw] bg-app-forest text-white py-4 px-4 shadow-2xl transition-transform duration-300">
            {content}
          </aside>
        </div>
      )}
    </>
  );
};