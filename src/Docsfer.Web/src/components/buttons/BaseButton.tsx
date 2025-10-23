import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { LayoutGrid } from "lucide-react";
import clsx from "clsx";

type Variant = "full" | "border";
type IconSide = "left" | "right";

const VARIANTS: Record<Variant, string> = {
  full: "bg-btn-200 text-white hover:bg-btn-300 active:bg-btn-100",
  border:
    "border-2 border-btn-200 text-btn-200 bg-transparent hover:bg-btn-200/10 active:bg-btn-200/20",
};

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  icon?: ReactNode | string;
  showIcon?: boolean;
  iconPosition?: IconSide;
  className?: string;
};

export const BaseButton = ({
  type = "button",
  children,
  variant = "full",
  icon, // <LayoutGrid className="w-5 h-5" />
  showIcon = false,
  iconPosition = "left",
  className = "",
  ...rest // extra props like onClick, disabled
}: BaseButtonProps) => {
  const variantClasses = VARIANTS[variant] ?? VARIANTS.full;

  const renderIcon = () => {
    if (!showIcon) return null;
    // if you pass a node, use it; otherwise fall back to LayoutGrid
    return icon && typeof icon !== "string" ? (
      icon
    ) : (
      <LayoutGrid className="w-5 h-5" />
    );
  };

  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center transition-all duration-300 justify-center w-full rounded-sm font-semibold gap-2 h-default p-3",
        variantClasses,
        className
      )}
      {...rest}
    >
      {iconPosition === "left" && renderIcon()}
      <span>{children}</span>
      {iconPosition === "right" && renderIcon()}
    </button>
  );
};
