import * as R from '@types/react-router';

export enum SpellComponent {
  Verbal = 1,
  Somatic = 2,
  Material = 3,
}

export enum ToolChoice {
  Encounter = 1,
  SpellLookup = 2,
  Other = 3
}

export interface IDPayload {
  id: number;
  count: number;
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
  initiativeRoll?: number;
  conditions?: string[];
  currentHitPoints?: number;
  maxHitPoints: number;
  isNpc: boolean;
}

export interface CreateCharacterProps {
  saveCharacter: (character: Character) => void;
  isOpen: boolean;
}

export interface ContainerProps {
  characters: Array<SavedCharacter>,
  addCharactersToEncounter: (characters: CharDesc[]) => void;
};

export interface SavedCharacter extends Character {
  id: number;
  name: string;
  count?: number;
}

export interface AddCharacter extends Character {
  [name: string]: number | string | null | string[] | boolean | undefined;
}

export interface CreateCharacterState {
  open?: boolean;
  character: AddCharacter;
}

export interface TurnOrder extends Tool {
  order: number[];
  players: Array<Character>;
  enemies: Array<Character>;
}

export interface CharacterState extends Character {
  intiativeRoll: number;
  wasSurprised: boolean;
  readiedAction: boolean;
  currentHitPoints: number;
  conditions: string[];
}

export interface Encounter {
  name: string | null;
  roster: Array<SavedCharacter | Character>;
  currentTurn: number;
  id: null | number;
  surpriseRound: boolean;
  created?: Date
}

export interface CharDesc {
  playerName: string;
  characterName: string;
  isNpc: boolean;
  count: number;
  id: number;
  initiativeRoll: null | number;
  initiative: number;
  wasSurprised: boolean;
  children?: any;
}

export interface EncounterCreation {
  surpriseRound: boolean;
  currentTurn: number;
  name: string;
}

export interface EncounterCreationProps {
  npcs: Character[];
  players: Character[];
  saveEncounter: (encounter: Encounter) => void;
  children?: any;
  onCharSelect?: (char: Character, fromList: boolean) => void;
  onChange: (field: string, value: number | string | boolean) => void;
}

export type RouterLocation = {
  hash: string;
  pathname: string;
  search: string;
  state?: any;
  query: { [name: string]: string }
}

export interface EncounterListProps extends R.RouterState {
  encounters: Array<Encounter>;
  activeEncounter: null | number;
  activePage: number;
  maxPage: number;
}

export interface ToolState {
  turnOrder: TurnOrder;
  encounters: Array<Encounter>;
  characters: Array<SavedCharacter>;
  activeEncounter: null | number;
  activeTool: ToolChoice;
  isLoading: boolean;
  encounterPage: number;
  maxEncounterPage: number;
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

export interface EncounterTool extends Tool {
  turnOrder: TurnOrder;
  id: null | number;
  currentTurn: number;
  surpriseRound: boolean;
}

export enum MenuOptions {
  None = 0,
  Encounters = 1,
  SpellLookup = 2,
}

type Condition = "prone" | "incapacitated" | "stunned" | "poisoned" | "defeaned" | "frightened" | "charmed" | "invisible" | "paralyzed" | "petrified" | "blinded"

export interface CharacterStateUpdate {
  id?: number | null;
  characterstate?: number | null;
  currentHitPoints: number;
  readiedAction?: boolean;
  conditions?: Condition[] | never[];
}

export interface EncounterUpdate {
  id: number;
  endOfRound: boolean;
  roster: Array<CharacterStateUpdate>;
}


export interface CharacterListProps {
  characters: SavedCharacter[];
  activeIdx: null | number;
  filter?: string;
};

export interface CharacterListDispatchProps extends CharacterListProps {
  fetchCharacters: () => void;
  selectCharacter: (char: SavedCharacter) => void;
}

export interface JSONListResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface JSONError {
  field: string;
  errors: string[];
}

export enum ServerCode {
  OK = 200,
  RESOURCE_ADDED = 201,
  USER_ERROR = 400,
  // will add more later
}
