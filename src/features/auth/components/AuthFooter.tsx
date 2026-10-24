import React from "react";
import { Link } from "react-router-dom";

export interface AuthFooterProps {
  prompt?: string;
  linkText?: string;
  linkTo?: string;
  divider?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({
  prompt,
  linkText,
  linkTo,
  divider = false,
  children,
  className = "",
}) => {
  return (
    <div className={`mt-6 text-center text-sm text-app-subtext ${className}`}>
      {divider && <div className="my-4 border-t border-app-subtext/15" />}
      {children ? (
        children
      ) : (
        <p>
          {prompt && <span>{prompt} </span>}
          {linkTo && linkText && (
            <Link
              to={linkTo}
              className="font-semibold text-accent-forest hover:underline transition-colors"
            >
              {linkText}
            </Link>
          )}
        </p>
      )}
    </div>
  );
};

export default AuthFooter;

