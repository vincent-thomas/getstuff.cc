import { cn } from "@stuff/components/utils"


export const StuffBranding = ({className, plus}: {className?: string, plus?: true}) => {
  return (
    <span className={cn("from-accent to-accent2 bg-gradient-to-r text-transparent bg-clip-text", className)}>
      Stuff{plus && "+"}
    </span>
  )
}