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

 fix/blog-404-and-latex-editor
  const ogImage = article.cover_image ||
    'https://raw.githubusercontent.com/bitsphyassoc/bitsphyassoc.github.io/main/assets/images/feature-image.jpg';

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
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` },
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

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-sm font-semibold tracking-widest uppercase text-text-muted">Loading...</div></div>;
  if (notFound || !article) return <div className="min-h-screen flex flex-col items-center justify-center"><h1 className="text-5xl text-text mb-4 font-display">Article Not Found</h1><button onClick={() => router.push('/blog')} className="btn-accent">Return</button></div>;

  const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <article className="min-h-screen pt-16 pb-24 bg-transparent">
      <header className="max-w-[1000px] mx-auto px-5 md:px-8 mb-16 relative z-10 text-center">
        <button onClick={() => router.push('/blog')} className="text-xl font-yanone uppercase tracking-[0.1em] text-text-muted hover:text-accent transition-colors mb-12 inline-flex items-center gap-2"><span>←</span> Back to Articles</button>
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {article.tags.map((tag) => <span key={tag} className="text-lg font-yanone uppercase tracking-[0.1em] px-2 py-0 bg-border/20 text-text-muted border border-border">{tag}</span>)}
          </div>
        )}
        <h1 className="text-4xl md:text-6xl text-text mb-8 font-display leading-[1.1]">{article.title}</h1>
        <div className="flex justify-center items-center gap-4 text-xl uppercase tracking-[0.1em] font-yanone text-text-dim">
          <p className="text-accent">{article.author}</p><div className="w-4 h-px bg-border" /><p>{formattedDate}</p>
        </div>
      </header>
      {article.cover_image && (
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 mb-20 relative z-10">
          <div className="relative aspect-[21/9] overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
            <Image src={article.cover_image} alt={article.title} fill unoptimized priority className="object-cover" />
          </div>
        </div>
      )}
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        <div className="p-8 md:p-12 border bg-bg-surface" style={{ borderColor: 'var(--border)' }}>
          <MarkdownRenderer content={article.content} />
        </div>
      </div>
    </article>
  );
 main
}
