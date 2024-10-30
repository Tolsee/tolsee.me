import { Link } from 'lucide-react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Item } from '@/lib/api';

export function Blogs({ posts }: { posts: Item[] }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Recent Blog Posts</h2>
      <div className="grid gap-4 md:grid-cols-2">
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

function BlogCard({ post }: { post: Item }) {
  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          Published on{' '}
          {new Date(post.publishedAt).toLocaleDateString('en', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-muted-foreground">
          {post.content.split(' ').slice(0, 50).join(' ')}...
        </p>
        <Button variant="link" size="sm" asChild>
          <Link href={`/posts/${post.slug}`}>Read More</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
