type IconProps = {
  className?: string;
};

export function MenuIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M16.2 16.2L20 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BriefcaseIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 7V6a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function GraduationIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 9.5 12 5l9 4.5-9 4.5L3 9.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M7 12v4.2c0 .4.9 1.6 5 2.8 4.1-1.2 5-2.4 5-2.8V12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LaptopIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="11" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 18.5h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function BuildingIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20V6.5A1.5 1.5 0 0 1 5.5 5h7A1.5 1.5 0 0 1 14 6.5V20"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M14 10h4.5A1.5 1.5 0 0 1 20 11.5V20" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7 8.5h2M7 12h2M7 15.5h2M11 8.5h2M11 12h2M11 15.5h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function UsersIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8.5" r="2.6" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4.5 18.2c.5-2.7 2.4-4.2 4.5-4.2s4 1.5 4.5 4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="16.2" cy="9.2" r="2.1" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M15.4 14.2c1.7.2 3.2 1.4 3.7 3.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProfileIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M6 19c.7-3.1 2.8-4.8 6-4.8s5.3 1.7 6 4.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CompassIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="m14.8 9.2-1.1 4.5-4.5 1.1 1.1-4.5 4.5-1.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ConnectIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="7" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="7" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="17" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.2 11.2 14.8 8.2M9.2 12.8l5.6 3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function GrowthIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M6 15.5 10.2 11l3.1 3.1L18.5 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.8 8H18.5v3.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type LogoMarkProps = IconProps & {
  variant?: "navy" | "light";
};

export function LogoMark({ className = "h-8 w-8", variant = "navy" }: LogoMarkProps) {
  const background = variant === "light" ? "#16325C" : "#0B1F3A";

  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect
        width="32"
        height="32"
        rx="8"
        fill={background}
        stroke={variant === "light" ? "#5B8DEF" : undefined}
      />
      <path
        d="M8.5 18.5 16 8.5l7.5 10H8.5Z"
        stroke="#5B8DEF"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M11.2 22.5h9.6" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
