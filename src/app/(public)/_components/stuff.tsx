import { cn } from "@stuff/components/utils"


export const StuffBranding = ({className, plus}: {className?: string, plus?: true}) => {
  return (
    <span className={cn(/*css({
      textGradient: "to-r",
      gradientFrom: "accent.1",
      gradientTo: "accent.2",
    })*/ className)}>
      Stuff{plus && "+"}
    </span>
  )
}