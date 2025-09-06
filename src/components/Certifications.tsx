'use client';

import { Award, ExternalLink, Calendar } from 'lucide-react';

const CERTIFICATIONS = [
  {
    title: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services',
    period: 'June 2021 - June 2024',
    logo: '☁️',
    credentialUrl: 'https://www.credly.com/badges/a049e59f-0bf7-43ba-8492-cccc199c80a6',
    description: 'Validates technical expertise in developing and maintaining applications on the AWS platform.',
    skills: ['AWS Lambda', 'DynamoDB', 'S3', 'API Gateway', 'CloudFormation', 'IAM']
  },
  {
    title: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    period: 'Oct 2021 - June 2023',
    logo: '🔧',
    credentialUrl: 'https://www.credly.com/badges/96f350d8-0575-4964-a33b-d3627849eee9',
    description: 'Demonstrates knowledge of basic concepts, skills, and use cases associated with Terraform.',
    skills: ['Infrastructure as Code', 'Terraform', 'Cloud Providers', 'State Management', 'Modules']
  }
];

export function Certifications() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <Award className="w-8 h-8 text-[--green]" />
        <h2 className="text-3xl font-bold">Certifications</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {CERTIFICATIONS.map((cert, index) => (
          <div
            key={index}
            className="group relative backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{cert.logo}</span>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {cert.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <span>{cert.period}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {cert.skills.map((skill) => (
                <span key={skill} className="glass-pill text-xs">
                  {skill}
                </span>
              ))}
            </div>

            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[--green] hover:text-[--pink] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Credential
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}