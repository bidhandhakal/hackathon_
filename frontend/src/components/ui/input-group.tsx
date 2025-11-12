import * as React from "react"
import { cn } from "@/lib/utils"

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  startContent?: React.ReactNode
  endContent?: React.ReactNode
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, startContent, endContent, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-ring",
          className
        )}
        {...props}
      >
        {startContent && (
          <div className="flex-shrink-0 text-muted-foreground">
            {startContent}
          </div>
        )}
        <div className="flex-1">{children}</div>
        {endContent && (
          <div className="flex-shrink-0 text-muted-foreground">
            {endContent}
          </div>
        )}
      </div>
    )
  }
)
InputGroup.displayName = "InputGroup"

export { InputGroup }
