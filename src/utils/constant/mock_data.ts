import { MenuNavGroup } from "@/types/menu";
import { UserProfile } from "@/types/user";

export const MOCK_USER: UserProfile = {
  id: "usr-1",
  name: "Annie",
  email: "annie@gmail.com",
  imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
  role: "user"
};

export const MENU_NAVBAR: MenuNavGroup[] = [
  {
    groupLabel: "Menu Utama",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        path: "/dashboard",
        iconKey: "layout-grid",
        allowedRoles: ["admin", "member"],
      },
      {
        id: "activities",
        label: "Aktivitas",
        iconKey: "check-circle",
        showAccentBorder: true,
        allowedRoles: ["admin", "member"],
        children: [
          {
            id: "activity-log",
            label: "Activities Log",
            path: "/activities",
            iconKey: "check-circle",
            allowedRoles: ["admin", "member"],
          },
          {
            id: "activity-categories",
            label: "Kategori",
            path: "/activities/categories",
            iconKey: "settings",
            allowedRoles: ["admin"],
          },
        ],
      },
      {
        id: "diary",
        label: "Diary",
        path: "/diary",
        iconKey: "book-open",
        allowedRoles: ["admin", "member"],
      },
    ],
  },
  {
    groupLabel: "Pertumbuhan & AI",
    items: [
      { id: "skills", label: "Skill Tracker", path: "/skills", iconKey: "graduation-cap", allowedRoles: ["admin", "member"] },
      { id: "analytics", label: "Evaluasi Perkembangan", path: "/analytics", iconKey: "trending-up", allowedRoles: ["admin", "member"] },
    ],
  },
  {
    groupLabel: "Pengaturan",
    items: [
      { id: "settings", label: "Pengaturan", path: "/settings", iconKey: "settings", allowedRoles: ["admin", "member"] },
    ],
  },
];