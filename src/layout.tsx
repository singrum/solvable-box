import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh flex justify-center items-center ">{children}</div>
  );
}
