import "server-only";

import { remark } from "remark";
import html from "remark-html";
import remarkPrism from "remark-prism";
import remarkGfm from "remark-gfm";

export default async function markdownToHtml(markdown: string) {
    const result = await remark()
        .use(remarkPrism, { plugins: ["line-numbers"] })
        .use(remarkGfm)
        .use(html, { sanitize: false })
        .process(markdown);
    return result.toString();
}
