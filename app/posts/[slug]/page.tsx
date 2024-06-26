import { getAllPosts, getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';

import css from './page.module.css';
import './prism-theme.css';
import './remark.css';

export async function generateStaticParams() {
  const posts = await getAllPosts(['slug']);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(slug, ['title', 'author', 'content']);
  const content = await markdownToHtml(post.content || '');

  return (
    <div className={css.container}>
      <main>
        <article>
          <h1 className={css.title}>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </main>
    </div>
  );
}
