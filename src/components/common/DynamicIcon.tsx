import React from "react";
import {
  BookOpen,
  CheckCircle2,
  DollarSign,
  GraduationCap,
  LayoutGrid,
  Rocket,
  Settings,
  TrendingUp,
  HelpCircle,
} from "lucide-react";

const ICON_LOOKUP: Record<string, React.ReactNode> = {
  "layout-grid": <LayoutGrid className="w-4 h-4 shrink-0" />,
  "check-circle": <CheckCircle2 className="w-4 h-4 shrink-0" />,
  "book-open": <BookOpen className="w-4 h-4 shrink-0" />,
  "rocket": <Rocket className="w-4 h-4 shrink-0" />,
  "dollar-sign": <DollarSign className="w-4 h-4 shrink-0" />,
  "graduation-cap": <GraduationCap className="w-4 h-4 shrink-0" />,
  "trending-up": <TrendingUp className="w-4 h-4 shrink-0" />,
  "settings": <Settings className="w-4 h-4 shrink-0" />,
};

interface DynamicIconProps {
  name: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name }) => {
  const icon = ICON_LOOKUP[name];

  if (!icon) {
    console.warn(`[DynamicIcon] Warning: Icon key "${name}" is not registered.`);
    return <HelpCircle className="w-4 h-4 shrink-0 text-app-subtext" />;
  }

  return <>{icon}</>;
};