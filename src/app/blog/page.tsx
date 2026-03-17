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

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [searchQuery, selectedTag, articles]);

  async function fetchArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
      return;
    }

    setArticles(data || []);
    setLoading(false);

    // Extract unique tags
    const tags = new Set<string>();
    (data || []).forEach((article: Article) => {
      article.tags?.forEach((tag) => tags.add(tag));
    });
    setAllTags(Array.from(tags).sort());
  }

  function filterArticles() {
    let filtered = articles;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query) ||
          a.author.toLowerCase().includes(query)
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((a) => a.tags?.includes(selectedTag));
    }

    setFilteredArticles(filtered);
  }

  return (
    <>
      <BlogHero />

      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          {/* Search & Filter Bar */}
          <div className="mb-12 flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-prussian/30 border border-prussian/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange/50 transition-colors backdrop-blur-sm"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === null
                    ? 'bg-orange text-white'
                    : 'bg-prussian/30 text-gray-400 hover:text-white border border-prussian/50 hover:border-orange/30'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTag === tag
                      ? 'bg-orange text-white'
                      : 'bg-prussian/30 text-gray-400 hover:text-white border border-prussian/50 hover:border-orange/30'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-prussian/20 rounded-xl animate-pulse h-96 border border-prussian/30"
                />
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg
                className="w-20 h-20 mx-auto text-prussian mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-white mb-2">
                {searchQuery || selectedTag ? 'No articles found' : 'No articles yet'}
              </h3>
              <p className="text-gray-500">
                {searchQuery || selectedTag
                  ? 'Try adjusting your search or filter.'
                  : 'Check back soon for amazing physics articles!'}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
