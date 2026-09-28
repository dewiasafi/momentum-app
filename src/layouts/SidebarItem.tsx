import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export interface NavItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  href?: string;
  children?: NavItem[];
}

interface SidebarItemProps {
  item: NavItem;
  depth?: number;
  isCollapsed?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  depth = 0,
  isCollapsed = false,
}) => {
  const location = useLocation();
  const hasChildren = Boolean(item.children && item.children.length > 0);

  const isChildActive = (children?: NavItem[]): boolean => {
    if (!children) return false;
    return children.some(
      (child) => child.href === location.pathname || isChildActive(child.children)
    );
  };

  const [isOpen, setIsOpen] = useState(() => isChildActive(item.children));
  const isExactActive = !hasChildren && item.href === location.pathname;

  const toggleOpen = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    }
  };

  const itemClass = [
    "sidebar-item",
    isCollapsed ? "sidebar-item-collapsed" : "sidebar-item-expanded",
    isExactActive ? "sidebar-item-active" : "sidebar-item-default"
  ].join(" ");

  const itemContent = (
    <>
      <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-2.5"} truncate pointer-events-none`}>
        {item.icon && (
          <span
            className={`w-5 h-5 shrink-0 transition-colors ${
              isExactActive ? "text-accent-forest" : "text-slate-500"
            }`}
          >
            {item.icon}
          </span>
        )}
        
        {!isCollapsed && <span className="text-sm truncate">{item.title}</span>}
      </div>

      {hasChildren && !isCollapsed && (
        <span className="transition-transform duration-200 pointer-events-none text-slate-400">
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </span>
      )}
    </>
  );

  return (
    <div className="w-full flex flex-col" title={isCollapsed ? item.title : undefined}>
      {item.href && !hasChildren ? (
        <Link to={item.href} className={itemClass}>
          {itemContent}
        </Link>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={toggleOpen}
          onKeyDown={(e) => e.key === "Enter" && toggleOpen(e as any)}
          className={itemClass}
        >
          {itemContent}
        </div>
      )}

      {hasChildren && isOpen && !isCollapsed && (
        <div className="w-full flex">
          <div className="w-[1.5px] bg-slate-200 my-1 ml-4 shrink-0" />
          <div className="flex-1 flex flex-col gap-1 my-1 pl-2 pr-1 min-w-0">
            {item.children!.map((child) => (
              <SidebarItem
                key={child.id}
                depth={depth + 1}
                item={child}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};