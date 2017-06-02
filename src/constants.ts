import { SpellSchool, Character, Skill, Ability, Difficulty } from './interfaces';

export const SPELLSCHOOLS: SpellSchool[] = [
  'Necromancy',
  'Evocation',
  'Divination',
  'Illusion',
  'Conjuration',
  'Transmutation',
  'Enchantment',
  'Abjuration'
];

export const SAMPLE_CHARS: Character[] = [
  {
    playerName: '',
    characterName: 'Gimli',
    armorClass: 12,
    toHit: 3,
    passiveWisdom: 10,
    initiative: 3,
    maxHitPoints: 30,
    isNpc: true,
    id: 16
  },
  {
    playerName: '',
    characterName: 'Duffin',
    armorClass: 18,
    toHit: 2,
    passiveWisdom: 12,
    initiative: 3,
    maxHitPoints: 30,
    isNpc: true,
    id: 1090
  },
  {
    playerName: '',
    characterName: 'Buffin',
    armorClass: 12,
    toHit: 3,
    passiveWisdom: 10,
    initiative: 3,
    maxHitPoints: 30,
    isNpc: true,
    id: 3
  },
  {
    playerName: '',
    characterName: 'Snuffin',
    armorClass: 12,
    toHit: 3,
    passiveWisdom: 10,
    initiative: 3,
    maxHitPoints: 30,
    isNpc: true,
    id: 10
  },
  {
    playerName: '',
    characterName: 'Puffin',
    armorClass: 12,
    toHit: 3,
    passiveWisdom: 10,
    initiative: 3,
    maxHitPoints: 30,
    isNpc: true,
    id: 12
  }
];

export const ABILITIES_SKILLS: Array<Skill | Ability> = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Charisma',
  'Intellect',
  'Wisdom',
  'Stealth',
  'Perception',
  'Investigation',
  'History',
  'Arcana'
];

export const DC_OPTIONS = [
  { value: Difficulty.VERY_EASY, key: Difficulty.VERY_EASY, text: '> 0 - Very Easy', name: 'veasy' },
  { value: Difficulty.EASY, key: Difficulty.EASY, text: '> 5 - Easy', name: 'easy' },
  { value: Difficulty.MODERATE, key: Difficulty.MODERATE, text: '> 10 - Moderate', name: 'moderate' },
  { value: Difficulty.HARD, key: Difficulty.HARD, text: '> 15 - Hard', name: 'hard' },
  { value: Difficulty.VERY_HARD, key: Difficulty.VERY_HARD, text: '> 20 - Very Hard', name: 'vhard' },
  { value: Difficulty.NEARLY_IMPOSSIBLE, key: Difficulty.NEARLY_IMPOSSIBLE, text: '> 25 - Nearly Impossible', name: 'impossible' },
];
//
// export const SAMPLE_CLUES: ClueResource[] = [
//   {
//     description: 'Gimli keeps looking over your shoulder nervously',
//     chapter: 1,
//     id: 1,
//     modified: Date.now(),
//     created: Date.now(),
//     outcomes: [
//       { description: 'Gain advantage when trying to grab Gimli before he escapes the room', dc: Difficulty.MODERATE, clue: 1 },
//       { description: 'Gimli escapes', dc: Difficulty.VERY_HARD }
//     ],
//     requiredStats: ['Perception', 'Investigation', 'Wisdom']
//   },
//   {
//     description: 'The tapestry to the west',
//     chapter: 1,
//     id: 1,
//     modified: Date.now(),
//     created: Date.now(),
//     outcomes: [
//       { description: 'You notice the hole behind the tapestry, inside you find some money.', dc: Difficulty.VERY_HARD }
//     ],
//     requiredStats: ['Perception']
//   },
//   {
//     description: 'The carved engraving depicting dragons in mid-fight',
//     chapter: 1,
//     id: 1,
//     modified: Date.now(),
//     created: Date.now(),
//     outcomes: [
//       { description: 'The fight is of a clash between Tiamat, the mother of all evil dragons and an unknown Golden Dragon', dc: Difficulty.VERY_HARD },
//       { description: 'A clash between a Chromatic dragon and a Golden Dragon', dc: Difficulty.MODERATE },
//       { description: 'Two dragons fighting. Derp.', dc: Difficulty.VERY_EASY }
//     ],
//     requiredStats: ['History', 'Intellect']
//   },
// ]
