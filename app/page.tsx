import About from '@/components/About';
import { Blogs } from '@/src/components/blogs';
import { FeaturedProject } from '@/src/components/featured-projects';
import { Experience } from '@/src/components/Experience';
import { Certifications } from '@/src/components/Certifications';
import { Insights } from '@/src/components/Insights';
import { TechnicalSkills } from '@/src/components/TechnicalSkills';
import { getAllPosts } from '@/lib/api';

export default async function Home() {
  const posts = await getAllPosts(['title', 'content', 'publishedAt', 'slug']);

  return (
    <>
      <About />
      <Experience />
      <Certifications />
      <TechnicalSkills />
      <FeaturedProject />
      <Insights />
      <Blogs posts={posts} />
    </>
  );
}
