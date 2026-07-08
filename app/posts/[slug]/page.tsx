import { getAllPosts, getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import { PostTitle } from '@/src/components/post/post-title';
import { formatDate, readingTime, asTags } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import markdownStyles from './markdown-styles.module.css';
import './prism-theme.css';
import './remark.css';
import 'remark-github-blockquote-alert/alert.css';
import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constant';

// TODO: Change later
// import './remark-alert.css';

export async function generateStaticParams() {
  const posts = await getAllPosts(['slug']);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug, ['title', 'content']);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Tulsi Sapkota`;
  const description = `${post.content.split(' ').slice(0, 50).join(' ')}...`;

  return {
    title,
    description,
    applicationName: SITE_NAME,
    openGraph: {
      title,
      description,
    },
    twitter: {
      // TODO: When we add image
      // card: 'summary_large_image',
      // images: ['https://nextjs.org/og.png'],
      title,
      description,
      creator: '@tolsee',
    },
  };
}

export default async function Post({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, [
    'title',
    'author',
    'content',
    'publishedAt',
    'tags',
  ]);
  const content = await markdownToHtml(post.content || '');
  const tags = asTags(post.tags);

  return (
    <div className="mx-auto">
      <main>
        <article>
          <header className="mb-8">
            <Link
              href="/posts"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-[--green]"
            >
              <span aria-hidden>←</span> Blog
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
              <span aria-hidden>·</span>
              <span>{readingTime(post.content || '')} min read</span>
              {tags.map((tag) => (
                <span key={tag} className="glass-pill text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </header>
          <PostTitle>{post.title}</PostTitle>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className={markdownStyles['markdown']}
          />
        </article>
      </main>
    </div>
  );
}
