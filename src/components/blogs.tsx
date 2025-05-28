import { useTranslations } from 'next-intl';
import { Item } from '@/lib/api';
import { BlogCard } from './blog-card';

export function Blogs({ posts }: { posts: Item[] }) {
  const t = useTranslations('../src/components');

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">{t('recent-blog-posts')}</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        {posts
          .sort((a, b) => {
            if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
      </div>
    </section>
  );
}
