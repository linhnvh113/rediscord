import type { ReactNode } from "react";

import ServerNav from "@/components/server-nav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[80px_minmax(0,1fr)]">
      <div className="hidden md:block">
        <ServerNav />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
