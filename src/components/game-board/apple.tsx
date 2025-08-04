import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/game-store";
import React, { useEffect, useRef, useState } from "react";

export default function Apple({
  children,
  className,
  status,
}: {
  status?: "unselected" | "selected" | "satisfied";
} & React.ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(0);

  const setAppleSize = useGameStore((e) => e.setAppleSize);

  useEffect(() => {
    if (!ref.current) return;

    const updateSize = () => {
      const rect = ref.current!.getBoundingClientRect();
      const size = rect.width;
      setAppleSize(size);
      setFontSize(size * 0.5); // 💡 원하는 비율로 조절
    };

    updateSize(); // 초기 실행

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [setAppleSize]);

  return (
    <div ref={ref} className={cn("relative aspect-square w-full ", className)}>
      <div
        className={cn(
          "size-8/9 bg-muted absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-lg",
          {
            "outline-2 outline-foreground/50": status === "selected",
            "outline-2 outline-primary bg-primary/20": status === "satisfied",
          }
        )}
      >
        <div
          className={cn("font-bold text-muted-foreground", {
            "text-primary": status === "satisfied",
          })}
          style={{ fontSize }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
