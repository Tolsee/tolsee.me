import Logo from './Logo';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const navItems = {
  '/posts': {
    name: 'Blog',
  },
};

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 mb-8 md:mb-16 tracking-tight max-w-6xl mx-auto border-b border-border">
      <div className="lg:sticky lg:top-20 w-full">
        <nav
          className="flex flex-row justify-between items-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <Link
            href="/"
            className="flex flex-row justify-start items-center text-2xl"
          >
            <Logo />
            <span
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgba(0,175,154,1) 0%, rgba(0,212,255,1) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                transition:
                  'rgba(0,175,154,1) 0.2s ease-out, rgba(0,212,255,1) 0.2s ease-in-out',
              }}
              className="font-bold ml-1"
            >
              tolsee.me
            </span>
          </Link>
          <div className="flex flex-row space-x-2">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all text-muted-foreground hover:text-foreground flex align-middle relative py-1 px-2"
                >
                  {name}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
