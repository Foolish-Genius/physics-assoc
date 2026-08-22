'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase';
import { Newsletter } from '@/lib/types';

const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
  ssr: false,
  loading: () => <div className="py-24 flex items-center justify-center"><div className="text-sm font-semibold tracking-widest uppercase text-text-muted">Loading Document...</div></div>,
});

export default function NewsletterViewerPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => { fetchNewsletter(); }, [slug]);

  async function fetchNewsletter() {
    const { data, error } = await supabase.from('newsletters').select('*').eq('slug', slug).eq('published', true).single();
    if (error || !data) { setNotFound(true); setLoading(false); return; }
    setNewsletter(data as Newsletter);
    setLoading(false);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-sm font-semibold tracking-widest uppercase text-text-muted">Searching Archives...</div></div>;
  if (notFound || !newsletter) return <div className="min-h-screen flex flex-col items-center justify-center"><h1 className="text-5xl text-text mb-4 font-display">Not Found</h1><button onClick={() => router.push('/newsletter')} className="btn-accent">Return</button></div>;

  return (
    <div className="min-h-screen pt-16 pb-24 bg-transparent">
      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="max-w-[1000px] mx-auto mb-16 text-center">
          <button onClick={() => router.push('/newsletter')} className="text-xl font-yanone uppercase tracking-[0.1em] text-text-muted hover:text-accent transition-colors mb-12 inline-flex items-center gap-2"><span>←</span> Back to Newsletters</button>
          <div className="mb-6">
            {newsletter.issue && <span className="text-xl font-yanone uppercase tracking-[0.1em] text-accent border border-accent/30 px-3 py-1">{newsletter.issue}</span>}
          </div>
          <h1 className="text-4xl md:text-6xl text-text mb-8 font-display leading-[1.1]">{newsletter.title}</h1>
          {newsletter.description && <p className="text-lg text-text-dim mt-4 max-w-2xl mx-auto leading-relaxed">{newsletter.description}</p>}
        </div>
        <div className="max-w-[1200px] mx-auto border p-4 md:p-12 bg-bg-surface" style={{ borderColor: 'var(--border)' }}>
          <PdfViewer url={newsletter.file_url} />
        </div>
      </div>
    </div>
  );
}
