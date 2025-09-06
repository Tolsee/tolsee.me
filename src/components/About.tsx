import {
  MapPin,
  Calendar,
  Github,
  Twitter,
  Coffee,
  Zap,
  Globe,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const DATE_STARTED = new Date('2016-01-01');
const BIRTH_DATE = new Date('1994-05-16');
const CORE_STACK = [
  'Node.js',
  'React.js',
  'Ruby on Rails',
  'TypeScript',
  'AWS',
  'Kubernetes',
  'Terraform',
];

const EXPLORING_STACK = ['Zig 🚧', 'Elixir 🤷', 'Rust', 'Go'];

export default function About() {
  const experience = new Date().getFullYear() - DATE_STARTED.getFullYear();
  const age = new Date().getFullYear() - BIRTH_DATE.getFullYear();

  return (
    <div className="relative">
      <div className="mx-auto max-w-4xl pb-16">
        <div className="mt-5 md:mt-10">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row md:items-center mb-12">
            <Image
              src="https://github.com/tolsee.png"
              className="rounded-full w-48 h-48 mb-6 md:mb-0 shadow-lg border-4 border-[--green] hover:scale-105 transition-transform duration-300"
              alt="Tulsi Sapkota"
            />
            <div className="md:pl-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hey 👋, I&apos;m{' '}
                <span className="text-[--green]">Tulsi Sapkota.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                Senior Software Engineer at{' '}
                <span className="text-[--green] font-semibold">Linktree</span>
              </p>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Melbourne, Australia
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {age} years old
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  {experience}+ years experience
                </div>
              </div>

              {/* Social Links - Glass Effect */}
              <div className="flex gap-3 mb-6">
                <Link
                  href="https://github.com/tolsee"
                  className="glass-pill flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  @tolsee
                </Link>
                <Link
                  href="https://twitter.com/tolsee"
                  className="glass-pill flex items-center gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  @tolsee
                </Link>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="space-y-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Coffee className="w-6 h-6 text-[--green]" />
                My Journey
              </h2>
              <div className="text-lg space-y-4 text-[--textNormal] leading-relaxed">
                <p>
                  As a passionate,{' '}
                  <strong>self-taught software engineer</strong> with over{' '}
                  {experience} years of experience, I specialize in crafting
                  innovative solutions that bridge the gap between complex
                  infrastructure and elegant user experiences. My journey from{' '}
                  <span className="text-[--green]">electrical engineering</span>{' '}
                  to software development has been driven by an insatiable
                  curiosity and a commitment to continuous learning.
                </p>
                <p>
                  Currently serving as a{' '}
                  <strong>Senior Software Engineer at Linktree</strong> in
                  Melbourne, I thrive on transforming intricate technical
                  challenges into scalable, efficient systems. My expertise
                  spans the full stack - from building responsive React.js
                  interfaces to architecting event-driven microservices, from
                  orchestrating Kubernetes clusters to implementing critical
                  platform features that serve millions of users globally.
                </p>
                <p>
                  What sets me apart is my{' '}
                  <span className="text-[--green]">
                    practical approach to problem-solving
                  </span>
                  . Colleagues know me as someone who challenges assumptions to
                  find simpler solutions, while maintaining the technical depth
                  to tackle complex distributed systems. Whether it&apos;s
                  migrating legacy services to serverless architectures,
                  integrating cutting-edge payment systems, or building
                  configuration-driven platforms, I bring both strategic
                  thinking and hands-on execution.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[--green]" />
                  Global Perspective
                </h3>
                <p className="text-muted-foreground">
                  My international experience across{' '}
                  <strong>Nepal, Thailand, and Australia</strong> has shaped my
                  collaborative approach and adaptability. I bring diverse
                  cultural insights to technical problem-solving and team
                  dynamics.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[--green]" />
                  Community First
                </h3>
                <p className="text-muted-foreground">
                  I&apos;m deeply invested in the developer community -
                  contributing to open source projects, sharing knowledge on
                  Stack Overflow, and mentoring fellow developers. I believe in
                  giving back to the community that helped shape my career.
                </p>
              </div>
            </div>

            {/* Tech Philosophy - Glass Effect */}
            <div className="rounded-2xl p-6 backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-xl">
              <h3 className="text-xl font-semibold mb-4">My Tech Philosophy</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong className="text-foreground">
                    AI-Aware Development:
                  </strong>{' '}
                  In an era where AI is reshaping development, I advocate for
                  the increased importance of robust testing and thoughtful
                  engineering practices.
                </p>
                <p>
                  <strong className="text-foreground">
                    Practical Innovation:
                  </strong>{' '}
                  I stay current with emerging technologies while maintaining
                  healthy skepticism about blindly adopting trends. Great
                  software isn&apos;t just about writing code - it&apos;s about
                  building resilient systems that empower people.
                </p>
                <p>
                  <strong className="text-foreground">
                    Continuous Learning:
                  </strong>{' '}
                  Technology evolves rapidly, but fundamentals remain. I focus
                  on understanding core principles while exploring new tools
                  that genuinely solve problems.
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Core Stack</h3>
              <div className="flex flex-wrap gap-2">
                {CORE_STACK.map((tech) => (
                  <span key={tech} className="glass-pill glass-button-primary">
                    {tech}
                  </span>
                ))}
              </div>

              <h4 className="text-lg font-medium text-muted-foreground mt-6">
                Currently Exploring
              </h4>
              <div className="flex flex-wrap gap-2">
                {EXPLORING_STACK.map((tech) => (
                  <span key={tech} className="glass-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
