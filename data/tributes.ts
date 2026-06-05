import { Tribute } from '@/types';

export const tributes: Tribute[] = [
  // DISTRICT 12
  {
    id: 'katniss-everdeen', name: 'Katniss Everdeen', nickname: 'The Girl on Fire',
    age: 16, gender: 'female', district: 'District 12', districtNumber: 12,
    image: '/images/tributes/katniss.jpg', background: 'Volunteer',
    bio: 'The Mockingjay. A hunter from the Seam who volunteered to save her sister Prim. Katniss is the greatest archer in Panem history and a natural survival expert who became the symbol of rebellion against the Capitol.',
    stats: { strength: 75, agility: 88, survival: 97, intelligence: 85, charisma: 72, stealth: 94, weaponSkill: 98, allianceLoyalty: 82 },
    weapon: 'Bow and arrows', strategy: 'Solo survival, terrain advantage',
    trainingScore: 11, catchphrase: "I am not pretty. I am not beautiful. I am as radiant as the sun.", wins: 0, losses: 0,
  },
  {
    id: 'peeta-mellark', name: 'Peeta Mellark', nickname: 'The Boy with the Bread',
    age: 16, gender: 'male', district: 'District 12', districtNumber: 12,
    image: '/images/tributes/peeta.jpg', background: 'Reaped',
    bio: 'A baker\'s son with incredible charisma and surprising physical strength. Peeta\'s alliance-building skills and public charm made him one of the most-sponsored tributes in Games history.',
    stats: { strength: 82, agility: 68, survival: 75, intelligence: 87, charisma: 96, stealth: 60, weaponSkill: 70, allianceLoyalty: 98 },
    weapon: 'Hand-to-hand combat, camouflage', strategy: 'Alliance building, public charm',
    trainingScore: 8, catchphrase: "I want to die as myself.", wins: 0, losses: 0,
  },
  {
    id: 'haymitch-abernathy', name: 'Haymitch Abernathy', nickname: 'The Drunk Victor',
    age: 40, gender: 'male', district: 'District 12', districtNumber: 12,
    image: '/images/tributes/haymitch.jpg', background: 'Victor',
    bio: 'The only living victor from District 12. Won the 50th Games using the arena\'s own force field as a weapon. His intelligence and cunning remain unmatched even years later.',
    stats: { strength: 70, agility: 72, survival: 88, intelligence: 97, charisma: 65, stealth: 80, weaponSkill: 78, allianceLoyalty: 70 },
    weapon: 'Axe', strategy: 'Psychological manipulation, terrain exploitation',
    trainingScore: 10, catchphrase: "Here's some advice: stay alive.", wins: 0, losses: 0,
  },
  // DISTRICT 1
  {
    id: 'cato', name: 'Cato', nickname: 'The Career Beast',
    age: 18, gender: 'male', district: 'District 1', districtNumber: 1,
    image: '/images/tributes/cato.jpg', background: 'Career',
    bio: 'The most physically imposing Career tribute of the 74th Games. Trained since childhood in luxury, Cato is a killing machine with rage that even his allies feared.',
    stats: { strength: 98, agility: 82, survival: 85, intelligence: 68, charisma: 55, stealth: 58, weaponSkill: 94, allianceLoyalty: 52 },
    weapon: 'Sword', strategy: 'Brute force, Career alliance dominance',
    trainingScore: 10, catchphrase: "I want to see you suffer.", wins: 0, losses: 0,
  },
  {
    id: 'glimmer', name: 'Glimmer', nickname: 'District 1 Beauty',
    age: 17, gender: 'female', district: 'District 1', districtNumber: 1,
    image: '/images/tributes/glimmer.jpg', background: 'Career',
    bio: 'A Career tribute who combined physical training with exceptional charisma to secure massive sponsorship support. Her beauty masked genuine combat ability.',
    stats: { strength: 75, agility: 80, survival: 72, intelligence: 70, charisma: 95, stealth: 68, weaponSkill: 78, allianceLoyalty: 60 },
    weapon: 'Bow (stolen), spear', strategy: 'Sponsor leverage, Career pack',
    trainingScore: 9, catchphrase: "I was born for this.", wins: 0, losses: 0,
  },
  // DISTRICT 2
  {
    id: 'clove', name: 'Clove', nickname: 'The Knife Artist',
    age: 15, gender: 'female', district: 'District 2', districtNumber: 2,
    image: '/images/tributes/clove.jpg', background: 'Career',
    bio: 'The most technically skilled tribute in the 74th Games. Clove\'s knife-throwing accuracy was unmatched and her cold psychological tactics made her as dangerous verbally as physically.',
    stats: { strength: 72, agility: 91, survival: 80, intelligence: 88, charisma: 58, stealth: 86, weaponSkill: 97, allianceLoyalty: 65 },
    weapon: 'Throwing knives', strategy: 'Precision attacks, psychological warfare',
    trainingScore: 10, catchphrase: "I always hit my target.", wins: 0, losses: 0,
  },
  {
    id: 'marvel', name: 'Marvel', nickname: 'The Spear',
    age: 17, gender: 'male', district: 'District 1', districtNumber: 1,
    image: '/images/tributes/marvel.jpg', background: 'Career',
    bio: 'A Career tribute whose spear skills and quick thinking made him a consistent threat. Marvel was the fastest of the Career pack and used that speed to devastating effect.',
    stats: { strength: 82, agility: 90, survival: 78, intelligence: 72, charisma: 65, stealth: 75, weaponSkill: 91, allianceLoyalty: 58 },
    weapon: 'Spear', strategy: 'Speed attacks, Career alliance',
    trainingScore: 9, catchphrase: "Speed kills.", wins: 0, losses: 0,
  },
  // DISTRICT 11
  {
    id: 'rue', name: 'Rue', nickname: 'Little Bird',
    age: 12, gender: 'female', district: 'District 11', districtNumber: 11,
    image: '/images/tributes/rue.jpg', background: 'Reaped',
    bio: 'The youngest tribute of the 74th Games, Rue\'s survival skills, agility, and knowledge of plants made her far more dangerous than her small frame suggested. Her alliance with Katniss became one of the most beloved in Games history.',
    stats: { strength: 42, agility: 97, survival: 93, intelligence: 88, charisma: 85, stealth: 98, weaponSkill: 65, allianceLoyalty: 97 },
    weapon: 'Slingshot, traps', strategy: 'Stealth, foraging, alliance',
    trainingScore: 7, catchphrase: "I knew I could trust you.", wins: 0, losses: 0,
  },
  {
    id: 'thresh', name: 'Thresh', nickname: 'The Giant of District 11',
    age: 18, gender: 'male', district: 'District 11', districtNumber: 11,
    image: '/images/tributes/thresh.jpg', background: 'Reaped',
    bio: 'The most physically imposing non-Career tribute in recent memory. Thresh controlled a section of the arena through sheer intimidation and survived longer than almost anyone through a combination of strength and sharp judgment.',
    stats: { strength: 97, agility: 72, survival: 90, intelligence: 78, charisma: 62, stealth: 65, weaponSkill: 88, allianceLoyalty: 80 },
    weapon: 'Hand-to-hand, improvised weapons', strategy: 'Territory control, intimidation',
    trainingScore: 10, catchphrase: "Just this once, Twelve. For Rue.", wins: 0, losses: 0,
  },
  // DISTRICT 4
  {
    id: 'finnick-odair', name: 'Finnick Odair', nickname: 'The Golden Victor',
    age: 24, gender: 'male', district: 'District 4', districtNumber: 4,
    image: '/images/tributes/finnick-odair.jpg', background: 'Victor',
    bio: 'Won the Games at 14 — the youngest victor in history. Finnick\'s combination of physical perfection, trident mastery, and Capitol charisma made him the most celebrated tribute ever. His true loyalty was always to Annie.',
    stats: { strength: 92, agility: 95, survival: 90, intelligence: 88, charisma: 99, stealth: 82, weaponSkill: 97, allianceLoyalty: 88 },
    weapon: 'Trident and net', strategy: 'Combat dominance, alliance leadership',
    trainingScore: 9, catchphrase: "Want to know my secrets?", wins: 0, losses: 0,
  },
  {
    id: 'mags', name: 'Mags', nickname: 'The Original Victor',
    age: 80, gender: 'female', district: 'District 4', districtNumber: 4,
    image: '/images/tributes/mags.jpg', background: 'Victor',
    bio: 'Volunteered at 80 years old to protect Annie Cresta. Mags won the Games decades ago and her survival knowledge, fishing hook skills, and selfless courage made her one of the most respected figures in Panem.',
    stats: { strength: 38, agility: 45, survival: 95, intelligence: 97, charisma: 80, stealth: 75, weaponSkill: 78, allianceLoyalty: 99 },
    weapon: 'Fishhook', strategy: 'Survival expertise, alliance support',
    trainingScore: 3, catchphrase: "...", wins: 0, losses: 0,
  },
  // DISTRICT 7
  {
    id: 'johanna-mason', name: 'Johanna Mason', nickname: 'The Axe Queen',
    age: 20, gender: 'female', district: 'District 7', districtNumber: 7,
    image: '/images/tributes/johanna-mason.jpg', background: 'Victor',
    bio: 'Won the Games by faking weakness before unleashing brutal violence. Johanna\'s combination of physical skill, psychological warfare, and absolute refusal to be broken made her one of the most dangerous victors alive.',
    stats: { strength: 85, agility: 88, survival: 82, intelligence: 92, charisma: 70, stealth: 88, weaponSkill: 93, allianceLoyalty: 62 },
    weapon: 'Axes', strategy: 'Deception, psychological warfare, explosive violence',
    trainingScore: 9, catchphrase: "I'm not afraid to die.", wins: 0, losses: 0,
  },
  // DISTRICT 3
  {
    id: 'beetee', name: 'Beetee', nickname: 'The Electrician',
    age: 45, gender: 'male', district: 'District 3', districtNumber: 3,
    image: '/images/tributes/beetee.jpg', background: 'Victor',
    bio: 'Won the Games using a wire trap that electrocuted a group of tributes. Beetee\'s technological genius and ability to turn the arena\'s own environment into a weapon makes him uniquely dangerous.',
    stats: { strength: 52, agility: 58, survival: 75, intelligence: 99, charisma: 65, stealth: 72, weaponSkill: 70, allianceLoyalty: 85 },
    weapon: 'Wire and electricity traps', strategy: 'Tech traps, environment exploitation',
    trainingScore: 8, catchphrase: "The wire will hold.", wins: 0, losses: 0,
  },
  {
    id: 'wiress', name: 'Wiress', nickname: 'Nuts',
    age: 40, gender: 'female', district: 'District 3', districtNumber: 3,
    image: '/images/tributes/wiress.jpg', background: 'Victor',
    bio: 'A technological genius who discovered the clock pattern of the Quarter Quell arena. Her intelligence and pattern recognition abilities are unmatched, though she struggles to communicate clearly under stress.',
    stats: { strength: 45, agility: 55, survival: 72, intelligence: 98, charisma: 50, stealth: 68, weaponSkill: 60, allianceLoyalty: 90 },
    weapon: 'Wire traps', strategy: 'Pattern analysis, tech solutions',
    trainingScore: 6, catchphrase: "Tick tock.", wins: 0, losses: 0,
  },
  // DISTRICT 5
  {
    id: 'foxface', name: 'Foxface', nickname: 'The Fox',
    age: 16, gender: 'female', district: 'District 5', districtNumber: 5,
    image: '/images/tributes/foxface.jpg', background: 'Reaped',
    bio: 'Real name unknown. Foxface survived longer than almost any non-Career tribute through pure intelligence — stealing from the Careers, avoiding all combat, and using her knowledge of plants. She never fought anyone directly.',
    stats: { strength: 60, agility: 92, survival: 95, intelligence: 98, charisma: 60, stealth: 99, weaponSkill: 55, allianceLoyalty: 40 },
    weapon: 'None — avoidance only', strategy: 'Complete stealth, intelligence, avoid all combat',
    trainingScore: 5, catchphrase: "Never fight what you can outrun.", wins: 0, losses: 0,
  },
  // DISTRICT 6
  {
    id: 'morphling-female', name: 'Female Morphling', nickname: 'The Morphling',
    age: 30, gender: 'female', district: 'District 6', districtNumber: 6,
    image: '/images/tributes/morphling-female.jpg', background: 'Victor',
    bio: 'A past victor from District 6 who became addicted to morphling as a coping mechanism. Despite her addiction, her survival instincts and artistic soul make her more resilient than she appears.',
    stats: { strength: 48, agility: 70, survival: 78, intelligence: 75, charisma: 65, stealth: 80, weaponSkill: 60, allianceLoyalty: 82 },
    weapon: 'Camouflage, evasion', strategy: 'Camouflage, avoidance',
    trainingScore: 4, catchphrase: "The colors...", wins: 0, losses: 0,
  },
  // DISTRICT 8
  {
    id: 'cecelia', name: 'Cecelia', nickname: 'The Mother',
    age: 30, gender: 'female', district: 'District 8', districtNumber: 8,
    image: '/images/tributes/cecelia.jpg', background: 'Victor',
    bio: 'A past victor and mother of three young children. Cecelia\'s survival instincts are driven by the desperate need to return to her family. Her resourcefulness with fabric and materials from District 8 gives her unique crafting abilities.',
    stats: { strength: 65, agility: 72, survival: 85, intelligence: 82, charisma: 78, stealth: 75, weaponSkill: 68, allianceLoyalty: 88 },
    weapon: 'Snares, improvised weapons', strategy: 'Survival focus, alliance protection',
    trainingScore: 6, catchphrase: "I have children waiting for me.", wins: 0, losses: 0,
  },
  // DISTRICT 9
  {
    id: 'grain-boy', name: 'District 9 Male', nickname: 'The Grain Boy',
    age: 17, gender: 'male', district: 'District 9', districtNumber: 9,
    image: '/images/tributes/d9-male.jpg', background: 'Reaped',
    bio: 'A tribute from the grain district with exceptional endurance built from years of physical labor. His quiet determination and knowledge of food sources gives him survivability that far exceeds expectations.',
    stats: { strength: 80, agility: 70, survival: 88, intelligence: 72, charisma: 55, stealth: 68, weaponSkill: 72, allianceLoyalty: 75 },
    weapon: 'Scythe, hand-to-hand', strategy: 'Endurance, food sourcing',
    trainingScore: 6, catchphrase: "Work harder than anyone else.", wins: 0, losses: 0,
  },
  // DISTRICT 10
  {
    id: 'livestock-girl', name: 'District 10 Female', nickname: 'The Rancher',
    age: 15, gender: 'female', district: 'District 10', districtNumber: 10,
    image: '/images/tributes/d10-female.jpg', background: 'Reaped',
    bio: 'Raised among livestock, this tribute knows how to track, read animal behavior, and survive in harsh conditions. Her quiet confidence and practical skills make her a dangerous underdog.',
    stats: { strength: 72, agility: 78, survival: 90, intelligence: 80, charisma: 62, stealth: 82, weaponSkill: 70, allianceLoyalty: 80 },
    weapon: 'Rope, lasso', strategy: 'Survival, tracking, snaring',
    trainingScore: 5, catchphrase: "Survival is what I was born doing.", wins: 0, losses: 0,
  },
  // DISTRICT 13
  {
    id: 'commander-paylor', name: 'Commander Paylor', nickname: 'The Commander',
    age: 25, gender: 'female', district: 'District 13', districtNumber: 13,
    image: '/images/tributes/paylor.jpg', background: 'Victor',
    bio: 'A military commander from District 13 who would eventually become President of Panem. Paylor combines combat training with strategic intelligence and natural leadership.',
    stats: { strength: 80, agility: 78, survival: 88, intelligence: 94, charisma: 85, stealth: 80, weaponSkill: 88, allianceLoyalty: 92 },
    weapon: 'Military-grade weapons, tactical planning', strategy: 'Leadership, tactical warfare',
    trainingScore: 9, catchphrase: "We fight for all of Panem.", wins: 0, losses: 0,
  },
  // CAPITOL WILDCARD
  {
    id: 'enobaria', name: 'Enobaria', nickname: 'The Fang',
    age: 28, gender: 'female', district: 'District 2', districtNumber: 2,
    image: '/images/tributes/enobaria.jpg', background: 'Victor',
    bio: 'Won the Games by ripping a tribute\'s throat out with her teeth. Had her teeth surgically altered into gold fangs. The most terrifying victor from District 2 and a loyal Capitol enforcer.',
    stats: { strength: 90, agility: 88, survival: 85, intelligence: 78, charisma: 62, stealth: 82, weaponSkill: 92, allianceLoyalty: 48 },
    weapon: 'Teeth, blades', strategy: 'Pure aggression, psychological terror',
    trainingScore: 11, catchphrase: "Bite first. Question later.", wins: 0, losses: 0,
  },
  {
    id: 'annie-cresta', name: 'Annie Cresta', nickname: 'The Survivor',
    age: 20, gender: 'female', district: 'District 4', districtNumber: 4,
    image: '/images/tributes/annie.jpg', background: 'Victor',
    bio: 'Won the Games when her arena flooded and she was the best swimmer. Traumatized by witnessing a tribute\'s beheading, Annie\'s mental resilience is her greatest weapon now.',
    stats: { strength: 68, agility: 85, survival: 92, intelligence: 78, charisma: 72, stealth: 75, weaponSkill: 70, allianceLoyalty: 95 },
    weapon: 'Swimming, survival', strategy: 'Environmental adaptation, water mastery',
    trainingScore: 6, catchphrase: "The water is where I belong.", wins: 0, losses: 0,
  },
  {
    id: 'brutus', name: 'Brutus', nickname: 'The Veteran',
    age: 45, gender: 'male', district: 'District 2', districtNumber: 2,
    image: '/images/tributes/brutus.jpg', background: 'Victor',
    bio: 'A veteran Career who has competed in and won multiple iterations of the Games. Brutus combines decades of experience with still-formidable physical conditioning.',
    stats: { strength: 88, agility: 75, survival: 85, intelligence: 82, charisma: 58, stealth: 68, weaponSkill: 92, allianceLoyalty: 55 },
    weapon: 'Spear', strategy: 'Veteran tactics, Career supremacy',
    trainingScore: 10, catchphrase: "I\'ve done this before.", wins: 0, losses: 0,
  },
  {
    id: 'cashmere', name: 'Cashmere', nickname: 'The Silken Blade',
    age: 28, gender: 'female', district: 'District 1', districtNumber: 1,
    image: '/images/tributes/cashmere.jpg', background: 'Victor',
    bio: 'Won the Games through a combination of athletic excellence and social manipulation. Cashmere is the most politically connected victor from District 1 and her knife skills remain deadly.',
    stats: { strength: 78, agility: 88, survival: 80, intelligence: 85, charisma: 90, stealth: 80, weaponSkill: 88, allianceLoyalty: 60 },
    weapon: 'Blades', strategy: 'Political maneuvering, Career alliance',
    trainingScore: 9, catchphrase: "Everything has a price.", wins: 0, losses: 0,
  },

  // ===== BALLAD OF SONGBIRDS & SNAKES — 10th Hunger Games =====
  {
    id: 'lucy-gray-baird', name: 'Lucy Gray Baird', nickname: 'The Songbird',
    age: 16, gender: 'female', district: 'District 12', districtNumber: 12,
    image: '/images/tributes/lucy-gray.jpg', background: 'Reaped',
    bio: 'A Covey performer reaped into the 10th Hunger Games. Lucy Gray won not through violence but through charm, showmanship, and a deadly understanding of snakes. The first tribute to weaponize the audience itself.',
    stats: { strength: 58, agility: 84, survival: 88, intelligence: 90, charisma: 99, stealth: 82, weaponSkill: 62, allianceLoyalty: 70 },
    weapon: 'Performance, snakes, poison', strategy: 'Crowd manipulation, sponsor charm',
    trainingScore: 7, catchphrase: "Are you, are you, coming to the tree?", wins: 0, losses: 0,
  },
  {
    id: 'coriolanus-snow', name: 'Coriolanus Snow', nickname: 'The Young Serpent',
    age: 18, gender: 'male', district: 'Capitol', districtNumber: 0,
    image: '/images/tributes/snow.jpg', background: 'Capitol',
    bio: 'Before he was President, Coriolanus Snow was an ambitious Academy student and mentor in the 10th Games. Brilliant, ruthless, and willing to break every rule to win. The most dangerous strategist in Panem history.',
    stats: { strength: 70, agility: 72, survival: 80, intelligence: 98, charisma: 88, stealth: 90, weaponSkill: 75, allianceLoyalty: 30 },
    weapon: 'Manipulation, poison, strategy', strategy: 'Long-game manipulation, ruthless betrayal',
    trainingScore: 10, catchphrase: "Snow lands on top.", wins: 0, losses: 0,
  },
  {
    id: 'sejanus-plinth', name: 'Sejanus Plinth', nickname: 'The Conscience',
    age: 18, gender: 'male', district: 'District 2', districtNumber: 2,
    image: '/images/tributes/sejanus.jpg', background: 'Capitol',
    bio: 'A District 2 boy whose family bought their way into the Capitol. Sejanus rejected the Games entirely, becoming a symbol of rebellion conscience. His moral courage was both his strength and his fatal flaw.',
    stats: { strength: 72, agility: 70, survival: 75, intelligence: 88, charisma: 80, stealth: 60, weaponSkill: 68, allianceLoyalty: 95 },
    weapon: 'Defiance, intellect', strategy: 'Moral resistance, sabotage',
    trainingScore: 7, catchphrase: "These are children.", wins: 0, losses: 0,
  },
  {
    id: 'tigris-snow', name: 'Tigris Snow', nickname: 'The Stylist',
    age: 19, gender: 'female', district: 'Capitol', districtNumber: 0,
    image: '/images/tributes/tigris.jpg', background: 'Capitol',
    bio: 'Coriolanus Snow\'s cousin and a gifted designer who later became a key rebel ally. Tigris combines aesthetic genius with deep survival instincts and an unmatched ability to read people.',
    stats: { strength: 55, agility: 75, survival: 85, intelligence: 90, charisma: 88, stealth: 86, weaponSkill: 50, allianceLoyalty: 90 },
    weapon: 'Design, social engineering', strategy: 'Survival through alliances, disguise',
    trainingScore: 6, catchphrase: "I believe in you.", wins: 0, losses: 0,
  },

  // ===== REBELLION & MOCKINGJAY ERA =====
  {
    id: 'gale-hawthorne', name: 'Gale Hawthorne', nickname: 'The Hunter',
    age: 18, gender: 'male', district: 'District 12', districtNumber: 12,
    image: '/images/tributes/gale.jpg', background: 'Reaped',
    bio: 'Katniss\'s hunting partner and a born rebel. Gale\'s skill with snares and traps is unmatched, and his willingness to weaponize anything makes him terrifyingly effective. A natural soldier of the rebellion.',
    stats: { strength: 90, agility: 85, survival: 95, intelligence: 88, charisma: 70, stealth: 88, weaponSkill: 90, allianceLoyalty: 85 },
    weapon: 'Snares, bow, explosives', strategy: 'Trap warfare, guerrilla tactics',
    trainingScore: 10, catchphrase: "It\'s us against them.", wins: 0, losses: 0,
  },
  {
    id: 'primrose-everdeen', name: 'Primrose Everdeen', nickname: 'Little Duck',
    age: 13, gender: 'female', district: 'District 12', districtNumber: 12,
    image: '/images/tributes/prim.jpg', background: 'Reaped',
    bio: 'Katniss\'s younger sister whose reaping started the rebellion. Prim is a gifted healer with intelligence and compassion far beyond her years, though her youth makes her physically vulnerable.',
    stats: { strength: 40, agility: 65, survival: 82, intelligence: 90, charisma: 85, stealth: 70, weaponSkill: 35, allianceLoyalty: 98 },
    weapon: 'Medicine, healing', strategy: 'Support, healing, avoidance',
    trainingScore: 4, catchphrase: "You have to win.", wins: 0, losses: 0,
  },
  {
    id: 'boggs', name: 'Boggs', nickname: 'The Soldier',
    age: 45, gender: 'male', district: 'District 13', districtNumber: 13,
    image: '/images/tributes/boggs.jpg', background: 'Victor',
    bio: 'A loyal District 13 commander and Coin\'s right hand who ultimately sided with Katniss. Boggs combines decades of military training with unshakable loyalty and tactical brilliance.',
    stats: { strength: 88, agility: 78, survival: 90, intelligence: 92, charisma: 80, stealth: 82, weaponSkill: 90, allianceLoyalty: 95 },
    weapon: 'Military weapons, tactics', strategy: 'Military discipline, protection detail',
    trainingScore: 10, catchphrase: "Don\'t trust them.", wins: 0, losses: 0,
  },
  {
    id: 'president-coin', name: 'President Coin', nickname: 'The Cold Leader',
    age: 50, gender: 'female', district: 'District 13', districtNumber: 13,
    image: '/images/tributes/coin.jpg', background: 'Capitol',
    bio: 'The calculating leader of District 13 who would sacrifice anyone for the rebellion. Coin matches Snow in ruthlessness, hiding her ambition behind the language of liberation.',
    stats: { strength: 60, agility: 65, survival: 88, intelligence: 96, charisma: 78, stealth: 85, weaponSkill: 70, allianceLoyalty: 25 },
    weapon: 'Political control, strategy', strategy: 'Cold calculation, manipulation',
    trainingScore: 9, catchphrase: "The war must be won.", wins: 0, losses: 0,
  },

  // ===== ADDITIONAL ARENA TRIBUTES =====
  {
    id: 'marvel-glimmer-d1', name: 'Gloss', nickname: 'The Golden Twin',
    age: 24, gender: 'male', district: 'District 1', districtNumber: 1,
    image: '/images/tributes/gloss.jpg', background: 'Victor',
    bio: 'Cashmere\'s brother and a victor in his own right. Gloss is a polished, deadly Career who won young and trained for the Quarter Quell with cold precision.',
    stats: { strength: 86, agility: 88, survival: 78, intelligence: 75, charisma: 82, stealth: 72, weaponSkill: 90, allianceLoyalty: 58 },
    weapon: 'Throwing knives, sword', strategy: 'Career dominance, sibling alliance',
    trainingScore: 9, catchphrase: "We were made for this.", wins: 0, losses: 0,
  },
  {
    id: 'seeder', name: 'Seeder', nickname: 'The Elder',
    age: 60, gender: 'female', district: 'District 11', districtNumber: 11,
    image: '/images/tributes/seeder.jpg', background: 'Victor',
    bio: 'A wise, calm District 11 victor who mentored many tributes. Seeder\'s deep knowledge of plants, patience, and quiet strength make her a formidable survivor.',
    stats: { strength: 62, agility: 60, survival: 96, intelligence: 90, charisma: 82, stealth: 80, weaponSkill: 65, allianceLoyalty: 92 },
    weapon: 'Agriculture, herbalism', strategy: 'Patience, plant knowledge, alliance',
    trainingScore: 7, catchphrase: "The earth provides.", wins: 0, losses: 0,
  },
  {
    id: 'chaff', name: 'Chaff', nickname: 'The One-Handed Victor',
    age: 45, gender: 'male', district: 'District 11', districtNumber: 11,
    image: '/images/tributes/chaff.jpg', background: 'Victor',
    bio: 'Haymitch\'s close friend who won despite losing a hand. Chaff is reckless, brave, and far more dangerous than his easygoing demeanor suggests.',
    stats: { strength: 84, agility: 80, survival: 86, intelligence: 80, charisma: 78, stealth: 70, weaponSkill: 82, allianceLoyalty: 80 },
    weapon: 'Hand-to-hand, improvised', strategy: 'Reckless aggression, alliance',
    trainingScore: 8, catchphrase: "Live fast.", wins: 0, losses: 0,
  },
  {
    id: 'blight', name: 'Blight', nickname: 'The Lumberjack',
    age: 38, gender: 'male', district: 'District 7', districtNumber: 7,
    image: '/images/tributes/blight.jpg', background: 'Victor',
    bio: 'Johanna Mason\'s District 7 companion in the Quarter Quell. A skilled woodsman and axe-wielder who knows how to survive in forested terrain.',
    stats: { strength: 82, agility: 75, survival: 88, intelligence: 76, charisma: 65, stealth: 74, weaponSkill: 85, allianceLoyalty: 78 },
    weapon: 'Axe', strategy: 'Forest survival, terrain advantage',
    trainingScore: 8, catchphrase: "Timber.", wins: 0, losses: 0,
  },
];

export function getTributeById(id: string): Tribute | undefined {
  return tributes.find(t => t.id === id);
}

export function getTributesByDistrict(districtNumber: number): Tribute[] {
  return tributes.filter(t => t.districtNumber === districtNumber);
}

export function getTopTributesByStat(stat: keyof Tribute['stats'], limit = 5): Tribute[] {
  return [...tributes].sort((a, b) => b.stats[stat] - a.stats[stat]).slice(0, limit);
}

export function calculateVictoryOdds(tribute: Tribute, allTributes: Tribute[]): number {
  const score = (
    tribute.stats.strength * 0.15 +
    tribute.stats.agility * 0.15 +
    tribute.stats.survival * 0.20 +
    tribute.stats.intelligence * 0.15 +
    tribute.stats.weaponSkill * 0.20 +
    tribute.stats.stealth * 0.15
  );
  const totalScore = allTributes.reduce((sum, t) => sum + (
    t.stats.strength * 0.15 + t.stats.agility * 0.15 + t.stats.survival * 0.20 +
    t.stats.intelligence * 0.15 + t.stats.weaponSkill * 0.20 + t.stats.stealth * 0.15
  ), 0);
  return Math.round((score / totalScore) * 100 * 10) / 10;
}