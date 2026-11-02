'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  GENDERS,
  INCLUSION_GROUPS,
  INCLUSION_LABELS,
  INCOME_BRACKETS,
  LEVELS,
  LEVEL_LABELS,
  PROVINCES,
  type InclusionGroup,
  type StudentProfile,
} from '@/lib/scholarships/types';
import { cn } from '@/lib/utils';

type Draft = {
  age: string;
  currentLevel: StudentProfile['currentLevel'];
  targetLevel: StudentProfile['targetLevel'] | '';
  stream: string;
  scorePercent: string;
  fieldOfInterest: string;
  province: StudentProfile['province'] | '';
  district: string;
  incomeBracket: StudentProfile['incomeBracket'] | '';
  gender: StudentProfile['gender'] | '';
  inclusion: InclusionGroup[];
  disability: boolean;
  hasIelts: boolean;
};

type Props = {
  initial: StudentProfile | null;
  submitLabel: string;
  onSubmit: (profile: StudentProfile) => void;
};

const selectClass =
  'flex h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

function toDraft(p: StudentProfile | null): Draft {
  if (!p) {
    return {
      age: '',
      currentLevel: 'plus_two',
      targetLevel: '',
      stream: '',
      scorePercent: '',
      fieldOfInterest: '',
      province: '',
      district: '',
      incomeBracket: '',
      gender: '',
      inclusion: [],
      disability: false,
      hasIelts: false,
    };
  }
  return {
    age: String(p.age),
    currentLevel: p.currentLevel,
    targetLevel: p.targetLevel,
    stream: p.stream,
    scorePercent: String(p.scorePercent),
    fieldOfInterest: p.fieldOfInterest,
    province: p.province,
    district: p.district,
    incomeBracket: p.incomeBracket,
    gender: p.gender,
    inclusion: p.inclusion,
    disability: p.disability,
    hasIelts: p.hasIelts,
  };
}

function validate(d: Draft): { profile: StudentProfile } | { error: string } {
  const age = Number(d.age);
  const score = Number(d.scorePercent);
  if (!Number.isInteger(age) || age < 14 || age > 80) return { error: 'Enter a valid age (14–80).' };
  if (!d.targetLevel) return { error: 'Choose the level you want to study next.' };
  if (!Number.isFinite(score) || score < 0 || score > 100) return { error: 'Enter your percentage (0–100).' };
  if (!d.fieldOfInterest.trim()) return { error: 'Tell us your field of interest.' };
  if (!d.province) return { error: 'Choose your province.' };
  if (!d.district.trim()) return { error: 'Enter your district.' };
  if (!d.incomeBracket) return { error: 'Choose your household income bracket.' };
  if (!d.gender) return { error: 'Choose a gender option (used only for eligibility).' };

  return {
    profile: {
      age,
      currentLevel: d.currentLevel,
      targetLevel: d.targetLevel,
      stream: d.stream.trim(),
      scorePercent: score,
      fieldOfInterest: d.fieldOfInterest.trim(),
      province: d.province,
      district: d.district.trim(),
      incomeBracket: d.incomeBracket,
      gender: d.gender,
      inclusion: d.inclusion,
      disability: d.disability,
      hasIelts: d.hasIelts,
    },
  };
}

export function ProfileForm({ initial, submitLabel, onSubmit }: Props) {
  const [draft, setDraft] = useState<Draft>(() => toDraft(initial));
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const toggleInclusion = (group: InclusionGroup) => {
    setDraft((prev) => {
      if (group === 'none') return { ...prev, inclusion: [] };
      const has = prev.inclusion.includes(group);
      return {
        ...prev,
        inclusion: has
          ? prev.inclusion.filter((g) => g !== group)
          : [...prev.inclusion.filter((g) => g !== 'none'), group],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validate(draft);
    if ('error' in result) {
      setError(result.error);
      return;
    }
    setError(null);
    onSubmit(result.profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold">About your studies</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="currentLevel">Current level</Label>
            <select
              id="currentLevel"
              className={selectClass}
              value={draft.currentLevel}
              onChange={(e) => set('currentLevel', e.target.value as Draft['currentLevel'])}
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>{LEVEL_LABELS[l]}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetLevel">Level you want to study next</Label>
            <select
              id="targetLevel"
              className={selectClass}
              value={draft.targetLevel}
              onChange={(e) => set('targetLevel', e.target.value as Draft['targetLevel'])}
            >
              <option value="">Select a level</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>{LEVEL_LABELS[l]}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="score">Academic percentage</Label>
            <Input
              id="score"
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              placeholder="e.g. 78"
              value={draft.scorePercent}
              onChange={(e) => set('scorePercent', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stream">Stream or program (optional)</Label>
            <Input
              id="stream"
              placeholder="e.g. Science, Management"
              value={draft.stream}
              onChange={(e) => set('stream', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field">Field of interest</Label>
            <Input
              id="field"
              placeholder="e.g. Engineering, Science, Any"
              value={draft.fieldOfInterest}
              onChange={(e) => set('fieldOfInterest', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              inputMode="numeric"
              min={14}
              max={80}
              placeholder="e.g. 19"
              value={draft.age}
              onChange={(e) => set('age', e.target.value)}
            />
          </div>
        </div>
        <label className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm">
          <input
            type="checkbox"
            className="h-4 w-4 accent-[hsl(var(--primary))]"
            checked={draft.hasIelts}
            onChange={(e) => set('hasIelts', e.target.checked)}
          />
          I already have an IELTS certificate
        </label>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Where you live</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="province">Province</Label>
            <select
              id="province"
              className={selectClass}
              value={draft.province}
              onChange={(e) => set('province', e.target.value as Draft['province'])}
            >
              <option value="">Select a province</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Input
              id="district"
              placeholder="e.g. Kaski"
              value={draft.district}
              onChange={(e) => set('district', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Eligibility details</h2>
        <p className="text-sm text-muted-foreground">
          Used only to check which scholarships you qualify for. You can change these later.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="income">Household income</Label>
            <select
              id="income"
              className={selectClass}
              value={draft.incomeBracket}
              onChange={(e) => set('incomeBracket', e.target.value as Draft['incomeBracket'])}
            >
              <option value="">Select a bracket</option>
              {INCOME_BRACKETS.map((b) => (
                <option key={b} value={b}>{b.charAt(0).toUpperCase() + b.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              className={selectClass}
              value={draft.gender}
              onChange={(e) => set('gender', e.target.value as Draft['gender'])}
            >
              <option value="">Select an option</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Inclusion groups (select all that apply)</p>
          <div className="flex flex-wrap gap-2">
            {INCLUSION_GROUPS.map((group) => {
              const active = group === 'none' ? draft.inclusion.length === 0 : draft.inclusion.includes(group);
              return (
                <button
                  key={group}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleInclusion(group)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95',
                    active
                      ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                      : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent/50',
                  )}
                >
                  {INCLUSION_LABELS[group]}
                </button>
              );
            })}
          </div>
        </div>

        <label className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm">
          <input
            type="checkbox"
            className="h-4 w-4 accent-[hsl(var(--primary))]"
            checked={draft.disability}
            onChange={(e) => set('disability', e.target.checked)}
          />
          I have a disability that affects my studies
        </label>
      </section>

      {error && (
        <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full rounded-full font-semibold sm:w-auto">
        {submitLabel}
      </Button>
    </form>
  );
}
