import { MapPin } from 'lucide-react';
import { Badge } from './ui/badge';

const DATE_STARTED = new Date('2016-01-01');
const TECH_STACKS = [
  'JavaScript',
  'TypeScript',
  'Ruby',
  'Zig 🚧',
  'Elixir 🤷',
  'React.js',
  'Node.js',
  'Ruby on Rails',
  'PostgreSQL',
  'AWS',
];

export default function About() {
  const experience = new Date().getFullYear() - DATE_STARTED.getFullYear();

  return (
    <div className="relative">
      <div className="mx-auto max-w-4xl pb-16">
        <div className="mt-5 md:mt-10">
          <div className="flex flex-col md:flex-row md:items-center mb-8">
            <img
              src="https://github.com/tolsee.png"
              className="rounded-full w-48 h-48"
            />
            <div className="md:pl-5">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Hey 👋, I&apos;m{' '}
                <span className="text-[--green]">Tulsi Sapkota.</span>
              </h1>
              <p className="text-muted-foreground mb-2 text-xl">
                🧑‍💻 Software Engineer
              </p>
              <div className="flex items-center text-muted-foreground mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                <p className="text-muted-foreground">Melbourne, Australia</p>
              </div>
              <div>
                {TECH_STACKS.map((tech) => (
                  <Badge key={tech} className="mt-1 mr-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[--textNormal] text-lg mt-5">
            As a passionate, self-taught software engineer with over{' '}
            {experience} years of experience, I specialize in crafting
            innovative software solutions. My expertise lies in transforming
            complex ideas into elegant, efficient code. I thrive on the
            challenges of software development and am constantly exploring new
            technologies to enhance my craft.
          </p>
        </div>
      </div>
    </div>
  );
}
