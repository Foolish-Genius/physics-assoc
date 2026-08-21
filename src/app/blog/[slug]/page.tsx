'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Article } from '@/lib/types';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => { fetchArticle(); }, [slug]);

  async function fetchArticle() {
    const { data, error } = await supabase.from('articles').select('*').eq('slug', slug).eq('published', true).single();
    if (error || !data) { setNotFound(true); setLoading(false); return; }
    setArticle(data as Article);
    setLoading(false);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-sm font-semibold tracking-widest uppercase text-text-muted">Loading...</div></div>;
  if (notFound || !article) return <div className="min-h-screen flex flex-col items-center justify-center"><h1 className="text-4xl text-text mb-4 font-semibold" style={{ fontFamily: '"Playfair Display", serif' }}>Article Not Found</h1><button onClick={() => router.push('/blog')} className="btn-accent">Return</button></div>;

  const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <article className="min-h-screen pt-16 pb-24 bg-transparent">
      <header className="max-w-[1000px] mx-auto px-5 md:px-8 mb-16 relative z-10 text-center">
        <button onClick={() => router.push('/blog')} className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-text-muted hover:text-accent transition-colors mb-12 inline-flex items-center gap-2"><span>←</span> Back to Articles</button>
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {article.tags.map((tag) => <span key={tag} className="text-[0.65rem] font-bold uppercase tracking-[0.1em] px-2 py-1 bg-border/20 text-text-muted border border-border">{tag}</span>)}
          </div>
        )}
        <h1 className="text-4xl md:text-6xl text-text mb-8 font-medium leading-[1.1]" style={{ fontFamily: '"Playfair Display", serif' }}>{article.title}</h1>
        <div className="flex justify-center items-center gap-4 text-[0.7rem] uppercase tracking-[0.2em] font-semibold text-text-dim">
          <p className="text-accent">{article.author}</p><div className="w-4 h-px bg-border" /><p>{formattedDate}</p>
        </div>
      </header>
      {article.cover_image && (
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 mb-20 relative z-10">
          <div className="relative aspect-[21/9] overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
            <Image src={article.cover_image} alt={article.title} fill className="object-cover" priority />
          </div>
        </div>
      )}
      <div className="max-w-[800px] mx-auto px-5 md:px-8 relative z-10">
        <div className="p-8 md:p-12 border bg-bg-surface" style={{ borderColor: 'var(--border)' }}>
          <MarkdownRenderer content={article.content} />
        </div>
      </div>
    </article>
  );
}
