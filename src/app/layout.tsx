"use client";
import { Providers } from "@/context/providers";
import "@/styles/styles.scss";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#080B12", color: "#ffffff" }}>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
