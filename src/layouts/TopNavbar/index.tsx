import React, { useState } from "react";
import { Button, Input } from "@/components/ui";
import {
  Bell,
  Calendar,
  Menu,
  Search,
} from "lucide-react";
import { UserProfile } from "@/types/user";
import { ProfileDropdown } from "./DropdownProfile";

interface TopNavbarProps {
  user: UserProfile
  onToggleMobileSidebar: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  user,
  onToggleMobileSidebar,
}) => {
  const [globalSearch, setGlobalSearch] = useState("");

  return (
    <header className="h-16 border-b border-app-subtext/15 bg-white/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-3 sticky top-0 z-30 shrink-0">      
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
        <Button
          type="button"
          variant="ghost"
          leftIcon={<Menu className="w-5 h-5" />}
          onClick={onToggleMobileSidebar}
          className="p-2 rounded-xl text-app-subtext hover:text-app-title hover:bg-app-bg transition-colors lg:hidden cursor-pointer"
          aria-label="Open Navigation Menu"
        />

        <div className="w-full hidden md:block">
          <Input
            leftIcon={<Search className="w-4 h-4" />}
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search in any group or team"
            fullWidth
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2.5 ">
        <Button
          type="button"
          variant="ghost"
          leftIcon={<Calendar/>}
          className="rounded-xl p-2"
          title="Calendar Schedule"
          aria-label="Calendar"
        />

        <div className="relative">
          <Button
            type="button"
            variant="ghost"
            leftIcon={<Bell/>}
            className="p-2 rounded-xl"
            title="Notifications"
            aria-label="Notifications"
          >
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </Button>
        </div>
        <ProfileDropdown user={user}/>
      </div>
    </header>
  );
};

