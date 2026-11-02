import { LEVELS, type StudentProfile } from '@/lib/scholarships/types';

const STORAGE_KEY = 'avasar-profile';

export function loadStoredProfile(): StudentProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StudentProfile>;
    if (
      typeof parsed.age !== 'number' ||
      typeof parsed.scorePercent !== 'number' ||
      !LEVELS.includes(parsed.targetLevel as StudentProfile['targetLevel']) ||
      !Array.isArray(parsed.inclusion)
    ) {
      return null;
    }
    return parsed as StudentProfile;
  } catch {
    return null;
  }
}

export function saveStoredProfile(profile: StudentProfile) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
