import type { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const SITE_URL = 'https://phyassoc.is-cool.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  let articleRoutes: MetadataRoute.Sitemap = [];
  let newsletterRoutes: MetadataRoute.Sitemap = [];

  if (supabase) {
    const { data: articles } = await supabase
      .from('articles')
      .select('slug, updated_at')
      .eq('published', true);

    if (articles) {
      articleRoutes = articles.map((article: { slug: string; updated_at: string }) => ({
        url: `${SITE_URL}/blog/${article.slug}`,
        lastModified: new Date(article.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }

    const { data: newsletters } = await supabase
      .from('newsletters')
      .select('slug, updated_at')
      .eq('published', true);

    if (newsletters) {
      newsletterRoutes = newsletters.map((newsletter: { slug: string; updated_at: string }) => ({
        url: `${SITE_URL}/newsletter/${newsletter.slug}`,
        lastModified: new Date(newsletter.updated_at),
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      }));
    }
  }

  return [...staticRoutes, ...articleRoutes, ...newsletterRoutes];
}
