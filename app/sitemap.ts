import { getAllPosts } from '@/lib/api';
import { globby } from 'globby';

const WEBSITE_URL = 'https://www.tolsee.me';

function addPage(page: string) {
  const path = page
    .replace('app', '')
    .replace('.tsx', '')
    .replace('.mdx', '')
    .replace('/page', '');
  return path;
}

export default async function sitemap() {
  const pages = await globby([
    'app/**/*{.js,jsx,ts,tsx,.mdx}',
    '!app/_*.js',
    '!app/{sitemap,layout,head}.{js,jsx,ts,tsx}',
    '!app/api',
    '!app/posts/[slug]/*.{js,jsx,ts,tsx}',
  ]);

  const posts = await getAllPosts(['title', 'content', 'publishedAt', 'updatedAt', 'slug']);

  const routes = pages.map((page) => ({
    url: `${WEBSITE_URL}${addPage(page)}`,
    lastModified: new Date().toISOString(),
  }));

  const postRoutes = posts.map((post) => ({
    url: `${WEBSITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.updatedAt).toISOString(),
    changeFrequency: 'weekly',
  }));

  return [...routes, ...postRoutes];
}
