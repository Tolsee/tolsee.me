import { useTranslations } from 'next-intl';
import { sans } from 'lib/fonts';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations();

  return (
    <article className="markdown">
      <h1
        className={[
          sans.className,
          'text-[40px] font-black leading-[44px] text-[--title]',
        ].join(' ')}
      >
        {t('not-found-message')}
      </h1>
      <div className="markdown mt-10">
        <p>{t('page-does-not-exist')}</p>
        {t('link-back-to-homepage', {
          component0: (
            <Link href="/">{t('link-back-to-homepage_component0')}</Link>
          ),
        })}
      </div>
    </article>
  );
}
