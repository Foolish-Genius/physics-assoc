'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/types';

interface BlogCardProps {
  article: Article;
}

export default function BlogCard({ article }: BlogCardProps) {
  const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group bg-prussian/30 backdrop-blur-sm rounded-xl overflow-hidden border border-prussian/50 hover:border-orange/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange/5 flex flex-col">
      {/* Cover Image */}
      <div className="relative h-52 overflow-hidden">
        {article.cover_image ? (
          <Image
            src={article.cover_image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-prussian to-black flex items-center justify-center">
            <svg className="w-16 h-16 text-orange/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-orange/10 text-orange border border-orange/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link href={`/blog/${article.slug}`}>
          <h3 className="text-xl font-bold text-white group-hover:text-orange transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-prussian/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-orange/20 flex items-center justify-center">
              <span className="text-orange text-xs font-bold">
                {article.author?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
            <div>
              <p className="text-orange text-sm font-semibold">{article.author}</p>
              <p className="text-gray-500 text-xs">{formattedDate}</p>
            </div>
          </div>
          <Link
            href={`/blog/${article.slug}`}
            className="text-orange hover:text-orange/80 transition-colors font-semibold text-sm"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
