"use client";

import * as React from "react";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperContextProps extends StepperProps {
  activeStep: number;
  orientation: "horizontal" | "vertical";
}
const StepperContext = React.createContext<StepperContextProps | null>(null);
function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) throw new Error("useStepper must be used within a <Stepper />");
  return context;
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
}
const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      value,
      onValueChange,
      orientation = "horizontal",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo(
      () => ({ value, onValueChange, orientation, activeStep: value }),
      [value, onValueChange, orientation]
    );
    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal"
              ? "w-full flex-row"
              : "h-full flex-col",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    );
  }
);
Stepper.displayName = "Stepper";

interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
}
const StepperItemContext = React.createContext<{ step: number } | null>(null);
const OriginalStepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center",
        "[&:not(:last-child)]:flex-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
OriginalStepperItem.displayName = "StepperItem";
const StepperItemWithContext: React.FC<StepperItemProps> = ({
  step,
  children,
  ...props
}) => {
  const contextValue = React.useMemo(() => ({ step }), [step]);
  return (
    <StepperItemContext.Provider value={contextValue}>
      <OriginalStepperItem step={step} {...props}>
        {children}
      </OriginalStepperItem>
    </StepperItemContext.Provider>
  );
};

function useStepperItem() {
  const context = React.useContext(StepperItemContext);
  if (!context)
    throw new Error("useStepperItem must be used within a <StepperItem />");
  return context;
}

const StepperTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("inline-flex items-center gap-4", className)}
    {...props}
  />
));
StepperTrigger.displayName = "StepperTrigger";

const StepperIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { activeStep, onValueChange } = useStepper();
  const { step } = useStepperItem();
  const isCompleted = step < activeStep;
  const isActive = step === activeStep;
  const isPending = step > activeStep;
  return (
    <div
      ref={ref}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full border-2 font-semibold transition-colors",
        isCompleted && "border-primary bg-primary text-primary-foreground",
        isActive && "border-primary",
        isPending && "border-border bg-muted text-muted-foreground",
        className
      )}
      onClick={() => onValueChange?.(step)}
      {...props}
    >
      {isCompleted ? (
        <CheckIcon size={16} />
      ) : isActive ? (
        <Loader2Icon size={16} className="animate-spin" />
      ) : (
        step
      )}
    </div>
  );
});
StepperIndicator.displayName = "StepperIndicator";

const StepperTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
));
StepperTitle.displayName = "StepperTitle";

const StepperSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { activeStep, orientation } = useStepper();
  const { step } = useStepperItem();
  const isCompleted = step < activeStep;
  return (
    <div
      ref={ref}
      className={cn(
        "flex-1 transition-colors",
        orientation === "horizontal" ? "h-0.5" : "w-0.5 min-h-12",
        isCompleted ? "bg-primary" : "bg-border",
        className
      )}
      {...props}
    />
  );
});
StepperSeparator.displayName = "StepperSeparator";

export {
  Stepper,
  StepperItemWithContext as StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperSeparator,
};
