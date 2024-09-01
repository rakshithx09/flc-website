import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

import ShimmerButton from "../magicui/shimmer-button";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-center font-title text-sm font-thin tracking-tight text-white sm:text-sm md:text-lg lg:text-xl hoverable hover:bg-white",
        // destructive:
        //   "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // outline:
        //   "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        // secondary:
        //   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // ghost: "bg-transparent hover:text-accent-foreground",
        // link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "px-4 py-2 shadow-2xl sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-3",
        sm: "px-4 py-2 shadow-xl md:px-4 md:py-2 lg:px-6 lg:py-2",
        lg: "px-4 py-2 shadow-2xl sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4",
        // icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    // const Comp = asChild ? Slot : "button";
    return (
      <ShimmerButton
        background="radial-gradient(
          circle at 50% -180%,
          #800080e3 30%,
          #0b011df5 75%
        )"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
