import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Header, Footer, ThemeProvider } from '@/components';
import ParticleBackground from '@/components/ParticleBackground';
import { SpeedInsights } from '@vercel/speed-insights/next';

const SITE_URL = 'https://phyassoc.is-cool.dev';
const OG_IMAGE = `${SITE_URL}/icon-512.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Physics Association | BITS Pilani (BITS Phy Assoc)',
    template: '%s | Physics Association BITS Pilani',
  },
  description:
    'Official website of the Physics Association, BITS Pilani (BITS Phy Assoc). Discover physics articles, research breakdowns, newsletters, seminars, and events from quantum mechanics to astrophysics.',
  keywords: [
    'bits physics assoc',
    'bits phy assoc',
    'phy assoc bits pilani',
    'bits phyassoc',
    'physics association bits pilani',
    'bits pilani physics association',
    'physics association',
    'bits pilani',
    'quantum mechanics',
    'cosmology',
    'particle physics',
    'astrophysics',
    'physics newsletter',
    'physics blog',
  ],
  authors: [{ name: 'Physics Association, BITS Pilani' }],
  creator: 'Physics Association, BITS Pilani',
  publisher: 'Physics Association, BITS Pilani',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Physics Association | BITS Pilani',
    title: 'Physics Association | BITS Pilani',
    description:
      'Promoting the beautiful language of physics at BITS Pilani through articles, newsletters, and events.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Physics Association BITS Pilani' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Physics Association | BITS Pilani',
    description:
      'Promoting the beautiful language of physics at BITS Pilani through articles, newsletters, and events.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Physics Association, BITS Pilani',
  alternateName: ['BITS Phy Assoc', 'BITS Physics Association', 'PhyAssoc', 'Phy Assoc'],
  url: SITE_URL,
  logo: OG_IMAGE,
  sameAs: [
    'https://www.facebook.com/Physics.Association.BITSPilani/',
    'https://www.linkedin.com/company/physicsassociationbitspilani',
    'https://www.instagram.com/bits_phyassoc/',
    'https://youtube.com/@bitsphysicsassoc?si=-H9iE8cGy-ugRGXs',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Luckiest+Guy&family=Permanent+Marker&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Yanone+Kaffeesatz:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('pa-theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;var v=t||(d?'dark':'light');if(v==='dark')document.documentElement.classList.add('dark');}catch(e){}})();` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script defer src="https://analytics.open-domains.com/script.js" data-website-id="99cba003-2d1d-4577-8c7f-092d44562e4f"></script>
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <ParticleBackground />
          <Toaster position="top-right" />
          <Header />
          <main className="relative">{children}</main>
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
