import Header from '@/components/Header';
import { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/src/providers';
import './globals.css';
import { Footer } from '@/src/components/Footer';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

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
      <body>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          attribute="class"
          defaultTheme="system"
        >
          <Header />
          <main className="max-w-4xl mx-auto px-4 py-8 space-y-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
