import React, { useState } from "react";
import { Button, Drawer, Input, Select } from "@/components/ui";
import { ActivityFormData, ActivityPriority } from "../types";
import { Clock, Plus, Sparkles } from "lucide-react";

interface CreateTaskDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ActivityFormData) => void;
  categories: string[];
}

const PRESET_MINUTES = [15, 30, 45, 60, 90];

export const CreateActivityDrawer: React.FC<CreateTaskDrawerProps> = ({
  open,
  onClose,
  onSubmit,
  categories,
}) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("Education");
  const [priority, setPriority] = useState<ActivityPriority>("medium");
  const [module, setModule] = useState("Module 1");
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      notes: notes.trim(),
      category,
      priority,
      module,
      estimated_minutes: Number(estimatedMinutes) || 0,
      is_completed: false,
    });

    // Reset formulir
    setTitle("");
    setNotes("");
    setCategory("Education");
    setPriority("medium");
    setEstimatedMinutes(30);
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      side="right"
      className="sm:max-w-md md:max-w-lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        {/* Header Drawer */}
        <Drawer.Header onClose={onClose}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-app-forest/10 text-app-forest flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-app-forest" />
            </div>
            <div>
              <Drawer.Title className="text-lg font-bold text-app-title">
                Rekam Aktivitas Baru
              </Drawer.Title>
              <p className="text-xs text-app-subtext mt-0.5">
                Catat rencana aktivitas pribadi, target modul, dan alokasi waktu Anda.
              </p>
            </div>
          </div>
        </Drawer.Header>

        {/* Body Drawer (Scrollable & Clean Spacing) */}
        <Drawer.Body className="space-y-5 py-5">
          {/* 1. Judul Aktivitas */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-app-title uppercase tracking-wider">
              Judul Aktivitas <span className="text-rose-500">*</span>
            </label>
            <Input
              placeholder="Contoh: Belajar modul strategi dan buat ringkasan"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
          </div>

          {/* 2. Deskripsi & Catatan Pribadi */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-app-title uppercase tracking-wider">
              Deskripsi & Catatan
            </label>
            <textarea
              rows={3}
              placeholder="Catat rincian langkah atau hasil yang diharapkan..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-sm p-3.5 bg-white border border-app-subtext/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-app-eucalyptus focus:border-app-eucalyptus text-app-body placeholder:text-app-subtext/50 transition-all shadow-2xs resize-none"
            />
          </div>

          {/* 3. Kategori & Modul (2 Kolom) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-app-title uppercase tracking-wider">
                Kategori
              </label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categories
                  .filter((c) => c !== "All")
                  .map((c) => ({ label: c, value: c }))}
                fullWidth
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-app-title uppercase tracking-wider">
                Modul Terkait
              </label>
              <Select
                value={module}
                onChange={(e) => setModule(e.target.value)}
                options={[
                  { label: "Module 1", value: "Module 1" },
                  { label: "Module 2", value: "Module 2" },
                  { label: "Module 3", value: "Module 3" },
                ]}
                fullWidth
              />
            </div>
          </div>

          {/* 4. Prioritas Tugas (Visual Pill Selectors) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-app-title uppercase tracking-wider">
              Prioritas Aktivitas
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { value: "low", label: "Rendah", dotClass: "bg-app-sage", borderActive: "border-app-sage bg-app-sage/10 text-app-forest" },
                { value: "medium", label: "Sedang", dotClass: "bg-app-sunshine", borderActive: "border-app-sunshine bg-app-sunshine/15 text-app-brown" },
                { value: "high", label: "Tinggi", dotClass: "bg-rose-500", borderActive: "border-rose-400 bg-rose-50 text-rose-700" },
              ].map((p) => {
                const isActive = priority === p.value;
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value as ActivityPriority)}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none ${
                      isActive
                        ? `${p.borderActive} shadow-xs ring-1 ring-current`
                        : "border-app-subtext/20 bg-white text-app-subtext hover:border-app-subtext/40"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${p.dotClass}`} />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Estimasi Durasi (Input Angka + Preset Menit Cepat) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-app-title uppercase tracking-wider">
                Estimasi Durasi
              </label>
              <span className="text-xs font-semibold text-app-eucalyptus flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {estimatedMinutes} Menit
              </span>
            </div>

            <Input
              type="number"
              min={5}
              max={360}
              step={5}
              value={estimatedMinutes}
              onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
              placeholder="Durasi dalam menit"
              fullWidth
            />

            {/* Tombol Preset Menit */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] text-app-subtext mr-1">Preset cepat:</span>
              {PRESET_MINUTES.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setEstimatedMinutes(m)}
                  className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-colors cursor-pointer ${
                    estimatedMinutes === m
                      ? "bg-app-forest text-white border-app-forest shadow-2xs"
                      : "bg-app-bg/50 border-app-subtext/20 text-app-subtext hover:bg-white hover:text-app-title"
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>
        </Drawer.Body>

        {/* Footer Drawer (Aksi Simpan & Batal) */}
        <Drawer.Footer>
          <Button variant="ghost" type="button" onClick={onClose}>
            Batal
          </Button>
          <Button
            variant="primary"
            type="submit"
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Rekam Aktivitas
          </Button>
        </Drawer.Footer>
      </form>
    </Drawer>
  );
};
