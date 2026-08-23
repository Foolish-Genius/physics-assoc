'use client';

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

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
  },
};

function preprocessLatex(content: string) {
  let processed = content;
  if (processed.includes('\\begin{document}')) {
    const bodyMatch = processed.match(/\\begin\{document\}([\s\S]*?)\\end\{document\}/);
    if (bodyMatch) processed = bodyMatch[1];
    
    processed = processed.replace(/\\section\*?\{([^}]+)\}/g, '## $1');
    processed = processed.replace(/\\subsection\*?\{([^}]+)\}/g, '### $1');
    processed = processed.replace(/\\textbf\{([^}]+)\}/g, '**$1**');
    processed = processed.replace(/\\textit\{([^}]+)\}/g, '*$1*');
    processed = processed.replace(/\\title\{([^}]+)\}/g, '# $1\n');
    processed = processed.replace(/\\author\{[^}]*\}/g, '');
    processed = processed.replace(/\\date\{[^}]*\}/g, '');
    processed = processed.replace(/\\maketitle/g, '');
    
    processed = processed.replace(/\\\[/g, '$$$$');
    processed = processed.replace(/\\\]/g, '$$$$');
    processed = processed.replace(/\\\(/g, '$');
    processed = processed.replace(/\\\)/g, '$');
  }
  return processed;
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
