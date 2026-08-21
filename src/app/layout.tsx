import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Header, Footer, ParticleBackground } from '@/components';

export const metadata: Metadata = {
  title: 'Physics Association | BITS Pilani',
  description:
    'Promoting the beautiful language of physics at BITS Pilani. Explore articles, events, and insights from our community of physics enthusiasts.',
  keywords: [
    'physics',
    'BITS Pilani',
    'association',
    'quantum computing',
    'science',
  ],
  authors: [{ name: 'Physics Association' }],
  creator: 'Physics Association',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bitsphyassoc.github.io',
    title: 'Physics Association | BITS Pilani',
    description:
      'Promoting the beautiful language of physics at BITS Pilani.',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white font-poppins antialiased">
        <Toaster
          position="top-right"
          containerStyle={{ top: 90, zIndex: 9999 }}
          toastOptions={{
            duration: 4500,
            style: {
              background: '#14213d',
              color: '#fff',
              border: '1px solid rgba(252, 163, 17, 0.3)',
              maxWidth: '420px',
            },
          }}
        />
        <ParticleBackground />
        <Header />
        <main className="min-h-screen relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
