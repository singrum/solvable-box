import { cn } from "@/lib/utils";
import { appleWidth } from "./constants";

export default function Apple({
  children,
  className,
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(`relative `, className)}
      style={{ width: appleWidth, height: appleWidth }}
    >
      <div className="size-4/5 bg-muted absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-lg">
        <div className=" font-bold text-muted-foreground text-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
