import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import NewsletterViewerContent from './NewsletterViewerContent';

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { slug } = params;

  if (!supabase) {
    return { title: 'Newsletter', description: 'Physics newsletter from Physics Association BITS Pilani.' };
  }

  const { data: newsletter, error } = await supabase
    .from('newsletters')
    .select('title, description, issue')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !newsletter) {
    return {
      title: 'Newsletter Not Found',
      description: 'This newsletter issue could not be found.',
    };
  }

  const title = newsletter.issue
    ? `${newsletter.title} — ${newsletter.issue}`
    : newsletter.title;

  return {
    title: newsletter.title,
    description:
      newsletter.description ||
      `Read ${title} from the Physics Association of BITS Pilani.`,
    openGraph: {
      title,
      description:
        newsletter.description ||
        `Read ${title} from the Physics Association of BITS Pilani.`,
      url: `/newsletter/${slug}`,
    },
    alternates: {
      canonical: `/newsletter/${slug}`,
    },
  };
}

export default function NewsletterViewerPage() {
  return <NewsletterViewerContent />;
}
