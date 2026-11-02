import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

const entries = [
  {
    version: '0.1.0 — Slice 1',
    date: '2026-11-02',
    items: [
      'Design system: Warm Luxe Modern tokens, mocha/lavender/platinum palette, dark mode',
      'Fraunces + Plus Jakarta Sans + Noto Sans Devanagari fonts',
      'Animated mesh gradient hero with floating scholarship cards & Himalayan skyline',
      'Live counters, bento features, how-it-works, scam shield section, testimonials',
      'Nepali/English content toggle with Romanized search placeholder',
      'PWA manifest, installable, theme-color aware',
      'Mobile bottom tab bar (Home, Explore, Tracker, Vault, Profile)',
      '404 page and placeholder routes for every nav destination',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="container py-16 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <Badge className="gap-1.5 rounded-full bg-accent/60 text-accent-foreground">
          <Sparkles className="h-3 w-3" /> Beta
        </Badge>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">Changelog</h1>
        <p className="mt-2 text-muted-foreground">What&apos;s new in Avasar, slice by slice.</p>

        <div className="mt-10 space-y-8">
          {entries.map((e) => (
            <article key={e.version} className="rounded-2xl glass p-6 shadow-sm">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-xl font-semibold">{e.version}</h2>
                <time className="text-sm text-muted-foreground">{e.date}</time>
              </div>
              <ul className="mt-4 space-y-2">
                {e.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
