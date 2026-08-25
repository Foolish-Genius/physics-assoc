// Lets editors paste a full, Overleaf-compiling .tex article directly into the
// content field. Detects raw LaTeX on paste and converts it to the Markdown +
// KaTeX ($...$ / $$...$$) format MarkdownRenderer actually understands.
//
// Strategy: expand the preamble's \newcommand macros, lift every math span (and
// code block) out of the document leaving an opaque token behind, run the
// prose/structure conversions over what's left, then splice the originals back
// in. Math is LaTeX and has to survive untouched — running the prose rules
// (\emph, escape unescaping, blank-line tidying) across it is what produced
// most of the render errors.

/** Marks where a figure still needs a real image; the editor fills these in. */
export const IMAGE_PLACEHOLDER = 'REPLACE_WITH_IMAGE_URL';

// Deliberately token-shaped: no backslashes, no newlines, no markdown-active
// characters, so nothing downstream in this file can mangle it. If one ever
// leaks into the output it is visible and traceable rather than silently wrong.
const token = (i: number) => `@@KTX${i}@@`;

/** Reads a balanced {...} group starting at `open`. Returns null if unbalanced. */
function readGroup(s: string, open: number): { content: string; end: number } | null {
  if (s[open] !== '{') return null;
  let depth = 0;
  for (let i = open; i < s.length; i++) {
    const c = s[i];
    if (c === '\\') { i++; continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return { content: s.slice(open + 1, i), end: i + 1 };
  }
  return null;
}

/** Reads `n` consecutive brace groups, skipping the spaces between them. */
function readGroups(s: string, from: number, n: number): { args: string[]; end: number } | null {
  const args: string[] = [];
  let i = from;
  for (let k = 0; k < n; k++) {
    while (s[i] === ' ' || s[i] === '\n') i++;
    const group = readGroup(s, i);
    if (!group) return null;
    args.push(group.content);
    i = group.end;
  }
  return { args, end: i };
}

/**
 * Replaces `\name{...}` everywhere, honouring nested braces. The old
 * `\\caption\{([^}]*)\}` style rules stopped at the first `}`, which is why a
 * caption containing `$\ket{+}$` came out truncated mid-macro.
 */
function replaceCommand(s: string, name: string, render: (...args: string[]) => string, argc = 1): string {
  const needle = '\\' + name;
  let out = '';
  let i = 0;
  for (;;) {
    const idx = s.indexOf(needle, i);
    if (idx === -1) return out + s.slice(i);
    let j = idx + needle.length;
    // \text must not match the \textbf that follows it.
    if (/[a-zA-Z]/.test(s[j] ?? '')) { out += s.slice(i, j); i = j; continue; }
    if (argc === 0) { out += s.slice(i, idx) + render(); i = j; continue; }
    const read = readGroups(s, j, argc);
    if (!read) { out += s.slice(i, j); i = j; continue; }
    out += s.slice(i, idx) + render(...read.args);
    i = read.end;
  }
}

const dropCommand = (s: string, name: string, argc = 1) => replaceCommand(s, name, () => '', argc);

export function looksLikeLatexDocument(text: string): boolean {
  return (
    /\\documentclass\s*(\[[^\]]*\])?\s*\{/.test(text) ||
    /\\begin\{document\}/.test(text) ||
    /\\usepackage\s*(\[[^\]]*\])?\s*\{/.test(text) ||
    /\\(?:sub)*section\*?\s*\{/.test(text) ||
    /\\(?:emph|textbf|textit)\s*\{/.test(text) ||
    /\\begin\{(?:equation|align|gather|multline|eqnarray|itemize|enumerate|figure|table|tabular|abstract|thebibliography)\*?\}/.test(text)
  );
}

// ---------------------------------------------------------------------------
// Author macros
// ---------------------------------------------------------------------------

interface Macro { argc: number; body: string; }

/**
 * Collects \newcommand / \def / \DeclareMathOperator from the preamble.
 *
 * These only live in the preamble, which the conversion throws away — so an
 * article defining, say, \newcommand{\Kop}{K_{\alpha}} used to reach KaTeX as a
 * bare undefined \Kop and render as an error. Expanding them here keeps the
 * stored Markdown self-contained.
 */
function collectMacros(tex: string): Map<string, Macro> {
  const macros = new Map<string, Macro>();

  const declRe = /\\(?:re|provide)?newcommand\*?\s*(?:\{\\([a-zA-Z]+)\}|\\([a-zA-Z]+))\s*(?:\[(\d+)\])?\s*(?:\[[^\]]*\])?\s*\{/g;
  for (let m = declRe.exec(tex); m; m = declRe.exec(tex)) {
    const name = m[1] ?? m[2];
    const body = readGroup(tex, declRe.lastIndex - 1);
    if (!body) continue;
    macros.set(name, { argc: Number(m[3] ?? 0), body: body.content });
    declRe.lastIndex = body.end;
  }

  const opRe = /\\DeclareMathOperator\*?\s*\{\\([a-zA-Z]+)\}\s*\{/g;
  for (let m = opRe.exec(tex); m; m = opRe.exec(tex)) {
    const body = readGroup(tex, opRe.lastIndex - 1);
    if (!body) continue;
    macros.set(m[1], { argc: 0, body: `\\operatorname{${body.content}}` });
    opRe.lastIndex = body.end;
  }

  // \def\name{...} and \def\name#1#2{...}
  const defRe = /\\def\s*\\([a-zA-Z]+)\s*((?:#\d)*)\s*\{/g;
  for (let m = defRe.exec(tex); m; m = defRe.exec(tex)) {
    const body = readGroup(tex, defRe.lastIndex - 1);
    if (!body) continue;
    macros.set(m[1], { argc: (m[2].match(/#/g) ?? []).length, body: body.content });
    defRe.lastIndex = body.end;
  }

  return macros;
}

/** Substitutes author macros, re-running so a macro defined in terms of another resolves. */
function expandMacros(s: string, macros: Map<string, Macro>): string {
  if (!macros.size) return s;
  for (let pass = 0; pass < 8; pass++) {
    let changed = false;
    for (const [name, { argc, body }] of Array.from(macros.entries())) {
      const next = replaceCommand(
        s,
        name,
        (...args) => body.replace(/#(\d)/g, (_m: string, d: string) => args[Number(d) - 1] ?? ''),
        argc
      );
      if (next !== s) { s = next; changed = true; }
    }
    if (!changed) break;
  }
  return s;
}

// ---------------------------------------------------------------------------
// Environments
// ---------------------------------------------------------------------------

/**
 * KaTeX only knows a subset of the AMS environments, and only inside math mode.
 * `align` and friends have to be re-homed into their *ed counterparts and
 * wrapped in $$; \label and \nonumber are hard errors there.
 */
function toDisplayMath(env: string, raw: string): string {
  let inner = dropCommand(raw, 'label').replace(/\\(?:nonumber|notag)\b/g, '');
  if (env === 'eqnarray') inner = inner.replace(/&\s*(\\[a-zA-Z]+|[=<>+\-])\s*&/g, '&$1 ');
  const wrap =
    env === 'equation' || env === 'displaymath' ? null
    : env === 'gather' || env === 'multline' ? 'gathered'
    : 'aligned';
  const content = wrap
    ? `\\begin{${wrap}}\n${inner.trim()}\n\\end{${wrap}}`
    : inner.trim();
  return `\n\n$$\n${content}\n$$\n\n`;
}

/** itemize/enumerate -> Markdown lists, innermost first so nesting indents. */
function convertLists(s: string): string {
  const innermost =
    /\\begin\{(itemize|enumerate|description)\}((?:(?!\\begin\{(?:itemize|enumerate|description)\})[\s\S])*?)\\end\{\1\}/;
  for (let guard = 0; guard < 100; guard++) {
    const m = s.match(innermost);
    if (!m) break;
    const [, env, inner] = m;
    // Anything before the first \item is the environment's own options
    // (\begin{itemize}[leftmargin=1.4em]) and is dropped with the slice.
    const items = inner.split(/\\item\b/).slice(1);
    const lines = items.map((raw, i) => {
      const text = raw.replace(/^\s*\[([^\]]*)\]/, '**$1** ').trim();
      const marker = env === 'enumerate' ? `${i + 1}.` : '-';
      // Indenting the continuation lines is what turns an already-converted
      // inner list into a nested one.
      const bodyText = text
        .split('\n')
        .map((line, k) => (k === 0 ? line : line.trim() ? '  ' + line.trim() : ''))
        .join('\n')
        .replace(/\n{3,}/g, '\n\n');
      return `${marker} ${bodyText}`;
    });
    s = s.slice(0, m.index!) + `\n\n${lines.join('\n')}\n\n` + s.slice(m.index! + m[0].length);
  }
  return s;
}

function convertTabular(s: string): string {
  return s.replace(
    /\\begin\{tabular\}\s*(?:\[[^\]]*\])?\s*\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g,
    (_m, inner: string) => {
      const rows = inner
        .split(/\\\\/)
        .map((r) => r.replace(/\\hline|\\toprule|\\midrule|\\bottomrule/g, '').trim())
        .filter(Boolean)
        .map((r) => r.split(/(?<!\\)&/).map((c) => c.trim()));
      if (!rows.length) return '';
      const width = Math.max(...rows.map((r) => r.length));
      const pad = (r: string[]) => [...r, ...Array(width - r.length).fill('')];
      const out = [
        `| ${pad(rows[0]).join(' | ')} |`,
        `| ${Array(width).fill('---').join(' | ')} |`,
        ...rows.slice(1).map((r) => `| ${pad(r).join(' | ')} |`),
      ];
      return `\n\n${out.join('\n')}\n\n`;
    }
  );
}

const ACCENTS: Record<string, Record<string, string>> = {
  '`': { a: 'à', e: 'è', i: 'ì', o: 'ò', u: 'ù', A: 'À', E: 'È', I: 'Ì', O: 'Ò', U: 'Ù' },
  "'": { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', c: 'ć', n: 'ń', s: 'ś', A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú' },
  '^': { a: 'â', e: 'ê', i: 'î', o: 'ô', u: 'û', A: 'Â', E: 'Ê', I: 'Î', O: 'Ô', U: 'Û' },
  '"': { a: 'ä', e: 'ë', i: 'ï', o: 'ö', u: 'ü', A: 'Ä', E: 'Ë', I: 'Ï', O: 'Ö', U: 'Ü' },
  '~': { a: 'ã', n: 'ñ', o: 'õ', A: 'Ã', N: 'Ñ', O: 'Õ' },
};

// ---------------------------------------------------------------------------

export function convertLatexToMarkdown(tex: string): string {
  let body = tex;

  // Macros are declared in the preamble, so collect them before it is dropped.
  const macros = collectMacros(body);

  // Keep only the body between \begin{document} and \end{document}, if present.
  const docMatch = body.match(/\\begin\{document\}([\s\S]*?)\\end\{document\}/);
  if (docMatch) body = docMatch[1];

  // Strip LaTeX comments (an unescaped %) before anything else, exactly as TeX
  // itself would.
  body = body.replace(/(^|[^\\])%.*$/gm, '$1');

  body = expandMacros(body, macros);

  // Title/author/date live in the article's own fields, not the content body.
  for (const cmd of ['title', 'author', 'date', 'thanks', 'affiliation', 'institute']) {
    body = dropCommand(body, cmd);
  }
  body = body.replace(/\\maketitle\b/g, '');

  // Some drafts use a bare "[" / "]" alone on their own line instead of the
  // real \[ \] display-math delimiters. That's unambiguous (a lone bracket
  // character on its own line is never legitimate prose), so treat it the
  // same way.
  body = body.replace(
    /^\[[ \t]*\r?\n([\s\S]*?)\r?\n\][ \t]*$/gm,
    (_m, inner: string) => `\\[\n${inner.trim()}\n\\]`
  );

  // A lone line of "====" inside math (a known copy/OCR artifact) is just "=".
  body = body.replace(/\n[ \t]*={3,}[ \t]*\n/g, '\n=\n');

  // ---- Lift out everything the prose rules must not touch ----
  const vault: string[] = [];
  const stash = (value: string) => token(vault.push(value) - 1);

  // Code first, so a $ inside a listing is never mistaken for math.
  body = body.replace(
    /\\begin\{(verbatim|lstlisting|minted)\}(?:\[[^\]]*\])?(?:\{[^}]*\})?([\s\S]*?)\\end\{\1\}/g,
    (_m, _env, code: string) => stash(`\n\n\`\`\`\n${code.replace(/^\n|\n$/g, '')}\n\`\`\`\n\n`)
  );
  body = replaceCommand(body, 'verb', (code) => stash('`' + code + '`'));

  // An escaped dollar is prose, not a math delimiter — take it out of play
  // before the delimiter rules run.
  body = body.replace(/\\\$/g, () => stash('\\$'));

  body = body.replace(
    /\\begin\{(equation|align|gather|multline|eqnarray|flalign|displaymath)(\*?)\}([\s\S]*?)\\end\{\1\2\}/g,
    (_m, env: string, _star: string, inner: string) => stash(toDisplayMath(env, inner))
  );
  body = body.replace(/\\\[([\s\S]*?)\\\]/g, (_m, inner: string) => stash(toDisplayMath('displaymath', inner)));
  body = body.replace(/\$\$([\s\S]*?)\$\$/g, (_m, inner: string) => stash(`\n\n$$\n${inner.trim()}\n$$\n\n`));
  body = body.replace(/\\\(([\s\S]*?)\\\)/g, (_m, inner: string) => stash(`$${inner.trim()}$`));
  body = body.replace(/\$([^$\n]+)\$/g, (_m, inner: string) => stash(`$${inner.trim()}$`));

  // ---- Prose and structure ----

  body = body.replace(
    /\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/g,
    (_m, inner: string) => `\n\n> **Abstract.** ${inner.trim()}\n\n`
  );

  // Figures (and the table wrapper) -> Markdown image + italic caption.
  body = body.replace(
    /\\begin\{(figure|table)\}(?:\*?)(?:\[[^\]]*\])?([\s\S]*?)\\end\{\1\*?\}/g,
    (_m, env: string, inner: string) => {
      let caption = '';
      replaceCommand(inner, 'caption', (c) => { caption = c.trim(); return ''; });
      caption = caption.replace(/\\protect\b/g, '').replace(/\\footnotemark\b/g, '').trim();
      if (env === 'table') {
        const stripped = dropCommand(dropCommand(inner, 'caption'), 'label');
        return `\n\n${stripped.trim()}\n${caption ? `*${caption}*\n` : ''}\n`;
      }
      const imgMatch = inner.match(/\\includegraphics(?:\[[^\]]*\])?\{([^}]*)\}/);
      // A \includegraphics path points at a file on the author's machine, which
      // the clipboard never carries. Leave a placeholder for the editor's image
      // uploader to fill in rather than a broken local path.
      const url = imgMatch && /^https?:\/\//.test(imgMatch[1]) ? imgMatch[1] : IMAGE_PLACEHOLDER;
      // Alt text is plain text: math never renders there, and a stray bracket
      // would break out of the Markdown image syntax.
      const alt = (caption || 'Image').replace(/[$\[\]]/g, '').replace(/\s+/g, ' ').trim();
      return `\n\n![${alt}](${url})\n${caption ? `*${caption}*\n` : ''}\n`;
    }
  );

  body = convertTabular(body);
  body = convertLists(body);

  // Bibliography -> a plain list.
  body = body.replace(
    /\\begin\{thebibliography\}(?:\{[^}]*\})?([\s\S]*?)\\end\{thebibliography\}/g,
    (_m, inner: string) => {
      const entries = inner
        .split(/\\bibitem\b/)
        .slice(1)
        .map((raw) => `- ${raw.replace(/^\s*(?:\[[^\]]*\])?\s*\{[^}]*\}/, '').trim()}`);
      return `\n\n## References\n\n${entries.join('\n')}\n\n`;
    }
  );

  // Sectioning -> Markdown headings (deepest first so nesting doesn't collide).
  for (const [cmd, hashes] of [
    ['subsubsection*', '###'], ['subsubsection', '###'],
    ['subsection*', '##'], ['subsection', '##'],
    ['section*', '#'], ['section', '#'],
  ] as const) {
    body = replaceCommand(body, cmd, (t) => `\n${hashes} ${t.trim()}\n`);
  }
  body = replaceCommand(body, 'paragraph', (t) => `\n**${t.trim()}** `);

  // Footnotes have nowhere to land on a web page, so they become inline asides.
  body = replaceCommand(body, 'footnotetext', (t) => `\n\n*${t.trim()}*\n\n`);
  body = replaceCommand(body, 'footnote', (t) => ` (${t.trim()})`);
  body = body.replace(/\\(?:footnotemark|protect)\b/g, '');

  // Inline formatting.
  body = replaceCommand(body, 'href', (url, text) => `[${text}](${url})`, 2);
  body = replaceCommand(body, 'url', (url) => `[${url}](${url})`);
  for (const bold of ['textbf', 'bf', 'textsc']) body = replaceCommand(body, bold, (t) => `**${t}**`);
  for (const em of ['textit', 'emph', 'it']) body = replaceCommand(body, em, (t) => `*${t}*`);
  body = replaceCommand(body, 'texttt', (t) => '`' + t + '`');
  body = replaceCommand(body, 'underline', (t) => `*${t}*`);
  for (const passthrough of ['textrm', 'text', 'mbox', 'textnormal']) {
    body = replaceCommand(body, passthrough, (t) => t);
  }

  // Cross-references have no target once the article is a single web page, so
  // the label text would only ever read as noise. Drop them.
  for (const cmd of ['label', 'ref', 'eqref', 'cite', 'citep', 'citet', 'bibliographystyle', 'bibliography']) {
    body = dropCommand(body, cmd);
  }
  for (const cmd of ['vspace', 'hspace', 'setlength', 'includegraphics', 'caption', 'captionof']) {
    body = dropCommand(body, cmd);
  }
  body = body.replace(
    /\\(?:noindent|centering|newpage|clearpage|bigskip|medskip|smallskip|linebreak|par|raggedright|small|large|Large|huge|normalsize|hline|toprule|midrule|bottomrule|tableofcontents)\b\*?/g,
    ''
  );

  // Bare grouping environments contribute nothing once styling is gone.
  body = body.replace(/\\(?:begin|end)\{(?:center|flushleft|flushright|quote|quotation|sloppypar)\}/g, '\n');

  // Accented characters: \`a -> à.
  body = body.replace(/\\([`'^"~])\{?([a-zA-Z])\}?/g, (m, acc: string, letter: string) => ACCENTS[acc]?.[letter] ?? m);

  // LaTeX-style quotes and dashes -> plain text.
  body = body.replace(/``/g, '"').replace(/''/g, '"');
  body = body
    .split('\n')
    .map((line) =>
      /^[\s|:-]+$/.test(line)
        ? line // a Markdown table separator row, not an em dash
        : line.replace(/---/g, '—').replace(/(^|[^-])--([^-]|$)/g, '$1–$2')
    )
    .join('\n');
  body = body.replace(/\\(?:ldots|dots)\b/g, '…');

  // An explicit line break becomes a Markdown hard break.
  body = body.replace(/\\\\\*?(?:\[[^\]]*\])?[ \t]*/g, '  \n');

  // Non-breaking space and the thin spacing commands are just spaces in prose.
  body = body.replace(/~/g, ' ').replace(/\\[,;:!] ?/g, ' ');

  // Finally, unescape the characters TeX required an escape for. Runs last so
  // it cannot reintroduce a delimiter the rules above would have consumed.
  body = body.replace(/\\([%&#{}])/g, '$1');

  // ---- Put the math back ----
  body = body.replace(/@@KTX(\d+)@@/g, (_m, i: string) => vault[Number(i)] ?? '');

  // Dropping \cite/\ref strands the space that preceded them ("see Ref. .").
  body = body.replace(/[ \t]+([.,;:!?)\]])/g, '$1');
  body = body.replace(/\.\.(?=\s|$)/g, '.');

  // Tidy up excess blank lines left behind by the replacements above.
  body = body.replace(/[ \t]+$/gm, (m) => (m === '  ' ? m : ''));
  body = body.replace(/\n{3,}/g, '\n\n');

  return body.trim();
}

/** How many figures still need an image URL — used to prompt the editor. */
export function countImagePlaceholders(markdown: string): number {
  return markdown.split(IMAGE_PLACEHOLDER).length - 1;
}
