import 'server-only';

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

interface Metadata {
  title: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string;
}

export interface Item extends Metadata {
  slug: string;
  content: string;
}

export async function getPostSlugs() {
  const entries = await readdir(postsDirectory, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  return files;
}

export async function getPostBySlug<T extends Partial<keyof Item>>(
  slug: string,
  fields: T[],
) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = await readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return (fields || []).reduce<Pick<Item, T>>(
    (acc, field) => {
      if (field === 'slug') {
        acc[field] = realSlug;
      }

      if (field === 'content') {
        acc[field] = content;
      }

      if (['title', 'publishedAt', 'tags'].includes(field)) {
        acc[field] = data[field];
      }

      return acc;
    },
    {} as Pick<Item, T>,
  );
}

export async function getAllPosts(fields: Array<keyof Item> = []) {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug, [...fields, 'publishedAt'])),
  );

  return posts.sort((post1, post2) =>
    post1.publishedAt > post2.publishedAt ? -1 : 1,
  );
}
