'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Article } from '@/lib/types';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import toast from 'react-hot-toast';

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleSlug = params.slug as string;

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [articleId, setArticleId] = useState('');

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [author, setAuthor] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
      return;
    }
    setAuthenticated(true);
    fetchArticle();
  }

  async function fetchArticle() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', articleSlug)
      .single();

    if (error || !data) {
      toast.error('Article not found');
      router.push('/admin');
      return;
    }

    const article = data as Article;
    setArticleId(article.id);
    setTitle(article.title);
    setSlug(article.slug);
    setExcerpt(article.excerpt);
    setContent(article.content);
    setCoverImage(article.cover_image);
    setAuthor(article.author);
    setTagsInput(article.tags?.join(', ') || '');
    setPublished(article.published);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !slug || !content) {
      toast.error('Title, slug, and content are required');
      return;
    }

    setSaving(true);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const { error } = await supabase
      .from('articles')
      .update({
        title,
        slug,
        excerpt,
        content,
        cover_image: coverImage,
        author,
        tags,
        published,
      })
      .eq('id', articleId);

    if (error) {
      toast.error('Failed to update article: ' + error.message);
      setSaving(false);
      return;
    }

    toast.success('Article updated!');
    router.push('/admin');
  }

  if (!authenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-prussian border-t-orange rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen pt-8 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <Link
                href="/admin"
                className="text-gray-400 hover:text-orange transition-colors text-sm mb-2 inline-flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-white">Edit Article</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                  showPreview
                    ? 'bg-orange text-white'
                    : 'bg-prussian/40 text-gray-300 border border-prussian/50 hover:border-orange/30'
                }`}
              >
                {showPreview ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>

          {showPreview ? (
            <div className="bg-prussian/20 backdrop-blur-sm rounded-2xl p-8 border border-prussian/50">
              <h1 className="text-4xl font-bold text-white mb-4">{title || 'Untitled'}</h1>
              <p className="text-gray-500 mb-8">By {author || 'Unknown'}</p>
              <MarkdownRenderer content={content || '*No content yet*'} />
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="bg-prussian/20 backdrop-blur-sm rounded-2xl p-8 border border-prussian/50 space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">
                    Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-prussian rounded-lg text-white text-xl font-semibold placeholder-gray-600 focus:outline-none focus:border-orange/50 transition-colors"
                    placeholder="Your article title"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-400 mb-2">
                    Slug *
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm">/blog/</span>
                    <input
                      id="slug"
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 bg-black/50 border border-prussian rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-orange/50 transition-colors font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Author */}
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-400 mb-2">
                      Author
                    </label>
                    <input
                      id="author"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-prussian rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-orange/50 transition-colors"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-400 mb-2">
                      Tags <span className="text-gray-600">(comma-separated)</span>
                    </label>
                    <input
                      id="tags"
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-prussian rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-orange/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Cover Image URL */}
                <div>
                  <label htmlFor="cover" className="block text-sm font-medium text-gray-400 mb-2">
                    Cover Image URL
                  </label>
                  <input
                    id="cover"
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-prussian rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-orange/50 transition-colors"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-400 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 bg-black/50 border border-prussian rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-orange/50 transition-colors resize-none"
                  />
                </div>

                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-2">
                    Content * <span className="text-gray-600">(Markdown + LaTeX supported: $inline$ or $$block$$)</span>
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={20}
                    className="w-full px-4 py-3 bg-black/50 border border-prussian rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-orange/50 transition-colors font-mono text-sm resize-y"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-prussian/20 backdrop-blur-sm rounded-2xl p-6 border border-prussian/50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-prussian rounded-full peer-checked:bg-orange transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                  </div>
                  <span className="text-gray-300 font-medium">
                    {published ? 'Published' : 'Draft'}
                  </span>
                </label>

                <div className="flex gap-3">
                  <Link
                    href="/admin"
                    className="py-2.5 px-6 rounded-lg font-medium text-gray-300 bg-prussian/40 hover:bg-prussian/60 border border-prussian/50 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-orange hover:bg-orange/80 disabled:bg-orange/40 text-white font-bold py-2.5 px-8 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Update Article'
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
