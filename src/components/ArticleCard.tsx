'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  description: string;
  author: string;
  image: string;
  slug: string;
}

export default function ArticleCard({ title, description, author, image, slug }: ArticleCardProps) {
  const href = `/blog/${slug}`;
  return (
    <article className="group flex flex-col h-full bg-bg-surface border border-border">
      <Link href={href} className="block relative aspect-[4/3] overflow-hidden">
        <Image src={image} alt={title} fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </Link>
      <div className="p-8 flex flex-col flex-1">
        <p className="text-xl uppercase tracking-[0.1em] text-text-muted mb-4 font-yanone">By {author}</p>
        <Link href={href}>
          <h3 className="text-3xl text-text mb-4 leading-tight font-display group-hover:text-accent transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-text-dim line-clamp-3 mb-8 flex-1 leading-relaxed">{description}</p>
        <Link href={href} className="inline-block text-xl font-yanone text-accent hover:text-accent-hover transition-colors uppercase tracking-[0.15em]">
          Read Article →
        </Link>
      </div>
    </article>
  );
}
