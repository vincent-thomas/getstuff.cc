import { cn } from "../utils";
import {type FlexSprinkles, defaultFlex, flexSprinkle} from "./stack.css"

export * from "./stack.css"
export * from "./border.css";

export const stack = ({flexDirection, ...props}: FlexSprinkles) => {
  return cn(defaultFlex, flexSprinkle({flexDirection, ...props }))
}