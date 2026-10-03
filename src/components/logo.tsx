import { Target } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Target />
      </div>
      <h1 className="text-lg font-semibold tracking-tight">Better Auth UI</h1>
    </div>
  );
};
