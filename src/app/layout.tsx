'use client';
import { Providers } from '@/context/providers';
import '@/styles/styles.scss';
import { colors, fonts } from '@/tokens/colors';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/rishit.png" />
        <title>Rishit</title>
      </head>
      <body
        style={{
          backgroundColor: `${colors.main}`,
          color: `${colors.text}`,
          fontFamily: `${fonts.body}`,
          height: '100dvh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Providers>
          <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', minHeight: 0 }}>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
