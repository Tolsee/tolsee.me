import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The agent funnel | Tulsi Sapkota',
  description:
    'Building an autonomous CI optimizer — a talk about agent funnels, BFF-style MCPs, and the lessons learned.',
};

/**
 * Fullscreen presentation layout — overlays the site Header/Footer via
 * fixed z-[100] positioning so the root layout is untouched.
 */
export default function TalkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] bg-[#282c35] overflow-hidden">
      {children}
    </div>
  );
}
