import { Badge } from '@/components/ui/badge';
import { CalendarClock, CheckCircle2, CircleDashed, MapPin, ShieldCheck } from 'lucide-react';
import { MatchRing } from '@/components/checker/match-ring';
import type { MatchResult } from '@/lib/scholarships/match';
import type { Scholarship, Verification } from '@/lib/scholarships/types';
import { LEVEL_LABELS } from '@/lib/scholarships/types';

const VERIFICATION_LABELS: Record<Verification, string> = {
  verified_team: 'Verified by Team',
  provider_verified: 'Provider verified',
  unverified: 'Unverified',
};

export function daysLeft(deadlineAd: string, now = new Date()) {
  const end = new Date(`${deadlineAd}T23:59:59`);
  return Math.ceil((end.getTime() - now.getTime()) / 86_400_000);
}

export function MatchResultCard({ scholarship, result }: { scholarship: Scholarship; result: MatchResult }) {
  const days = daysLeft(scholarship.deadlineAd);
  return (
    <article className="flex flex-col gap-4 rounded-2xl glass p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-start">
      <MatchRing score={result.score} />
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {result.eligible ? (
            <Badge className="gap-1 rounded-full bg-success text-success-foreground">
              <CheckCircle2 className="h-3 w-3" /> You meet all criteria
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1 rounded-full">
              <CircleDashed className="h-3 w-3" /> {result.met.length} of {result.criteria.length} criteria
            </Badge>
          )}
          <Badge variant="secondary" className="gap-1 rounded-full">
            <ShieldCheck className="h-3 w-3" /> {VERIFICATION_LABELS[scholarship.verification]}
          </Badge>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold leading-tight">{scholarship.title}</h3>
          <p className="text-sm text-muted-foreground">
            {scholarship.provider} · {LEVEL_LABELS[scholarship.level]}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {scholarship.province ?? scholarship.country}
          </span>
          <span className="flex items-center gap-1">
            <CalendarClock className="h-3.5 w-3.5" />
            {days < 0 ? 'Deadline passed' : `${days} days left`}
          </span>
          <span className="font-medium text-foreground/80">{scholarship.amountLabel}</span>
        </div>

        {result.missing.length > 0 && (
          <div className="rounded-xl bg-background/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Still needed</p>
            <ul className="mt-1.5 space-y-1 text-sm">
              {result.missing.map((c) => (
                <li key={c.key} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
