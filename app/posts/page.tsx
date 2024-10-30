import Link from 'next/link';
import { getAllPosts, Item } from '@/lib/api';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default async function BlogPage() {
  const posts = await getAllPosts(['title', 'content', 'publishedAt', 'slug']);

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        Read my blog
      </h1>
      {posts
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="block py-4 hover:scale-[1.005]"
            href={'/posts/' + post.slug}
          >
            <article>
              <PostTitle post={post} />
              <PostMeta post={post} />
            </article>
          </Link>
        ))}
    </section>
  );
}

function PostTitle({ post }: { post: Item }) {
  return <h2>{post.title}</h2>;
}

function PostMeta({ post }: { post: Item }) {
  return (
    <p className="text-[13px] text-gray-700 dark:text-gray-300">
      {new Date(post.publishedAt).toLocaleDateString('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}
    </p>
  );
}
