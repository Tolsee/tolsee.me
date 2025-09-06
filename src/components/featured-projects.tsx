'use client';

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
import { AnimatingCard } from './animating-card';

const FEATURED_PROJECTS = [
  {
    title: 'Movie Explorer',
    description: 'Explore movies like never before.',
    longDescription:
      "Explore various movies from the world's largest movie database. Manage your favorite movies and watch later lists with ease. Features modern UI/UX with responsive design.",
    technologies: ['React.js', 'Vite', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    githubLink: 'https://github.com/Tolsee/movie-explorer',
    liveLink: 'https://movie-explorer-tolsee.vercel.app',
    status: 'Active',
    externalLinks: [
      {
        title: 'Live Demo',
        link: 'https://movie-explorer-tolsee.vercel.app',
      },
    ],
  },
  {
    title: 'Personal Website (tolsee.me)',
    description: 'Modern portfolio with gamified effects.',
    longDescription:
      "Built with Next.js 14, featuring glass morphism design, interactive animations, and a gamified user experience. Showcases projects, blog posts, and professional journey.",
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'MDX'],
    githubLink: 'https://github.com/Tolsee/tolsee.me',
    liveLink: 'https://tolsee.me',
    status: 'Active',
    externalLinks: [
      {
        title: 'Live Site',
        link: 'https://tolsee.me',
      },
    ],
  },
  {
    title: 'Developer Dotfiles',
    description: 'Neovim configuration in Lua.',
    longDescription:
      "A comprehensive Neovim configuration written in Lua, featuring LSP setup, custom keybindings, and productivity-focused plugins. Part of a complete development environment setup.",
    technologies: ['Lua', 'Neovim', 'LSP', 'Shell Scripting'],
    githubLink: 'https://github.com/Tolsee/dotfiles',
    status: 'Maintained',
    externalLinks: [],
  },
  {
    title: 'Open Source Contributions',
    description: 'Contributing to testing-library ecosystem.',
    longDescription:
      "Active contributor to @testing-library/dom-testing-library and other open source projects. Focused on improving developer experience in testing frameworks.",
    technologies: ['JavaScript', 'TypeScript', 'Testing', 'Jest'],
    githubLink: 'https://github.com/testing-library/dom-testing-library',
    status: 'Contributor',
    externalLinks: [
      {
        title: 'Testing Library',
        link: 'https://testing-library.com',
      },
    ],
  },
];

export function FeaturedProject() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'Maintained':
        return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
      case 'Contributor':
        return 'bg-purple-500/20 text-purple-600 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <Github className="w-8 h-8 text-[--green]" />
        <h2 className="text-3xl font-bold">Featured Projects</h2>
        <span className="glass-pill ml-auto">
          {FEATURED_PROJECTS.length} Projects
        </span>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {FEATURED_PROJECTS.map((featuredProject) => (
          <AnimatingCard key={featuredProject.title}>
            <Card className="flex flex-col border-border bg-card text-card-foreground hover:shadow-xl h-full">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{featuredProject.title}</CardTitle>
                  <span 
                    className={`glass-pill text-xs ${
                      featuredProject.status === 'Active' ? 'glass-button-primary' : ''
                    }`}
                  >
                    {featuredProject.status}
                  </span>
                </div>
                <CardDescription className="text-base">
                  {featuredProject.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {featuredProject.longDescription}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {featuredProject.technologies.map((technology) => (
                    <span 
                      key={technology} 
                      className="glass-pill text-xs"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  <Link href={featuredProject.githubLink} target="_blank" className="glass-button flex items-center gap-2 px-3 py-2">
                    <Github className="w-4 h-4" />
                    Code
                  </Link>
                  {featuredProject.externalLinks?.map((externalLink) => (
                    <Link
                      key={externalLink.link}
                      href={externalLink.link} 
                      target="_blank"
                      className="glass-button glass-button-primary flex items-center gap-2 px-3 py-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {externalLink.title}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatingCard>
        ))}
      </div>
      
      <div className="text-center pt-6">
        <Link href="https://github.com/tolsee" target="_blank" className="glass-button glass-button-primary inline-flex items-center gap-2 px-6 py-3">
          <Github className="w-4 h-4" />
          View All Projects on GitHub
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
