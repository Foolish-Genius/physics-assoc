'use client';

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { looksLikeLatexDocument, convertLatexToMarkdown } from '@/lib/latexToMarkdown';

interface MarkdownRendererProps {
  content: string;
}

// Don't let a typo in an author's equation take down the whole article render.
const katexOptions = {
  throwOnError: false,
  errorColor: '#fca311',
  strict: false,
  trust: false,
  macros: {
    // Common physics shorthand not built into KaTeX by default
    '\\dd': '\\mathrm{d}',
    '\\vb': '\\mathbf{#1}',
    '\\abs': '\\left|#1\\right|',
    '\\ket': '\\left|#1\\right\\rangle',
    '\\bra': '\\left\\langle#1\\right|',
    '\\braket': '\\left\\langle#1\\middle|#2\\right\\rangle',
    '\\expval': '\\left\\langle#1\\right\\rangle',
    // Pauli/identity shorthand. Articles that define their own \newcommand
    // versions have them expanded at conversion time; these cover the ones
    // already published before that conversion existed.
    '\\I': '\\mathbb{1}',
    '\\sx': '\\sigma_x',
    '\\sy': '\\sigma_y',
    '\\sz': '\\sigma_z',
    '\\Kop': 'K_{\\alpha}',
  },
};

// Articles saved before the editor converted on paste still hold raw LaTeX, so
// render-time conversion runs through exactly the same converter the editor
// uses rather than a second, weaker copy of the rules.
function preprocessLatex(content: string) {
  return looksLikeLatexDocument(content) ? convertLatexToMarkdown(content) : content;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const processedContent = useMemo(() => preprocessLatex(content), [content]);

  return (
    <div className="prose-physics max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, katexOptions]]}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
