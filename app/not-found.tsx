import { sans } from 'lib/fonts';
import Link from 'next/link';

export default function NotFound() {
  return (
    <article className="markdown">
      <h1
        className={[
          sans.className,
          'text-[40px] font-black leading-[44px] text-[--title]',
        ].join(' ')}
      >
        Not found
      </h1>
      <div className="markdown mt-10">
        <p>This page doesn&apos;t exist (yet?)</p>
        Link back to the <Link href="/">homepage</Link>
      </div>
    </article>
  );
}
