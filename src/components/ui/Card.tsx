import React from 'react';

interface CardProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
}

function Card({ className, children, title, extra, cover, actions, ...props }: CardProps) {
  const cardClasses = `card-container ${className || ''}`.trim();

  return (
    <div className={cardClasses} {...props}>
      {cover && (
        <div className="w-full overflow-hidden">
          {cover}
        </div>
      )}
      {(title || extra) && (
        <div className="card-header-wrapper">
          {title && <div className="card-title-text">{title}</div>}
          {extra && <div className="card-extra-text">{extra}</div>}
        </div>
      )}

      <div className="card-body">{children}</div>

      {actions && actions.length > 0 && (
        <div className="card-actions-wrapper">
          {actions.map((action, i) => {
            const isNotLast = i < actions.length - 1;
            const actionClasses = `card-action-item ${
              isNotLast ? 'card-action-item-bordered' : ''
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

interface CardMetaProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

function CardMeta({ className, avatar, title, description, ...props }: CardMetaProps) {
  const metaClasses = `card-meta ${className || ''}`.trim();

  return (
    <div className={metaClasses} {...props}>
      {avatar && <div className="shrink-0">{avatar}</div>}
      <div className="flex-1 min-w-0">
        {title && <div className="card-meta-title">{title}</div>}
        {description && <div className="card-meta-description">{description}</div>}
      </div>
    </div>
  );
}

interface CardGridProps extends React.ComponentPropsWithoutRef<'div'> {}

function CardGrid({ className, children, ...props }: CardGridProps) {
  const gridClasses = `card-grid ${className || ''}`.trim();

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
}

Card.Meta = CardMeta;
Card.Grid = CardGrid;

export default Card;