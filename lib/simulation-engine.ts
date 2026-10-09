import { Tribute, SimulationResult, GameDay, SimEvent } from '@/types';
import { getTributeById } from '@/data/tributes';

type EventType = 'combat' | 'survival' | 'alliance' | 'trap' | 'hazard' | 'sponsor' | 'cornucopia' | 'feast';

// ===== SEEDED RNG (for shareable / replayable simulations) =====
// All randomness in this module flows through _rng(). Call setSimulationSeed()
// before simulateGame()/simulateFight() to get a deterministic, shareable run.
let _rng: () => number = Math.random;

function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Set a seed for deterministic simulations (share links). Pass null/undefined to restore true randomness. */
export function setSimulationSeed(seed?: string | null): void {
  _rng = seed ? mulberry32(hashSeed(seed)) : Math.random;
}

/** Generate a short random seed string for a new shareable run. */
export function generateSeed(): string {
  return Math.random().toString(36).slice(2, 10);
}

const DAY_TITLES = ['The Bloodbath', 'Into the Wild', 'First Blood', 'Alliances Form', 'The Cracks Show', 'The Betrayal', 'Dwindling Numbers', 'The Feast', 'Final Four', 'The Reckoning', 'Last Stand', 'The Victor Rises', 'No Mercy', 'The End'];

const COMBAT_EVENTS = ['{w} ambushes {l} at the water source and wins decisively.', '{w} and {l} clash at the Cornucopia — {w} emerges victorious.', '{w} tracks {l} through the night and strikes at dawn.', 'A brutal hand-to-hand fight between {w} and {l} — {w} wins.', '{w} uses superior weapon skill to eliminate {l}.'];
const SURVIVAL_EVENTS = ['{t} finds a cache of supplies near the eastern woods.', '{t} successfully purifies water using natural materials.', '{t} constructs a concealed shelter before nightfall.', '{t} forages enough food to maintain strength.', '{t} survives a cold night using improvised insulation.'];
const HAZARD_EVENTS = ['{d} is killed by a tracker jacker nest near the northern ridge.', '{d} triggers a Gamemaker-designed fire trap with no escape.', '{d} is overwhelmed by a muttation pack at dusk.', 'A Gamemaker flood catches {d} in the lowlands.', 'Poison fog rolls in overnight — {d} cannot escape in time.'];
const ALLIANCE_EVENTS = ['{t1} and {t2} form an unlikely but powerful alliance.', '{t1} betrays {t2} in a shocking overnight reversal.', 'The alliance between {t1} and {t2} holds strong another day.', '{t1} defends {t2} from a Career attack, cementing their bond.'];
const SPONSOR_EVENTS = ['{t} receives medicine from a Capitol sponsor — a crucial lifeline.', 'A sponsor parachute delivers food and water to {t}.', '{t} receives a weapon upgrade from an anonymous sponsor.', 'Capitol sponsors send {t} burn cream after a fire encounter.'];
const FEAST_EVENTS = ['The Gamemakers announce a feast at the Cornucopia — all tributes converge.', 'A backpack containing something each tribute desperately needs appears at the Cornucopia.'];

// ===== CUSTOM EVENTS =====
// Users can register their own event templates that get mixed into the simulation.
// Placeholders: {w}/{l} for combat winner/loser, {d} for a death victim,
// {t1}/{t2} for two allied tributes, {t} for a single tribute.
export interface CustomEvent {
  type: EventType;
  template: string;
  fatal: boolean;
}

let customEvents: CustomEvent[] = [];

export function setCustomEvents(events: CustomEvent[]) {
  customEvents = events || [];
}

export function getCustomEvents(): CustomEvent[] {
  return customEvents;
}

function customByType(type: EventType): string[] {
  return customEvents.filter(e => e.type === type).map(e => e.template);
}

// Returns built-in templates plus any custom ones of the same type
function pool(builtIn: string[], type: EventType): string[] {
  const custom = customByType(type);
  return custom.length ? [...builtIn, ...custom] : builtIn;
}

function rand<T>(arr: T[]): T { return arr[Math.floor(_rng() * arr.length)]; }
function randInt(min: number, max: number): number { return Math.floor(_rng() * (max - min + 1)) + min; }

function calcScore(t: Tribute, type: EventType): number {
  const s = t.stats;
  let base = 0;
  switch (type) {
    case 'combat': base = s.strength * 0.4 + s.weaponSkill * 0.4 + s.agility * 0.2; break;
    case 'survival': base = s.survival * 0.5 + s.intelligence * 0.3 + s.stealth * 0.2; break;
    case 'alliance': base = s.charisma * 0.4 + s.allianceLoyalty * 0.4 + s.intelligence * 0.2; break;
    case 'trap': base = s.intelligence * 0.4 + s.stealth * 0.4 + s.survival * 0.2; break;
    case 'hazard': base = s.agility * 0.35 + s.survival * 0.35 + s.strength * 0.3; break;
    case 'cornucopia': base = s.strength * 0.35 + s.agility * 0.35 + s.weaponSkill * 0.3; break;
    default: base = s.survival * 0.5 + s.intelligence * 0.5;
  }
  return base * 0.8 + _rng() * 20;
}

function generateCornucopiaDay(tributes: Tribute[]): { day: GameDay; survivors: string[] } {
  const survivors = [...tributes];
  const deaths: string[] = [];
  const events: SimEvent[] = [];
  const deathCount = Math.min(randInt(3, 8), Math.floor(tributes.length * 0.4));

  // Bloodbath combat
  for (let i = 0; i < deathCount; i++) {
    if (survivors.length < 2) break;
    const idx1 = randInt(0, survivors.length - 1);
    const t1 = survivors[idx1];
    const opponents = survivors.filter((_, j) => j !== idx1);
    const t2 = rand(opponents);
    const s1 = calcScore(t1, 'cornucopia');
    const s2 = calcScore(t2, 'cornucopia');
    const winner = s1 >= s2 ? t1 : t2;
    const loser = s1 >= s2 ? t2 : t1;
    deaths.push(loser.id);
    survivors.splice(survivors.findIndex(s => s.id === loser.id), 1);
    events.push({
      id: `cornucopia-${i}`, day: 1, type: 'cornucopia', participants: [winner.id, loser.id],
      deaths: [loser.id], dramaScore: randInt(70, 95),
      description: rand(pool(COMBAT_EVENTS, 'combat')).replace('{w}', winner.name).replace('{l}', loser.name),
    });
  }

  return {
    survivors: survivors.map(t => t.id),
    day: {
      day: 1, title: 'The Bloodbath',
      events, deaths,
      survivors: survivors.map(t => t.id),
      cannonCount: deaths.length,
      highlight: `${deaths.length} cannon shots ring out. The Games have begun.`,
    },
  };
}

function generateArenaDay(day: number, survivors: Tribute[], allTributes: Tribute[]): { day: GameDay; survivors: string[] } {
  const currentSurvivors = [...survivors];
  const deaths: string[] = [];
  const events: SimEvent[] = [];
  const eventCount = randInt(2, 4);

  for (let i = 0; i < eventCount; i++) {
    if (currentSurvivors.length < 1) break;
    const roll = _rng();

    if (roll < 0.35 && currentSurvivors.length >= 2) {
      // Combat
      const idx = randInt(0, currentSurvivors.length - 1);
      const t1 = currentSurvivors[idx];
      const others = currentSurvivors.filter((_, j) => j !== idx);
      const t2 = rand(others);
      const s1 = calcScore(t1, 'combat');
      const s2 = calcScore(t2, 'combat');
      const winner = s1 >= s2 ? t1 : t2;
      const loser = s1 >= s2 ? t2 : t1;
      const shouldDie = _rng() < 0.7;
      if (shouldDie) {
        deaths.push(loser.id);
        currentSurvivors.splice(currentSurvivors.findIndex(s => s.id === loser.id), 1);
        events.push({ id: `combat-${day}-${i}`, day, type: 'combat', participants: [winner.id, loser.id], deaths: [loser.id], dramaScore: randInt(60, 90), description: rand(pool(COMBAT_EVENTS, 'combat')).replace('{w}', winner.name).replace('{l}', loser.name) });
      }
    } else if (roll < 0.5) {
      // Hazard death
      const victim = rand(currentSurvivors);
      const hazardScore = calcScore(victim, 'hazard');
      if (hazardScore < 65 || (currentSurvivors.length > 3 && _rng() < 0.4)) {
        deaths.push(victim.id);
        currentSurvivors.splice(currentSurvivors.findIndex(s => s.id === victim.id), 1);
        events.push({ id: `hazard-${day}-${i}`, day, type: 'hazard', participants: [victim.id], deaths: [victim.id], dramaScore: randInt(50, 80), description: rand(pool(HAZARD_EVENTS, 'hazard')).replace(/{d}/g, victim.name) });
      }
    } else if (roll < 0.65 && currentSurvivors.length >= 2) {
      // Alliance
      const t1 = rand(currentSurvivors);
      const others = currentSurvivors.filter(t => t.id !== t1.id);
      const t2 = rand(others);
      const isBetray = _rng() < 0.3 && day > 3;
      events.push({ id: `alliance-${day}-${i}`, day, type: 'alliance', participants: [t1.id, t2.id], deaths: [], dramaScore: randInt(40, 75), description: rand(pool(ALLIANCE_EVENTS, 'alliance')).replace('{t1}', t1.name).replace('{t2}', t2.name) });
    } else {
      // Survival / sponsor
      const t = rand(currentSurvivors);
      const type = _rng() < 0.5 ? 'survival' : 'sponsor';
      const templates = type === 'survival' ? pool(SURVIVAL_EVENTS, 'survival') : pool(SPONSOR_EVENTS, 'sponsor');
      events.push({ id: `${type}-${day}-${i}`, day, type, participants: [t.id], deaths: [], dramaScore: randInt(20, 50), description: rand(templates).replace(/{t}/g, t.name) });
    }
  }

  const title = DAY_TITLES[Math.min(day - 1, DAY_TITLES.length - 1)];
  const highlight = deaths.length > 0
    ? `${deaths.length} tribute${deaths.length > 1 ? 's' : ''} eliminated. ${currentSurvivors.length} remain.`
    : `A tense day — all ${currentSurvivors.length} remaining tributes survive.`;

  return {
    survivors: currentSurvivors.map(t => t.id),
    day: { day, title, events, deaths, survivors: currentSurvivors.map(t => t.id), cannonCount: deaths.length, highlight },
  };
}

export function simulateGame(tributeIds: string[]): SimulationResult {
  const tributeObjects = tributeIds.map(id => getTributeById(id)).filter(Boolean) as Tribute[];
  if (tributeObjects.length < 2) return { gameId: 'error', days: [], victor: null, totalDeaths: 0, totalDays: 0, killLeader: null, popularityRankings: [], allianceHistory: [] };

  const days: GameDay[] = [];
  const killCounts: Record<string, number> = {};
  tributeObjects.forEach(t => { killCounts[t.id] = 0; });

  // Day 1: Cornucopia
  const { day: day1, survivors: s1 } = generateCornucopiaDay(tributeObjects);
  days.push(day1);
  day1.events.forEach(e => { if (e.deaths.length > 0 && e.participants.length >= 2) killCounts[e.participants[0]] = (killCounts[e.participants[0]] || 0) + 1; });

  let currentSurvivorIds = s1;
  let dayNum = 2;

  while (currentSurvivorIds.length > 1 && dayNum < 20) {
    const currentSurvivors = currentSurvivorIds.map(id => getTributeById(id)).filter(Boolean) as Tribute[];
    const { day, survivors } = generateArenaDay(dayNum, currentSurvivors, tributeObjects);
    days.push(day);
    day.events.forEach(e => { if (e.deaths.length > 0 && e.participants.length >= 2) killCounts[e.participants[0]] = (killCounts[e.participants[0]] || 0) + 1; });
    currentSurvivorIds = survivors;
    dayNum++;
    // Force resolution if too long
    if (dayNum > 15 && currentSurvivorIds.length > 2) {
      const fs = currentSurvivorIds.map(id => getTributeById(id)).filter(Boolean) as Tribute[];
      const sorted = fs.sort((a, b) => calcScore(b, 'combat') - calcScore(a, 'combat'));
      currentSurvivorIds = [sorted[0].id];
      days.push({ day: dayNum, title: 'The Final Battle', events: [{ id: 'final', day: dayNum, type: 'combat', participants: sorted.map(t => t.id), deaths: sorted.slice(1).map(t => t.id), dramaScore: 99, description: `In a brutal final confrontation, ${sorted[0].name} defeats all remaining tributes to claim victory.` }], deaths: sorted.slice(1).map(t => t.id), survivors: [sorted[0].id], cannonCount: sorted.length - 1, highlight: `${sorted[0].name} emerges as the victor!` });
    }
  }

  const victor = currentSurvivorIds.length > 0 ? getTributeById(currentSurvivorIds[0]) || null : null;
  const totalDeaths = tributeObjects.length - (victor ? 1 : 0);
  const killLeaderEntry = Object.entries(killCounts).sort((a, b) => b[1] - a[1])[0];
  const killLeader = killLeaderEntry ? { tribute: getTributeById(killLeaderEntry[0])!, kills: killLeaderEntry[1] } : null;

  const popularityRankings = tributeObjects.map(t => ({
    tributeId: t.id,
    score: Math.round(t.stats.charisma * 0.4 + t.stats.weaponSkill * 0.3 + (killCounts[t.id] || 0) * 10 + _rng() * 20),
  })).sort((a, b) => b.score - a.score);

  return { gameId: 'simulation', days, victor, totalDeaths, totalDays: days.length, killLeader, popularityRankings, allianceHistory: [] };
}

export function simulateFight(t1: Tribute, t2: Tribute, type: EventType = 'combat') {
  const s1 = calcScore(t1, type);
  const s2 = calcScore(t2, type);
  const winner = s1 >= s2 ? t1 : t2;
  const loser = s1 >= s2 ? t2 : t1;
  const margin = Math.abs(Math.round(s1 - s2));
  const drama = Math.min(100, Math.round(margin * 0.5 + (t1.stats.charisma + t2.stats.charisma) / 4 + _rng() * 20));
  return {
    winner, loser,
    winnerScore: Math.round(Math.max(s1, s2)),
    loserScore: Math.round(Math.min(s1, s2)),
    margin, drama,
    description: rand(pool(COMBAT_EVENTS, 'combat')).replace('{w}', winner.name).replace('{l}', loser.name),
    breakdown: getBreakdown(t1, t2, type),
  };
}

function getBreakdown(t1: Tribute, t2: Tribute, type: EventType) {
  const s = t1.stats; const s2 = t2.stats;
  switch (type) {
    case 'combat': return [{ label: 'Strength', p1: s.strength, p2: s2.strength }, { label: 'Weapon Skill', p1: s.weaponSkill, p2: s2.weaponSkill }, { label: 'Agility', p1: s.agility, p2: s2.agility }];
    case 'survival': return [{ label: 'Survival', p1: s.survival, p2: s2.survival }, { label: 'Intelligence', p1: s.intelligence, p2: s2.intelligence }, { label: 'Stealth', p1: s.stealth, p2: s2.stealth }];
    case 'trap': return [{ label: 'Intelligence', p1: s.intelligence, p2: s2.intelligence }, { label: 'Stealth', p1: s.stealth, p2: s2.stealth }, { label: 'Survival', p1: s.survival, p2: s2.survival }];
    default: return [{ label: 'Agility', p1: s.agility, p2: s2.agility }, { label: 'Survival', p1: s.survival, p2: s2.survival }, { label: 'Strength', p1: s.strength, p2: s2.strength }];
  }
}