import React from "react";

interface CardProps extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
}

export function Card({ className, children, title, extra, cover, actions, ...props }: CardProps) {
  const cardClasses =
    `bg-white border border-app-sage/40 rounded-2xl overflow-hidden shadow-2xs flex flex-col transition-all duration-200 hover:shadow-md ${className || ""}`.trim();

  return (
    <div className={cardClasses} {...props}>
      {cover && (
        <div className="w-full overflow-hidden border-b border-app-subtext/10">
          {cover}
        </div>
      )}
      {(title || extra) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-app-subtext/15 min-h-14 bg-app-bg/30">
          {title && <div className="font-bold text-app-title text-base tracking-tight">{title}</div>}
          {extra && <div className="text-xs font-semibold text-app-leaf">{extra}</div>}
        </div>
      )}

      <div className="p-5 flex-1">{children}</div>

      {actions && actions.length > 0 && (
        <div className="flex border-t border-app-subtext/15 bg-app-bg/10">
          {actions.map((action, i) => {
            const isNotLast = i < actions.length - 1;
            const actionClasses =
              `flex-1 flex justify-center items-center py-3 text-app-subtext hover:text-app-forest hover:bg-app-bg/40 cursor-pointer transition-colors text-xs font-medium gap-1.5 ${
                isNotLast ? "border-r border-app-subtext/15" : ""
              }`.trim();

            return (
              <div key={i} className={actionClasses}>
                {action}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface CardMetaProps extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export function CardMeta({ className, avatar, title, description, ...props }: CardMetaProps) {
  const metaClasses = `flex gap-4 items-start ${className || ""}`.trim();

  return (
    <div className={metaClasses} {...props}>
      {avatar && <div className="shrink-0">{avatar}</div>}
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold text-app-title text-sm mb-1">{title}</div>}
        {description && <div className="text-app-subtext text-xs leading-relaxed">{description}</div>}
      </div>
    </div>
  );
}

interface CardGridProps extends React.ComponentPropsWithoutRef<"div"> {}

export function CardGrid({ className, children, ...props }: CardGridProps) {
  const gridClasses =
    `p-6 border-r border-b border-app-subtext/15 w-full md:w-1/3 float-left hover:shadow-md transition-shadow duration-300 bg-white ${className || ""}`.trim();

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
}

Card.Meta = CardMeta;
Card.Grid = CardGrid;

export default Card;