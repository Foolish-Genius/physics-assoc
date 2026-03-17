'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Article } from '@/lib/types';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) fetchArticle();
  }, [slug]);

  async function fetchArticle() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error || !data) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setArticle(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-prussian border-t-orange rounded-full animate-spin" />
          <p className="text-gray-500">Loading article...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-orange mb-4">404</h1>
          <p className="text-gray-400 text-lg mb-8">Article not found</p>
          <Link
            href="/blog"
            className="inline-block bg-orange hover:bg-orange/80 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!article) return null;

  const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Article Header */}
      <section className="relative pt-12 pb-8 bg-gradient-to-b from-prussian/40 to-transparent">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange transition-colors mb-8 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-orange/10 text-orange border border-orange/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-orange/20 flex items-center justify-center">
              <span className="text-orange font-bold">
                {article.author?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
            <div>
              <p className="text-white font-semibold">{article.author}</p>
              <p className="text-gray-500 text-sm">{formattedDate}</p>
            </div>
          </div>

          {/* Cover Image */}
          {article.cover_image && (
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden border border-prussian/50 mb-8">
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <MarkdownRenderer content={article.content} />

          {/* Bottom Navigation */}
          <div className="mt-16 pt-8 border-t border-prussian">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-orange hover:text-orange/80 transition-colors font-semibold group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
