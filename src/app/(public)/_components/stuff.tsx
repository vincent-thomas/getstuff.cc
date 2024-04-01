import { cn } from "@stuff/components/utils"
import { brandingGradient } from "./stuff.css"


export const StuffBranding = ({className, plus}: {className?: string, plus?: true}) => {
  return (
    <span className={cn(brandingGradient,/*css({
      textGradient: "to-r",
      gradientFrom: "accent.1",
      gradientTo: "accent.2",
    })*/ className)}>
      Stuff{plus && "+"}
    </span>
  )
}