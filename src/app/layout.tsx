import { Providers } from "@/context/providers";
import "@/styles/styles.scss";
import Navbar from "@/components/Navbar";
import { colors } from "@/tokens/colors";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ backgroundColor: `${colors.main}`, color: `${colors.text}` }}
      >
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
