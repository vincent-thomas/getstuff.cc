import { cn } from "@stuff/components/utils"


export const StuffBranding = ({className, plus}: {className?: string, plus?: true}) => {
  return (
    <span className={cn("from-[#104D86] to-[#0083F1] bg-gradient-to-r text-transparent bg-clip-text", className)}>
      Stuff{plus && "+"}
    </span>
  )
}