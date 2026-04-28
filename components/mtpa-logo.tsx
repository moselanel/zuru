import { cn } from "@/lib/utils"

interface MTPALogoProps {
  className?: string
  variant?: "default" | "white" | "icon-only"
  size?: "sm" | "md" | "lg"
}

export function MTPALogo({ className, variant = "default", size = "md" }: MTPALogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  const subtextSizeClasses = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  }

  const iconColor = variant === "white" ? "#ffffff" : "currentColor"
  const textColorClass = variant === "white" ? "text-white" : "text-foreground"
  const subtextColorClass = variant === "white" ? "text-white/80" : "text-muted-foreground"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Custom MTPA Icon - African Acacia Tree with Sun */}
      <div className={cn("relative", sizeClasses[size])}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Background circle */}
          <circle cx="24" cy="24" r="24" className="fill-primary" />

          {/* Sun rays */}
          <circle cx="32" cy="12" r="5" className="fill-accent" />
          <path
            d="M32 5V7M32 17V19M25 12H27M37 12H39M26.5 7.5L28 9M36 15L37.5 16.5M26.5 16.5L28 15M36 9L37.5 7.5"
            stroke="#D4A853"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Acacia tree trunk */}
          <path d="M24 42V28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

          {/* Acacia tree canopy - flat umbrella shape */}
          <path d="M10 22C10 22 14 16 24 16C34 16 38 22 38 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M12 22C12 22 16 19 24 19C32 19 36 22 36 22" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M14 21.5C14 21.5 18 20 24 20C30 20 34 21.5 34 21.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Tree branches */}
          <path
            d="M24 28L18 23M24 28L30 23M24 26L20 22M24 26L28 22"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Ground line */}
          <path d="M16 42H32" stroke="white" strokeWidth="2" strokeLinecap="round" />

          {/* Small grass tufts */}
          <path
            d="M12 42C12 40 13 39 13 39M14 42C14 40 15 39 15 39M34 42C34 40 33 39 33 39M36 42C36 40 35 39 35 39"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Text */}
      {variant !== "icon-only" && (
        <div className="hidden sm:block">
          <span className={cn("font-serif font-bold", textSizeClasses[size], textColorClass)}>MTPA</span>
          <span className={cn("block", subtextSizeClasses[size], subtextColorClass)}>Mpumalanga Tourism</span>
        </div>
      )}
    </div>
  )
}

// Standalone icon for favicon use
export function MTPAIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background circle */}
      <circle cx="24" cy="24" r="24" fill="#2D5A3D" />

      {/* Sun */}
      <circle cx="32" cy="12" r="5" fill="#D4A853" />

      {/* Acacia tree trunk */}
      <path d="M24 42V28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

      {/* Acacia tree canopy */}
      <path d="M10 22C10 22 14 16 24 16C34 16 38 22 38 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 22C12 22 16 19 24 19C32 19 36 22 36 22" stroke="white" strokeWidth="2" strokeLinecap="round" />

      {/* Tree branches */}
      <path d="M24 28L18 23M24 28L30 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

      {/* Ground line */}
      <path d="M16 42H32" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
