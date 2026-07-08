import Link from 'next/link';
import { getAllPosts } from '@/lib/api';
import { formatDate, readingTime, asTags } from '@/lib/utils';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default async function BlogPage() {
  const posts = await getAllPosts([
    'title',
    'content',
    'publishedAt',
    'tags',
    'slug',
  ]);

  const sorted = posts.sort((a, b) =>
    new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1,
  );

  return (
    <section>
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tighter">Read my blog</h1>
        <p className="mt-2 text-muted-foreground">
          Notes on software, tooling, and building things.
        </p>
      </header>

      <ul className="divide-y divide-border">
        {sorted.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="group block py-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-[--green]">
                  {post.title}
                </h2>
                <span
                  aria-hidden
                  className="hidden shrink-0 text-[--green] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 sm:inline"
                >
                  →
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-muted-foreground">
                {post.content.split(' ').slice(0, 28).join(' ')}…
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-muted-foreground">
                <span>{formatDate(post.publishedAt)}</span>
                <span aria-hidden>·</span>
                <span>{readingTime(post.content)} min read</span>
                {asTags(post.tags)
                  .slice(0, 3)
                  .map((tag) => (
                    <span key={tag} className="glass-pill text-xs">
                      {tag}
                    </span>
                  ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
