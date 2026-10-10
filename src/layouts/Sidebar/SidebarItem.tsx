import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { DynamicIcon } from "@/components/common/DynamicIcon";
import { MenuNavItem } from "@/types/menu";

interface SidebarNavItemProps {
  item: MenuNavItem;
  isCollapsed: boolean;
  onCloseMobile?: () => void;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  item,
  isCollapsed,
  onCloseMobile,
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = Boolean(item.children && item.children.length > 0);

  const isCurrent = (path?: string) => {
    if (!path) return false;
    
    const currentPath = location.pathname.replace(/\/$/, "") || "/";
    const targetPath = path.replace(/\/$/, "") || "/";

    if (targetPath === "/dashboard") {
      return currentPath === targetPath;
    }
    
    return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  };

  const isParentActive =
    hasChildren && item.children?.some((child) => isCurrent(child.path));

  const active = isCurrent(item.path) || isParentActive;

  if (hasChildren) {
    return (
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            active
              ? "bg-white/15 text-white font-bold"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          } ${isCollapsed ? "justify-center px-0" : ""}`}
          title={item.label}
        >
          <div className="flex items-center gap-3">
            <DynamicIcon name={item.iconKey} />
            {!isCollapsed && <span>{item.label}</span>}
          </div>
          {!isCollapsed && (
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {isOpen && !isCollapsed && (
          <div className="pl-6 flex flex-col gap-1 border-l border-white/10 ml-4">
            {item.children?.map((child) => {
              const childActive = isCurrent(child.path);
              return (
                <Link
                  key={child.id}
                  to={child.path || "#"}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    childActive
                      ? "text-app-sunshine font-bold bg-white/5"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <DynamicIcon name={child.iconKey} />
                  <span>{child.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path || "#"}
      onClick={onCloseMobile}
      className={`relative flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
        active
          ? "bg-white/15 text-white font-bold shadow-xs"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      } ${isCollapsed ? "justify-center px-0" : ""}`}
      title={item.label}
    >
      {active && item.showAccentBorder && (
        <span className="absolute -left-2 sm:-left-3 inset-y-1 w-1 rounded-r-full bg-rose-400" />
      )}
      <DynamicIcon name={item.iconKey} />
      {!isCollapsed && <span>{item.label}</span>}
    </Link>
  );
};