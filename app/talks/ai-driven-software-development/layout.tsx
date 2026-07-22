import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-Driven Software Development | Tulsi Sapkota',
  description: 'A talk about the engineering environment behind useful agents: context, knowledge, tools, skills, and trusted automation.',
};

export default function PreparingEngineeringForAILayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[100] overflow-hidden bg-[#282c35]">{children}</div>;
}
