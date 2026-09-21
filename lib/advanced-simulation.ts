import type { Tribute } from '@/types';
import { tributes } from '@/data/tributes';

export type ArenaTerrain =
  | 'forest'
  | 'mountain'
  | 'desert'
  | 'coast'
  | 'ruins'
  | 'swamp';

export type ArenaWeather =
  | 'clear'
  | 'rain'
  | 'storm'
  | 'heat'
  | 'cold'
  | 'fog';

export type StrategyMode =
  | 'dynamic'
  | 'balanced'
  | 'aggressive'
  | 'survival';

export interface ArenaConfig {
  name: string;
  terrain: ArenaTerrain;
  weather: ArenaWeather;
  resourceLevel: number;
  hazardLevel: number;
  allianceRate: number;
  sponsorRate: number;
  strategyMode: StrategyMode;
}

export interface AdvancedScenario extends ArenaConfig {
  scenarioName: string;
  roster: string[];
  specialRule?: string;
}

export interface AdvancedPlacement {
  tributeId: string;
  placement: number;
  survivalDay: number;
  kills: number;
}

export interface AdvancedEvent {
  day: number;
  type: 'combat' | 'hazard' | 'alliance' | 'sponsor' | 'survival';
  description: string;
  tributeId?: string;
}

export interface AdvancedSimulationResult {
  victor: Tribute | null;
  days: number;
  placements: AdvancedPlacement[];
  events: AdvancedEvent[];
  arena: ArenaConfig;
  scenarioName: string;
}

export interface SimulationLabRow {
  tributeId: string;
  name: string;
  wins: number;
  winRate: number;
  averagePlacement: number;
  averageSurvivalDay: number;
  averageKills: number;
  topThreeRate: number;
}

export interface SimulationLabResult {
  simulations: number;
  arena: ArenaConfig;
  rows: SimulationLabRow[];
}

export const arenaPresets: ArenaConfig[] = [
  {
    name: 'The Verdant Wilds',
    terrain: 'forest',
    weather: 'clear',
    resourceLevel: 55,
    hazardLevel: 35,
    allianceRate: 55,
    sponsorRate: 50,
    strategyMode: 'dynamic',
  },
  {
    name: 'Ash Mountain',
    terrain: 'mountain',
    weather: 'storm',
    resourceLevel: 45,
    hazardLevel: 75,
    allianceRate: 40,
    sponsorRate: 45,
    strategyMode: 'aggressive',
  },
  {
    name: 'The Burning Expanse',
    terrain: 'desert',
    weather: 'heat',
    resourceLevel: 30,
    hazardLevel: 70,
    allianceRate: 30,
    sponsorRate: 40,
    strategyMode: 'survival',
  },
  {
    name: 'The Broken Coast',
    terrain: 'coast',
    weather: 'rain',
    resourceLevel: 60,
    hazardLevel: 45,
    allianceRate: 60,
    sponsorRate: 55,
    strategyMode: 'balanced',
  },
  {
    name: 'The Fallen Capital',
    terrain: 'ruins',
    weather: 'fog',
    resourceLevel: 50,
    hazardLevel: 60,
    allianceRate: 50,
    sponsorRate: 60,
    strategyMode: 'dynamic',
  },
  {
    name: 'The Drowned Marsh',
    terrain: 'swamp',
    weather: 'cold',
    resourceLevel: 40,
    hazardLevel: 65,
    allianceRate: 45,
    sponsorRate: 50,
    strategyMode: 'survival',
  },
];

function random(min = 0, max = 1): number {
  return min + Math.random() * (max - min);
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

function round(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function getTribute(id: string): Tribute | undefined {
  return tributes.find((tribute) => tribute.id === id);
}

function strategyScore(tribute: Tribute, mode: StrategyMode): number {
  const s = tribute.stats;

  switch (mode) {
    case 'aggressive':
      return (
        s.strength * 0.35 +
        s.weaponSkill * 0.35 +
        s.agility * 0.2 +
        s.survival * 0.1
      );
    case 'survival':
      return (
        s.survival * 0.4 +
        s.stealth * 0.25 +
        s.intelligence * 0.25 +
        s.agility * 0.1
      );
    case 'balanced':
      return (
        s.strength * 0.2 +
        s.weaponSkill * 0.2 +
        s.agility * 0.2 +
        s.survival * 0.2 +
        s.intelligence * 0.2
      );
    case 'dynamic':
    default:
      return (
        s.strength * 0.2 +
        s.weaponSkill * 0.2 +
        s.agility * 0.15 +
        s.survival * 0.2 +
        s.intelligence * 0.15 +
        s.charisma * 0.1
      );
  }
}

function terrainScore(tribute: Tribute, terrain: ArenaTerrain): number {
  const s = tribute.stats;

  switch (terrain) {
    case 'forest':
      return s.stealth * 0.3 + s.survival * 0.25;
    case 'mountain':
      return s.strength * 0.2 + s.agility * 0.3;
    case 'desert':
      return s.survival * 0.4 + s.agility * 0.1;
    case 'coast':
      return s.agility * 0.25 + s.survival * 0.2;
    case 'ruins':
      return s.intelligence * 0.3 + s.stealth * 0.2;
    case 'swamp':
      return s.survival * 0.3 + s.stealth * 0.2;
  }
}

function weatherScore(tribute: Tribute, weather: ArenaWeather): number {
  const s = tribute.stats;

  switch (weather) {
    case 'rain':
      return s.survival * 0.15 + s.agility * 0.1;
    case 'storm':
      return s.survival * 0.25 + s.strength * 0.05;
    case 'heat':
      return s.survival * 0.3;
    case 'cold':
      return s.survival * 0.25 + s.strength * 0.05;
    case 'fog':
      return s.stealth * 0.2 + s.intelligence * 0.1;
    case 'clear':
      return s.agility * 0.05;
  }
}

function survivalScore(tribute: Tribute, arena: ArenaConfig): number {
  return (
    strategyScore(tribute, arena.strategyMode) * 0.55 +
    terrainScore(tribute, arena.terrain) +
    weatherScore(tribute, arena.weather) +
    arena.resourceLevel * 0.12 +
    (100 - arena.hazardLevel) * 0.12 +
    random(-10, 10)
  );
}

function combatScore(tribute: Tribute, arena: ArenaConfig): number {
  const s = tribute.stats;
  let score =
    s.strength * 0.35 +
    s.weaponSkill * 0.35 +
    s.agility * 0.15 +
    s.survival * 0.15;

  if (arena.strategyMode === 'aggressive') {
    score += s.strength * 0.12 + s.weaponSkill * 0.08;
  } else if (arena.strategyMode === 'survival') {
    score += s.survival * 0.12 + s.stealth * 0.08;
  }

  return (
    score +
    arena.resourceLevel * 0.05 +
    terrainScore(tribute, arena.terrain) * 0.25 +
    random(-12, 12)
  );
}

function normalizeArena(arena: ArenaConfig): ArenaConfig {
  return {
    ...arena,
    resourceLevel: clamp(arena.resourceLevel),
    hazardLevel: clamp(arena.hazardLevel),
    allianceRate: clamp(arena.allianceRate),
    sponsorRate: clamp(arena.sponsorRate),
  };
}

function addKill(kills: Map<string, number>, tributeId: string): void {
  kills.set(tributeId, (kills.get(tributeId) ?? 0) + 1);
}

export function runAdvancedSimulation(
  scenario: AdvancedScenario,
): AdvancedSimulationResult {
  const arena = normalizeArena(scenario);
  const roster = scenario.roster
    .map(getTribute)
    .filter((tribute): tribute is Tribute => Boolean(tribute));

  if (roster.length < 2) {
    return {
      victor: null,
      days: 0,
      placements: [],
      events: [],
      arena,
      scenarioName: scenario.scenarioName,
    };
  }

  let active = [...roster];
  let day = 1;
  const maxDays = 30;
  const events: AdvancedEvent[] = [];
  const eliminationDay = new Map<string, number>();
  const kills = new Map<string, number>();

  for (const tribute of roster) {
    kills.set(tribute.id, 0);
  }

  while (active.length > 1 && day <= maxDays) {
    const startingIds = new Set(active.map((tribute) => tribute.id));
    const eliminatedToday = new Set<string>();

    // Environmental pressure.
    for (const tribute of [...active]) {
      if (active.length - eliminatedToday.size <= 1) break;

      const survival = survivalScore(tribute, arena);
      const hazardChance = clamp(
        1.5 + arena.hazardLevel * 0.045 + Math.max(0, 50 - survival) * 0.035,
        0,
        18,
      );

      if (random(0, 100) < hazardChance) {
        eliminatedToday.add(tribute.id);
        eliminationDay.set(tribute.id, day);
        events.push({
          day,
          type: 'hazard',
          description: `${tribute.name} was eliminated by the arena environment.`,
          tributeId: tribute.id,
        });
      }
    }

    active = active.filter((tribute) => !eliminatedToday.has(tribute.id));

    // One combat encounter per day at most. This keeps the simulation fast.
    if (active.length > 1) {
      const combatChance =
        arena.strategyMode === 'aggressive'
          ? 58
          : arena.strategyMode === 'survival'
            ? 28
            : 42;

      if (random(0, 100) < combatChance) {
        const firstIndex = Math.floor(random(0, active.length));
        const fighterA = active[firstIndex];
        const possibleOpponents = active.filter(
          (tribute) => tribute.id !== fighterA.id,
        );
        const fighterB =
          possibleOpponents[
            Math.floor(random(0, possibleOpponents.length))
          ];

        if (fighterB) {
          const scoreA = combatScore(fighterA, arena);
          const scoreB = combatScore(fighterB, arena);
          const winner = scoreA >= scoreB ? fighterA : fighterB;
          const loser = scoreA >= scoreB ? fighterB : fighterA;
          const margin = Math.abs(scoreA - scoreB);
          const deathChance = clamp(
            35 + margin * 0.55 + arena.hazardLevel * 0.08,
            20,
            92,
          );

          if (random(0, 100) < deathChance) {
            eliminatedToday.add(loser.id);
            eliminationDay.set(loser.id, day);
            addKill(kills, winner.id);
            events.push({
              day,
              type: 'combat',
              description: `${winner.name} defeated ${loser.name} in combat.`,
              tributeId: winner.id,
            });
            active = active.filter((tribute) => tribute.id !== loser.id);
          } else {
            events.push({
              day,
              type: 'combat',
              description: `${fighterA.name} and ${fighterB.name} clashed, but both survived.`,
            });
          }
        }
      }
    }

    // Alliance event. This is narrative/strategic pressure rather than a death.
    if (active.length > 2 && random(0, 100) < arena.allianceRate) {
      const a = active[Math.floor(random(0, active.length))];
      const remaining = active.filter((tribute) => tribute.id !== a.id);
      const b = remaining[Math.floor(random(0, remaining.length))];

      if (b) {
        events.push({
          day,
          type: 'alliance',
          description: `${a.name} and ${b.name} formed a temporary alliance.`,
        });
      }
    }

    // Sponsor event.
    if (active.length > 0 && random(0, 100) < arena.sponsorRate) {
      const recipient = active[Math.floor(random(0, active.length))];
      events.push({
        day,
        type: 'sponsor',
        description: `${recipient.name} received sponsor support.`,
        tributeId: recipient.id,
      });
    }

    // Make sure the loop always progresses, and use late-game pressure to
    // prevent unusually long games.
    if (active.length > 2 && day >= 18) {
      const weakest = [...active].sort(
        (a, b) => survivalScore(a, arena) - survivalScore(b, arena),
      )[0];

      if (weakest && random(0, 100) < 55) {
        active = active.filter((tribute) => tribute.id !== weakest.id);
        eliminationDay.set(weakest.id, day);
        events.push({
          day,
          type: 'survival',
          description: `${weakest.name} could not withstand the final pressure of the arena.`,
          tributeId: weakest.id,
        });
      }
    }

    // Defensive guard against an accidental non-progressing state.
    if (active.length === startingIds.size && day >= maxDays) {
      break;
    }

    day += 1;
  }

  // If the maximum duration was reached with multiple survivors, resolve the
  // final battle using the same advanced scoring system.
  if (active.length > 1) {
    const ranked = [...active].sort(
      (a, b) => survivalScore(b, arena) - survivalScore(a, arena),
    );
    const victor = ranked[0];

    for (const loser of ranked.slice(1)) {
      eliminationDay.set(loser.id, Math.min(day, maxDays));
      addKill(kills, victor.id);
      events.push({
        day: Math.min(day, maxDays),
        type: 'combat',
        description: `${victor.name} defeated ${loser.name} in the final battle.`,
        tributeId: victor.id,
      });
    }

    active = [victor];
  }

  const victor = active[0] ?? null;
  const totalDays = Math.max(1, Math.min(day, maxDays));

  // Winner is first; remaining tributes are ordered by elimination time,
  // with later eliminations receiving better placements.
  const ordered = [...roster].sort((a, b) => {
    if (victor && a.id === victor.id) return -1;
    if (victor && b.id === victor.id) return 1;

    const dayA = eliminationDay.get(a.id) ?? totalDays;
    const dayB = eliminationDay.get(b.id) ?? totalDays;

    if (dayA !== dayB) return dayB - dayA;
    return survivalScore(b, arena) - survivalScore(a, arena);
  });

  const placements = ordered.map((tribute, index) => ({
    tributeId: tribute.id,
    placement: index + 1,
    survivalDay:
      eliminationDay.get(tribute.id) ?? totalDays,
    kills: kills.get(tribute.id) ?? 0,
  }));

  return {
    victor,
    days: totalDays,
    placements,
    events,
    arena,
    scenarioName: scenario.scenarioName,
  };
}

export function runSimulationLab(
  selectedIds: string[],
  count: number,
  arena: ArenaConfig,
  mode: StrategyMode,
): SimulationLabResult {
  const selectedTributes = selectedIds
    .map(getTribute)
    .filter((tribute): tribute is Tribute => Boolean(tribute));

  if (selectedTributes.length < 2) {
    return {
      simulations: 0,
      arena: normalizeArena(arena),
      rows: [],
    };
  }

  const simulations = Math.max(1, Math.min(10000, Math.floor(count)));

  const stats = new Map<
    string,
    {
      wins: number;
      placementTotal: number;
      survivalTotal: number;
      killsTotal: number;
      topThree: number;
    }
  >();

  for (const tribute of selectedTributes) {
    stats.set(tribute.id, {
      wins: 0,
      placementTotal: 0,
      survivalTotal: 0,
      killsTotal: 0,
      topThree: 0,
    });
  }

  const baseArena = normalizeArena({ ...arena, strategyMode: mode });

  for (let simulation = 0; simulation < simulations; simulation += 1) {
    const result = runAdvancedSimulation({
      ...baseArena,
      scenarioName: `Simulation ${simulation + 1}`,
      roster: selectedTributes.map((tribute) => tribute.id),
      strategyMode: mode,
    });

    for (const placement of result.placements) {
      const record = stats.get(placement.tributeId);
      if (!record) continue;

      record.placementTotal += placement.placement;
      record.survivalTotal += placement.survivalDay;
      record.killsTotal += placement.kills;

      if (placement.placement <= 3) {
        record.topThree += 1;
      }

      if (result.victor?.id === placement.tributeId) {
        record.wins += 1;
      }
    }
  }

  const rows = selectedTributes
    .map((tribute): SimulationLabRow => {
      const record = stats.get(tribute.id);

      if (!record) {
        return {
          tributeId: tribute.id,
          name: tribute.name,
          wins: 0,
          winRate: 0,
          averagePlacement: 0,
          averageSurvivalDay: 0,
          averageKills: 0,
          topThreeRate: 0,
        };
      }

      return {
        tributeId: tribute.id,
        name: tribute.name,
        wins: record.wins,
        winRate: round((record.wins / simulations) * 100),
        averagePlacement: round(record.placementTotal / simulations),
        averageSurvivalDay: round(record.survivalTotal / simulations),
        averageKills: round(record.killsTotal / simulations),
        topThreeRate: round((record.topThree / simulations) * 100),
      };
    })
    .sort((a, b) => {
      if (b.winRate !== a.winRate) return b.winRate - a.winRate;
      if (b.topThreeRate !== a.topThreeRate) {
        return b.topThreeRate - a.topThreeRate;
      }
      return a.averagePlacement - b.averagePlacement;
    });

  return {
    simulations,
    arena: baseArena,
    rows,
  };
}
