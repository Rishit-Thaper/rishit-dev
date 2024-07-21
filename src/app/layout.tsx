"use client";
import { Providers } from "@/context/providers";
import '@/styles/styles.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0D1117", color: "#ffffff" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
