import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import ArticleContent from './ArticleContent';

const SITE_URL = 'https://phyassoc.is-cool.dev';

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { slug } = params;

  if (!supabase) {
    return { title: 'Article', description: 'Physics article by Physics Association BITS Pilani.' };
  }

  const { data: article, error } = await supabase
    .from('articles')
    .select('title, excerpt, cover_image, author, created_at')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !article) {
    return {
      title: 'Article Not Found',
      description: 'This article could not be found.',
    };
  }

  const ogImage = article.cover_image ||
    `${SITE_URL}/icon-512.png`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: ogImage,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: 'Physics Association, BITS Pilani',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` },
    },
    datePublished: article.created_at,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
  };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/blog/${slug}`,
      type: 'article',
      images: [{ url: ogImage, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
    other: {
      'script:ld+json': JSON.stringify(articleJsonLd),
    },
  };
}

export default function ArticlePage() {
  return <ArticleContent />;
}
