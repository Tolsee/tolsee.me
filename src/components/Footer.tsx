import { GithubIcon, LinkedInIcon, TwitterIcon } from '../assets/icons';

export function Footer() {
  return (
    <footer className="mt-16 py-8 bg-muted">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>
          <>© {new Date().getFullYear()} Tulsi Sapkota</>
        </p>
        <div className="flex flex-row space-x-2">
          <a
            href="https://twitter.com/tolsee"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://github.com/tolsee"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/tolsee"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
