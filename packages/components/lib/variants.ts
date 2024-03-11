import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-75 gap-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "px-4 py-2",
        sm: "h-4 px-3",
        lg: "px-6 py-3",
        icon: "w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
