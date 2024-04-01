import { cn } from "@stuff/components/utils"
import { type FlexSprinkles, defaultFlex, flexSprinkle } from "./stack.css"
export const stack = (props: FlexSprinkles) => {
  return cn(defaultFlex, flexSprinkle(props))
}