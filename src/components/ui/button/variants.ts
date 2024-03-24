import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-75 gap-2",
  {
    variants: {
      variant: {
        primary: "bg-primary text-background hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-hover hover:text-accent-foreground",
          accent: "bg-accent text-text hover:bg-accent2",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-hover hover:text-accent-foreground",
        link: "text-text underline-offset-4 hover:underline",
        icon: "hover:bg-hover bg-transparent text-text rounded-full",
        none: ""
      },
      size: {
        md: "px-4 py-2",
        sm: "py-1.5 px-3",
        xs: "py-1.5 px-2",
        lg: "px-5 py-3",
        icon: "p-3"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "primary"
    }
  }
);
