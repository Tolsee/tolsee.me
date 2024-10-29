import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const FEATURED_PROJECTS = [
  {
    title: 'Movie Explorer',
    description: 'Explore movies like never before.',
    longDescription:
      "Explore various movies from the world's largest movie database. In addition, manage your favorites movies and watch later lists with ease.",
    technologies: ['React.js', 'Vite', 'Vercel'],
    githubLink: 'https://github.com/Tolsee/movie-explorer',
    externalLinks: [
      {
        title: 'The Movie Database',
        link: 'https://www.themoviedb.org/',
      },
    ],
  },
];

export function FeaturedProject() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Featured Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {FEATURED_PROJECTS.map((featuredProject) => (
          <Card  key={featuredProject.title} className="flex flex-col">
            <CardHeader>
              <CardTitle>{featuredProject.title}</CardTitle>
              <CardDescription>{featuredProject.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">{featuredProject.longDescription}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {featuredProject.technologies.map((technology) => (
                  <Badge key={technology} variant="outline">
                    {technology}
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2 mt-auto">
                <Button variant="outline" size="sm" asChild>
                  <Link href={featuredProject.githubLink}>
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Link>
                </Button>
                {featuredProject.externalLinks?.map((externalLink) => (
                  <Button
                    key={externalLink.link}
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link href={externalLink.link}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {externalLink.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
