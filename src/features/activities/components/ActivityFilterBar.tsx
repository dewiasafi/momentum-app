import React, { useEffect, useState } from "react";
import { ArrowUpDown, Search, X } from "lucide-react";
import { Button, Input, Select } from "@/components/ui";

interface ActivityFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedModule: string;
  onModuleChange: (value: string) => void;
  moduleOptions?: string[];
  sortBy: string;
  onSortByChange: (value: string) => void;
  sortOrder: "asc" | "desc";
  onToggleSortOrder: () => void;
}

export const ActivityFilterBar: React.FC<ActivityFilterBarProps> = ({
  search,
  onSearchChange,
  selectedModule,
  onModuleChange,
  moduleOptions = ["All", "Module 1", "Module 2", "Module 3"],
  sortBy,
  onSortByChange,
  sortOrder,
  onToggleSortOrder,
}) => {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearchChange(localSearch);
    }
  };

  const handleClear = () => {
    setLocalSearch("");
    onSearchChange("");
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full">
      <div className="flex-1">
        <Input
          placeholder="Cari aktivitas atau catatan pribadi..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          leftIcon={<Search className="w-4 h-4" />}
          rightIcon={
            localSearch ? (
              <Button
                type="button"
                variant="ghost"
                rightIcon={<X className="w-3.5 h-3.5" />}
                className="p-0.5 rounded-full"
                onClick={handleClear}
                aria-label="Hapus pencarian"
              />
            ) : null
          }
          fullWidth
          className="rounded-xl shadow-2xs"
        />
      </div> 

      <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
        <div className="w-full sm:w-40">
          <Select
            value={selectedModule}
            onChange={(e) => onModuleChange(e.target.value)}
            options={moduleOptions.map((mod) => ({
              label: `Modul: ${mod}`,
              value: mod,
            }))}
            fullWidth
          />
        </div>

        <div className="w-full sm:w-44">
          <Select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            options={[
              { label: "Sort: Default", value: "default" },
              { label: "Sort: Nama", value: "title" },
              { label: "Sort: Prioritas", value: "priority" },
              { label: "Sort: Durasi", value: "duration" },
              { label: "Sort: Tanggal", value: "created_at" },
            ]}
            fullWidth
          />
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={onToggleSortOrder}
          title={`Urutan: ${sortOrder === "asc" ? "Ascending" : "Descending"}`}
          className={`h-10 px-3 bg-white border border-app-subtext/20 rounded-lg text-app-subtext hover:text-app-forest hover:border-app-forest/40 transition-colors shadow-2xs cursor-pointer flex items-center justify-center shrink-0 ${
            sortOrder === "desc" ? "bg-app-bg text-app-forest border-app-forest/30" : ""
          }`}
          aria-label="Ubah arah urutan"
        >
          <ArrowUpDown className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
