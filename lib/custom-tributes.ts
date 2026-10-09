import type { Tribute } from '@/types';

const STORAGE_KEY = 'hgs-custom-tributes-v1';
export const MAX_CUSTOM_TRIBUTES = 48;

function readAll(): Tribute[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(t => t && typeof t.id === 'string' && t.id.startsWith('custom-')) : [];
  } catch {
    return [];
  }
}

function writeAll(list: Tribute[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_CUSTOM_TRIBUTES)));
  } catch {
    // storage full or unavailable — fail silently, creator UI will warn
  }
}

/** All user-created tributes on this device. */
export function getCustomTributes(): Tribute[] {
  return readAll();
}

/** Look up a single custom tribute by id. Safe to call on server (returns undefined). */
export function getCustomTribute(id: string): Tribute | undefined {
  if (!id.startsWith('custom-')) return undefined;
  return readAll().find(t => t.id === id);
}

/** Insert or update a custom tribute. Returns the full list. */
export function saveCustomTribute(t: Tribute): Tribute[] {
  const list = readAll().filter(x => x.id !== t.id);
  list.unshift(t);
  writeAll(list);
  return list;
}

/** Delete a custom tribute. Returns the full list. */
export function deleteCustomTribute(id: string): Tribute[] {
  const list = readAll().filter(x => x.id !== id);
  writeAll(list);
  return list;
}

export interface CustomTributeInput {
  name: string;
  districtNumber: number;
  background: Tribute['background'];
  gender: 'male' | 'female';
  age: number;
  image: string;
  bio: string;
  stats: Tribute['stats'];
  weapon: string;
  strategy: string;
  trainingScore: number;
  catchphrase: string;
}

const DISTRICT_NAMES: Record<number, string> = {
  1: 'District 1', 2: 'District 2', 3: 'District 3', 4: 'District 4',
  5: 'District 5', 6: 'District 6', 7: 'District 7', 8: 'District 8',
  9: 'District 9', 10: 'District 10', 11: 'District 11', 12: 'District 12',
  13: 'District 13', 0: 'The Capitol',
};

/** Build a Tribute object from creator-form input. */
export function makeCustomTribute(input: CustomTributeInput, existingId?: string): Tribute {
  return {
    id: existingId || `custom-${Date.now().toString(36)}${Math.floor(Math.random() * 1296).toString(36)}`,
    name: input.name.trim(),
    age: input.age,
    gender: input.gender,
    district: DISTRICT_NAMES[input.districtNumber] || `District ${input.districtNumber}`,
    districtNumber: input.districtNumber,
    image: input.image,
    bio: input.bio.trim(),
    background: input.background,
    stats: { ...input.stats },
    weapon: input.weapon.trim(),
    strategy: input.strategy.trim(),
    trainingScore: input.trainingScore,
    catchphrase: input.catchphrase.trim(),
    wins: 0,
    losses: 0,
  };
}

/** Serialize custom tributes for a share link (drops large embedded images to keep URLs short). */
export function serializeForShare(list: Tribute[]): string {
  const slim = list.map(t => ({
    ...t,
    image: t.image && t.image.length > 40000 ? '' : t.image,
  }));
  return encodeURIComponent(JSON.stringify(slim));
}

/** Restore custom tributes from a share-link payload. */
export function deserializeFromShare(payload: string): Tribute[] {
  try {
    const parsed = JSON.parse(decodeURIComponent(payload));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(t => t && typeof t.id === 'string' && t.id.startsWith('custom-'));
  } catch {
    return [];
  }
}
