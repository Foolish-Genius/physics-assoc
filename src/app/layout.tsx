import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Header, Footer, ThemeProvider } from '@/components';
import ParticleBackground from '@/components/ParticleBackground';

export const metadata: Metadata = {
  title: 'Physics Association | BITS Pilani',
  description: 'Promoting the beautiful language of physics at BITS Pilani.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Luckiest+Guy&family=Permanent+Marker&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Yanone+Kaffeesatz:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('pa-theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;var v=t||(d?'dark':'light');if(v==='dark')document.documentElement.classList.add('dark');}catch(e){}})();` }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <ParticleBackground />
          <Toaster position="top-right" />
          <Header />
          <main className="relative">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
