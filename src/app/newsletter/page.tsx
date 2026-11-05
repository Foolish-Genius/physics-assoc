import type { Metadata } from 'next';
import NewsletterContent from './NewsletterContent';

export const metadata: Metadata = {
  title: 'Newsletter',
  description:
    'Browse and read the Physics Association of BITS Pilani newsletters — beautifully crafted PDF issues covering the latest in physics, written by students for students.',
  openGraph: {
    title: 'Newsletter | Physics Association BITS Pilani',
    description:
      'Beautifully crafted physics newsletters from BITS Pilani. Download or read them directly in your browser.',
    url: '/newsletter',
  },
  alternates: {
    canonical: '/newsletter',
  },
};

export default function NewsletterPage() {
  return <NewsletterContent />;
}
