import type { Scholarship, StudentProfile } from '@/lib/scholarships/types';

export type CriterionKey =
  | 'level'
  | 'field'
  | 'percent'
  | 'age'
  | 'province'
  | 'district'
  | 'income'
  | 'gender'
  | 'inclusion'
  | 'disability'
  | 'ielts';

export type Criterion = {
  key: CriterionKey;
  label: string;
  met: boolean;
};

export type MatchResult = {
  score: number;
  criteria: Criterion[];
  met: Criterion[];
  missing: Criterion[];
  eligible: boolean;
};

const norm = (s: string) => s.trim().toLowerCase();

export function matchScholarship(
  scholarship: Scholarship,
  profile: StudentProfile,
): MatchResult {
  const rules = scholarship.eligibility;
  const criteria: Criterion[] = [];

  criteria.push({
    key: 'level',
    label: 'Study level',
    met: scholarship.level === profile.targetLevel,
  });

  if (rules.fields?.length) {
    const wanted = rules.fields.map(norm);
    const interest = norm(profile.fieldOfInterest);
    criteria.push({
      key: 'field',
      label: `Field: ${rules.fields.join(' or ')}`,
      met: wanted.includes(interest),
    });
  }

  if (rules.minPercent !== undefined) {
    criteria.push({
      key: 'percent',
      label: `Academic score ${rules.minPercent}%+`,
      met: profile.scorePercent >= rules.minPercent,
    });
  }

  if (rules.maxAge !== undefined) {
    criteria.push({
      key: 'age',
      label: `Age ${rules.maxAge} or under`,
      met: profile.age <= rules.maxAge,
    });
  }

  if (rules.provinces?.length) {
    criteria.push({
      key: 'province',
      label: `Province: ${rules.provinces.join(' or ')}`,
      met: rules.provinces.includes(profile.province),
    });
  }

  if (rules.districts?.length) {
    const wanted = rules.districts.map(norm);
    criteria.push({
      key: 'district',
      label: `District: ${rules.districts.join(' or ')}`,
      met: wanted.includes(norm(profile.district)),
    });
  }

  if (rules.incomeBrackets?.length) {
    criteria.push({
      key: 'income',
      label: 'Household income bracket',
      met: rules.incomeBrackets.includes(profile.incomeBracket),
    });
  }

  if (rules.genders?.length) {
    criteria.push({
      key: 'gender',
      label: 'Gender eligibility',
      met: rules.genders.includes(profile.gender),
    });
  }

  if (rules.inclusion?.length) {
    criteria.push({
      key: 'inclusion',
      label: 'Inclusion group',
      met: profile.inclusion.some((g) => rules.inclusion!.includes(g)),
    });
  }

  if (rules.requiresDisability) {
    criteria.push({
      key: 'disability',
      label: 'Disability status',
      met: profile.disability,
    });
  }

  if (rules.requiresIelts) {
    criteria.push({
      key: 'ielts',
      label: 'IELTS certificate',
      met: profile.hasIelts,
    });
  }

  const met = criteria.filter((c) => c.met);
  const missing = criteria.filter((c) => !c.met);
  const score = criteria.length === 0 ? 100 : Math.round((met.length / criteria.length) * 100);

  return { score, criteria, met, missing, eligible: missing.length === 0 };
}
