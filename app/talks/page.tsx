import Link from 'next/link';

const talks = [
  {
    title: 'AI-Driven Software Development',
    href: '/talks/ai-driven-software-development',
    description:
      'What engineers need to build before agents can do useful work.',
    tags: ['AI', 'Developer experience', 'Agents'],
  },
  {
    title: 'Replace Yourself with Agents',
    href: '/talks/replace-yourself-with-agents',
    description:
      'Building an autonomous CI optimizer with agent funnels and purpose-built tools.',
    tags: ['Automation', 'CI/CD', 'Agents'],
  },
];

export const metadata = {
  title: 'Talks',
  description: 'Talks on software development, tooling, and agents.',
};

export default function TalksPage() {
  return (
    <section>
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tighter">Watch my talks</h1>
        <p className="mt-2 text-muted-foreground">
          Presentations on software, tooling, and building with agents.
        </p>
      </header>

      <ul className="divide-y divide-border">
        {talks.map((talk) => (
          <li key={talk.href}>
            <Link href={talk.href} className="group block py-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-[--green]">
                  {talk.title}
                </h2>
                <span
                  aria-hidden
                  className="hidden shrink-0 text-[--green] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 sm:inline"
                >
                  →
                </span>
              </div>
              <p className="mt-2 text-muted-foreground">{talk.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px] text-muted-foreground">
                <span>Talk</span>
                <span aria-hidden>·</span>
                {talk.tags.map((tag) => (
                  <span key={tag} className="glass-pill text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
