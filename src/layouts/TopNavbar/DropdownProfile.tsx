import { Avatar, Button, Dropdown } from "@/components/ui";
import { UserProfile } from "@/types/user";
import { ChevronDown, LogOut, SettingsIcon, User } from "lucide-react";
import React from "react";

interface ProfileDowndownProps {
    user: UserProfile;
}

interface ProfileMenu {
  id: string;
  label: string;
  icon: React.ReactNode;
  variant?: "default" | "danger";
  onClick?: () => void;
}

const USER_PROFILE_MENU: ProfileMenu[] = [
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
  },
];

export const ProfileDropdown : React.FC<ProfileDowndownProps> = ({user}) => {
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
           {USER_PROFILE_MENU.map((item, index) => (
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
    )
}