import React, { HTMLAttributes, useEffect, useState } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

const AVATAR_BG_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-amber-500",
  "bg-cyan-500",
  "bg-rose-500",
  "bg-indigo-500",
];

const SIZE_STYLES: Record<AvatarSize, { container: string; text: string; status: string }> = {
  xs: { container: "w-6 h-6", text: "text-[10px]", status: "w-1.5 h-1.5 border" },
  sm: { container: "w-8 h-8", text: "text-xs", status: "w-2 h-2 border" },
  md: { container: "w-10 h-10", text: "text-sm", status: "w-2.5 h-2.5 border-2" },
  lg: { container: "w-12 h-12", text: "text-base", status: "w-3 h-3 border-2" },
  xl: { container: "w-16 h-16", text: "text-lg", status: "w-3.5 h-3.5 border-2" },
};

const STATUS_STYLES: Record<AvatarStatus, string> = {
  online: "bg-emerald-500",
  offline: "bg-neutral-400",
  busy: "bg-rose-500",
  away: "bg-amber-500",
};

function getInitials(name?: string): string {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return `${first}${last}`.toUpperCase();
}

function getRandomColor(): string {
  const index = Math.floor(Math.random() * AVATAR_BG_COLORS.length);
  return AVATAR_BG_COLORS[index];
}

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  showTooltip?: boolean;
}

export function Avatar({
  src,
  alt,
  name,
  size = "md",
  status,
  showTooltip = true,
  className = "",
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [avatarColor] = useState<string>(() => getRandomColor());

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const showImage = Boolean(src) && !imageError;
  const sizeStyle = SIZE_STYLES[size];

  return (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full align-middle group ${sizeStyle.container} ${className}`}
      {...props}
    >
      {/* Inner Circle */}
      <span
        className={`w-full h-full flex items-center justify-center rounded-full overflow-hidden ${
          showImage ? "bg-neutral-200" : avatarColor
        }`}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? name ?? "Avatar"}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className={`font-semibold text-white uppercase select-none ${sizeStyle.text}`}>
            {getInitials(name)}
          </span>
        )}
      </span>

      {/* Status Badge */}
      {status && (
        <span
          className={`absolute top-0 right-0 rounded-full border-white ${sizeStyle.status} ${STATUS_STYLES[status]}`}
          role="status"
          aria-label={`Status: ${status}`}
        />
      )}

      {/* Tooltip */}
      {showTooltip && name && (
        <span className="absolute left-1/2 bottom-full z-30 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-neutral-900 text-white text-xs font-medium opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 shadow-md">
          {name}
        </span>
      )}
    </span>
  );
}

export interface AvatarGroupItem {
  id: string | number;
  src?: string;
  alt?: string;
  name?: string;
  status?: AvatarStatus;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  avatars: AvatarGroupItem[];
  size?: AvatarSize;
  max?: number;
}

export function AvatarGroup({
  avatars,
  size = "md",
  max = 4,
  className = "",
  ...props
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const overflowAvatars = avatars.slice(max);
  const sizeStyle = SIZE_STYLES[size];

  return (
    <div className={`flex items-center -space-x-2 ${className}`} {...props}>
      {visibleAvatars.map((avatar) => (
        <Avatar
          key={avatar.id}
          src={avatar.src}
          alt={avatar.alt}
          name={avatar.name}
          status={avatar.status}
          size={size}
          className="ring-2 ring-white"
        />
      ))}

      {overflowAvatars.length > 0 && (
        <span
          className={`relative inline-flex items-center justify-center shrink-0 rounded-full align-middle ring-2 ring-white group ${sizeStyle.container}`}
          aria-label={`${overflowAvatars.length} more users`}
        >
          <span className="w-full h-full flex items-center justify-center rounded-full bg-neutral-400">
            <span className={`font-semibold text-white ${sizeStyle.text}`}>
              +{overflowAvatars.length}
            </span>
          </span>

          {/* Overflow Hover Popup */}
          <span className="absolute left-1/2 bottom-full z-30 -translate-x-1/2 mb-2 hidden group-hover:flex items-center gap-1.5 p-2 rounded-xl bg-white shadow-xl border border-neutral-100">
            {overflowAvatars.map((avatar) => (
              <Avatar
                key={avatar.id}
                src={avatar.src}
                alt={avatar.alt}
                name={avatar.name}
                status={avatar.status}
                size="sm"
                showTooltip
              />
            ))}
          </span>
        </span>
      )}
    </div>
  );
}

Avatar.Group = AvatarGroup;

export default Avatar;