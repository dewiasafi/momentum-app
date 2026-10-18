import { Avatar, Button, Dropdown } from "@/components/ui";
import { UserProfile } from "@/types/user";
import { ChevronDown, LogOut, SettingsIcon, User } from "lucide-react";
import React from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ProfileDropdownProps {
  user: UserProfile;
}

interface ProfileMenu {
  id: string;
  label: string;
  icon: React.ReactNode;
  variant?: "default" | "danger";
  onClick?: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const userProfileMenu: ProfileMenu[] = [
    {
      id: "profile",
      label: "My Profile",
      icon: <User className="w-4 h-4" />,
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: <SettingsIcon className="w-4 h-4" />,
    },
    {
      id: "logout",
      label: "Sign Out",
      icon: <LogOut className="w-4 h-4" />,
      variant: "danger",
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown
      align="right"
      trigger={
        <Button
          variant="ghost"
          leftIcon={<Avatar src={user.imageUrl} name={user.name} size="sm" />}
          rightIcon={<ChevronDown className="w-3.5 h-3.5 text-app-subtext" />}
          type="button"
          className="rounded-full"
        >
          {user.name}
        </Button>
      }
    >
      {userProfileMenu.map((item, index) => (
        <React.Fragment key={item.id}>
          {item.variant === "danger" && index > 0 && <Dropdown.Divider />}
          <Dropdown.Item
            icon={item.icon}
            variant={item.variant}
            onClick={item.onClick}
          >
            {item.label}
          </Dropdown.Item>
        </React.Fragment>
      ))}
    </Dropdown>
  );
};