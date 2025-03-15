"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

// 1) Tabs Root
const Tabs = TabsPrimitive.Root;

// 2) Tabs List
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // A simple horizontal container with a thin bottom border
      "relative flex items-center justify-around border-b border-gray-200",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// 3) Tabs Trigger
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors",
      // Active tab styling:
      // - text color changes to teal
      // - a pseudo-element is placed at the bottom to create a 2px teal line
      "data-[state=active]:text-teal-600 data-[state=active]:after:content-[''] data-[state=active]:after:absolute " +
        "data-[state=active]:after:left-0 data-[state=active]:after:right-0 " +
        "data-[state=active]:after:bottom-[-1px] data-[state=active]:after:h-[2px] data-[state=active]:after:bg-teal-600",
      // Hover/focus states (optional)
      "hover:text-teal-600 focus:outline-none focus-visible:text-teal-600",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// 4) Tabs Content (Optional for tab panels)
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("p-4", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Export your custom Tabs components
export { Tabs, TabsList, TabsTrigger, TabsContent };
