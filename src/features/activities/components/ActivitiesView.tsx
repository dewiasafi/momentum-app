import React, { useMemo, useState } from "react";
import { Activity, ActivityFormData } from "../types";
import { INITIAL_ACTIVITIES } from "../data/mockActivities";
import { useActivities } from "../api/useActivities";
import { CategoryItem, CategorySelector } from "./CategorySelector";
import { ActivityFilterBar } from "./ActivityFilterBar";
import { Button, Emptystate, Pagination } from "@/components/ui";
import { Sparkles } from "lucide-react";
import { AddCategoryModal } from "./AddCategoryModal";
import { ActivityHeader } from "./ActivityHeader";
import { CreateActivityDrawer } from "./CreateActivityDrawer";
import { ActivityCard } from "./ActivityCard";

export const ActivitiesView: React.FC = () => {
  const [localActivities, setLocalActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [customCategories, setCustomCategories] = useState<CategoryItem[]>([]);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [selectedModule, setSelectedModule] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;

  // Drawer & Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  // Optional API query (fallback mulus ke localActivities)
  const { data: apiResponse } = useActivities({
    search: search || undefined,
    category: selectedCategory === "All" ? undefined : selectedCategory,
  });

  const baseActivities = useMemo(() => {
    if (apiResponse?.data?.items && apiResponse.data.items.length > 0) {
      return apiResponse.data.items;
    }
    return localActivities;
  }, [apiResponse, localActivities]);

  // Hitung jumlah per kategori
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: baseActivities.length,
    };
    baseActivities.forEach((act) => {
      counts[act.category] = (counts[act.category] || 0) + 1;
    });
    return counts;
  }, [baseActivities]);

  // Filtered dan sorted activities
  const filteredActivities = useMemo(() => {
    return baseActivities
      .filter((activity) => {
        // Filter Kategori
        if (
          selectedCategory !== "All" &&
          activity.category.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }

        // Filter Modul / Skill
        if (selectedModule !== "All") {
          if (!activity.module || activity.module !== selectedModule) {
            return false;
          }
        }

        // Filter Pencarian
        if (search.trim()) {
          const query = search.toLowerCase();
          const matchTitle = activity.title.toLowerCase().includes(query);
          const matchNotes = activity.notes.toLowerCase().includes(query);
          const matchCategory = activity.category.toLowerCase().includes(query);
          const matchModule = activity.module?.toLowerCase().includes(query);
          if (!matchTitle && !matchNotes && !matchCategory && !matchModule) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "title") {
          return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
        if (sortBy === "duration") {
          return sortOrder === "asc"
            ? a.estimated_minutes - b.estimated_minutes
            : b.estimated_minutes - a.estimated_minutes;
        }
        if (sortBy === "priority") {
          const priorityWeights = { high: 3, medium: 2, low: 1 };
          const weightA = priorityWeights[a.priority] || 0;
          const weightB = priorityWeights[b.priority] || 0;
          return sortOrder === "asc" ? weightA - weightB : weightB - weightA;
        }
        if (sortBy === "created_at") {
          return sortOrder === "asc"
            ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        return 0;
      });
  }, [baseActivities, selectedCategory, selectedModule, search, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / pageSize));
  const paginatedActivities = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredActivities.slice(start, start + pageSize);
  }, [filteredActivities, currentPage, pageSize]);

  // Aksi
  const handleToggleComplete = (id: string) => {
    setLocalActivities((prev) =>
      prev.map((act) =>
        act.id === id
          ? {
              ...act,
              is_completed: !act.is_completed,
              completed_at: !act.is_completed ? new Date().toISOString() : null,
            }
          : act
      )
    );
  };

  const handleDeleteActivity = (id: string) => {
    setLocalActivities((prev) => prev.filter((act) => act.id !== id));
  };

  const handleCreateTask = (formData: ActivityFormData) => {
    const newTask: Activity = {
      id: `act-${Date.now()}`,
      title: formData.title,
      notes: formData.notes,
      category: formData.category,
      priority: formData.priority,
      estimated_minutes: formData.estimated_minutes,
      is_completed: false,
      created_at: new Date().toISOString(),
      completed_at: null,
      module: formData.module || "Personal Habit",
    };

    setLocalActivities((prev) => [newTask, ...prev]);
    setCurrentPage(1);
  };

  const handleAddCategory = (newCat: CategoryItem) => {
    setCustomCategories((prev) => [...prev, newCat]);
    setSelectedCategory(newCat.name);
  };

  console.log(">>> search", search, sortBy, selectedCategory, selectedModule, sortOrder)

  const allCategoryNames = useMemo(() => {
    const set = new Set(["All", "Education", "Emotional", "Physical", "Social"]);
    customCategories.forEach((c) => set.add(c.name));
    baseActivities.forEach((a) => set.add(a.category));
    return Array.from(set);
  }, [customCategories, baseActivities]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-12">
      
      <ActivityHeader onOpenCreateDrawer={() => setIsCreateOpen(true)} />
      
      <div className="w-full">
        <ActivityFilterBar
          search={search}
          onSearchChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          selectedModule={selectedModule}
          onModuleChange={(val) => {
            setSelectedModule(val);
            setCurrentPage(1);
          }}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrder={sortOrder}
          onToggleSortOrder={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        />
      </div>

      <div className="w-full">
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
          onOpenAddCategory={() => setIsAddCategoryOpen(true)}
          counts={categoryCounts}
          customCategories={customCategories}
        />
      </div>

      <div className="space-y-3 sm:space-y-3.5">
        {paginatedActivities.length > 0 ? (
          paginatedActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteActivity}
            />
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-app-subtext/15 p-8 text-center">
            <Emptystate
              icon={<Sparkles className="w-10 h-10 text-app-subtext/40" />}
              title="Belum Ada Aktivitas yang Sesuai"
              description="Tidak ditemukan aktivitas pada kategori atau kata kunci pencarian ini."
              action={
                <div className="flex items-center gap-3 mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedModule("All");
                      setSearch("");
                    }}
                  >
                    Reset Filter
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsCreateOpen(true)}
                  >
                    Rekam Aktivitas Baru
                  </Button>
                </div>
              }
            />
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center pt-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <CreateActivityDrawer
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateTask}
        categories={allCategoryNames}
      />

       <AddCategoryModal
        open={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
};
