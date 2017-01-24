
export enum SpellComponent {
  Verbal = 1,
  Somatic = 2,
  Material = 3,
}


export interface Spell {
  id: number;
  name: string;
  desc: string;
  components: Array<SpellComponent>;
  componentDesc: null | string;
  spellSchool: string;
  castingTime: string;
  duration: string;
  spellShape: null | string;
  spellRange: string;
  requiresConcentration: boolean;
  level: number;
}

export interface SpellList {
  searchResults: Array<Spell>;
  spellSchools: Array<string>;
  spellQuery: null | string;
  isLoading: boolean;
  didErr: boolean;
}

export interface Tool {
  name: string;
}

/*
model Encounter
many characters (so foreign key on model to Character model)


*/

export interface Character {
  playerName?: string;
  characterName?: string;
  id?: null | number;
  armorClass?: number;
  toHit?: number;
  passiveWisdom?: number;
  initiative?: number;
  conditions?: string[];
  currentHitPoints?: number;
  maxHitPoints: number;
  isNpc: boolean;
}

export interface AddCharacter extends Character {
  [name: string]: number | string | null | string[] | boolean | undefined;
}

export interface AddCharacterState {
  open?: boolean;
  character: AddCharacter;
}

export interface TurnOrder extends Tool {
  order: number[];
  players: Array<Character>;
  enemies: Array<Character>;
}

export interface ToolState {
  turnOrder: TurnOrder,
}

export interface Race {
  name: string;
  hasSubraces: boolean;
  bonusSkills: Array<string>;
  bonusScores: Array<number>;
  subracesById: Array<number>;
  id: number;
}

export interface RaceState {
  currentRace: number | null;
  racesById: Array<number>;
  races: Array<Race>;
}

export interface AppState {
  race: RaceState;
  tools: ToolState;
  spells: SpellList;
}
