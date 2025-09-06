import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

const EXPERIENCE = [
  {
    title: 'Senior Software Engineer - Developer Platform',
    company: 'Linktree',
    location: 'Melbourne, Australia',
    period: '2024 - Present',
    type: 'Current',
    description:
      'Working in the Developer Platform team to build and maintain critical infrastructure and tooling that empowers engineering teams across the organization.',
    achievements: [
      'Building and maintaining developer platform infrastructure using AWS CDK and TypeScript',
      'Creating internal tools and services that improve developer productivity across all teams',
      'Implementing infrastructure as code practices and CI/CD pipelines',
      'Architecting scalable AWS solutions for platform-wide services',
      'Driving best practices for cloud infrastructure and platform engineering',
      'Collaborating with engineering teams to streamline development workflows',
    ],
    technologies: [
      'TypeScript',
      'AWS CDK',
      'AWS',
      'Node.js',
      'Terraform',
      'Docker',
      'Kubernetes',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Sensand Technologies',
    location: 'Melbourne, Australia',
    period: 'Dec 2023 - 2024',
    type: 'Previous',
    description:
      'Designed and implemented highly scalable microservices and production infrastructure for innovative technology solutions.',
    achievements: [
      'Designed and implemented highly scalable microservices in Node.js and Golang',
      'Architected production infrastructure using CDK in AWS',
      'Developed modern frontend applications using React.js',
      'Worked with EC2, ECS, RDS, Redis, CloudFront, S3, SQS, SNS, Kinesis',
      'Implemented containerized solutions with Docker and Docker Compose',
    ],
    technologies: [
      'Node.js',
      'Golang',
      'React.js',
      'AWS CDK',
      'Docker',
      'Redis',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Sensand Technologies',
    location: 'Remote',
    period: 'Dec 2022 - Dec 2023',
    type: 'Previous',
    description:
      'Led development of cloud-native solutions on Google Cloud Platform with focus on scalability and reliability.',
    achievements: [
      'Designed highly scalable microservices in Node.js and Golang',
      'Architected production infrastructure using Terraform in GCP',
      'Developed frontend applications using AngularJS',
      'Orchestrated Kubernetes clusters for container management',
      'Implemented event-driven architecture with Pub/Sub',
    ],
    technologies: [
      'Node.js',
      'Golang',
      'Kubernetes',
      'GCP',
      'Terraform',
      'AngularJS',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'AssuranceIQ (via Whitehat Engineering)',
    location: 'Remote',
    period: 'Sep 2020 - Nov 2022',
    type: 'Previous',
    description:
      'Designed service-oriented architecture for customer-facing insurance platform serving millions of users.',
    achievements: [
      'Designed service-oriented architecture for insurance platform',
      'Developed RESTful services in Ruby on Rails and Node.js Lambda',
      'Built frontend with Slim, Vanilla JS/StimulusJS, and React.js',
      'Monitored and optimized performance using DataDog',
      'Built operational dashboards, alerts, and managed on-call rotation',
    ],
    technologies: [
      'Ruby on Rails',
      'Node.js',
      'React.js',
      'AWS Lambda',
      'Terraform',
      'DataDog',
    ],
  },
  {
    title: 'Software Developer',
    company: 'Nimble Thailand',
    location: 'Bangkok, Thailand',
    period: 'Nov 2019 - Sep 2020',
    type: 'Previous',
    description:
      'Full-stack development for various international clients with focus on service-oriented architectures.',
    achievements: [
      'Developed RESTful services in Ruby on Rails and Phoenix',
      'Built frontend applications using Slim, Vanilla JS, and Vue.js',
      'Implemented microservices architecture for multiple clients',
      'Worked with AWS services including EC2, ECS, RDS, Redis, CloudFront',
      'Containerized applications using Docker and Docker Compose',
    ],
    technologies: [
      'Ruby on Rails',
      'Phoenix/Elixir',
      'Vue.js',
      'AWS',
      'Docker',
      'Redis',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Enliv Technology',
    location: 'Kathmandu, Nepal',
    period: 'May 2018 - Oct 2019',
    type: 'Previous',
    description:
      'Led frontend development and cloud infrastructure management for enterprise applications.',
    achievements: [
      'Developed complex frontend applications with React.js, Redux, Redux-Saga',
      'Built RESTful services in Ruby on Rails',
      'Managed scalable cloud infrastructure on AWS',
      'Implemented infrastructure as code using Terraform and CloudFormation',
      'Optimized application performance with Redis caching and CloudFront CDN',
    ],
    technologies: [
      'React.js',
      'Redux',
      'Ruby on Rails',
      'AWS',
      'Terraform',
      'CloudFormation',
    ],
  },
];

export function Experience() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <Briefcase className="w-8 h-8 text-[--green]" />
        <h2 className="text-3xl font-bold">Professional Experience</h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[--green] via-[--green]/50 to-transparent"></div>

        <div className="space-y-8">
          {EXPERIENCE.map((exp, index) => (
            <div key={index} className="relative flex gap-6">
              {/* Timeline dot */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full border-4 flex-shrink-0 ${
                  exp.type === 'Current'
                    ? 'bg-[--green] border-[--green] shadow-lg shadow-[--green]/50'
                    : exp.type === 'Previous'
                      ? 'bg-white border-[--green] dark:bg-gray-800'
                      : 'bg-muted border-muted-foreground'
                }`}
              >
                {exp.type === 'Current' && (
                  <div className="absolute inset-0 rounded-full bg-[--green] animate-ping opacity-20"></div>
                )}
              </div>

              {/* Content Card */}
              <div className="flex-1 backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[--green] font-semibold">
                      <span>{exp.company}</span>
                      {exp.type === 'Current' && (
                        <span className="glass-pill glass-button-primary text-xs">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                      <ChevronRight className="w-4 h-4 text-[--green]" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[--green] rounded-full mt-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="glass-pill text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

