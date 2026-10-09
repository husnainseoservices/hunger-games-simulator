export interface PersonalityOption {
  text: string;
  weights: Record<string, number>;
}

export interface PersonalityQuestion {
  id: string;
  question: string;
  scenario: string;
  options: PersonalityOption[];
}

export const personalityQuestions: PersonalityQuestion[] = [
  {
    id: 'pq1',
    question: 'The Cornucopia bloodbath begins. You…',
    scenario: 'The gong sounds. Sixty seconds decide who lives past breakfast.',
    options: [
      { text: 'Grab the nearest weapon and fight for the best gear', weights: { 'cato': 3, 'brutus': 3, 'clove': 2, 'marvel': 2 } },
      { text: 'Sprint away from the chaos, empty-handed but alive', weights: { 'foxface': 3, 'rue': 3, 'wiress': 2, 'primrose-everdeen': 2 } },
      { text: 'Snatch a backpack and melt into the treeline', weights: { 'katniss-everdeen': 3, 'gale-hawthorne': 2, 'thresh': 2, 'blight': 2 } },
      { text: 'Link arms with the nearest tributes — strength in numbers', weights: { 'peeta-mellark': 3, 'glimmer': 2, 'cashmere': 2, 'enobaria': 2 } },
    ],
  },
  {
    id: 'pq2',
    question: 'Alone at night, you hear footsteps outside your shelter. You…',
    scenario: 'Every sound could be a Career. Or something worse the Gamemakers cooked up.',
    options: [
      { text: 'Set a trap and wait — let them walk into it', weights: { 'beetee': 3, 'haymitch-abernathy': 3, 'johanna-mason': 2, 'grain-boy': 1 } },
      { text: 'Climb the nearest tree and disappear into the canopy', weights: { 'rue': 2, 'foxface': 2, 'katniss-everdeen': 2, 'wiress': 1 } },
      { text: 'Call out — maybe they want an ally, not a fight', weights: { 'peeta-mellark': 2, 'finnick-odair': 3, 'mags': 2, 'annie-cresta': 2 } },
      { text: 'Ambush them first. Hesitation gets you killed', weights: { 'cato': 2, 'clove': 2, 'brutus': 2, 'marvel-glimmer-d1': 2 } },
    ],
  },
  {
    id: 'pq3',
    question: 'A sponsor parachute drifts down — but it landed in the open. You…',
    scenario: 'Medicine, food, maybe a weapon. Sitting in plain sight of every sniper.',
    options: [
      { text: 'Sprint for it. You need those supplies to survive', weights: { 'thresh': 3, 'gale-hawthorne': 3, 'johanna-mason': 2, 'seeder': 2 } },
      { text: 'Watch from cover. Let someone braver take the risk', weights: { 'foxface': 2, 'wiress': 2, 'beetee': 2, 'chaff': 2 } },
      { text: 'Use it as bait — someone will come, and you will be ready', weights: { 'haymitch-abernathy': 2, 'clove': 2, 'enobaria': 2, 'brutus': 1 } },
      { text: 'Leave it. Caution and pride beat desperation', weights: { 'coriolanus-snow': 3, 'tigris-snow': 2, 'president-coin': 2, 'commander-paylor': 2 } },
    ],
  },
  {
    id: 'pq4',
    question: 'The Gamemakers let you choose your arena. You pick…',
    scenario: 'Terrain is destiny. Choose the ground you will bleed on.',
    options: [
      { text: 'Dense forest — cover, game, and places to vanish', weights: { 'katniss-everdeen': 2, 'rue': 2, 'johanna-mason': 2, 'blight': 2 } },
      { text: 'Open plains — nowhere to hide, nowhere for them to hide either', weights: { 'cato': 2, 'glimmer': 2, 'marvel': 2, 'thresh': 2 } },
      { text: 'A ruined city — choke points, high ground, and wire for traps', weights: { 'beetee': 2, 'wiress': 2, 'boggs': 3, 'commander-paylor': 2 } },
      { text: 'A tropical island — water is life, and you own the water', weights: { 'finnick-odair': 3, 'mags': 3, 'annie-cresta': 2, 'lucy-gray-baird': 2 } },
    ],
  },
  {
    id: 'pq5',
    question: 'One weapon for the whole Games. You choose…',
    scenario: 'The Cornucopia glints. Choose wisely — this is your whole strategy.',
    options: [
      { text: 'A bow — silent, deadly, and mine from a mile away', weights: { 'katniss-everdeen': 3, 'gale-hawthorne': 2 } },
      { text: 'A sword or axe — close, personal, decisive', weights: { 'cato': 2, 'johanna-mason': 2, 'blight': 1, 'brutus': 2 } },
      { text: 'A trident or spear — reach beats everything', weights: { 'finnick-odair': 3, 'marvel': 2 } },
      { text: 'No weapon. My traps, my mind, my patience', weights: { 'beetee': 3, 'haymitch-abernathy': 2, 'foxface': 2, 'wiress': 2, 'maysilee-donner': 2 } },
    ],
  },
  {
    id: 'pq6',
    question: 'Your closest ally betrays the group to the Careers. You…',
    scenario: 'Trust is currency in the arena. Someone just spent yours.',
    options: [
      { text: 'Forgive them — but never turn your back again', weights: { 'peeta-mellark': 2, 'primrose-everdeen': 3, 'rue': 2, 'annie-cresta': 2 } },
      { text: 'Cut them loose immediately. The alliance is over', weights: { 'katniss-everdeen': 2, 'johanna-mason': 2, 'thresh': 2 } },
      { text: 'Make them pay — publicly, so everyone learns the lesson', weights: { 'cato': 2, 'clove': 2, 'coriolanus-snow': 2, 'president-coin': 2 } },
      { text: 'Smile, stay close — and use their betrayal against them later', weights: { 'haymitch-abernathy': 2, 'beetee': 2, 'sejanus-plinth': 3, 'tigris-snow': 2 } },
    ],
  },
  {
    id: 'pq7',
    question: 'A Gamemaker offers you a secret deal: eliminate one tribute, get anything you want. You…',
    scenario: 'The Capitol always collects its debts. But the offer is very tempting.',
    options: [
      { text: 'Refuse. You will not be their pawn', weights: { 'katniss-everdeen': 2, 'peeta-mellark': 2, 'primrose-everdeen': 2, 'rue': 2 } },
      { text: 'Accept. Survival first, principles later', weights: { 'cato': 2, 'brutus': 2, 'enobaria': 2, 'marvel-glimmer-d1': 2 } },
      { text: 'Pretend to accept — then turn their own game against them', weights: { 'haymitch-abernathy': 3, 'beetee': 2, 'johanna-mason': 2 } },
      { text: 'Negotiate — not for yourself, for your whole alliance', weights: { 'finnick-odair': 2, 'boggs': 2, 'commander-paylor': 2, 'president-coin': 2 } },
    ],
  },
  {
    id: 'pq8',
    question: 'You can pick one mentor for the Games. You choose…',
    scenario: 'The right voice in your ear is worth a dozen weapons.',
    options: [
      { text: 'The strategist — someone who out-thinks the arena itself', weights: { 'haymitch-abernathy': 3, 'beetee': 2 } },
      { text: 'The fighter — someone who has ended Games with their hands', weights: { 'finnick-odair': 2, 'johanna-mason': 2, 'brutus': 1 } },
      { text: 'The survivor — someone who endured the unsurvivable', weights: { 'katniss-everdeen': 2, 'thresh': 2, 'mags': 2 } },
      { text: 'The politician — someone who plays people like pieces', weights: { 'coriolanus-snow': 2, 'president-coin': 2, 'tigris-snow': 2, 'sejanus-plinth': 2 } },
    ],
  },
  {
    id: 'pq9',
    question: 'Final three. Two Careers team up against you. Your move…',
    scenario: 'Outnumbered, outgunned. This is the moment that defines victors.',
    options: [
      { text: 'Take them head-on. Let them learn what you are', weights: { 'cato': 2, 'thresh': 3, 'gale-hawthorne': 2 } },
      { text: 'Run. Outlast them. The arena kills the impatient', weights: { 'foxface': 3, 'rue': 2, 'wiress': 2, 'livestock-girl': 2 } },
      { text: 'Turn them against each other — alliances always crack', weights: { 'haymitch-abernathy': 2, 'clove': 1, 'johanna-mason': 2, 'enobaria': 1 } },
      { text: 'Strike from the shadows when they sleep', weights: { 'katniss-everdeen': 2, 'beetee': 2, 'chaff': 2, 'seeder': 2, 'maysilee-donner': 2 } },
    ],
  },
  {
    id: 'pq10',
    question: 'You win. The crown is yours. What do you do with victory?',
    scenario: 'The cannons are silent. Panem is watching. What now?',
    options: [
      { text: 'Disappear into a quiet life — no cameras, no Capitol', weights: { 'peeta-mellark': 2, 'annie-cresta': 3, 'mags': 2, 'primrose-everdeen': 2, 'morphling-female': 2, 'cecelia': 2 } },
      { text: 'Use your fame to change Panem forever', weights: { 'katniss-everdeen': 2, 'gale-hawthorne': 2, 'commander-paylor': 2, 'boggs': 2, 'president-coin': 1 } },
      { text: 'Enjoy every luxury the Capitol can offer', weights: { 'glimmer': 3, 'cashmere': 3, 'marvel': 1, 'finnick-odair': 1 } },
      { text: 'Mentor the next tributes — make sure they come home', weights: { 'haymitch-abernathy': 2, 'chaff': 2, 'seeder': 2, 'blight': 1 } },
    ],
  },
];

export function getAllPersonalityTributeIds(): string[] {
  const ids = new Set<string>();
  for (const q of personalityQuestions) {
    for (const o of q.options) {
      for (const id of Object.keys(o.weights)) ids.add(id);
    }
  }
  return [...ids];
}
