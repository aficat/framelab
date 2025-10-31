import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FrameLab - Snap. Style. Share your vibe.',
  description: 'A cute, Gen Z-style PWA photobooth app for capturing aesthetic photo strips',
  manifest: '/manifest.json',
  themeColor: '#E6D9F2',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    apple: '/icons/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FrameLab',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E6D9F2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        {children}
        {typeof window !== 'undefined' && 'serviceWorker' in navigator && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .catch(err => console.log('SW registration failed:', err));
                });
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
