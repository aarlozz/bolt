'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Pencil, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProfileForm } from '@/components/checker/profile-form';
import { MatchResultCard } from '@/components/checker/match-result-card';
import { MatchRing } from '@/components/checker/match-ring';
import { SAMPLE_SCHOLARSHIPS } from '@/lib/scholarships/sample-listings';
import { matchScholarship } from '@/lib/scholarships/match';
import { loadStoredProfile, saveStoredProfile } from '@/lib/scholarships/profile-storage';
import type { StudentProfile } from '@/lib/scholarships/types';

export function CheckerClient() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setProfile(loadStoredProfile());
    setReady(true);
  }, []);

  const results = useMemo(() => {
    if (!profile) return [];
    return SAMPLE_SCHOLARSHIPS.map((s) => ({ scholarship: s, result: matchScholarship(s, profile) }))
      .sort((a, b) => Number(b.result.eligible) - Number(a.result.eligible) || b.result.score - a.result.score);
  }, [profile]);

  const eligibleCount = results.filter((r) => r.result.eligible).length;
  const topScore = results[0]?.result.score ?? 0;

  const handleSubmit = (next: StudentProfile) => {
    saveStoredProfile(next);
    setProfile(next);
    setEditing(false);
  };

  const handleShare = async () => {
    const text = `I checked my scholarship eligibility on Avasar: ${eligibleCount} of ${SAMPLE_SCHOLARSHIPS.length} listings match me. Check yours in 30 seconds.`;
    const url = typeof window !== 'undefined' ? `${window.location.origin}/check` : '/check';
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Avasar match', text, url });
        return;
      } catch {
        return;
      }
    }
    await navigator.clipboard.writeText(`${text} ${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!ready) {
    return (
      <div className="container py-16">
        <div className="mx-auto h-64 max-w-3xl animate-pulse rounded-3xl bg-muted" />
      </div>
    );
  }

  if (!profile || editing) {
    return (
      <div className="container py-10 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <Badge className="gap-1.5 rounded-full bg-accent/60 text-accent-foreground">
            <Sparkles className="h-3 w-3" /> No sign-up needed
          </Badge>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance">
            {profile ? 'Update your profile' : 'Am I eligible?'}
          </h1>
          <p className="mt-3 text-muted-foreground text-pretty">
            Answer a few questions and we will show every listing you qualify for, with the reasons behind each match.
          </p>
          <div className="mt-8 rounded-3xl glass-strong p-6 shadow-sm sm:p-10">
            <ProfileForm
              initial={profile}
              submitLabel={profile ? 'Save and see my matches' : 'See my matches'}
              onSubmit={handleSubmit}
            />
          </div>
          {profile && (
            <Button variant="ghost" className="mt-4 rounded-full" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 lg:py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-lg sm:p-10"
        >
          <div className="pointer-events-none absolute inset-0 mesh-mocha opacity-25" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary-foreground/80">Your result</p>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                You qualify for {eligibleCount} of {SAMPLE_SCHOLARSHIPS.length} listings
              </h1>
              <p className="text-sm text-primary-foreground/80">
                Best match: {topScore}%. Matches use the criteria shown on each card.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-primary-foreground/10 p-3">
                <MatchRing score={topScore} size={72} />
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="secondary" className="rounded-full font-semibold" onClick={handleShare}>
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
                  {copied ? 'Copied to clipboard' : 'Share my result'}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => setEditing(true)}
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit profile
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold">Your matches</h2>
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link href="/explore" className="gap-1.5">
                Browse all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <AnimatePresence initial={false}>
            {results.map(({ scholarship, result }, i) => (
              <motion.div
                key={scholarship.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.4) }}
              >
                <MatchResultCard scholarship={scholarship} result={result} />
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Copy className="h-3.5 w-3.5" />
          Listings shown are samples while we verify live provider data. Your answers stay on this device.
        </p>
      </div>
    </div>
  );
}
