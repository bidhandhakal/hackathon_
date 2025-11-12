import * as React from "react"
import { cn } from "@/lib/utils"

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    
    if (asChild) {
      return <>{props.children}</>
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)
Item.displayName = "Item"

export { Item }
