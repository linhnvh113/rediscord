import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-auth flex min-h-screen items-center justify-center">
      <main>{children}</main>
    </div>
  );
}
