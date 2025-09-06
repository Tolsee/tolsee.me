'use client';

import { useState } from 'react';
import { Code, Database, Cloud, Globe, Terminal, Layers, Zap, Star, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';

const SKILL_CATEGORIES = [
  {
    name: 'Frontend',
    icon: Globe,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    skills: [
      { name: 'React.js', level: 95, experience: '6+ years' },
      { name: 'TypeScript', level: 90, experience: '5+ years' },
      { name: 'Next.js', level: 85, experience: '4+ years' },
      { name: 'Tailwind CSS', level: 90, experience: '3+ years' },
      { name: 'Framer Motion', level: 75, experience: '2+ years' },
      { name: 'JavaScript', level: 95, experience: '8+ years' }
    ]
  },
  {
    name: 'Backend',
    icon: Database,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    skills: [
      { name: 'Node.js', level: 95, experience: '7+ years' },
      { name: 'Ruby on Rails', level: 90, experience: '5+ years' },
      { name: 'PostgreSQL', level: 85, experience: '6+ years' },
      { name: 'GraphQL', level: 80, experience: '3+ years' },
      { name: 'REST APIs', level: 95, experience: '8+ years' },
      { name: 'Microservices', level: 85, experience: '4+ years' }
    ]
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    skills: [
      { name: 'AWS', level: 90, experience: '6+ years' },
      { name: 'Kubernetes', level: 85, experience: '4+ years' },
      { name: 'Terraform', level: 80, experience: '3+ years' },
      { name: 'Docker', level: 90, experience: '5+ years' },
      { name: 'CI/CD', level: 85, experience: '5+ years' },
      { name: 'Serverless', level: 80, experience: '3+ years' }
    ]
  },
  {
    name: 'Exploring',
    icon: Zap,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    skills: [
      { name: 'Zig', level: 30, experience: 'Learning', status: '🚧' },
      { name: 'Elixir', level: 25, experience: 'Exploring', status: '🤷' },
      { name: 'Rust', level: 40, experience: 'Side Projects' },
      { name: 'Go', level: 50, experience: 'Occasional Use' },
      { name: 'Neovim/Lua', level: 75, experience: '2+ years' },
      { name: 'WASM', level: 35, experience: 'Experimenting' }
    ]
  }
];

export function TechnicalSkills() {
  const [activeCategory, setActiveCategory] = useState(0);

  const getSkillLevelColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 75) return 'bg-blue-500';
    if (level >= 50) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getSkillLevelText = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    return 'Learning';
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <Code className="w-8 h-8 text-[--green]" />
        <h2 className="text-3xl font-bold">Technical Skills</h2>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        {SKILL_CATEGORIES.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.name}
              onClick={() => setActiveCategory(index)}
              className={`flex items-center gap-3 px-6 py-3 glass-button ${
                activeCategory === index
                  ? 'glass-button-primary'
                  : ''
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Display */}
      <div className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          {(() => {
            const category = SKILL_CATEGORIES[activeCategory];
            const IconComponent = category.icon;
            return (
              <>
                <div className={`p-2 rounded-lg ${category.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${category.color}`} />
                </div>
                <h3 className="text-2xl font-semibold">{category.name} Skills</h3>
              </>
            );
          })()}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES[activeCategory].skills.map((skill, index) => (
            <div
              key={skill.name}
              className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground">
                    {skill.name}
                    {skill.status && <span className="ml-1">{skill.status}</span>}
                  </h4>
                  <span 
                    className={`glass-pill text-xs ${
                      skill.level >= 90 ? 'glass-button-primary' : ''
                    }`}
                  >
                    {getSkillLevelText(skill.level)}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {skill.experience}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Proficiency</span>
                  <span className="text-foreground font-medium">{skill.level}%</span>
                </div>
                
                <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${getSkillLevelColor(skill.level)} shadow-lg`}
                    style={{ 
                      width: `${skill.level}%`,
                      animation: `slideIn 1s ease-out ${index * 0.1}s both`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10">
          <Star className="w-6 h-6 text-[--green] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[--green]">25+</div>
          <div className="text-sm text-muted-foreground">Technologies</div>
        </div>
        <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10">
          <Layers className="w-6 h-6 text-[--green] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[--green]">Full Stack</div>
          <div className="text-sm text-muted-foreground">Development</div>
        </div>
        <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10">
          <Terminal className="w-6 h-6 text-[--green] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[--green]">10+</div>
          <div className="text-sm text-muted-foreground">Years Experience</div>
        </div>
        <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10">
          <ChevronRight className="w-6 h-6 text-[--green] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[--green]">Always</div>
          <div className="text-sm text-muted-foreground">Learning</div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            width: 0%;
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}