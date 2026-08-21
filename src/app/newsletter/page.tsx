'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Newsletter } from '@/lib/types';
import { formatBytes } from '@/lib/format';

export default function NewsletterListPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  async function fetchNewsletters() {
    const { data, error } = await supabase
      .from('newsletters')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching newsletters:', error);
      setLoading(false);
      return;
    }

    setNewsletters(data || []);
    setLoading(false);
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-orange">News</span>letter
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our periodic roundup of physics news, society updates, and member contributions —
            read online or download the PDF.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-prussian/20 rounded-xl animate-pulse h-32 border border-prussian/30" />
            ))}
          </div>
        ) : newsletters.length > 0 ? (
          <div className="space-y-5">
            {newsletters.map((n) => (
              <div
                key={n.id}
                className="bg-prussian/20 backdrop-blur-sm rounded-2xl p-6 border border-prussian/50 hover:border-orange/30 transition-colors flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  {n.issue && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-orange/80">
                      {n.issue}
                    </span>
                  )}
                  <h2 className="text-xl font-bold text-white mt-1">{n.title}</h2>
                  {n.description && (
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">{n.description}</p>
                  )}
                  <p className="text-gray-600 text-xs mt-3">
                    {new Date(n.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                    {n.file_size_bytes > 0 && <> · {formatBytes(n.file_size_bytes)}</>}
                  </p>
                </div>

                <div className="flex gap-3 flex-shrink-0">
                  <Link
                    href={`/newsletter/${n.slug}`}
                    className="bg-orange hover:bg-orange/80 text-white font-bold py-2.5 px-5 rounded-lg transition-colors text-sm text-center"
                  >
                    Read Online
                  </Link>
                  <a
                    href={n.file_url}
                    download
                    className="bg-prussian/40 hover:bg-prussian/60 text-gray-300 font-medium py-2.5 px-5 rounded-lg transition-colors border border-prussian/50 text-sm text-center"
                  >
                    Download
                  </a>
                </div>
              </div>
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
            <h3 className="text-2xl font-bold text-white mb-2">No newsletters yet</h3>
            <p className="text-gray-500">Check back soon for our next issue!</p>
          </div>
        )}
      </div>
    </section>
  );
}
