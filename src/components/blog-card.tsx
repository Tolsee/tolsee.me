'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Item } from '@/lib/api';
import { AnimatingCard } from './animating-card';

export function BlogCard({ post }: { post: Item }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <AnimatingCard>
        <Card className="border-border bg-card text-card-foreground hover:shadow-xl">
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
          </CardContent>
        </Card>
      </AnimatingCard>
    </Link>
  );
}
