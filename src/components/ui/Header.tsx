import React from "react";
import { Button } from "@/components/ui";

export interface HeaderAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary"  | "ghost";
}

export interface HeaderProps {
  title: string;
  description?: string;
  primaryAction?: HeaderAction; 
}

const Header: React.FC<HeaderProps> = ({
  title,
  description,
  primaryAction,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-app-title tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-app-subtext mt-1">
            {description}
          </p>
        )}
      </div>

      {primaryAction && (
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
          <Button
            type="button"
            variant={primaryAction.variant || "primary"}
            leftIcon={primaryAction.icon}
            onClick={primaryAction.onClick}
            className="rounded-full"
          >
            {primaryAction.label}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;