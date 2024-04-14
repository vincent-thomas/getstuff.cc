import {
  type FlexSprinkles,
  defaultFlex,
  flexSprinkle,
} from "../../../packages/ui/patterns/stack.css";
import { cn } from "../utils";

export * from "../../../packages/ui/patterns/stack.css";
export * from "./border.css";
export * from "./shadow.css";

export const stack = (props: FlexSprinkles) => {
  return cn(defaultFlex, flexSprinkle(props));
};
