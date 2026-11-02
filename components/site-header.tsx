'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useScroll, motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ShieldCheck } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { LocaleToggle } from '@/components/locale-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // subscribe to scroll position
  scrollY.on('change', (v) => setScrolled(v > 12));

  const navLinks = [
    { href: '/explore', label: t('nav.explore') },
    { href: '/check', label: t('nav.check') },
    { href: '/guides', label: t('nav.guides') },
    { href: '/stories', label: t('nav.stories') },
    { href: '/scams', label: t('nav.scams') },
    { href: '/mentors', label: t('nav.mentors') },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'glass-strong shadow-sm' : 'bg-transparent',
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">
            Avasar
            <span className="ml-1.5 inline-block translate-y-[-2px] rounded-md bg-accent px-1.5 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
              Beta
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1.5">
          <div className="hidden sm:block">
            <LocaleToggle />
          </div>
          <ThemeToggle />
          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="ghost" size="sm" asChild className="rounded-full">
              <Link href="/sign-in">{t('nav.signin')}</Link>
            </Button>
            <Button size="sm" asChild className="rounded-full font-semibold">
              <Link href="/sign-up">{t('nav.signup')}</Link>
            </Button>
          </div>
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden lg:hidden glass-strong border-t border-border"
          >
            <div className="container flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
                <LocaleToggle />
                <Button variant="outline" size="sm" asChild className="flex-1 rounded-full">
                  <Link href="/sign-in" onClick={() => setOpen(false)}>
                    {t('nav.signin')}
                  </Link>
                </Button>
                <Button size="sm" asChild className="flex-1 rounded-full font-semibold">
                  <Link href="/sign-up" onClick={() => setOpen(false)}>
                    {t('nav.signup')}
                  </Link>
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-accent/60 px-3 py-2 text-xs text-accent-foreground">
                <ShieldCheck className="h-4 w-4" />
                Verified listings & scam shield enabled
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}