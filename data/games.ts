import { HungerGame } from '@/types';

export const hungerGames: HungerGame[] = [
  {
    id: '74th-hunger-games', name: '74th Hunger Games', edition: 74, year: 'Year 74 of Panem',
    arena: 'Forest Arena', arenaDescription: 'Dense temperate forest with a central lake. Cornucopia positioned in a clearing. The arena featured tracker jacker nests, limited water sources, and a Gamemaker-controlled fire trap that drove tributes together.',
    description: 'The Games that changed Panem forever. Katniss Everdeen volunteered for her sister and, alongside Peeta Mellark, defied the Capitol with poisonous berries. The Career pack dominated early before being dismantled one by one.',
    tributes: ['katniss-everdeen', 'peeta-mellark', 'cato', 'clove', 'glimmer', 'marvel', 'rue', 'thresh', 'foxface'],
    image: '/images/games/74th-hunger-games.svg', theme: 'The Game That Started It All',
    dangerMeter: 92, arenaHazards: ['Tracker jackers', 'Gamemaker fireballs', 'Muttations', 'Limited water'],
  },
  {
    id: 'quarter-quell-75th', name: '75th Hunger Games — Quarter Quell', edition: 75, year: 'Year 75 of Panem',
    arena: 'Clockwork Arena', arenaDescription: 'A tropical island divided like a clock face into 12 sections, each with a different hazard that activated hourly. Poison fog, blood rain, carnivorous monkeys, killer insects, tidal waves, and jabberjays.',
    description: 'The Third Quarter Quell — past victors were reaped. The most dangerous arena ever designed. Katniss, Peeta, Finnick, Johanna, Beetee, and Wiress formed the rebel alliance that eventually destroyed the arena.',
    tributes: ['katniss-everdeen', 'peeta-mellark', 'finnick-odair', 'mags', 'johanna-mason', 'beetee', 'wiress', 'enobaria', 'brutus', 'cashmere'],
    image: '/images/games/quarter-quell-75th.svg', theme: 'Quarter Quell — Victors Return',
    dangerMeter: 98, arenaHazards: ['Poison fog', 'Blood rain', 'Carnivorous monkeys', 'Jabberjays', 'Tidal wave', 'Lightning tree'],
    specialRules: 'Third Quarter Quell: tributes reaped from existing pool of victors',
  },
  {
    id: '50th-hunger-games', name: '50th Hunger Games — Second Quell', edition: 50, year: 'Year 50 of Panem',
    arena: 'Double Arena', arenaDescription: 'Two arenas operating simultaneously with twice the normal tribute count. A massive wilderness arena with treacherous terrain, limited resources, and extreme weather events.',
    description: 'The Second Quarter Quell that sent twice the number of tributes to die. A young Haymitch Abernathy survived by using the arena\'s own force field as a weapon — a tactical masterstroke that won him the Games.',
    tributes: ['haymitch-abernathy', 'cato', 'glimmer', 'cashmere', 'clove', 'brutus', 'enobaria', 'beetee', 'wiress', 'finnick-odair', 'mags', 'annie-cresta', 'foxface', 'morphling-female', 'johanna-mason', 'blight', 'cecelia', 'grain-boy', 'livestock-girl', 'rue', 'thresh', 'seeder', 'chaff', 'peeta-mellark'],
    image: '/images/games/50th-games.svg', theme: 'Double the Terror',
    dangerMeter: 95, arenaHazards: ['Force field boundaries', 'Double tribute count', 'Extreme weather', 'Hostile terrain'],
    specialRules: 'Second Quarter Quell: twice the number of tributes from each district',
  },
  {
    id: 'custom-games', name: 'Custom Games', edition: 0, year: 'Your Panem',
    arena: 'Custom Arena', arenaDescription: 'You choose the tributes. You decide the outcome. Any combination of characters from any district in any order.',
    description: 'Build your own roster from all available tributes. Mix victors with reaped tributes. Put Katniss against Finnick. See if Foxface can outlast the Career pack. Your Games, your rules.',
    tributes: [],
    image: '/images/games/custom-arena.svg', theme: 'Your Rules, Your Arena',
    dangerMeter: 100, arenaHazards: ['Anything you choose'],
  },
];

export function getGameById(id: string): HungerGame | undefined {
  return hungerGames.find(g => g.id === id);
}
