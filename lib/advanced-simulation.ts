import type { Tribute } from '@/types';
import { tributes } from '@/data/tributes';
import { simulateGame } from '@/lib/simulation-engine';

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
  type: string;
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

/*
 * --------------------------------------------------------------------------
 * ARENA PRESETS
 * --------------------------------------------------------------------------
 */

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

/*
 * --------------------------------------------------------------------------
 * INTERNAL HELPERS
 * --------------------------------------------------------------------------
 */

function random(min = 0, max = 1): number {
  return min + Math.random() * (max - min);
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

function getTribute(id: string): Tribute | undefined {
  return tributes.find((tribute) => tribute.id === id);
}

function getStrategyModifier(
  tribute: Tribute,
  mode: StrategyMode,
): number {
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

function terrainModifier(
  tribute: Tribute,
  terrain: ArenaTerrain,
): number {
  const s = tribute.stats;

  switch (terrain) {
    case 'forest':
      return s.stealth * 0.25 + s.survival * 0.25;

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

    default:
      return 0;
  }
}

function weatherModifier(
  tribute: Tribute,
  weather: ArenaWeather,
): number {
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
    default:
      return s.agility * 0.05;
  }
}

function survivalScore(
  tribute: Tribute,
  arena: ArenaConfig,
): number {
  const base = getStrategyModifier(tribute, arena.strategyMode);
  const terrain = terrainModifier(tribute, arena.terrain);
  const weather = weatherModifier(tribute, arena.weather);

  const resources = arena.resourceLevel * 0.12;
  const hazards = (100 - arena.hazardLevel) * 0.12;

  return (
    base * 0.55 +
    terrain +
    weather +
    resources +
    hazards +
    random(-10, 10)
  );
}

function
