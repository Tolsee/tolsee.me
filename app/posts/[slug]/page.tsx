import { getAllPosts, getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';

import markdownStyles from './markdown-styles.module.css';
import './prism-theme.css';
import './remark.css';
import { PostTitle } from '@/src/components/post/post-title';

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
    <div className="mx-auto">
      <main>
        <article>
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
