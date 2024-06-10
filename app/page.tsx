import { getAllPosts } from '../lib/api';
import About from '../components/About';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://tolsee.io'),
  title: {
    default: 'Tulsi Sapkota',
    template: '%s | Tulsi Sapkota',
  },
  description: 'Software engineer, and creator.',
  openGraph: {
    title: 'Tulsi Sapkota',
    description: 'Software engineer, and creator.',
    url: 'https://tolsee.me',
    siteName: 'Tulsi Sapkota',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Tulsi Sapkota',
    card: 'summary_large_image',
  },
  verification: {
    google: '1Qw4w-WaCS9MjGa7odM_K3d0CGDdRS3n46axJS3iUMk',
  },
};

export default async function Home() {
  const posts = await getAllPosts(['title', 'content', 'publishedAt', 'slug']);

  return (
    <div>
      <About />
      <div className="relative -top-[10px] flex flex-col gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            className="block py-4 hover:scale-[1.005]"
            href={'/' + post.slug + '/'}
          >
            <article>
              <PostTitle post={post} />
              <PostMeta post={post} />
              <PostSubtitle post={post} />
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

type Post = Record<string, string>;

function PostTitle({ post }: { post: Post }) {
  return <h2>{post.title}</h2>;
}

function PostMeta({ post }: { post: Post }) {
  return (
    <p className="text-[13px] text-gray-700 dark:text-gray-300">
      {new Date(post.date).toLocaleDateString('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}
    </p>
  );
}

function PostSubtitle({ post }: { post: Post }) {
  return <p className="mt-1">{post.spoiler}</p>;
}
