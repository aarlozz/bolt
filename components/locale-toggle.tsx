'use client';

import { useI18n } from '@/components/i18n-provider';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function LocaleToggle() {
  const { locale, toggle } = useI18n();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      className="gap-1.5 rounded-full font-medium"
      aria-label="Toggle language"
    >
      <Languages className="h-4 w-4" />
      <span className={locale === 'ne' ? 'font-deva' : ''}>
        {locale === 'en' ? 'नेपाली' : 'EN'}
      </span>
    </Button>
  );
}