import Logo from './Logo';
import Link from 'next/link';

const navItems = {
  '/posts': {
    name: 'blog',
  },
};

export default function Header() {
  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
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
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
