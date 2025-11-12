import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  error?: string
  hint?: string
  required?: boolean
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, label, error, hint, required, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label && (
          <Label>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        {children}
        {hint && !error && (
          <p className="text-sm text-muted-foreground">{hint}</p>
        )}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
Field.displayName = "Field"

export { Field }
