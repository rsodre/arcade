import { cn } from "@cartridge/ui-next";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const controllerActionVariants = cva(
  "flex items-center gap-1.5 px-3 py-2 h-10 min-w-48 cursor-pointer",
  {
    variants: {
      variant: {
        darkest: "",
        darker: "",
        dark: "",
        default:
          "bg-background-300 hover:bg-background-400 lg:bg-background-200 lg:hover:bg-background-300",
        light: "",
        lighter: "",
        lightest: "",
        ghost: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ControllerActionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof controllerActionVariants> {
  label: string;
  Icon?: React.ReactNode;
}

const ControllerAction = ({
  variant,
  className,
  label,
  Icon,
  ...props
}: ControllerActionProps) => {
  return (
    <div
      className={cn(controllerActionVariants({ variant }), className)}
      {...props}
    >
      {Icon}
      <p className="text-foreground-100 text-sm font-medium">{label}</p>
    </div>
  );
};

export default ControllerAction;
