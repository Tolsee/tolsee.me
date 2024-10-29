import About from '@/components/About';
import { FeaturedProject } from '@/src/components/featured-projects';

export default async function Home() {
  return (
    <div>
      <About />
      <FeaturedProject />
    </div>
  );
}
