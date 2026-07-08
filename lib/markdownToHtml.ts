import 'server-only';

// prismjs and its component loader ship no type declarations.
// @ts-expect-error - no types for prismjs
import Prism from 'prismjs';
// @ts-expect-error - no types for prismjs component loader
import loadLanguages from 'prismjs/components/index.js';
import { remark } from 'remark';
import html from 'remark-html';
import remarkPrism from 'remark-prism';
import remarkGfm from 'remark-gfm';
import { remarkAlert } from 'remark-github-blockquote-alert';

// remark-prism double-escapes HTML entities (" ' &) for any code fence whose
// Prism grammar it can't load — bare ``` fences, and labels Prism ships no
// component for (zsh, tmux, ...). That's what rendered `&quot;`/`&#39;` as
// literal text in posts. Normalise fences before prism runs: alias the common
// shell/config labels to a real grammar, and hand anything Prism still can't
// load to remark-html as pre-escaped raw HTML so prism skips it. Escaping then
// stays correct no matter what fence a post uses.
const LANG_ALIASES: Record<string, string> = {
  zsh: 'bash',
  sh: 'bash',
  shell: 'bash',
  tmux: 'bash',
  conf: 'ini',
};

function isPrismSupported(lang: string): boolean {
  if (!lang) return false;
  if (Prism.languages[lang]) return true;
  try {
    loadLanguages([lang]);
  } catch {
    // loadLanguages logs and returns for unknown languages
  }
  return Boolean(Prism.languages[lang]);
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

type MdNode = { type: string; lang?: string; meta?: string; value?: string; children?: MdNode[] };

function normalizeCodeFences() {
  const walk = (node: MdNode): void => {
    if (node.type === 'code') {
      const requested = (node.lang || '').toLowerCase();
      const resolved = requested ? LANG_ALIASES[requested] ?? requested : '';
      if (isPrismSupported(resolved)) {
        node.lang = resolved;
      } else {
        const cls = `language-${node.lang || 'none'}`;
        node.type = 'html';
        node.value = `<pre class="${cls}"><code class="${cls}">${escapeHtml(node.value || '')}</code></pre>`;
        delete node.lang;
        delete node.meta;
      }
      return;
    }
    node.children?.forEach(walk);
  };
  return (tree: MdNode) => walk(tree);
}

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    // Cast: borrow a known plugin's type so the .use() chain keeps its overloads.
    .use(normalizeCodeFences as unknown as typeof remarkGfm)
    .use(remarkPrism, { plugins: ['line-numbers'] })
    .use(remarkGfm)
    .use(remarkAlert)
    .use(html, { sanitize: false })
    .process(markdown);
  return result.toString();
}
