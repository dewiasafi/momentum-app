import React from "react";
import { UserRole } from "./user";

export interface MenuNavItem {
  id: string;
  label: string;
  path?: string;
  iconKey: string;
  showAccentBorder?: boolean;
  allowedRoles?: UserRole[];
  children?: MenuNavItem[];
}

export interface MenuNavGroup {
  groupLabel?: string;
  items: MenuNavItem[];
}