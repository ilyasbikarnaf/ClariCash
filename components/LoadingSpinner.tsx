import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function LoadingSpinner({ classes }: { classes?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <Loader2 className={cn("h-10 w-10 animate-spin text-white", classes)} />
    </div>
  );
}
