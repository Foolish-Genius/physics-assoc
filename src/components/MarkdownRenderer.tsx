'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none
      prose-headings:font-bold prose-headings:text-white prose-headings:font-poppins
      prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
      prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-b prose-h2:border-prussian prose-h2:pb-2
      prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
      prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-orange prose-a:no-underline hover:prose-a:text-orange/80 hover:prose-a:underline
      prose-strong:text-white
      prose-em:text-gray-200
      prose-code:text-orange prose-code:bg-prussian/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
      prose-pre:bg-prussian/40 prose-pre:border prose-pre:border-prussian prose-pre:rounded-xl prose-pre:backdrop-blur-sm
      prose-blockquote:border-l-orange prose-blockquote:bg-prussian/20 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:italic
      prose-ul:text-gray-300 prose-ol:text-gray-300
      prose-li:marker:text-orange
      prose-img:rounded-xl prose-img:border prose-img:border-prussian/50
      prose-hr:border-prussian
      prose-table:border-prussian prose-th:text-orange prose-th:border-prussian prose-td:border-prussian
    ">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
