import React from "react";
import { Activity } from "../types";
import { Badge, Dropdown } from "@/components/ui";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Drama,
  Edit2,
  Magnet,
  MessageCircle,
  MoreVertical,
  Trash2,
} from "lucide-react";

interface ActivityCardProps {
  activity: Activity;
  onToggleComplete?: (id: string) => void;
  onEdit?: (activity: Activity) => void;
  onDelete?: (id: string) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  // Tentukan ikon dan palet warna berdasarkan kategori
  const getCategoryTheme = (category: string, iconName?: string) => {
    switch (category.toLowerCase()) {
      case "education":
        return {
          icon: <BookOpen className="w-6 h-6" />,
          boxClass: "bg-rose-50 text-rose-500",
          tagBorder: "border-rose-300 text-rose-600 bg-rose-50/50",
        };
      case "emotional":
        return {
          icon: iconName === "book" ? <BookOpen className="w-6 h-6" /> : <Drama className="w-6 h-6" />,
          boxClass: "bg-rose-50 text-rose-500",
          tagBorder: "border-rose-300 text-rose-600 bg-rose-50/50",
        };
      case "physical":
        return {
          icon: <Magnet className="w-6 h-6" />,
          boxClass: "bg-purple-50 text-purple-600",
          tagBorder: "border-purple-300 text-purple-700 bg-purple-50/50",
        };
      case "social":
        return {
          icon: <MessageCircle className="w-6 h-6" />,
          boxClass: "bg-amber-50 text-amber-600",
          tagBorder: "border-amber-300 text-amber-700 bg-amber-50/50",
        };
      default:
        return {
          icon: <BookOpen className="w-6 h-6" />,
          boxClass: "bg-emerald-50 text-emerald-600",
          tagBorder: "border-emerald-300 text-emerald-700 bg-emerald-50/50",
        };
    }
  };

  const theme = getCategoryTheme(activity.category, activity.icon_name);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="leaf" size="sm" dot>Tinggi</Badge>;
      case "medium":
        return <Badge variant="sunshine" size="sm" dot>Sedang</Badge>;
      default:
        return <Badge variant="sage" size="sm" dot>Rendah</Badge>;
    }
  };

  return (
    <div
      className={`group relative bg-white border rounded-2xl p-4 sm:p-5 transition-all duration-200 ${
        activity.is_completed
          ? "border-app-subtext/10 bg-white/70 opacity-75"
          : "border-app-subtext/15 hover:border-app-forest/30 hover:shadow-md"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Kiri: Tombol Checklist Cepat + Kotak Ikon Kategori */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Tombol Checklist Cepat */}
          {onToggleComplete && (
            <button
              type="button"
              onClick={() => onToggleComplete(activity.id)}
              className="text-app-subtext/50 hover:text-app-forest transition-colors cursor-pointer"
              title={activity.is_completed ? "Tandai Belum Selesai" : "Tandai Selesai"}
              aria-label={activity.is_completed ? "Tandai Belum Selesai" : "Tandai Selesai"}
            >
              {activity.is_completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
          )}

          {/* Kotak Ikon Kategori */}
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-2xs ${theme.boxClass}`}
          >
            {theme.icon}
          </div>
        </div>

        {/* Tengah: Judul, Tag Kategori, Modul, dan Catatan Pribadi */}
        <div className="flex-1 min-w-0 pr-2">
          {/* Baris Judul & Tag */}
          <div className="flex flex-wrap items-center gap-2.5">
            <h3
              className={`font-bold text-sm sm:text-base leading-snug transition-all ${
                activity.is_completed
                  ? "line-through text-app-disabled"
                  : "text-app-title"
              }`}
            >
              {activity.title}
            </h3>

            {/* Pill Tag Kategori */}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${theme.tagBorder}`}
            >
              {activity.category}
            </span>

            {/* Tag Modul */}
            {activity.module && (
              <span className="text-[10px] text-app-subtext bg-app-bg px-2 py-0.5 rounded-md font-medium border border-app-subtext/15">
                {activity.module}
              </span>
            )}
          </div>

          {/* Catatan / Deskripsi Aktivitas */}
          {activity.notes && (
            <p className="text-xs sm:text-sm text-app-subtext mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-3">
              {activity.notes}
            </p>
          )}
        </div>

        {/* Kanan: Metadata Pribadi (Durasi, Prioritas, & Menu Aksi Tiga Titik) */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-app-subtext/10 shrink-0">
          {/* Indikator Prioritas */}
          <div>{getPriorityBadge(activity.priority)}</div>

          {/* Estimasi Durasi Pribadi */}
          {activity.estimated_minutes > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-app-bg text-app-forest text-xs font-semibold border border-app-subtext/10">
              <Clock className="w-3.5 h-3.5 text-app-eucalyptus" />
              <span>{activity.estimated_minutes}m</span>
            </div>
          )}

          {/* Menu Dropdown Aksi Tiga Titik */}
          <Dropdown
            align="right"
            trigger={
              <button
                type="button"
                className="p-1.5 rounded-lg text-app-subtext hover:text-app-title hover:bg-app-bg transition-colors cursor-pointer"
                aria-label="Opsi Aktivitas"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            }
          >
            {onToggleComplete && (
              <Dropdown.Item
                icon={activity.is_completed ? <Circle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                onClick={() => onToggleComplete(activity.id)}
              >
                {activity.is_completed ? "Tandai Belum Selesai" : "Tandai Selesai"}
              </Dropdown.Item>
            )}

            {onEdit && (
              <Dropdown.Item
                icon={<Edit2 className="w-3.5 h-3.5" />}
                onClick={() => onEdit(activity)}
              >
                Edit Aktivitas
              </Dropdown.Item>
            )}

            <Dropdown.Divider />

            {onDelete && (
              <Dropdown.Item
                variant="danger"
                icon={<Trash2 className="w-3.5 h-3.5" />}
                onClick={() => onDelete(activity.id)}
              >
                Hapus Aktivitas
              </Dropdown.Item>
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
