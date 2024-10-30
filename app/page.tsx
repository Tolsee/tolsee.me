import About from '@/components/About';
import { Blogs } from '@/src/components/blogs';
import { FeaturedProject } from '@/src/components/featured-projects';
import { getAllPosts } from '@/lib/api';

export default async function Home() {
  const posts = await getAllPosts(['title', 'content', 'publishedAt', 'slug']);

  return (
    <>
      <About />
      <FeaturedProject />
      <Blogs posts={posts} />
    </>
  );
}
