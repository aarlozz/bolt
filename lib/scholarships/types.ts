export const LEVELS = ['SEE', 'plus_two', 'bachelors', 'masters', 'phd'] as const;
export type Level = (typeof LEVELS)[number];

export const LEVEL_LABELS: Record<Level, string> = {
  SEE: 'SEE',
  plus_two: '+2 / Class 12',
  bachelors: "Bachelor's",
  masters: "Master's",
  phd: 'PhD',
};

export const PROVINCES = [
  'Koshi',
  'Madhesh',
  'Bagmati',
  'Gandaki',
  'Lumbini',
  'Karnali',
  'Sudurpashchim',
] as const;
export type Province = (typeof PROVINCES)[number];

export const INCOME_BRACKETS = ['low', 'middle', 'high'] as const;
export type IncomeBracket = (typeof INCOME_BRACKETS)[number];

export const GENDERS = ['female', 'male', 'other'] as const;
export type Gender = (typeof GENDERS)[number];

export const INCLUSION_GROUPS = [
  'dalit',
  'janajati',
  'madhesi',
  'muslim',
  'remote_area',
  'none',
] as const;
export type InclusionGroup = (typeof INCLUSION_GROUPS)[number];

export const INCLUSION_LABELS: Record<InclusionGroup, string> = {
  dalit: 'Dalit',
  janajati: 'Janajati',
  madhesi: 'Madhesi',
  muslim: 'Muslim',
  remote_area: 'Remote area',
  none: 'None of these',
};

export type StudentProfile = {
  age: number;
  currentLevel: Level;
  targetLevel: Level;
  stream: string;
  scorePercent: number;
  fieldOfInterest: string;
  province: Province;
  district: string;
  incomeBracket: IncomeBracket;
  gender: Gender;
  inclusion: InclusionGroup[];
  disability: boolean;
  hasIelts: boolean;
};

export type EligibilityRules = {
  minPercent?: number;
  maxAge?: number;
  fields?: string[];
  provinces?: Province[];
  districts?: string[];
  incomeBrackets?: IncomeBracket[];
  genders?: Gender[];
  inclusion?: InclusionGroup[];
  requiresDisability?: boolean;
  requiresIelts?: boolean;
};

export type Verification = 'verified_team' | 'provider_verified' | 'unverified';

export type Scholarship = {
  id: string;
  slug: string;
  title: string;
  provider: string;
  level: Level;
  field: string;
  scope: 'local' | 'international';
  country: string;
  province?: Province;
  amountLabel: string;
  deadlineAd: string;
  deadlineBs: string;
  verification: Verification;
  description: string;
  eligibility: EligibilityRules;
  requiredDocs: string[];
  isSample: true;
};
