import React from "react";
import { Plus } from "lucide-react";
import { Header } from "@/components/ui";

interface ActivityHeaderProps {
  onOpenCreateDrawer: () => void;
}

export const ActivityHeader: React.FC<ActivityHeaderProps> = ({
  onOpenCreateDrawer,
}) => {
  return (
    <Header
      title="Aktivitas Pribadi"
      description="Pengingat apa yang dikerjakan hari ini, skill yang dipelajari, dan kebiasaan menuju goals Anda."
      primaryAction={{
        label: "Rekam Aktivitas",
        icon: <Plus className="w-4 h-4" />,
        onClick: onOpenCreateDrawer,
      }}
    />
  );
};