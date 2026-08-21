'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase';
import { Newsletter } from '@/lib/types';

const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="py-24 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-prussian border-t-orange rounded-full animate-spin" />
    </div>
  ),
});

export default function NewsletterViewerPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchNewsletter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function fetchNewsletter() {
    const { data, error } = await supabase
      .from('newsletters')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error || !data) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setNewsletter(data as Newsletter);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-prussian border-t-orange rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !newsletter) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-3">Newsletter not found</h1>
        <p className="text-gray-500 mb-8">It may have been unpublished or removed.</p>
        <Link
          href="/newsletter"
          className="bg-orange hover:bg-orange/80 text-white font-bold py-2.5 px-6 rounded-lg transition-colors"
        >
          Back to Newsletters
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-6">
          <button
            onClick={() => router.push('/newsletter')}
            className="block text-gray-400 hover:text-orange transition-colors text-sm mb-4 items-center gap-1"
          >
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Newsletters
            </span>
          </button>
          {newsletter.issue && (
            <span className="block text-xs font-semibold uppercase tracking-wide text-orange/80">
              {newsletter.issue}
            </span>
          )}
          <h1 className="text-3xl font-bold text-white mt-1">{newsletter.title}</h1>
          {newsletter.description && (
            <p className="text-gray-400 mt-2">{newsletter.description}</p>
          )}
        </div>

        <PdfViewer url={newsletter.file_url} />
      </div>
    </div>
  );
}
