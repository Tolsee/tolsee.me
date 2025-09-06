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
    <header className="w-full py-8">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold hover:opacity-80 transition-opacity"
          >
            <Logo />
            <span className="text-foreground">tolsee</span>
          </Link>
          
          {/* Minimal navigation */}
          <div className="flex items-center gap-8">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
