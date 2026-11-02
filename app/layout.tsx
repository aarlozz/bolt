import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { I18nProvider } from '@/components/i18n-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { MobileTabBar } from '@/components/mobile-tab-bar';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700', '900'],
});

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const deva = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-deva',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Avasar — Every scholarship in Nepal and beyond, matched to you',
    template: '%s · Avasar',
  },
  description:
    'Discover, match, apply, and track scholarships in Nepal and abroad. SEE, +2, Bachelor\'s, Master\'s, PhD — local and international, with a match score, scam shield, and deadline reminders in Bikram Sambat and AD.',
  keywords: [
    'scholarships Nepal',
    'scholarship Nepal',
    'SEE scholarship',
    'plus two scholarship',
    'MEXT Nepal',
    'Fulbright Nepal',
    'Chevening Nepal',
    'DAAD Nepal',
    'Erasmus Nepal',
    'Commonwealth scholarship Nepal',
  ],
  authors: [{ name: 'Avasar' }],
  openGraph: {
    type: 'website',
    locale: 'en_NP',
    title: 'Avasar — Every scholarship in Nepal and beyond, matched to you',
    description:
      'Discover, match, apply, and track scholarships in Nepal and abroad. Verified listings, match scores, and a scam shield.',
    siteName: 'Avasar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avasar — Scholarships matched to you',
    description:
      'Every scholarship in Nepal and beyond. Matched to your profile.',
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf7f4' },
    { media: '(prefers-color-scheme: dark)', color: '#2b1f17' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} ${deva.variable} font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <I18nProvider>
            <div className="relative flex min-h-dvh flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <MobileTabBar />
            </div>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
