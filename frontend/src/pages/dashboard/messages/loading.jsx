import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <Skeleton className="h-9 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        <Skeleton className="h-96" />
        <Skeleton className="md:col-span-2 h-96" />
      </div>
    </div>
  )
}

