import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { ActiveProvider } from "@/components/providers/active-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

import "./globals.css";
import "@uploadthing/react/styles.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Rediscord",
  description: "Nền tảng nhắn tin, thực hiện các cuộc gọi, gọi video",
  authors: {
    name: "Hoang Linh",
    url: "https://www.facebook.com/hoanglinh371",
  },
  icons: {
    icon: "/discord_logo_2.webp",
  },
  keywords: [
    "rediscord render",
    "rediscord onrender",
    "rediscord nextjs",
    "rediscord app",
    "rediscord download",
    "rediscord server",
    "rediscord bot",
    "rediscord community",
    "rediscord chat",
    "rediscord voice chat",
    "rediscord game integration",
    "rediscord for gaming",
    "rediscord for business",
    "rediscord for teams",
    "rediscord features",
    "rediscord user guide",
    "rediscord tutorial",
    "rediscord setup",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <SocketProvider>{children}</SocketProvider>
              <ActiveProvider />
              <ModalProvider />
              {/* <ReactQueryDevtools /> */}
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
