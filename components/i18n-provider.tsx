'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'en' | 'ne';

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

// Minimal string table for the shell. Full content translation comes in later slices.
const dict: Record<Locale, Record<string, string>> = {
  en: {
    'nav.explore': 'Explore',
    'nav.check': 'Am I Eligible?',
    'nav.guides': 'Guides',
    'nav.stories': 'Success Wall',
    'nav.scams': 'Scam Watch',
    'nav.mentors': 'Mentors',
    'nav.signin': 'Sign in',
    'nav.signup': 'Get started',
    'nav.dashboard': 'Dashboard',
    'cta.checker': 'Check eligibility in 30 seconds',
    'cta.onboard': 'Find my matches',
    'cta.browse': 'Browse scholarships',
    'footer.tagline': 'Every scholarship in Nepal and beyond. Matched to you.',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.faq': 'FAQ',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.changelog': 'Changelog',
    'tab.home': 'Home',
    'tab.explore': 'Explore',
    'tab.tracker': 'Tracker',
    'tab.vault': 'Vault',
    'tab.profile': 'Profile',
  },
  ne: {
    'nav.explore': 'अवसरहरू',
    'nav.check': 'के म योग्य छु?',
    'nav.guides': 'गाइडहरू',
    'nav.stories': 'सफलता पर्खाल',
    'nav.scams': 'ठगी निगरानी',
    'nav.mentors': 'मेन्टरहरू',
    'nav.signin': 'साइन इन',
    'nav.signup': 'सुरु गर्नुहोस्',
    'nav.dashboard': 'ड्यासबोर्ड',
    'cta.checker': '३० सेकेन्डमा योग्यता जाँच्नुहोस्',
    'cta.onboard': 'मेरो म्याच खोज्नुहोस्',
    'cta.browse': 'छात्रवृत्ति हेर्नुहोस्',
    'footer.tagline': 'नेपाल र विश्वका सबै छात्रवृत्ति। तपाईंका लागि म्याच।',
    'footer.about': 'बारेमा',
    'footer.contact': 'सम्पर्क',
    'footer.faq': 'प्रश्नहरू',
    'footer.privacy': 'गोपनीयता',
    'footer.terms': 'सर्तहरू',
    'footer.changelog': 'परिवर्तन लग',
    'tab.home': 'गृह',
    'tab.explore': 'अवसरहरू',
    'tab.tracker': 'ट्र्याकर',
    'tab.vault': 'भोल्ट',
    'tab.profile': 'प्रोफाइल',
  },
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('avasar-locale') : null;
    if (stored === 'en' || stored === 'ne') setLocaleState(stored);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== 'undefined') localStorage.setItem('avasar-locale', l);
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === 'en' ? 'ne' : 'en');
  }, [locale, setLocale]);

  const t = useCallback(
    (key: string) => dict[locale][key] ?? dict.en[key] ?? key,
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, toggle, t }),
    [locale, setLocale, toggle, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}