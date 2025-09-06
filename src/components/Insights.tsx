'use client';

import { Lightbulb, Quote, TrendingUp, AlertTriangle, Code2, Users } from 'lucide-react';

const INSIGHTS = [
  {
    category: 'AI & Development',
    icon: AlertTriangle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    title: 'The Growing Importance of Testing in the AI Era',
    quote: "It&apos;s getting more common to see issues hitting production because cursor, copilot or something else added something you didn&apos;t meant to! Automated tests are more important in the age of AI",
    context: "With AI-assisted coding becoming mainstream, I've observed a critical shift in how we need to approach quality assurance. The convenience of AI code generation comes with new risks that require heightened vigilance.",
    implications: [
      "Increased reliance on comprehensive test suites",
      "Need for better code review processes",
      "Importance of understanding generated code before deployment"
    ]
  },
  {
    category: 'Language Philosophy',
    icon: TrendingUp, 
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    title: 'Productivity Over Perfection',
    quote: "Ruby's productivity benefits outweigh static typing debates",
    context: "While the industry debates the merits of static vs dynamic typing, my experience shows that Ruby's developer happiness and rapid prototyping capabilities often deliver more business value than theoretical type safety.",
    implications: [
      "Context matters more than universal best practices",
      "Developer productivity drives business outcomes", 
      "Tools should serve the team, not the other way around"
    ]
  },
  {
    category: 'Industry Trends',
    icon: Users,
    color: 'text-purple-500', 
    bgColor: 'bg-purple-500/10',
    title: 'Community-Driven Learning',
    quote: "Following development leaders like @teej_dv, @ryanflorence, and @shadcn has shaped my understanding of modern development practices",
    context: "The developer community on platforms like Twitter/X provides invaluable insights into emerging patterns, tool adoption, and real-world problem-solving approaches that traditional education often misses.",
    implications: [
      "Community engagement is crucial for staying current",
      "Practical insights often come from practitioners, not academics",
      "Building networks accelerates professional growth"
    ]
  }
];

const PROFESSIONAL_VALUES = [
  {
    title: 'Practical Problem Solving',
    description: 'I challenge assumptions to find simpler solutions while maintaining technical depth for complex distributed systems.'
  },
  {
    title: 'Continuous Learning',
    description: 'Staying current with emerging technologies while maintaining healthy skepticism about blindly adopting trends.'
  },
  {
    title: 'Quality Through Testing',
    description: 'Advocating for robust testing practices, especially important as AI-assisted development becomes more prevalent.'
  },
  {
    title: 'Community Contribution',
    description: 'Giving back through open source contributions, Stack Overflow answers, and knowledge sharing.'
  }
];

export function Insights() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <Lightbulb className="w-8 h-8 text-[--green]" />
        <h2 className="text-3xl font-bold">Professional Insights</h2>
      </div>
      
      {/* Key Insights */}
      <div className="grid gap-6">
        {INSIGHTS.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <div 
              key={index} 
              className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg ${insight.bgColor} flex-shrink-0`}>
                  <IconComponent className={`w-6 h-6 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="glass-pill text-xs">
                      {insight.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{insight.title}</h3>
                </div>
              </div>
              
              <div className="pl-16">
                <blockquote className="border-l-4 border-[--green] pl-4 mb-4 italic text-muted-foreground bg-muted/20 rounded-r-lg py-3">
                  <Quote className="w-4 h-4 inline mr-2 opacity-60" />
                  &ldquo;{insight.quote}&rdquo;
                </blockquote>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {insight.context}
                </p>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-foreground">Key Implications:</h4>
                  <ul className="space-y-1">
                    {insight.implications.map((implication, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-[--green] rounded-full mt-2 flex-shrink-0"></span>
                        {implication}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Professional Values */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Core Professional Values</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {PROFESSIONAL_VALUES.map((value, index) => (
            <div 
              key={index}
              className="p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <h4 className="font-semibold text-[--green] mb-2">{value.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-border/50">
        <div className="text-center p-4">
          <div className="text-2xl font-bold text-[--green]">10+</div>
          <div className="text-sm text-muted-foreground">Years Experience</div>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl font-bold text-[--green]">3</div>
          <div className="text-sm text-muted-foreground">Countries Worked</div>
        </div>
        <div className="text-center p-4 md:col-span-1 col-span-2">
          <div className="text-2xl font-bold text-[--green]">Self-Taught</div>
          <div className="text-sm text-muted-foreground">Learning Journey</div>
        </div>
      </div>
    </section>
  );
}
