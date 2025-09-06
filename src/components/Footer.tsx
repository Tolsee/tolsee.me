import { Heart, MapPin, Mail, Calendar, Coffee, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedInIcon, TwitterIcon } from '../assets/icons';
import Link from 'next/link';

const CONTACT_INFO = {
  location: 'Melbourne, Australia',
  email: 'tolsee3@gmail.com',
  timezone: 'AEST (GMT+10)'
};

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/tolsee',
    icon: GithubIcon,
    description: '69 repos, 270+ contributions'
  },
  {
    name: 'Twitter/X',
    href: 'https://twitter.com/tolsee',
    icon: TwitterIcon,
    description: '1.2K+ posts, @tolsee'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tolsee',
    icon: LinkedInIcon,
    description: 'Professional network'
  }
];

const QUICK_LINKS = [
  { name: 'Blog Posts', href: '/posts' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'About', href: '#about' }
];

export function Footer() {
  return (
    <footer className="mt-24 pt-16 pb-8 backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/2 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          {/* About Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-[--green]" />
              <h3 className="text-lg font-semibold">Let&apos;s Connect</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Senior Software Engineer passionate about building scalable solutions and contributing to the developer community.
            </p>
            
            {/* Contact Details */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {CONTACT_INFO.location}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {CONTACT_INFO.timezone}
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-[--green] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Contact Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Find Me Online</h3>
            <div className="space-y-3">
              {SOCIAL_LINKS.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <IconComponent className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-medium text-foreground group-hover:text-[--green] transition-colors">
                        {social.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {social.description}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-[--green] transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>© {new Date().getFullYear()} Tulsi Sapkota</span>
              <span>•</span>
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>using Next.js</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Self-taught • Open Source • Melbourne</span>
            </div>
          </div>
        </div>

        {/* Fun Stats Bar */}
        <div className="mt-6 pt-4 border-t border-white/5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-[--green]">10+</div>
              <div className="text-xs text-muted-foreground">Years Coding</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[--green]">3</div>
              <div className="text-xs text-muted-foreground">Countries</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[--green]">∞</div>
              <div className="text-xs text-muted-foreground">Cups of Coffee</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
