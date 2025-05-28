import 'server-only';

import { remark } from 'remark';
import html from 'remark-html';
import remarkPrism from 'remark-prism';
import remarkGfm from 'remark-gfm';
import { remarkAlert } from 'remark-github-blockquote-alert';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkPrism, { plugins: ['line-numbers'] })
    .use(remarkGfm)
    .use(remarkAlert)
    .use(html, { sanitize: false })
    .process(markdown);
  return result.toString();
}
