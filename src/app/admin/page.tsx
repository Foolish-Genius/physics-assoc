'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Article } from '@/lib/types';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminDashboard() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

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
    fetchArticles();
  }

  async function fetchArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch articles');
      setLoading(false);
      return;
    }

    setArticles(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeleting(id);
    const { error } = await supabase.from('articles').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete article');
      setDeleting(null);
      return;
    }

    toast.success('Article deleted');
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setDeleting(null);
  }

  async function togglePublished(article: Article) {
    const { error } = await supabase
      .from('articles')
      .update({ published: !article.published })
      .eq('id', article.id);

    if (error) {
      toast.error('Failed to update article');
      return;
    }

    setArticles((prev) =>
      prev.map((a) => (a.id === article.id ? { ...a, published: !a.published } : a))
    );
    toast.success(article.published ? 'Article unpublished' : 'Article published');
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-prussian border-t-orange rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#14213d',
            color: '#fff',
            border: '1px solid rgba(252, 163, 17, 0.3)',
          },
        }}
      />

      <div className="min-h-screen pt-8 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Article Dashboard</h1>
              <p className="text-gray-500">Manage your blog articles</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/editor"
                className="bg-orange hover:bg-orange/80 text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Article
              </Link>
              <button
                onClick={handleLogout}
                className="bg-prussian/40 hover:bg-prussian/60 text-gray-300 font-medium py-2.5 px-5 rounded-lg transition-colors border border-prussian/50"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-prussian/20 backdrop-blur-sm rounded-xl p-5 border border-prussian/50">
              <p className="text-gray-500 text-sm mb-1">Total Articles</p>
              <p className="text-3xl font-bold text-white">{articles.length}</p>
            </div>
            <div className="bg-prussian/20 backdrop-blur-sm rounded-xl p-5 border border-prussian/50">
              <p className="text-gray-500 text-sm mb-1">Published</p>
              <p className="text-3xl font-bold text-green-400">
                {articles.filter((a) => a.published).length}
              </p>
            </div>
            <div className="bg-prussian/20 backdrop-blur-sm rounded-xl p-5 border border-prussian/50">
              <p className="text-gray-500 text-sm mb-1">Drafts</p>
              <p className="text-3xl font-bold text-yellow-400">
                {articles.filter((a) => !a.published).length}
              </p>
            </div>
          </div>

          {/* Articles Table */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-prussian/20 rounded-xl animate-pulse h-20 border border-prussian/30" />
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="space-y-3">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-prussian/20 backdrop-blur-sm rounded-xl p-5 border border-prussian/50 hover:border-prussian transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {article.title}
                        </h3>
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                            article.published
                              ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                              : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                          }`}
                        >
                          {article.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">
                        By {article.author} •{' '}
                        {new Date(article.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      {article.published && (
                        <Link
                          href={`/blog/${article.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-white hover:bg-prussian/50 rounded-lg transition-colors"
                          title="View article"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      )}
                      <button
                        onClick={() => togglePublished(article)}
                        className="p-2 text-gray-400 hover:text-orange hover:bg-prussian/50 rounded-lg transition-colors"
                        title={article.published ? 'Unpublish' : 'Publish'}
                      >
                        {article.published ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                      <Link
                        href={`/admin/editor/${article.slug}`}
                        className="p-2 text-gray-400 hover:text-orange hover:bg-prussian/50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id, article.title)}
                        disabled={deleting === article.id}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-prussian/10 rounded-2xl border border-prussian/30">
              <svg className="w-16 h-16 mx-auto text-prussian mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">No articles yet</h3>
              <p className="text-gray-500 mb-6">Create your first article to get started.</p>
              <Link
                href="/admin/editor"
                className="inline-block bg-orange hover:bg-orange/80 text-white font-bold py-2.5 px-6 rounded-lg transition-colors"
              >
                Create Article
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
