'use client';
import { Providers } from '@/context/providers';
import '@/styles/styles.scss';
import Navbar from '@/components/Navbar';
import { colors, fonts } from '@/tokens/colors';
import Footer from '@/components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: `${colors.main}`, color: `${colors.text}`, fontFamily: `${fonts.body}` }}>
        <Navbar />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
