import * as Ariakit from "@ariakit/react";
import type { FC } from "react";
import { border } from "src/components/recipies";

export const Popover = Ariakit.PopoverProvider;

export const PopoverTrigger = Ariakit.PopoverDisclosure;

export interface PopoverContentProps extends Ariakit.PopoverProps {}

export const PopoverContent: FC<PopoverContentProps> = ({
  className,
  ...props
}) => {
  return (
    <Ariakit.Popover
      className={cn(
        css({
          bg: "bgComponent",
          p: "small",
        }),
        stack({ direction: "col", gap: "xs" }),
        border({ color: "interactive", rounded: "radius", side: "all" }),
        className,
      )}
      {...props}
    />
  );
};
