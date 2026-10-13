import * as React from "react";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-1.5 block text-sm font-semibold", className)} {...props} />;
}

export function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-destructive" role="alert">
          <TriangleAlert size={14} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const controlClasses =
  "h-10 w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none disabled:opacity-50";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(controlClasses, invalid ? "border-destructive" : "border-input", className)}
    {...props}
  />
));
Select.displayName = "Select";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-20 w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none disabled:opacity-50",
      invalid ? "border-destructive" : "border-input",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
