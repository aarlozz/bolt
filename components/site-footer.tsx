'use client';

import Link from 'next/link';
import { useI18n } from '@/components/i18n-provider';
import { Sparkles, Mail, MapPin, ShieldCheck } from 'lucide-react';

export function SiteFooter() {
  const { t, locale } = useI18n();

  const cols = [
    {
      title: locale === 'ne' ? 'प्लेटफर्म' : 'Platform',
      links: [
        { href: '/explore', label: t('nav.explore') },
        { href: '/check', label: t('nav.check') },
        { href: '/onboarding', label: t('cta.onboard') },
        { href: '/mentors', label: t('nav.mentors') },
      ],
    },
    {
      title: locale === 'ne' ? 'समुदाय' : 'Community',
      links: [
        { href: '/stories', label: t('nav.stories') },
        { href: '/scams', label: t('nav.scams') },
        { href: '/guides', label: t('nav.guides') },
      ],
    },
    {
      title: locale === 'ne' ? 'कम्पनी' : 'Company',
      links: [
        { href: '/about', label: t('footer.about') },
        { href: '/contact', label: t('footer.contact') },
        { href: '/faq', label: t('footer.faq') },
        { href: '/changelog', label: t('footer.changelog') },
      ],
    },
    {
      title: locale === 'ne' ? 'कानूनी' : 'Legal',
      links: [
        { href: '/privacy', label: t('footer.privacy') },
        { href: '/terms', label: t('footer.terms') },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-foreground text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-semibold tracking-tight">Avasar</span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/80 text-pretty">
              {t('footer.tagline')}
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> hello@avasarnepal.org
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Kathmandu, Nepal
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Verified by Team · Scam Shield active
              </span>
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <nav key={col.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-primary-foreground">{col.title}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/20 pt-6 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Avasar Nepal. All rights reserved.</p>
          <p className={locale === 'ne' ? 'font-deva' : ''}>
            {locale === 'ne' ? 'नेपाली विद्यार्थीहरूका लागि बनाइएको ।' : 'Built for Nepali students.'}
          </p>
        </div>
      </div>
    </footer>
  );
}