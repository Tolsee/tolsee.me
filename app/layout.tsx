import Header from '@/components/Header';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tolsee.io'),
  title: {
    default: 'Tulsi Sapkota',
    template: '%s | Tulsi Sapkota',
  },
  description: 'Software engineer, and creator.',
  openGraph: {
    title: 'Tulsi Sapkota',
    description: 'Software engineer, and creator.',
    url: 'https://tolsee.me',
    siteName: 'Tulsi Sapkota',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Tulsi Sapkota',
    card: 'summary_large_image',
  },
  verification: {
    google: '1Qw4w-WaCS9MjGa7odM_K3d0CGDdRS3n46axJS3iUMk',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
