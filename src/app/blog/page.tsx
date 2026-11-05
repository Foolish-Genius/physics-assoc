import type { Metadata } from 'next';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read in-depth physics articles by the Physics Association of BITS Pilani, covering topics from quantum mechanics and cosmology to particle physics and general relativity.',
  openGraph: {
    title: 'Blog | Physics Association BITS Pilani',
    description:
      'In-depth physics articles covering quantum mechanics, cosmology, particle physics, and more — written by the Physics Association of BITS Pilani.',
    url: '/blog',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
