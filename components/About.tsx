import Stars from './Stars';
import styles from './About.module.css';
import Header from './Header';

const DATE_STARTED = new Date('2016-01-01');

export default function About() {
  const experience = new Date().getFullYear() - DATE_STARTED.getFullYear();

  return (
    <div className="relative">
      <div className="mx-auto max-w-4xl pb-8">
        <Header />
        <div className="mt-32">
          <h2 className={styles.sectionHeadText}>
            Hey 👋, I&apos;m{' '}
            <span className="text-[--green]">Tulsi Sapkota.</span>
          </h2>

          <p className="text-[--textNormal] mt-1 text-2xl">
            I am a self-taught software engineer who has been building internet
            things for over {experience} years. I love traslating ideas to code.
          </p>
        </div>
      </div>

      <Stars />
    </div>
  );
}
