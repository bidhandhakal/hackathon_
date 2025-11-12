import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title?: string
  description?: string
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, icon, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-2 py-10 text-center",
          className
        )}
        {...props}
      >
        {icon && <div className="text-muted-foreground">{icon}</div>}
        {title && (
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        )}
        {description && (
          <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
        )}
        {children}
      </div>
    )
  }
)
Empty.displayName = "Empty"

export { Empty }
