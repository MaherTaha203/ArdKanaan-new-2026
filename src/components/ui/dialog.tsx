"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  className,
  children,
  title,
  description,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  title: string;
  description?: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[1300] bg-[rgba(15,23,42,0.55)] data-[state=open]:animate-in" />
      <DialogPrimitive.Content
        dir="rtl"
        className={cn(
          "fixed left-1/2 top-1/2 z-[1300] max-h-[86vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-auto",
          "rounded-xl border border-border bg-card text-card-foreground shadow-lg focus:outline-none",
          className,
        )}
        {...props}
      >
        <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-border bg-card px-[18px] py-4">
          <div>
            <DialogPrimitive.Title className="text-base font-semibold">{title}</DialogPrimitive.Title>
            {description ? (
              <DialogPrimitive.Description className="mt-0.5 text-[13px] text-muted-foreground">
                {description}
              </DialogPrimitive.Description>
            ) : (
              <DialogPrimitive.Description className="sr-only">{title}</DialogPrimitive.Description>
            )}
          </div>
          <DialogPrimitive.Close
            aria-label="إغلاق"
            className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground hover:bg-muted"
          >
            <X size={18} />
          </DialogPrimitive.Close>
        </div>
        <div className="px-[18px] py-4">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
