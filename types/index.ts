export interface Tribute {
  id: string;
  name: string;
  nickname?: string;
  age: number;
  gender: 'male' | 'female';
  district: string;
  districtNumber: number;
  image: string;
  bio: string;
  background: 'Career' | 'Volunteer' | 'Reaped' | 'Victor' | 'Capitol';
  stats: {
    strength: number;
    agility: number;
    survival: number;
    intelligence: number;
    charisma: number;
    stealth: number;
    weaponSkill: number;
    allianceLoyalty: number;
  };
  weapon: string;
  strategy: string;
  trainingScore: number;
  catchphrase: string;
  wins: number;
  losses: number;
}

export interface District {
  id: string;
  name: string;
  number: number;
  industry: string;
  location: string;
  description: string;
  wealthLevel: number;
  loyaltyToCapitol: number;
  trainingScore: number;
  pastWinners: number;
  image: string;
  color: string;
  tributes: string[];
  theme: string;
}

export interface HungerGame {
  id: string;
  name: string;
  edition: number;
  arena: string;
  arenaDescription: string;
  tributes: string[];
  description: string;
  image: string;
  theme: string;
  dangerMeter: number;
  arenaHazards: string[];
  specialRules?: string;
  year: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  featuredImage: string;
  imageAlt: string;
  seo: { metaTitle: string; metaDescription: string; keywords: string[] };
}

export type BlogCategory = 'tribute-guides' | 'strategy' | 'district-profiles' | 'game-recaps' | 'analysis' | 'rankings';

export interface SimEvent {
  id: string;
  day: number;
  type: 'combat' | 'survival' | 'alliance' | 'trap' | 'hazard' | 'sponsor' | 'cornucopia' | 'feast';
  participants: string[];
  deaths: string[];
  description: string;
  dramaScore: number;
}

export interface GameDay {
  day: number;
  title: string;
  events: SimEvent[];
  deaths: string[];
  survivors: string[];
  cannonCount: number;
  highlight: string;
}

export interface SimulationResult {
  gameId: string;
  days: GameDay[];
  victor: Tribute | null;
  totalDeaths: number;
  totalDays: number;
  killLeader: { tribute: Tribute; kills: number } | null;
  popularityRankings: { tributeId: string; score: number }[];
  allianceHistory: { members: string[]; formedDay: number; dissolvedDay?: number; reason?: string }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}
