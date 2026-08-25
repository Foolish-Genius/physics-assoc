// Lets editors paste a full, Overleaf-compiling .tex article directly into the
// content field. Detects raw LaTeX on paste and converts it to the Markdown +
// KaTeX ($...$ / $$...$$) format MarkdownRenderer actually understands.

export function looksLikeLatexDocument(text: string): boolean {
  return /\\documentclass\s*(\[[^\]]*\])?\s*\{|\\begin\{document\}/.test(text);
}

export function convertLatexToMarkdown(tex: string): string {
  let body = tex;

  // Keep only the body between \begin{document} and \end{document}, if present.
  const docMatch = body.match(/\\begin\{document\}([\s\S]*?)\\end\{document\}/);
  if (docMatch) body = docMatch[1];

  // Title/author/date live in the article's own fields, not the content body.
  body = body.replace(/^[ \t]*\\title\{[^}]*\}[ \t]*$/gm, '');
  body = body.replace(/^[ \t]*\\author\{[^}]*\}[ \t]*$/gm, '');
  body = body.replace(/^[ \t]*\\date\{[^}]*\}[ \t]*$/gm, '');
  body = body.replace(/^[ \t]*\\maketitle[ \t]*$/gm, '');

  // Strip LaTeX comments (an unescaped %).
  body = body.replace(/(^|[^\\])%.*$/gm, '$1');

  // Figure environments -> Markdown image + italic caption.
  body = body.replace(/\\begin\{figure\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{figure\}/g, (_m, inner: string) => {
    const capMatch = inner.match(/\\caption\{([^}]*)\}/);
    const caption = capMatch ? capMatch[1].trim() : 'Image';
    const imgMatch = inner.match(/\\includegraphics(?:\[[^\]]*\])?\{([^}]*)\}/);
    const url = imgMatch && /^https?:\/\//.test(imgMatch[1]) ? imgMatch[1] : 'REPLACE_WITH_IMAGE_URL';
    return `\n![${caption}](${url})\n*${caption}*\n`;
  });

  // Sectioning -> Markdown headings (deepest first so nesting doesn't collide).
  body = body.replace(/\\subsubsection\*?\{([^}]*)\}/g, '\n### $1\n');
  body = body.replace(/\\subsection\*?\{([^}]*)\}/g, '\n## $1\n');
  body = body.replace(/\\section\*?\{([^}]*)\}/g, '\n# $1\n');

  // Display/inline math delimiters -> what remark-math actually parses.
  body = body.replace(/\\\[([\s\S]*?)\\\]/g, (_m, inner: string) => `\n$$\n${inner.trim()}\n$$\n`);
  body = body.replace(/\\\(([\s\S]*?)\\\)/g, (_m, inner: string) => `$${inner.trim()}$`);

  // Some drafts use a bare "[" / "]" alone on their own line instead of the
  // real \[ \] display-math delimiters. That's unambiguous (a lone bracket
  // character on its own line is never legitimate prose), so treat it the
  // same way.
  body = body.replace(/^\[[ \t]*\r?\n([\s\S]*?)\r?\n\][ \t]*$/gm, (_m, inner: string) => `\n$$\n${inner.trim()}\n$$\n`);

  // A lone line of "====" inside math (a known copy/OCR artifact) is just "=".
  body = body.replace(/\n[ \t]*={3,}[ \t]*\n/g, '\n=\n');

  // LaTeX-style quotes -> plain quotes.
  body = body.replace(/``/g, '"').replace(/''/g, '"');

  // Tidy up excess blank lines left behind by the replacements above.
  body = body.replace(/\n{3,}/g, '\n\n');

  return body.trim();
}
