import { cn } from "~/lib/utils";

interface StorybookDividerProps {
  className?: string;
}

export function StorybookDivider({ className }: StorybookDividerProps) {
  return <div className={cn("storybook-divider w-full", className)} />;
}
