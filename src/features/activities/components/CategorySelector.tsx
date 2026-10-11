import React from "react";
import { BookOpen, Drama, Magnet, MessageCircle, Plus } from "lucide-react";

export interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  bgClass: string;
  iconColorClass: string;
}

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenAddCategory?: () => void;
  counts?: Record<string, number>;
  customCategories?: CategoryItem[];
}

function AllDotsIcon() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <circle cx="12" cy="7" r="2.5" />
      <circle cx="7.5" cy="15.5" r="2.5" />
      <circle cx="16.5" cy="15.5" r="2.5" />
    </svg>
  );
}

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: "All",
    name: "All",
    icon: <AllDotsIcon />,
    bgClass: "bg-app-bg text-app-forest",
    iconColorClass: "text-app-forest",
  },
  {
    id: "Education",
    name: "Education",
    icon: <BookOpen className="w-5 h-5" />,
    bgClass: "bg-rose-50 text-rose-500",
    iconColorClass: "text-rose-500",
  },
  {
    id: "Emotional",
    name: "Emotional",
    icon: <Drama className="w-5 h-5" />,
    bgClass: "bg-emerald-50 text-emerald-600",
    iconColorClass: "text-emerald-600",
  },
  {
    id: "Physical",
    name: "Physical",
    icon: <Magnet className="w-5 h-5" />,
    bgClass: "bg-purple-50 text-purple-600",
    iconColorClass: "text-purple-600",
  },
  {
    id: "Social",
    name: "Social",
    icon: <MessageCircle className="w-5 h-5" />,
    bgClass: "bg-amber-50 text-amber-600",
    iconColorClass: "text-amber-600",
  },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenAddCategory,
  counts = {},
  customCategories = [],
}) => {
  const allCategories = [...DEFAULT_CATEGORIES, ...customCategories];

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 snap-x scroll-smooth">
        {allCategories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          const count = counts[cat.name];

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.name)}
              className={`group flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer select-none shrink-0 snap-start min-w-[90px] sm:min-w-[105px] md:flex-1 bg-white ${
                isSelected
                  ? "border-2 border-app-forest shadow-md ring-2 ring-app-forest/10 -translate-y-0.5"
                  : "border border-app-subtext/15 hover:border-app-subtext/30 hover:shadow-xs hover:-translate-y-0.5"
              }`}
            >
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${
                  isSelected ? "bg-app-forest text-white shadow-xs" : cat.bgClass
                }`}
              >
                {cat.icon}
              </div>

              <span
                className={`mt-2 text-xs sm:text-sm font-semibold truncate transition-colors ${
                  isSelected
                    ? "text-app-title font-bold"
                    : "text-app-body/80 group-hover:text-app-title"
                }`}
              >
                {cat.name}
              </span>

              {count !== undefined && count > 0 && (
                <span
                  className={`mt-0.5 text-[10px] font-medium px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? "bg-app-forest/10 text-app-forest"
                      : "text-app-subtext"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}

        {onOpenAddCategory && (
          <button
            type="button"
            onClick={onOpenAddCategory}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border border-dashed border-app-subtext/25 bg-white/70 hover:bg-white hover:border-app-forest/50 transition-all duration-200 cursor-pointer shrink-0 snap-start min-w-[90px] sm:min-w-[105px] md:flex-1 group"
            title="Add New Category"
            aria-label="Add New Category"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-app-forest/10 text-app-forest flex items-center justify-center group-hover:bg-app-forest group-hover:text-white transition-all shadow-xs">
              <Plus className="w-5 h-5" />
            </div>
            <span className="mt-2 text-xs sm:text-sm font-semibold text-app-subtext group-hover:text-app-forest transition-colors">
              Add
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

