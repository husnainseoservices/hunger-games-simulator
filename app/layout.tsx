import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hungergamessimulators.com'),
  title: {
    default: 'Hunger Games Simulator — Run the Games, Predict the Victor',
    template: '%s | Hunger Games Simulator',
  },
  description: 'The most advanced Hunger Games simulator. Simulate the 74th Games, Quarter Quell, and custom arenas. Full tribute stats, 1v1 fights, odds calculator, and Hunger Games quiz.',
  keywords: ['hunger games simulator', 'katniss everdeen', 'hunger games quiz', 'tribute simulator', 'panem simulator', 'hunger games odds'],
  openGraph: {
    type: 'website',
    siteName: 'Hunger Games Simulator',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  verification: { google: 'mshfjsiZulqKEtHdlYgw5lsVFCbP4oic22wRcwwktl0' },
  alternates: { canonical: '/' },
  authors: [{ name: 'Hunger Games Simulator' }],
  category: 'Entertainment',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#080a06',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Oswald:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5628042995841991"
     crossOrigin="anonymous"></script>
      </head>
      <body style={{ backgroundColor: '#080a06', color: '#e8e0d0', minHeight: '100vh', margin: 0 }}>
        <Navbar />
        <main style={{ paddingBottom: '5rem' }}>{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
