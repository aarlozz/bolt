'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, ListChecks, FolderLock, User } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';
import { cn } from '@/lib/utils';

export function MobileTabBar() {
  const pathname = usePathname();
  const { t } = useI18n();

  const tabs = [
    { href: '/', label: t('tab.home'), icon: Home },
    { href: '/explore', label: t('tab.explore'), icon: Compass },
    { href: '/tracker', label: t('tab.tracker'), icon: ListChecks },
    { href: '/vault', label: t('tab.vault'), icon: FolderLock },
    { href: '/account', label: t('tab.profile'), icon: User },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="glass-strong mx-auto flex max-w-md items-stretch justify-around rounded-t-2xl border-t border-border px-2 pb-[env(safe-area-inset-bottom)] pt-1.5 shadow-[0_-4px_24px_-8px_hsl(var(--mocha)/0.18)]">
        {tabs.map((tab) => {
          const active =
            tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="group flex flex-1 flex-col items-center gap-1 rounded-lg px-1 py-1.5"
            >
              <span
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-full transition-all duration-200',
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                    : 'text-foreground/60 group-active:scale-95',
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  active ? 'text-primary' : 'text-foreground/55',
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}