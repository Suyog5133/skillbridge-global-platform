import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: () => void;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-sm hover:bg-navy-light focus-visible:outline-navy",
  secondary:
    "bg-brand text-white shadow-sm hover:bg-brand-dark focus-visible:outline-brand",
  outline:
    "border border-navy/15 bg-white text-navy hover:border-navy/30 hover:bg-slate-50 focus-visible:outline-navy",
  ghost: "text-navy hover:bg-slate-100 focus-visible:outline-navy",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

function classes(variant: Variant, size: Size, className?: string) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classNames = classes(variant, size, className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classNames} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classNames} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
