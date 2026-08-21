'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Article } from '@/lib/types';
import BlogCard from '@/components/BlogCard';
import BlogHero from '@/components/BlogHero';

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => { fetchArticles(); }, []);
  useEffect(() => { filterArticles(); }, [searchQuery, selectedTag, articles]);

  async function fetchArticles() {
    const { data, error } = await supabase.from('articles').select('*').eq('published', true).order('created_at', { ascending: false });
    if (error) { console.error(error); setLoading(false); return; }
    setArticles(data || []);
    setLoading(false);
    const tags = new Set<string>();
    (data || []).forEach((article: Article) => { article.tags?.forEach((tag) => tags.add(tag)); });
    setAllTags(Array.from(tags).sort());
  }

  function filterArticles() {
    let filtered = articles;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((a) => a.title.toLowerCase().includes(query) || a.excerpt.toLowerCase().includes(query) || a.author.toLowerCase().includes(query));
    }
    if (selectedTag) {
      filtered = filtered.filter((a) => a.tags?.includes(selectedTag));
    }
    setFilteredArticles(filtered);
  }

  return (
    <>
      <BlogHero />
      <section className="py-24" style={{ background: 'var(--bg-raised)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row gap-6 mb-16 p-6 border bg-bg-surface" style={{ borderColor: 'var(--border)' }}>
            <div className="relative flex-1">
              <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-3 text-sm outline-none transition-colors border rounded bg-bg text-text focus:border-accent" style={{ borderColor: 'var(--border)' }} />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xl uppercase tracking-[0.1em] font-yanone text-text-dim mr-2">Tags:</span>
              <button onClick={() => setSelectedTag(null)} className="text-lg font-yanone uppercase tracking-[0.1em] px-3 py-1 transition-colors border" style={{ background: selectedTag === null ? 'var(--accent)' : 'transparent', color: selectedTag === null ? 'var(--bg)' : 'var(--text-dim)', borderColor: selectedTag === null ? 'var(--accent)' : 'var(--border)' }}>All</button>
              {allTags.map((tag) => (
                <button key={tag} onClick={() => setSelectedTag(tag === selectedTag ? null : tag)} className="text-lg font-yanone uppercase tracking-[0.1em] px-3 py-1 transition-colors border" style={{ background: selectedTag === tag ? 'var(--accent)' : 'transparent', color: selectedTag === tag ? 'var(--bg)' : 'var(--text-dim)', borderColor: selectedTag === tag ? 'var(--accent)' : 'var(--border)' }}>{tag}</button>
              ))}
            </div>
          </div>
          {loading ? (
            <div className="space-y-6">{[1, 2, 3].map((i) => <div key={i} className="h-48 border bg-bg-surface animate-pulse" style={{ borderColor: 'var(--border)' }} />)}</div>
          ) : filteredArticles.length > 0 ? (
            <div className="space-y-8">{filteredArticles.map((article) => <BlogCard key={article.id} article={article} />)}</div>
          ) : (
            <div className="text-center py-24 border bg-bg-surface" style={{ borderColor: 'var(--border)' }}>
              <h3 className="text-4xl text-text font-display mb-4">No articles found</h3>
              <p className="text-text-dim">Try adjusting your search query.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
