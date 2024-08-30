import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center text-text justify-center whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none",
        secondary:
          "bg-secondary border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-9 px-3  md:h-12 md:px-4 md:py-2",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  btnType?: string; //  propriété pour gérer le type de bouton
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, btnType, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Fonction utilitaire pour déterminer le variant
    const getVariant = (type: string | undefined) => {
      if (type === "primary" || type === "secondary") {
        return type as "primary" | "secondary";
      }
      return "primary";
    };

    return (
      <Comp
        className={cn(
          buttonVariants({ variant: getVariant(btnType), size, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
